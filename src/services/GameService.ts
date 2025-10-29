import { Devvit } from '@devvit/public-api';
import { Player, Question, GameData, GameState } from '../types/game.js';
import { QuestionBank } from '../data/questions.js';

export class GameService {
  private context: Devvit.Context;
  private gameKey = 'battle_royale_game';
  private playersKey = 'battle_royale_players';
  private questionBank: QuestionBank;

  constructor(context: Devvit.Context) {
    this.context = context;
    this.questionBank = new QuestionBank();
  }

  async getGameData(): Promise<GameData> {
    const { redis } = this.context;
    
    const gameDataStr = await redis.get(this.gameKey);
    const playersStr = await redis.get(this.playersKey);
    
    const defaultGameData: GameData = {
      state: 'waiting',
      players: [],
      currentQuestionIndex: 0,
      questionsTotal: 10,
      round: 0,
      timeLeft: 0,
      totalPlayers: 0,
      questionsAnswered: 0
    };

    if (!gameDataStr) {
      await this.saveGameData(defaultGameData);
      return defaultGameData;
    }

    const gameData = JSON.parse(gameDataStr);
    const players = playersStr ? JSON.parse(playersStr) : [];
    
    return { ...gameData, players };
  }

  async saveGameData(gameData: GameData): Promise<void> {
    const { redis } = this.context;
    
    const { players, ...gameDataWithoutPlayers } = gameData;
    
    await redis.set(this.gameKey, JSON.stringify(gameDataWithoutPlayers));
    await redis.set(this.playersKey, JSON.stringify(players));
  }

  async joinGame(username: string): Promise<Player> {
    const gameData = await this.getGameData();
    
    // Check if player already exists
    const existingPlayer = gameData.players.find(p => p.username === username);
    if (existingPlayer) {
      return existingPlayer;
    }

    // Check if game is full or already started
    if (gameData.state !== 'waiting' && gameData.state !== 'joined') {
      throw new Error('Game has already started');
    }

    const newPlayer: Player = {
      id: `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username,
      score: 0,
      isAlive: true,
      isWinner: false,
      joinedAt: Date.now()
    };

    gameData.players.push(newPlayer);
    gameData.state = 'joined';
    gameData.totalPlayers = gameData.players.length;

    await this.saveGameData(gameData);
    return newPlayer;
  }

  async startGame(): Promise<void> {
    const gameData = await this.getGameData();
    
    if (gameData.players.length < 1) { // Allow single player for testing
      throw new Error('Need at least 1 player to start');
    }

    gameData.state = 'playing';
    gameData.round = 1;
    gameData.startedAt = Date.now();
    
    await this.nextQuestion(gameData);
  }

  async nextQuestion(gameData?: GameData): Promise<void> {
    if (!gameData) {
      gameData = await this.getGameData();
    }

    const alivePlayers = gameData.players.filter(p => p.isAlive);
    
    // Check win condition
    if (alivePlayers.length <= 1) {
      await this.endGame(gameData);
      return;
    }

    // Get next question based on round
    const difficulty = gameData.round <= 3 ? 'easy' : gameData.round <= 6 ? 'medium' : 'hard';
    const question = this.questionBank.getRandomQuestion(difficulty);
    
    gameData.currentQuestion = question;
    gameData.timeLeft = question.timeLimit;
    gameData.questionsAnswered++;

    await this.saveGameData(gameData);

    // Auto-advance after time limit (simplified for demo)
    setTimeout(async () => {
      await this.processAnswers();
    }, question.timeLimit * 1000);
  }

  async submitAnswer(playerId: string, answer: string): Promise<void> {
    const gameData = await this.getGameData();
    const player = gameData.players.find(p => p.id === playerId);
    
    if (!player || !player.isAlive || !gameData.currentQuestion) {
      return;
    }

    player.currentAnswer = answer;
    player.lastAnswerTime = Date.now();

    await this.saveGameData(gameData);
  }

  async processAnswers(): Promise<void> {
    const gameData = await this.getGameData();
    
    if (!gameData.currentQuestion) return;

    const alivePlayers = gameData.players.filter(p => p.isAlive);
    const correctAnswer = gameData.currentQuestion.correctAnswer;

    // Process each player's answer
    for (const player of alivePlayers) {
      if (player.currentAnswer === correctAnswer) {
        player.score += this.calculateScore(gameData.timeLeft, gameData.round);
      } else {
        // Wrong answer or no answer = elimination
        player.isAlive = false;
      }
      
      // Clear current answer
      player.currentAnswer = undefined;
    }

    gameData.currentQuestionIndex++;
    gameData.currentQuestion = undefined;

    // Check if we need to advance round or end game
    const stillAlive = gameData.players.filter(p => p.isAlive);
    if (stillAlive.length <= 1) {
      await this.endGame(gameData);
    } else if (gameData.currentQuestionIndex < gameData.questionsTotal) {
      // Continue with next question after delay
      setTimeout(() => this.nextQuestion(gameData), 3000);
    } else {
      // End of round
      gameData.round++;
      gameData.currentQuestionIndex = 0;
      setTimeout(() => this.nextQuestion(gameData), 5000);
    }

    await this.saveGameData(gameData);
  }

  private calculateScore(timeLeft: number, round: number): number {
    const baseScore = 100;
    const timeBonus = Math.floor(timeLeft * 2);
    const roundMultiplier = round;
    
    return baseScore + timeBonus + (roundMultiplier * 10);
  }

  async endGame(gameData?: GameData): Promise<void> {
    if (!gameData) {
      gameData = await this.getGameData();
    }

    const alivePlayers = gameData.players.filter(p => p.isAlive);
    
    // Determine winner
    if (alivePlayers.length === 1) {
      alivePlayers[0].isWinner = true;
    } else if (alivePlayers.length === 0) {
      // No survivors, highest score wins
      const highestScore = Math.max(...gameData.players.map(p => p.score));
      const winner = gameData.players.find(p => p.score === highestScore);
      if (winner) winner.isWinner = true;
    }

    gameData.state = 'finished';
    gameData.finishedAt = Date.now();
    gameData.currentQuestion = undefined;

    await this.saveGameData(gameData);
  }

  async resetGame(): Promise<void> {
    const { redis } = this.context;
    await redis.del(this.gameKey);
    await redis.del(this.playersKey);
  }
}
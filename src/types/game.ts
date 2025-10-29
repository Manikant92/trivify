export type GameState = 'waiting' | 'joined' | 'playing' | 'finished';

export interface Player {
  id: string;
  username: string;
  score: number;
  isAlive: boolean;
  isWinner: boolean;
  joinedAt: number;
  lastAnswerTime?: number;
  currentAnswer?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
}

export interface GameData {
  state: GameState;
  players: Player[];
  currentQuestion?: Question;
  currentQuestionIndex: number;
  questionsTotal: number;
  round: number;
  timeLeft: number;
  startedAt?: number;
  finishedAt?: number;
  totalPlayers: number;
  questionsAnswered: number;
}

export interface GameConfig {
  maxPlayers: number;
  questionsPerRound: number;
  questionTimeLimit: number;
  eliminationRate: number;
}
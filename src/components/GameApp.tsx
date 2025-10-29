import { Devvit, useState } from '@devvit/public-api';

export const GameApp = ({ context }: { context: Devvit.Context }) => {
  const [gameState, setGameState] = useState('waiting');
  const [playerCount, setPlayerCount] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [currentQuestion] = useState('What does "TIL" stand for on Reddit?');
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const joinGame = () => {
    const newPlayerName = `Player${playerCount + 1}`;
    setCurrentPlayer(newPlayerName);
    setPlayerCount(playerCount + 1);
    setGameState('joined');
  };

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(30);
  };

  const selectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === 'Today I Learned') {
      setScore(score + 100 + timeLeft * 2);
    }
    setGameState('finished');
  };

  // Welcome Screen
  if (gameState === 'waiting' || gameState === 'joined') {
    return (
      <vstack height="100%" width="100%" padding="large" gap="medium" alignment="center">
        <text size="xxlarge" weight="bold" color="primary">🎯 Battle Royale Trivia</text>
        <text size="medium" color="secondary">Last player standing wins!</text>
        
        <hstack gap="large" alignment="center">
          <vstack alignment="center" gap="small">
            <text size="large" weight="bold">{playerCount}</text>
            <text size="small" color="secondary">Players</text>
          </vstack>
          <vstack alignment="center" gap="small">
            <text size="large" weight="bold">{round}</text>
            <text size="small" color="secondary">Round</text>
          </vstack>
          <vstack alignment="center" gap="small">
            <text size="large" weight="bold">10</text>
            <text size="small" color="secondary">Questions</text>
          </vstack>
        </hstack>

        {gameState === 'waiting' && (
          <vstack gap="medium" alignment="center" width="100%">
            <text size="medium" weight="bold">Enter the Arena</text>
            <button
              appearance="primary"
              size="large"
              onPress={joinGame}
            >
              Join Battle as Player {playerCount + 1}
            </button>
          </vstack>
        )}

        {gameState === 'joined' && currentPlayer && (
          <vstack gap="medium" alignment="center">
            <text size="medium" color="success">✅ You're in the game, {currentPlayer}!</text>
            <button
              appearance="success"
              size="large"
              onPress={startGame}
            >
              🚀 Start Battle Royale!
            </button>
          </vstack>
        )}

        <vstack gap="small" padding="medium" backgroundColor="neutral-background-weak">
          <text size="small" weight="bold">How to Play:</text>
          <text size="small">• Answer trivia questions correctly to survive</text>
          <text size="small">• Wrong answers eliminate you from the game</text>
          <text size="small">• Last player standing wins the battle!</text>
          <text size="small">• Questions get harder each round</text>
        </vstack>
      </vstack>
    );
  }

  // Game Screen
  if (gameState === 'playing') {
    return (
      <vstack height="100%" width="100%" padding="large" gap="medium">
        <hstack width="100%" alignment="start">
          <vstack alignment="start">
            <text size="large" weight="bold">Round {round}</text>
            <text size="small" color="secondary">{playerCount} players alive</text>
          </vstack>
          <spacer />
          <vstack alignment="end">
            <text size="large" weight="bold" color={timeLeft <= 5 ? 'critical' : 'primary'}>
              ⏰ {timeLeft}s
            </text>
            <text size="small" color="secondary">Time left</text>
          </vstack>
        </hstack>

        <hstack gap="medium" alignment="center" padding="medium" backgroundColor="success-background">
          <text>💚</text>
          <text weight="bold">You're alive! Score: {score}</text>
        </hstack>

        <vstack gap="medium" padding="large" backgroundColor="neutral-background-weak" cornerRadius="medium">
          <text size="large" weight="bold" alignment="center">
            {currentQuestion}
          </text>
          <text size="small" color="secondary" alignment="center">
            Category: Reddit | Difficulty: easy
          </text>
        </vstack>

        <vstack gap="small" width="100%">
          <button 
            appearance="secondary" 
            size="large"
            onPress={() => selectAnswer('Today I Learned')}
          >
            A. Today I Learned
          </button>
          <button 
            appearance="secondary" 
            size="large"
            onPress={() => selectAnswer('This Is Life')}
          >
            B. This Is Life
          </button>
          <button 
            appearance="secondary" 
            size="large"
            onPress={() => selectAnswer('Time Is Limited')}
          >
            C. Time Is Limited
          </button>
          <button 
            appearance="secondary" 
            size="large"
            onPress={() => selectAnswer('Take It Literally')}
          >
            D. Take It Literally
          </button>
        </vstack>

        <vstack gap="small" width="100%">
          <text size="medium" weight="bold">Survivors ({playerCount})</text>
          <hstack gap="small" wrap>
            <hstack gap="small" padding="small" backgroundColor="success-background-weak" cornerRadius="small">
              <text>💚</text>
              <text size="small" weight="bold">{currentPlayer}</text>
              <text size="small" color="secondary">({score})</text>
            </hstack>
          </hstack>
        </vstack>

        <vstack gap="small" width="100%">
          <hstack width="100%" alignment="start">
            <text size="small">Question 1</text>
            <spacer />
            <text size="small">10 total</text>
          </hstack>
          <hstack width="100%" height="4px" backgroundColor="neutral-background">
            <spacer width="10%" backgroundColor="primary" />
          </hstack>
        </vstack>
      </vstack>
    );
  }

  // Results Screen
  if (gameState === 'finished') {
    const isCorrect = selectedAnswer === 'Today I Learned';
    return (
      <vstack height="100%" width="100%" padding="large" gap="large" alignment="center">
        <vstack alignment="center" gap="small">
          <text size="xxlarge">🏆</text>
          <text size="xlarge" weight="bold">Battle Royale Complete!</text>
        </vstack>

        {isCorrect && (
          <vstack alignment="center" gap="medium" padding="large" 
                  backgroundColor="success-background" cornerRadius="medium">
            <text size="large" weight="bold">👑 CHAMPION 👑</text>
            <text size="xlarge" weight="bold">{currentPlayer}</text>
            <text size="medium">Final Score: {score}</text>
            <text size="small" color="secondary">
              Survived {round} rounds of intense trivia!
            </text>
          </vstack>
        )}

        <vstack alignment="center" gap="small" padding="medium"
                backgroundColor={isCorrect ? 'success-background-weak' : 'critical-background-weak'}
                cornerRadius="medium">
          <text size="large" weight="bold">Your Result</text>
          <text size="medium">
            {isCorrect ? '🥇 Rank #1' : '💀 Eliminated'}
          </text>
          <text size="medium">Score: {score}</text>
          <text size="small" color="secondary">
            Your Answer: {selectedAnswer}
          </text>
          <text size="small" color="secondary">
            {isCorrect ? '✅ Correct! You survived!' : '❌ Wrong answer! You were eliminated!'}
          </text>
        </vstack>

        <vstack gap="small" width="100%">
          <text size="large" weight="bold" alignment="center">Final Leaderboard</text>
          <hstack gap="medium" padding="medium"
                  backgroundColor="success-background-weak" cornerRadius="small">
            <text size="medium" weight="bold">🥇</text>
            <text weight="bold">{currentPlayer}</text>
            <spacer />
            <text>{isCorrect ? '💚' : '💀'}</text>
            <text size="medium" weight="bold">{score}</text>
          </hstack>
        </vstack>

        <vstack gap="small" padding="medium" backgroundColor="neutral-background-weak" cornerRadius="medium">
          <text size="medium" weight="bold" alignment="center">Game Statistics</text>
          <hstack gap="large" alignment="center">
            <vstack alignment="center">
              <text size="medium" weight="bold">{playerCount}</text>
              <text size="small" color="secondary">Total Players</text>
            </vstack>
            <vstack alignment="center">
              <text size="medium" weight="bold">{round}</text>
              <text size="small" color="secondary">Rounds Played</text>
            </vstack>
            <vstack alignment="center">
              <text size="medium" weight="bold">1</text>
              <text size="small" color="secondary">Questions</text>
            </vstack>
          </hstack>
        </vstack>

        <vstack gap="small" alignment="center">
          <text size="medium" weight="bold">Want to play again?</text>
          <text size="small" color="secondary">Ask a moderator to start a new Battle Royale!</text>
        </vstack>
      </vstack>
    );
  }

  return (
    <vstack height="100%" width="100%" alignment="center middle">
      <text>Loading game...</text>
    </vstack>
  );
};
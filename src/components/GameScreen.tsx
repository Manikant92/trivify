import { Devvit, useState } from '@devvit/public-api';
import { Player, Question, GameData } from '../types/game.js';

interface GameScreenProps {
  gameData: GameData | null;
  currentPlayer: Player | null;
  timeLeft: number;
  onSubmitAnswer: (answer: string) => Promise<void>;
}

export const GameScreen = ({ 
  gameData, 
  currentPlayer, 
  timeLeft, 
  onSubmitAnswer 
}: GameScreenProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQuestion: Question | undefined = gameData?.currentQuestion;
  const alivePlayers = gameData?.players?.filter((p: Player) => p.isAlive) || [];
  const isPlayerAlive = currentPlayer?.isAlive ?? false;

  const handleSubmitAnswer = async (answer: string) => {
    if (hasAnswered || !isPlayerAlive) return;
    
    setSelectedAnswer(answer);
    setHasAnswered(true);
    await onSubmitAnswer(answer);
  };

  if (!currentQuestion) {
    return (
      <vstack height="100%" width="100%" alignment="center middle">
        <text size="large">Preparing next question...</text>
      </vstack>
    );
  }

  return (
    <vstack height="100%" width="100%" padding="large" gap="medium">
      {/* Header */}
      <hstack width="100%" alignment="start">
        <vstack alignment="start">
          <text size="large" weight="bold">Round {gameData?.round || 1}</text>
          <text size="small" color="secondary">{alivePlayers.length} players alive</text>
        </vstack>
        <spacer />
        <vstack alignment="end">
          <text size="large" weight="bold" color={timeLeft <= 5 ? 'critical' : 'primary'}>
            ⏰ {timeLeft}s
          </text>
          <text size="small" color="secondary">Time left</text>
        </vstack>
      </hstack>

      {/* Player Status */}
      <hstack gap="medium" alignment="center" padding="medium" 
              backgroundColor={isPlayerAlive ? 'success-background' : 'critical-background'}>
        <text>{isPlayerAlive ? '💚' : '💀'}</text>
        <text weight="bold">
          {isPlayerAlive ? `You're alive! Score: ${currentPlayer?.score || 0}` : 'You\'ve been eliminated!'}
        </text>
      </hstack>

      {/* Question */}
      <vstack gap="medium" padding="large" backgroundColor="neutral-background-weak" cornerRadius="medium">
        <text size="large" weight="bold" alignment="center">
          {currentQuestion.question}
        </text>
        
        {currentQuestion.category && (
          <text size="small" color="secondary" alignment="center">
            Category: {currentQuestion.category} | Difficulty: {currentQuestion.difficulty}
          </text>
        )}
      </vstack>

      {/* Answer Options */}
      {isPlayerAlive && !hasAnswered ? (
        <vstack gap="small" width="100%">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              appearance="secondary"
              size="large"
              onPress={() => handleSubmitAnswer(option)}
              disabled={timeLeft <= 0}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </vstack>
      ) : (
        <vstack gap="small" width="100%">
          {currentQuestion.options.map((option, index) => (
            <hstack
              key={index}
              padding="medium"
              backgroundColor={
                hasAnswered && selectedAnswer === option
                  ? 'primary-background'
                  : 'neutral-background-weak'
              }
              cornerRadius="small"
            >
              <text weight={hasAnswered && selectedAnswer === option ? 'bold' : 'normal'}>
                {String.fromCharCode(65 + index)}. {option}
              </text>
            </hstack>
          ))}
          
          {hasAnswered && (
            <text size="medium" color="success" alignment="center">
              ✅ Answer submitted! Waiting for results...
            </text>
          )}
          
          {!isPlayerAlive && (
            <text size="medium" color="critical" alignment="center">
              💀 You're eliminated but can watch the battle continue!
            </text>
          )}
        </vstack>
      )}

      {/* Live Players */}
      <vstack gap="small" width="100%">
        <text size="medium" weight="bold">Survivors ({alivePlayers.length})</text>
        <hstack gap="small" wrap>
          {alivePlayers.map((player: Player) => (
            <hstack key={player.id} gap="small" padding="small" 
                    backgroundColor="success-background-weak" cornerRadius="small">
              <text>💚</text>
              <text size="small" weight={player.id === currentPlayer?.id ? 'bold' : 'normal'}>
                {player.username}
              </text>
              <text size="small" color="secondary">({player.score})</text>
            </hstack>
          ))}
        </hstack>
      </vstack>

      {/* Progress Bar */}
      <vstack gap="small" width="100%">
        <hstack width="100%" alignment="start">
          <text size="small">Question {(gameData?.currentQuestionIndex || 0) + 1}</text>
          <spacer />
          <text size="small">{gameData?.questionsTotal || 10} total</text>
        </hstack>
        <hstack width="100%" height="4px" backgroundColor="neutral-background">
          <spacer 
            width={`${(((gameData?.currentQuestionIndex || 0) + 1) / (gameData?.questionsTotal || 10)) * 100}%`}
            backgroundColor="primary"
          />
        </hstack>
      </vstack>
    </vstack>
  );
};
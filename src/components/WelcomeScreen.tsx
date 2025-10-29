import { Devvit, useState } from '@devvit/public-api';
import { Player, GameData } from '../types/game.js';

interface WelcomeScreenProps {
  gameData: GameData | null;
  currentPlayer: Player | null;
  onJoin: (username: string) => Promise<void>;
  onStart: () => Promise<void>;
  canStart: boolean;
}

export const WelcomeScreen = ({ 
  gameData, 
  currentPlayer, 
  onJoin, 
  onStart, 
  canStart 
}: WelcomeScreenProps) => {
  const [username, setUsername] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    if (!username.trim()) return;
    setIsJoining(true);
    try {
      await onJoin(username.trim());
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <vstack height="100%" width="100%" padding="large" gap="medium" alignment="center">
      {/* Header */}
      <vstack alignment="center" gap="small">
        <text size="xxlarge" weight="bold" color="primary">🎯 Battle Royale Trivia</text>
        <text size="medium" color="secondary">Last player standing wins!</text>
      </vstack>

      {/* Game Stats */}
      <hstack gap="large" alignment="center">
        <vstack alignment="center" gap="small">
          <text size="large" weight="bold">{gameData?.players?.length || 0}</text>
          <text size="small" color="secondary">Players</text>
        </vstack>
        <vstack alignment="center" gap="small">
          <text size="large" weight="bold">{gameData?.round || 0}</text>
          <text size="small" color="secondary">Round</text>
        </vstack>
        <vstack alignment="center" gap="small">
          <text size="large" weight="bold">{gameData?.questionsTotal || 10}</text>
          <text size="small" color="secondary">Questions</text>
        </vstack>
      </hstack>

      {/* Join Section */}
      {!currentPlayer ? (
        <vstack gap="medium" alignment="center" width="100%">
          <text size="medium" weight="bold">Enter the Arena</text>
          <vstack gap="small" width="100%">
            <text size="medium">Username: Player{(gameData?.players?.length || 0) + 1}</text>
            <button
              appearance="primary"
              size="large"
              onPress={() => handleJoin(`Player${(gameData?.players?.length || 0) + 1}`)}
              disabled={isJoining}
            >
              {isJoining ? 'Joining...' : 'Join Battle'}
            </button>
          </vstack>
        </vstack>
      ) : (
        <vstack gap="medium" alignment="center">
          <text size="medium" color="success">✅ You're in the game, {currentPlayer.username}!</text>
          <text size="small" color="secondary">Waiting for game to start...</text>
        </vstack>
      )}

      {/* Players List */}
      {gameData?.players && gameData.players.length > 0 && (
        <vstack gap="small" width="100%">
          <text size="medium" weight="bold" alignment="center">Players in Game</text>
          <vstack gap="small" maxHeight="200px">
            {gameData.players.map((player: Player) => (
              <hstack key={player.id} gap="medium" alignment="center">
                <text>{player.isAlive ? '💚' : '💀'}</text>
                <text weight={player.id === currentPlayer?.id ? 'bold' : 'normal'}>
                  {player.username}
                </text>
                <spacer />
                <text size="small" color="secondary">Score: {player.score}</text>
              </hstack>
            ))}
          </vstack>
        </vstack>
      )}

      {/* Start Game Button */}
      {currentPlayer && canStart && (
        <button
          appearance="success"
          size="large"
          onPress={onStart}
        >
          🚀 Start Battle Royale!
        </button>
      )}

      {/* Rules */}
      <vstack gap="small" padding="medium" backgroundColor="neutral-background-weak">
        <text size="small" weight="bold">How to Play:</text>
        <text size="small">• Answer trivia questions correctly to survive</text>
        <text size="small">• Wrong answers eliminate you from the game</text>
        <text size="small">• Last player standing wins the battle!</text>
        <text size="small">• Questions get harder each round</text>
      </vstack>
    </vstack>
  );
};
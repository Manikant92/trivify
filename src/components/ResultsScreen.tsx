import { Devvit } from '@devvit/public-api';
import { Player, GameData } from '../types/game.js';

interface ResultsScreenProps {
  gameData: GameData | null;
  currentPlayer: Player | null;
}

export const ResultsScreen = ({ gameData, currentPlayer }: ResultsScreenProps) => {
  const winner = gameData?.players?.find((p: Player) => p.isWinner);
  const sortedPlayers = [...(gameData?.players || [])].sort((a, b) => b.score - a.score);
  const playerRank = sortedPlayers.findIndex(p => p.id === currentPlayer?.id) + 1;

  return (
    <vstack height="100%" width="100%" padding="large" gap="large" alignment="center">
      {/* Header */}
      <vstack alignment="center" gap="small">
        <text size="xxlarge">🏆</text>
        <text size="xlarge" weight="bold">Battle Royale Complete!</text>
      </vstack>

      {/* Winner Announcement */}
      {winner && (
        <vstack alignment="center" gap="medium" padding="large" 
                backgroundColor="success-background" cornerRadius="medium">
          <text size="large" weight="bold">👑 CHAMPION 👑</text>
          <text size="xlarge" weight="bold">{winner.username}</text>
          <text size="medium">Final Score: {winner.score}</text>
          <text size="small" color="secondary">
            Survived {gameData?.round || 0} rounds of intense trivia!
          </text>
        </vstack>
      )}

      {/* Player's Result */}
      {currentPlayer && (
        <vstack alignment="center" gap="small" padding="medium"
                backgroundColor={playerRank <= 3 ? 'success-background-weak' : 'neutral-background-weak'}
                cornerRadius="medium">
          <text size="large" weight="bold">Your Result</text>
          <text size="medium">
            {playerRank === 1 ? '🥇' : playerRank === 2 ? '🥈' : playerRank === 3 ? '🥉' : '🎯'} 
            Rank #{playerRank}
          </text>
          <text size="medium">Score: {currentPlayer.score}</text>
          <text size="small" color="secondary">
            {currentPlayer.isAlive ? 'Survived to the end!' : 'Eliminated in battle'}
          </text>
        </vstack>
      )}

      {/* Leaderboard */}
      <vstack gap="small" width="100%">
        <text size="large" weight="bold" alignment="center">Final Leaderboard</text>
        <vstack gap="small" maxHeight="300px">
          {sortedPlayers.map((player: Player, index: number) => (
            <hstack key={player.id} gap="medium" padding="medium"
                    backgroundColor={
                      index === 0 ? 'success-background-weak' :
                      index <= 2 ? 'primary-background-weak' :
                      player.id === currentPlayer?.id ? 'secondary-background-weak' :
                      'neutral-background-weak'
                    }
                    cornerRadius="small">
              <text size="medium" weight="bold">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
              </text>
              <text weight={player.id === currentPlayer?.id ? 'bold' : 'normal'}>
                {player.username}
              </text>
              <spacer />
              <text>{player.isAlive ? '💚' : '💀'}</text>
              <text size="medium" weight="bold">{player.score}</text>
            </hstack>
          ))}
        </vstack>
      </vstack>

      {/* Game Stats */}
      <vstack gap="small" padding="medium" backgroundColor="neutral-background-weak" cornerRadius="medium">
        <text size="medium" weight="bold" alignment="center">Game Statistics</text>
        <hstack gap="large" alignment="center">
          <vstack alignment="center">
            <text size="medium" weight="bold">{gameData?.totalPlayers || 0}</text>
            <text size="small" color="secondary">Total Players</text>
          </vstack>
          <vstack alignment="center">
            <text size="medium" weight="bold">{gameData?.round || 0}</text>
            <text size="small" color="secondary">Rounds Played</text>
          </vstack>
          <vstack alignment="center">
            <text size="medium" weight="bold">{gameData?.questionsAnswered || 0}</text>
            <text size="small" color="secondary">Questions</text>
          </vstack>
        </hstack>
      </vstack>

      {/* Play Again */}
      <vstack gap="small" alignment="center">
        <text size="medium" weight="bold">Want to play again?</text>
        <text size="small" color="secondary">Ask a moderator to start a new Battle Royale!</text>
      </vstack>

      {/* Share Results */}
      <vstack gap="small" alignment="center" padding="medium" backgroundColor="primary-background-weak" cornerRadius="medium">
        <text size="small" weight="bold">🎯 Battle Royale Trivia Results 🎯</text>
        <text size="small">
          Champion: {winner?.username || 'Unknown'} | 
          {gameData?.totalPlayers || 0} players | 
          {gameData?.round || 0} rounds
        </text>
        <text size="small" color="secondary">
          Share this epic battle with your friends!
        </text>
      </vstack>
    </vstack>
  );
};
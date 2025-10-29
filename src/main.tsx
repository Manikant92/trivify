import { Devvit } from '@devvit/public-api';
import { GameApp } from './components/GameApp.js';

// Configure the app
Devvit.configure({
  redditAPI: true,
  redis: true,
  realtime: true,
});

// Add menu action for creating game posts
Devvit.addMenuItem({
  label: 'Start Battle Royale Trivia',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    
    const subreddit = await reddit.getCurrentSubreddit();
    
    await reddit.submitPost({
      title: '🎯 Battle Royale Trivia - Join the Fight!',
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large" weight="bold">🎯 Battle Royale Trivia</text>
          <text>Click to join the ultimate trivia showdown!</text>
          <text size="small">Last player standing wins!</text>
        </vstack>
      ),
    });
    
    ui.showToast({ text: 'Battle Royale Trivia game created!' });
  },
});

// Main app component
Devvit.addCustomPostType({
  name: 'Battle Royale Trivia',
  height: 'tall',
  render: (context) => {
    return <GameApp context={context} />;
  },
});

export default Devvit;
# 🚀 Deployment Guide - Reddit Battle Royale Trivia

## Prerequisites

1. **Install Node.js 18+**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version` and `npm --version`

2. **Install Devvit CLI**
   ```bash
   npm install -g devvit
   ```

3. **Reddit Developer Account**
   - Go to [developer.reddit.com](https://developer.reddit.com)
   - Sign in with your Reddit account
   - Accept developer terms

## Step-by-Step Deployment

### 1. Project Setup
```bash
# Clone your repository
git clone <your-repo-url>
cd reddit-battle-royale-trivia

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Login to Reddit
```bash
devvit login
```
- This opens a browser window
- Authorize the Devvit CLI
- Return to terminal when complete

### 3. Upload Your App
```bash
devvit upload
```
- Choose a unique app name
- Add description: "Battle Royale Trivia - Last player standing wins!"
- Confirm upload

### 4. Install on Subreddit

**Option A: Via Developer Portal**
1. Go to [developer.reddit.com](https://developer.reddit.com)
2. Find your "reddit-battle-royale-trivia" app
3. Click "Install"
4. Select your subreddit
5. Grant permissions:
   - ✅ Redis (for game state)
   - ✅ Scheduler (for timers)
   - ✅ Realtime (for updates)

**Option B: Via CLI**
```bash
devvit install <your-subreddit-name>
```

### 5. Create Your First Game

1. **Go to your subreddit**
2. **Look for the menu action**:
   - On desktop: Three dots menu → "Start Battle Royale Trivia"
   - On mobile: Menu → "Start Battle Royale Trivia"
3. **Click it** - this creates a new game post
4. **Share the post** with friends to test multiplayer

### 6. Test Community Play

**For Hackathon Judging:**
1. Create a public post in your subreddit
2. Share the direct link: `https://reddit.com/r/yoursubreddit/comments/[post_id]`
3. Have multiple people join simultaneously
4. Document the multiplayer experience

## Troubleshooting

### Common Issues

**"Cannot find module '@devvit/public-api'"**
```bash
npm install @devvit/public-api@latest
```

**"Permission denied" during upload**
```bash
devvit login
# Re-authenticate and try again
```

**"App already exists"**
```bash
devvit upload --force
# Or change the app name in devvit.yaml
```

**Game not appearing in subreddit**
- Check app is installed on correct subreddit
- Verify permissions were granted
- Try refreshing the page

### Development Commands

```bash
# Start development server
npm run dev

# Check for errors
npm run lint

# Build for production
npm run build

# Upload to Reddit
devvit upload
```

## Hackathon Submission Checklist

### Required Files ✅
- [x] `devvit.yaml` - App configuration
- [x] `package.json` - Dependencies
- [x] `src/main.tsx` - Entry point
- [x] `README.md` - Documentation
- [x] `LICENSE` - MIT license
- [x] `.kiro/` directory - Kiro usage proof

### Community Play Features ✅
- [x] Multiplayer support (unlimited players)
- [x] Real-time synchronous gameplay
- [x] Elimination mechanics
- [x] Spectator mode
- [x] Leaderboard and scoring

### Polish Requirements ✅
- [x] Custom splash screen
- [x] Responsive design
- [x] Error handling
- [x] Loading states
- [x] Professional UI/UX

### Submission Materials
1. **App Listing**: Link from developer.reddit.com
2. **Demo Post**: Public post showing community play
3. **Repository**: Public GitHub repo with .kiro directory
4. **Kiro Documentation**: `KIRO_DEVELOPER_EXPERIENCE.md`

## Demo Post Template

When creating your demo post, use this template:

```
🎯 **Battle Royale Trivia - Join the Ultimate Showdown!**

Test our hackathon submission! This is a massively multiplayer trivia game where wrong answers eliminate you instantly.

**How to Play:**
1. Click the game below
2. Enter your username
3. Wait for other players
4. Answer questions quickly and correctly
5. Be the last player standing!

**Features:**
- Real-time multiplayer
- Progressive difficulty
- Instant elimination
- Live leaderboard
- Mobile responsive

Built for the Reddit x Kiro Hackathon 2025. Let's see who survives! 🏆
```

## Support

- **Issues**: Create GitHub issues
- **Reddit**: Post in r/DevvitPlatform
- **Discord**: Join Reddit Developer Community

Good luck with your hackathon submission! 🎯🏆
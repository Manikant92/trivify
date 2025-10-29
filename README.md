# 🎯 Reddit Battle Royale Trivia

A massively multiplayer trivia battle royale game built for Reddit's Developer Platform using Devvit Web. Last player standing wins!

## 🎮 Game Features

- **Massively Multiplayer**: Unlimited players can join each battle
- **Elimination Gameplay**: Wrong answers eliminate players instantly
- **Progressive Difficulty**: Questions get harder as rounds advance
- **Real-time Updates**: Live player status, timers, and eliminations
- **Spectator Mode**: Eliminated players can watch the battle continue
- **Smart Scoring**: Points for speed and accuracy with round multipliers
- **Mobile Responsive**: Perfect experience on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Reddit Developer Account
- Devvit CLI installed globally

### Installation

1. **Clone and Install**
```bash
git clone <your-repo-url>
cd reddit-battle-royale-trivia
npm install
```

2. **Install Devvit CLI**
```bash
npm install -g devvit
```

3. **Login to Reddit**
```bash
devvit login
```

### Development

1. **Start Development Server**
```bash
npm run dev
```

2. **Build for Production**
```bash
npm run build
```

3. **Run Tests and Linting**
```bash
npm test
npm run lint
```

## 📦 Deployment to Reddit

### Step 1: Upload Your App
```bash
devvit upload
```

### Step 2: Install on Subreddit
1. Go to [developer.reddit.com](https://developer.reddit.com)
2. Find your uploaded app
3. Click "Install" and select your subreddit
4. Grant necessary permissions (Redis, Scheduler, Realtime)

### Step 3: Create Game Post
1. Go to your subreddit
2. Use the "Start Battle Royale Trivia" menu action
3. Or create a custom post with your app

### Step 4: Test Community Play
1. Share the post link with friends
2. Have multiple people join simultaneously
3. Test the elimination mechanics
4. Verify real-time updates work

## 🎯 How to Play

1. **Join**: Enter your username to join the battle
2. **Wait**: Game starts when 2+ players join
3. **Answer**: Choose correct answers quickly for bonus points
4. **Survive**: Wrong answers eliminate you instantly
5. **Win**: Be the last player standing!

## 🏗️ Architecture

### Components
- `GameApp`: Main game orchestrator
- `WelcomeScreen`: Player joining and waiting room
- `GameScreen`: Active gameplay with questions
- `ResultsScreen`: Final leaderboard and stats

### Services
- `GameService`: Core game logic and Redis operations
- `QuestionBank`: Question management and selection

### Data Flow
- Redis stores game state and player data
- Scheduler handles question timers
- Real-time updates via polling

## 🛠️ Kiro Developer Experience

This project showcases advanced Kiro usage:

### Specs Used
- **Feature Planning**: `/kiro/specs/battle-royale-trivia-spec.md`
- **Requirements Documentation**: Complete game specification
- **Implementation Guidance**: Technical architecture decisions

### Hooks Implemented
- **Auto Test on Save**: Runs tests when TypeScript files change
- **Deploy Check**: Pre-deployment validation checklist
- **Code Quality**: Automated linting and formatting

### Steering Files
- **Development Standards**: TypeScript and React best practices
- **Hackathon Optimization**: Winning strategy guidelines
- **Performance Guidelines**: Redis and platform optimization

### Kiro Impact on Development
1. **Faster Feature Planning**: Specs helped structure complex multiplayer logic
2. **Quality Assurance**: Hooks caught issues before deployment
3. **Consistent Standards**: Steering files ensured code quality
4. **Rapid Prototyping**: AI assistance accelerated development cycles
5. **Documentation**: Auto-generated docs from specs and code

## 📊 Game Statistics

- **Question Categories**: Reddit, Science, History, Technology, General
- **Difficulty Levels**: Easy (15s) → Medium (20s) → Hard (30s+)
- **Scoring System**: Base 100 + Time Bonus + Round Multiplier
- **Elimination Rate**: Immediate elimination for wrong answers

## 🏆 Hackathon Submission

### Community Play Features
- ✅ Massively multiplayer (unlimited players)
- ✅ Real-time synchronous gameplay
- ✅ Spectator mode for eliminated players
- ✅ Viral sharing potential
- ✅ Community building through competition

### Technical Excellence
- ✅ TypeScript for type safety
- ✅ Responsive mobile-first design
- ✅ Efficient Redis operations
- ✅ Proper error handling
- ✅ Scheduler-based game mechanics

### Polish Level
- ✅ Custom splash screen
- ✅ Loading states and transitions
- ✅ Comprehensive error handling
- ✅ Beta-ready functionality
- ✅ Professional UI/UX

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes following our coding standards
4. Test thoroughly
5. Submit pull request

## 📞 Support

- Reddit: [r/YourSubreddit](https://reddit.com/r/YourSubreddit)
- Issues: GitHub Issues
- Discord: Reddit Developer Community

---

Built with ❤️ for the Reddit x Kiro Hackathon 2025
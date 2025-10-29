# 🔧 Troubleshooting Guide - Game Not Appearing in Posts

## Common Issues and Solutions

### Issue 1: Game Not Showing in Posts

**Symptoms:**
- Menu action creates a post but no interactive game appears
- Post shows as regular text post instead of custom app

**Solutions:**

#### A. Check App Installation
1. Go to https://developers.reddit.com/apps/trivify
2. Click "Install" 
3. Select your subreddit
4. Ensure all permissions are granted:
   - ✅ Redis
   - ✅ Scheduler  
   - ✅ Realtime

#### B. Verify Post Creation Method
The menu action should create a **custom post type**, not a regular post.

**Correct Method:**
1. Go to your subreddit (r/trivify_dev or your own)
2. Look for "Start Battle Royale Trivia" in:
   - Desktop: Three dots menu (⋯) in subreddit
   - Mobile: Menu button
3. Click it - this creates a custom post with the game

**Wrong Method:**
- Don't create a regular text/link post
- Don't try to embed the game manually

#### C. Alternative Post Creation
If menu action doesn't work, try creating a post manually:

1. Go to your subreddit
2. Click "Create Post"
3. Look for "Battle Royale Trivia" in post type options
4. Select it and create

### Issue 2: Menu Action Not Visible

**Possible Causes:**
- App not installed on subreddit
- Insufficient permissions
- Browser cache issues

**Solutions:**
1. **Reinstall the app:**
   ```bash
   devvit install your-subreddit-name
   ```

2. **Clear browser cache and refresh**

3. **Check moderator permissions:**
   - You must be a moderator of the subreddit
   - App installation requires mod permissions

### Issue 3: Game Shows But Doesn't Work

**Symptoms:**
- Game interface appears but buttons don't work
- Loading states don't change
- No interactivity

**Solutions:**
1. **Check browser console for errors**
2. **Try different browser/device**
3. **Verify app permissions were granted during installation**

### Issue 4: Testing the Game

**Step-by-Step Test:**

1. **Go to playtest subreddit:** https://www.reddit.com/r/trivify_dev

2. **Create game post:**
   - Look for menu action "Start Battle Royale Trivia"
   - Click it to create a post

3. **Test the game:**
   - Click "Join Battle as Player 1"
   - Click "🚀 Start Battle Royale!"
   - Answer the trivia question
   - See results screen

4. **Expected Flow:**
   ```
   Waiting Screen → Joined Screen → Playing Screen → Results Screen
   ```

### Issue 5: For Hackathon Demo

**Create Public Demo Post:**

1. **Install on your main subreddit:**
   ```bash
   devvit install your-subreddit-name
   ```

2. **Create demo post with description:**
   ```
   🎯 Battle Royale Trivia - Hackathon Demo
   
   Test our Reddit x Kiro Hackathon submission! 
   This is a multiplayer trivia game where wrong answers eliminate you.
   
   Click the game below to play!
   ```

3. **Share the direct post URL for judging**

## Debug Commands

```bash
# Check app status
devvit list apps

# Check installations  
devvit list installs your-subreddit-name

# View app logs
devvit logs your-subreddit-name

# Reinstall if needed
devvit uninstall your-subreddit-name
devvit install your-subreddit-name
```

## Still Not Working?

### Quick Fix - Simplified Version
If the current version has issues, here's a minimal working version:

1. **Create a simple test post manually**
2. **Use the playtest subreddit for initial testing**
3. **Check Reddit Developer Discord for support**

### Contact Support
- **Reddit Developer Discord:** Join for live support
- **Developer Portal:** https://developers.reddit.com/apps/trivify
- **GitHub Issues:** Create issue in your repository

## Expected Behavior

**✅ Working Game Should:**
- Appear as interactive post (not regular text)
- Show "🎯 Battle Royale Trivia" title
- Have clickable "Join Battle" button
- Progress through game states
- Show results at the end

**❌ Not Working If:**
- Shows as regular text post
- No interactive elements
- Buttons don't respond
- Stuck on loading screen

The game is uploaded and should work. The most common issue is app installation - make sure it's properly installed on your subreddit with all permissions granted!
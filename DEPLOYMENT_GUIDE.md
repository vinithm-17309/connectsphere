# ConnectSphere - Deployment & GitHub Setup Guide

This guide walks you through connecting your ConnectSphere project to GitHub and deploying it to Vercel.

## Step 1: Prepare Your Project

Your ConnectSphere project is now ready! It includes:
- ✅ Complete Instagram clone with all features
- ✅ User authentication system
- ✅ Social feed with likes and comments
- ✅ Post creation with image selection
- ✅ User suggestions and discovery
- ✅ Responsive design

## Step 2: Connect to GitHub

### Option A: Using v0 Dashboard

1. **In the v0 Chat Sidebar**
   - Look for the **Git** section in the left sidebar
   - If no repository is connected, you'll see a GitHub icon
   - Click it to authorize v0 with your GitHub account

2. **Create a New Repository**
   - Follow the prompts to create a new GitHub repository
   - v0 will automatically push your ConnectSphere code
   - Your repository is now synced!

### Option B: Manual GitHub Setup

If you prefer to do it manually:

1. **Create a New Repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Name it `connectsphere`
   - Choose public or private
   - Don't add README, .gitignore, or license yet
   - Click "Create repository"

2. **Initialize Git Locally**
   ```bash
   cd connectsphere
   git init
   git add .
   git commit -m "Initial commit: ConnectSphere Instagram clone"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/connectsphere.git
   git push -u origin main
   ```

3. **Connect to v0**
   - In v0 sidebar, go to Settings
   - Click "Connect GitHub Repository"
   - Select your `connectsphere` repository
   - Click "Connect"

## Step 3: Deploy to Vercel

### Option A: Using v0 Publish Button

1. **Click "Publish"**
   - Look for the "Publish" button in the top-right corner of v0
   - This creates a new Vercel project and deploys your app
   - You'll get a live URL instantly!

### Option B: Deploy from GitHub

1. **Go to Vercel.com**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub account
   - Click "New Project"

2. **Import Your Repository**
   - Select your `connectsphere` repository
   - Click "Import"
   - Keep default settings
   - Click "Deploy"

3. **Wait for Deployment**
   - Vercel builds and deploys your app
   - Get your live URL (e.g., `https://connectsphere.vercel.app`)
   - App is now live! 🎉

## Step 4: Making Updates

### Push Changes from v0

1. **Make changes in v0**
2. **In Git sidebar:**
   - See your changes listed
   - Write a commit message
   - Click "Commit and push"
   - Changes go to GitHub automatically

### Auto-Deploy on GitHub Push

Once deployed to Vercel:
- Every push to `main` branch auto-deploys
- Vercel builds and publishes changes
- Your live site updates automatically
- No manual deployment needed!

### Create a Feature Branch

For safe testing before production:

1. **In v0 Git sidebar:**
   - Click the branch dropdown
   - Click "Create new branch"
   - Name it `feature/your-feature`
   - Make changes and commit

2. **Create Pull Request:**
   - In Git sidebar, click "Create Pull Request"
   - Review changes
   - Click "Merge" when ready
   - GitHub merges to main
   - Vercel auto-deploys

## Step 5: Monitor Your Deployment

### View Deployment Status

1. **On Vercel Dashboard**
   - Click your project
   - See deployment history
   - View logs if needed

2. **In v0 Git Section**
   - See recent commits
   - View push/pull history
   - Manage branches

## Step 6: Customize Your Domain (Optional)

### Add Custom Domain

1. **On Vercel Project Page**
   - Go to Settings → Domains
   - Click "Add Domain"
   - Enter your custom domain
   - Follow DNS instructions
   - Wait for verification

2. **Update GitHub**
   - Your site is now at your custom domain!
   - Share the URL with everyone!

## Project Features & Demo

### Login
- **No email verification needed!**
- Try username: `demo`, password: `anything`
- Instant profile with avatar generation

### Main Feed
- Multiple posts from different users
- Like/unlike functionality
- Comment on posts
- Share posts
- Save to bookmarks

### Create Posts
- Click "Create Post" in sidebar
- Choose an image from gallery
- Add a caption
- Post appears instantly

### User Discovery
- Suggestions for users to follow
- Search functionality
- View follower counts
- Follow/unfollow users

### User Profiles
- Auto-generated avatars
- Follower/following stats
- Post count
- Bio section

## Environment Variables

ConnectSphere works **completely offline** - no backend needed!

All data is stored locally in the browser:
- User accounts in localStorage
- Posts in React Context
- Avatars from DiceBear API (free, no key needed)

No environment variables to set up! 🎉

## Troubleshooting

### Deployment Failed?

1. **Check the logs:**
   - On Vercel, click "Deployments"
   - View the failed deployment logs
   - Common issues:
     - TypeScript errors
     - Missing dependencies
     - Build configuration

2. **Try these fixes:**
   ```bash
   # Clear cache and rebuild
   rm -rf .next
   pnpm install
   pnpm build
   ```

3. **Stuck?**
   - Visit [vercel.com/help](https://vercel.com/help)
   - Open a support ticket
   - Check GitHub issues

### GitHub Connection Issues?

1. **Reconnect v0 GitHub:**
   - In Settings, disconnect GitHub
   - Re-authorize v0 with GitHub
   - Reconnect your repository

2. **Manual connection:**
   - Use GitHub CLI: `gh repo create`
   - Or create on GitHub.com manually
   - Push code with git commands

## Next Steps

### Enhance Your Project

1. **Add Real Backend**
   - Integrate Supabase for real user accounts
   - Use Firebase for cloud storage
   - Add PostgreSQL database

2. **Advanced Features**
   - Real-time messaging with Socket.io
   - Image upload to cloud storage
   - Email verification
   - Password reset flows
   - Two-factor authentication

3. **Monetization**
   - Add Stripe for payments
   - Implement premium features
   - Ad integration

### Share Your App

1. **Get your Vercel URL**
   - Share with friends
   - Add to portfolio
   - Demo on social media

2. **GitHub Star**
   - Let others use your code
   - Accept contributions
   - Build a community

## Quick Reference

### Important URLs
- **Your Vercel App**: `https://connectsphere.vercel.app` (or your domain)
- **GitHub Repository**: `https://github.com/YOUR_USERNAME/connectsphere`
- **Vercel Dashboard**: `https://vercel.com/dashboard`
- **GitHub Settings**: `https://github.com/settings/apps/authorized-oauth-apps`

### Key Commands
```bash
# Development
pnpm dev          # Start local server
pnpm build        # Build for production
pnpm start        # Start production server

# Git
git status        # Check changes
git add .         # Stage changes
git commit -m ""  # Commit with message
git push          # Push to GitHub
git pull          # Pull from GitHub
```

### Vercel Features
- Auto-scaling
- Global CDN
- Automatic SSL
- Environment variables
- Analytics
- Speed insights
- Error tracking
- Real-time logs

---

## Success! 🎉

You now have:
- ✅ ConnectSphere running locally
- ✅ GitHub repository with version control
- ✅ Live deployment on Vercel
- ✅ Automatic deployments on every push
- ✅ Custom domain (optional)

**Share your project and start building!**

For questions or issues, check the [README.md](./README.md) or visit:
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Help](https://docs.github.com)
- [Next.js Docs](https://nextjs.org/docs)

---

Made with ❤️ using v0

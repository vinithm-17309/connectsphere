# 🔗 GitHub & Vercel Integration Setup

Connect your ConnectSphere app to GitHub and deploy to Vercel in minutes.

## Prerequisites

- GitHub account (free at github.com)
- Vercel account (free at vercel.com)
- Your ConnectSphere project files

---

## Part 1: GitHub Setup

### Step 1: Create GitHub Repository

1. **Go to GitHub**
   - Visit https://github.com
   - Sign in to your account
   - Click the **+** icon → "New repository"

2. **Configure Repository**
   - Name: `connectsphere`
   - Description: "Instagram clone built with Next.js"
   - Visibility: Public (so Vercel can access it)
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

3. **Copy the Repository URL**
   - You'll see: `https://github.com/YOUR_USERNAME/connectsphere.git`
   - Copy this URL for next steps

### Step 2: Push Code to GitHub

**Option A: Using Command Line (Recommended)**

```bash
# Navigate to your project folder
cd connectsphere

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ConnectSphere Instagram clone"

# Set main branch
git branch -M main

# Add remote (replace with your URL from Step 1)
git remote add origin https://github.com/YOUR_USERNAME/connectsphere.git

# Push code
git push -u origin main
```

**Option B: Using GitHub Desktop**

1. Download GitHub Desktop from desktop.github.com
2. Click "File" → "New repository"
3. Select your project folder
4. Set name to `connectsphere`
5. Click "Create"
6. Click "Publish repository"
7. Select "Public"
8. Click "Publish Repository"

**Option C: Using VS Code**

1. Open project in VS Code
2. Click Source Control icon (left sidebar)
3. Click "Initialize Repository"
4. Stage files: Click `+` next to "Changes"
5. Commit: Type message, press Ctrl+Enter
6. Click "..." → "Add Remote"
7. Enter repository URL
8. Click "Push" to upload

### Verify GitHub Setup

- Go to https://github.com/YOUR_USERNAME/connectsphere
- You should see all your project files
- View the code online
- See commit history

---

## Part 2: Vercel Deployment

### Step 1: Connect Vercel Account

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access GitHub
   - Vercel creates account and connects GitHub

2. **Grant Repository Access**
   - Vercel requests access to GitHub
   - Click "Authorize Vercel"
   - Select "All repositories" or specific repo
   - Confirm authorization

### Step 2: Import and Deploy Project

1. **Create New Project**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"

2. **Select Your Repository**
   - Search for `connectsphere`
   - Click on your repository
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `connectsphere` (default)
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `.` (default)
   - **Build Command**: `pnpm build` (auto-detected)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install` (auto-detected)
   - Click "Deploy"

4. **Wait for Deployment**
   - Vercel builds your project
   - Shows build progress
   - Deploys when complete
   - Provides live URL (e.g., `https://connectsphere.vercel.app`)

### Step 3: Access Your Live App

- ✅ Your app is now live!
- 🌐 Visit the Vercel URL
- 📱 Test all features
- 🔗 Share the link

### Verify Deployment

- Go to your Vercel URL
- Login with "demo" / any password
- Test creating posts
- Try liking posts
- Verify all features work

---

## Part 3: Automatic Deployments

### Enable Auto-Deploy

Once connected, **automatic deployments are enabled by default**!

**How it works:**
1. You push code to GitHub
2. GitHub notifies Vercel
3. Vercel automatically builds
4. New version deployed within 1-2 minutes
5. Your site updates automatically

**No manual deployment needed!**

### Make Updates

```bash
# Make changes to your code
# Example: Edit components/auth-form.tsx

# Stage changes
git add .

# Commit
git commit -m "Update: Improved login form"

# Push to GitHub
git push

# Vercel automatically deploys!
# Check status at https://vercel.com/dashboard
```

### Monitor Deployments

1. **Visit Vercel Dashboard**
   - https://vercel.com/dashboard
   - Click your `connectsphere` project
   - See deployment history
   - View logs if needed

2. **Check Status**
   - ✅ Green = Deployed successfully
   - 🔄 Blue = Currently deploying
   - ❌ Red = Deployment failed (check logs)

---

## Part 4: Use v0 Integration (Optional)

### Connect v0 to GitHub

If you have a v0 project:

1. **In v0 Sidebar**
   - Look for "Git" section
   - Click GitHub icon
   - Authorize v0 with GitHub
   - Select your `connectsphere` repo

2. **Auto-Sync Code**
   - Changes in v0 auto-push to GitHub
   - Vercel auto-deploys on push
   - No manual git commands needed

3. **Pull Changes**
   - Fetch latest from GitHub
   - See commit history
   - Create pull requests
   - Merge branches

### Create Feature Branches

```bash
# Create new branch
git checkout -b feature/my-feature

# Make changes
# Stage and commit
git add .
git commit -m "Add feature: ..."

# Push to GitHub
git push -u origin feature/my-feature

# Create Pull Request on GitHub
# Review and merge when ready
```

---

## Part 5: Custom Domain (Optional)

### Add Your Custom Domain

1. **Prepare Domain**
   - Buy domain from GoDaddy, Namecheap, etc.
   - OR use free domain from Freenom

2. **Connect to Vercel**
   - Go to Vercel project settings
   - Click "Domains"
   - Click "Add"
   - Enter your domain (e.g., `myconnectsphere.com`)
   - Choose DNS or nameserver option

3. **Update DNS Records**
   - Vercel provides DNS instructions
   - Update records with your domain provider
   - Wait for DNS propagation (1-24 hours)
   - Domain is now active!

### Custom Domain Examples

- `myconnectsphere.com`
- `connectsphere.dev`
- `myinstagram.app`
- `socialhub.io`

---

## Part 6: Environment Variables

### Current Project

**Great news!** This project needs **NO environment variables**!

- All data stored locally
- No API keys needed
- No secrets required
- Works out of the box

### For Future Enhancements

If you add backend services:

1. **In Vercel Dashboard**
   - Project → Settings
   - Environment Variables
   - Add key-value pairs

2. **Example:**
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   DATABASE_URL=postgresql://...
   SECRET_KEY=your-secret-key
   ```

3. **In Code:**
   ```javascript
   const apiUrl = process.env.NEXT_PUBLIC_API_URL
   const dbUrl = process.env.DATABASE_URL
   ```

---

## Part 7: Managing Your Project

### Common Tasks

#### Update Your App
```bash
# Make changes
git add .
git commit -m "Update: description"
git push
# Vercel auto-deploys!
```

#### Add Collaborators (GitHub)
1. Go to repository settings
2. Click "Collaborators"
3. Add GitHub usernames
4. They can push changes

#### View Analytics (Vercel)
1. Go to Vercel dashboard
2. Click your project
3. See Analytics tab
4. View visitors, performance, etc.

#### Disable Deployment
1. Vercel Dashboard → Settings
2. Git → Unlink Repository
3. Project no longer auto-deploys

#### Delete Project
1. Vercel Dashboard → Settings
2. Scroll to bottom
3. Click "Delete Project"
4. Confirm deletion

---

## Part 8: Troubleshooting

### Deployment Failed?

**Check Logs:**
1. Vercel Dashboard → Deployments
2. Click failed deployment
3. Click "View Logs"
4. Look for error messages

**Common Issues:**
- Missing dependencies: Check `package.json`
- Build errors: Check console output
- TypeScript errors: Fix type issues in code
- Port issues: Vercel assigns PORT automatically

**Fix & Redeploy:**
```bash
# Fix the issue locally
# Test: pnpm dev

# Push fixed code
git add .
git commit -m "Fix: deployment error"
git push

# Vercel auto-redeploys
```

### GitHub Connection Issues?

**Reconnect:**
1. Vercel Settings → Git
2. Disconnect GitHub
3. Click "Connect GitHub"
4. Re-authorize
5. Select repository again

### Code Not Updating?

**Hard Refresh Browser:**
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Clear Browser Cache:**
- DevTools → Application → Storage
- Click "Clear site data"
- Refresh page

### Still Have Issues?

**Get Help:**
- Vercel Support: https://vercel.com/support
- GitHub Help: https://docs.github.com
- Check logs in Vercel dashboard
- Search error message online

---

## Part 9: Important URLs

### Your Project URLs
| Item | URL |
|------|-----|
| **Live App** | `https://connectsphere.vercel.app` |
| **GitHub Repo** | `https://github.com/YOUR_USERNAME/connectsphere` |
| **Vercel Project** | `https://vercel.com/dashboard/projects/connectsphere` |
| **Local Dev** | `http://localhost:3000` |

### Account Links
| Service | URL |
|---------|-----|
| **GitHub** | https://github.com |
| **Vercel** | https://vercel.com |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **GitHub Settings** | https://github.com/settings |

---

## Part 10: Quick Reference

### Git Commands
```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin <URL>
git push -u origin main

# Regular updates
git add .
git commit -m "Your message"
git push

# Check status
git status
git log

# Create branch
git checkout -b feature/name
git push -u origin feature/name
```

### Important Files
| File | Purpose |
|------|---------|
| `.gitignore` | Files git ignores |
| `package.json` | Dependencies |
| `next.config.js` | Next.js config |
| `.env.local` | Local environment vars |
| `.env.production` | Production vars |

### Vercel Dashboard Sections
| Section | Purpose |
|---------|---------|
| **Deployments** | View deployment history |
| **Analytics** | See visitor stats |
| **Settings** | Configure project |
| **Domains** | Add custom domain |
| **Environment** | Set env variables |

---

## Success Checklist ✅

- [ ] GitHub account created
- [ ] Repository created at github.com
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Live app deployed
- [ ] App working at Vercel URL
- [ ] Auto-deploy enabled
- [ ] Can make updates and push
- [ ] Changes auto-deploy to live app

---

## What's Next?

1. **Share Your App** 🌐
   - Send Vercel URL to friends
   - Share on social media
   - Show in portfolio

2. **Customize It** 🎨
   - Change colors
   - Update content
   - Add your branding

3. **Enhance Features** ⚡
   - Add real backend
   - Implement authentication
   - Add database
   - Build community

4. **Monitor & Maintain** 📊
   - Check Vercel analytics
   - Monitor performance
   - Update dependencies
   - Fix bugs

---

## Need Help?

**Common Resources:**
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Help](https://docs.github.com)
- [Next.js Guide](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)

**Stuck?**
1. Check the logs in Vercel dashboard
2. Search error message on Google
3. Ask in GitHub Discussions
4. Open Vercel support ticket

---

**Congratulations! Your ConnectSphere app is now deployed and automatically updated! 🎉**

Made with ❤️ using v0

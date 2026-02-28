# ConnectSphere - Instagram Clone

A modern, fully functional Instagram clone built with Next.js, React, and Tailwind CSS.

## Features

✨ **User Authentication**
- Quick, hassle-free login/signup without email verification
- Demo credentials: username `demo`, any password
- Persistent user sessions with localStorage

📸 **Social Feed**
- Real-time feed with multiple posts
- Like/unlike functionality with instant updates
- Comment section on each post
- User profiles with follower counts

✏️ **Create Posts**
- Easy post creation with image selection
- Caption input with real-time preview
- Choose from sample images or add custom ones
- Posts appear instantly in feed

👥 **User Discovery**
- Suggested users to follow
- User search functionality
- Profile information display
- Follow/unfollow capability

💬 **Interactive Features**
- Like posts with heart animation
- Comment on posts
- Share posts
- Save posts to bookmarks
- Responsive design for all devices

## Getting Started

### Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd connectsphere
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## Quick Login Demo

The app includes demo authentication without email verification:

- **Username**: `demo` (or any username)
- **Password**: Any password
- **Auto-generated Profile**: Get an avatar and profile instantly

## Project Structure

```
connectsphere/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with providers
│   └── globals.css         # Global styles
├── components/
│   ├── auth-form.tsx       # Login/Signup form
│   ├── app-content.tsx     # Main app layout
│   ├── sidebar.tsx         # Left navigation
│   ├── feed.tsx            # Post feed
│   ├── post-card.tsx       # Individual post
│   ├── new-post-dialog.tsx # Create post modal
│   ├── suggestions.tsx     # User suggestions
│   └── ui/                 # Shadcn UI components
├── lib/
│   ├── auth-context.tsx    # Authentication context
│   ├── posts-context.tsx   # Posts state management
│   └── utils.ts            # Utility functions
└── package.json            # Dependencies
```

## Technology Stack

- **Frontend**: Next.js 16, React 19.2
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: React Context API
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Date Formatting**: date-fns
- **UI Components**: Radix UI

## Features Demo

### Authentication
- Zero-friction login system
- No email verification required
- Automatic profile generation with avatar
- Persistent login with localStorage

### Feed
- Infinite scroll-like feed
- Real-time like/unlike updates
- Comment section for each post
- User info and timestamps

### Create Post
- Modal dialog for creating posts
- Image selection from sample gallery
- Caption input with preview
- Instant feed updates

### User Profiles
- Avatar generation using DiceBear API
- Follower/following counts
- Profile bio
- Post count tracking

## Customization

### Change Colors
Edit the Tailwind theme in `tailwind.config.ts` and `app/globals.css` to customize the color scheme.

### Update Sample Posts
Modify the `INITIAL_POSTS` array in `lib/posts-context.tsx` to change initial feed content.

### Change Sample Images
Update `SAMPLE_IMAGES` in `components/new-post-dialog.tsx` to use different images.

## Deployment

### Deploy to Vercel

1. **Push to GitHub** (if not already connected)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Your app is live!**
   Vercel will automatically deploy and provide a live URL.

## Advanced Deployment

### Connect GitHub Repository
1. In v0, click the GitHub icon in the sidebar
2. Follow the prompts to connect your repository
3. Changes will be automatically synced

### Pull from GitHub
- Any changes pushed to your repository are available to pull in v0
- Use the Git section in the sidebar to manage branches

### Create Pull Requests
- Push your changes to a feature branch
- Use the Git section to create a pull request
- Merge when ready

## Notes

- This is a demo app using localStorage for data persistence
- For production, integrate with a real backend (Supabase, Firebase, etc.)
- All user data is stored locally and clears when localStorage is cleared
- Posts are shared across all users in the demo

## Future Enhancements

- Real-time messaging
- Push notifications
- Story feature
- Video posts
- Live streaming
- Direct messages
- Advanced search
- Hashtags and mentions

## License

MIT License - Feel free to use this as a template for your projects!

---

**Made with ❤️ using v0**

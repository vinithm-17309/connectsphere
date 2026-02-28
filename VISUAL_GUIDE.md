# ConnectSphere - Visual Guide & Feature Walkthrough

## 🎨 Color Palette

### Primary Colors
```
┌─────────────────────────────────────────┐
│ Primary Blue      #3B82F6               │
│ █████████████████████████              │
│ • Main buttons                          │
│ • Navigation highlight                  │
│ • Links & interactive elements          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Accent Cyan       #06B6D4               │
│ ████████████████████████                │
│ • Secondary highlights                  │
│ • Decorative accents                    │
│ • Hover states                          │
└─────────────────────────────────────────┘
```

### Neutral Colors
```
┌─────────────────────────────────────────┐
│ Background       #F8F9FB (Light blue)   │
│ ████████████████████████                │
│ • Page background                       │
│ • Container backgrounds                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Foreground       #1F2937 (Dark gray)    │
│ ████████████████████████                │
│ • Primary text                          │
│ • Headings                              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Borders          #E5E7EB (Light gray)   │
│ ████████████████████████                │
│ • Card borders                          │
│ • Dividers                              │
└─────────────────────────────────────────┘
```

---

## 📱 Layout Structure

### Desktop Layout (1024px+)
```
┌──────────────────────────────────────────────────────────────────┐
│  ConnectSphere                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────┐  ┌──────────────────────┐  ┌──────────────────┐ │
│  │            │  │                      │  │                  │ │
│  │  SIDEBAR   │  │   MAIN FEED / PAGE   │  │  SUGGESTIONS /   │ │
│  │            │  │                      │  │  RIGHT SIDEBAR   │ │
│  │ • Home     │  │  Posts, Messages,    │  │                  │ │
│  │ • Explore  │  │  Profiles, etc.      │  │  Browse Users    │ │
│  │ • Messages │  │                      │  │  Follow Button   │ │
│  │ • Profile  │  │                      │  │                  │ │
│  │            │  │                      │  │                  │ │
│  └────────────┘  └──────────────────────┘  └──────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px)
```
┌───────────────────────────────────┐
│  ConnectSphere                     │
├───────────────────────────────────┤
│                                   │
│  ┌──────────┐  ┌────────────────┐ │
│  │ SIDEBAR  │  │  MAIN CONTENT  │ │
│  │          │  │                │ │
│  │ • Home   │  │  • Posts       │ │
│  │ • Explore│  │  • Chat        │ │
│  │ • Messages  │  • Profile      │ │
│  │ • Profile   │  • Messages    │ │
│  │          │  │                │ │
│  └──────────┘  └────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

### Mobile Layout (375px)
```
┌──────────────────┐
│ ConnectSphere    │
├──────────────────┤
│                  │
│ ┌──────────────┐ │
│ │ MAIN CONTENT │ │
│ │              │ │
│ │ • Posts      │ │
│ │ • Chat       │ │
│ │ • Profile    │ │
│ │              │ │
│ └──────────────┘ │
│                  │
│ [SIDEBAR MENU]   │ ← Hidden, open with button
│                  │
└──────────────────┘
```

---

## 🏠 Home Feed

### Post Card Structure
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ Avatar  Username      Time ...   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │                                 │ │
│ │     POST IMAGE (600x600)        │ │
│ │                                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ❤️ 1,234 likes                   │ │
│ │ 💬 Comments                      │ │
│ │ ➜ Share                          │ │
│ │ 🔖 Save                          │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ @username Caption text here...  │ │
│ │ View all 5 comments             │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 💬 Messages Tab

### Conversations List
```
┌─────────────────────────┐
│ Messages                │
│ [Search...]             │
├─────────────────────────┤
│ ┌────────────────────┐  │
│ │ 👤 Alex Chen    🔴2 │ (2 unread)
│ │ That sounds great! │  │
│ │ 2 min ago       │  │
│ └────────────────────┘  │
│ ┌────────────────────┐  │
│ │ 👤 Jordan Smith  ✓ │
│ │ See you tomorrow!   │  │
│ │ 1 hour ago      │  │
│ └────────────────────┘  │
└─────────────────────────┘
```

### Message Thread
```
┌─────────────────────────┐
│ Alex Chen      Active   │
├─────────────────────────┤
│                         │
│           Hey! How      │
│           are you?      │
│          ─────────      │
│  I'm good, just        │
│  finished that         │
│  project               │
│  ─────────────         │
│                         │
│  That sounds great!    │
│  ─────────────────     │
│                         │
│                         │
│ [Type a message...]    │
│         [Send]         │
└─────────────────────────┘
```

---

## 👤 Profile Page

### Profile Header
```
┌──────────────────────────────────┐
│ [Background Banner]              │
│        👤 (Large Avatar)         │
│     Username (name)              │
│     @username                    │
│   [Edit Profile] [Logout]        │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ Posts    │ Followers │ Following  │
│  12      │    245    │    189     │
└──────────────────────────────────┘
```

### Bio Section (Editable)
```
┌──────────────────────────────────┐
│ 📝 Bio: "Software engineer..."   │
│ 📍 San Francisco, CA             │
│ 🔗 connectsphere.io              │
│ 📅 Joined 3 months ago           │
└──────────────────────────────────┘
```

### Posts Grid
```
┌────────┬────────┬────────┐
│ Image  │ Image  │ Image  │
│ Post1  │ Post2  │ Post3  │
├────────┼────────┼────────┤
│ Image  │ Image  │ Image  │
│ Post4  │ Post5  │ Post6  │
└────────┴────────┴────────┘

(Grid adjusts for screen size)
```

---

## 🔍 Explore Page

### User Discovery Grid
```
┌──────────────────────────────────┐
│ [Search Professionals...]        │
├──────────────────────────────────┤
│                                  │
│  ┌──────────┐  ┌──────────────┐ │
│  │   👤     │  │   👤        │ │
│  │ Sarah    │  │ Mike        │ │
│  │ Designer │  │ Developer   │ │
│  │ 2.1K 👥  │  │ 3.4K 👥     │ │
│  │ [Follow] │  │ [Follow]    │ │
│  └──────────┘  └──────────────┘ │
│  ┌──────────┐  ┌──────────────┐ │
│  │   👤     │  │   👤        │ │
│  │ Elena    │  │ James       │ │
│  │ Marketing│  │ Business    │ │
│  │ 1.8K 👥  │  │ 4.5K 👥     │ │
│  │ [Follow] │  │ [Follow]    │ │
│  └──────────┘  └──────────────┘ │
│                                  │
└──────────────────────────────────┘
```

---

## ✏️ Create Post

### Post Creation Dialog
```
┌────────────────────────────────────┐
│ Create a new post                  │
├────────────────────────────────────┤
│ Select an image:                   │
│ ┌────┐ ┌────┐ ┌────┐              │
│ │Img1│ │Img2│ │Img3│              │
│ └────┘ └────┘ └────┘              │
│                                    │
│ Caption:                           │
│ ┌──────────────────────────────┐   │
│ │Write a caption...            │   │
│ └──────────────────────────────┘   │
│                                    │
│ Preview:                           │
│ ┌──────────────────────────────┐   │
│ │                              │   │
│ │     Selected Image           │   │
│ │     (600x400)                │   │
│ │                              │   │
│ └──────────────────────────────┘   │
│                                    │
│           [Cancel]  [Post]         │
└────────────────────────────────────┘
```

---

## 🎯 Sidebar Navigation

### Desktop Sidebar
```
┌──────────────────────┐
│ 🔵 ConnectSphere     │
├──────────────────────┤
│                      │
│ ⌂ Home              │
│ 🔍 Explore          │
│ 💬 Messages      🔴2 │ (Unread badge)
│ 👤 Profile          │
│                      │
├──────────────────────┤
│ [➕ Create Post]    │
├──────────────────────┤
│ 👤 Your Profile      │
│ username             │
│ 245 followers        │
├──────────────────────┤
│ [⚙️] [🚪 Logout]     │
└──────────────────────┘
```

---

## 📊 Data Flow

### State Management
```
┌─────────────────────────────────────┐
│         App Providers               │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐   │
│  │  AuthProvider                │   │
│  │  • user data                 │   │
│  │  • login/logout              │   │
│  └──────────────────────────────┘   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  PostsProvider               │   │
│  │  • posts array               │   │
│  │  • add/like/comment          │   │
│  └──────────────────────────────┘   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  MessagesProvider            │   │
│  │  • conversations             │   │
│  │  • send/read messages        │   │
│  └──────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
         ↓↓↓ Passed to Components ↓↓↓
┌─────────────────────────────────────┐
│  useAuth(), usePosts(), useMessages()│
└─────────────────────────────────────┘
```

---

## 🎨 Component Hierarchy

```
app/page.tsx
    ↓
  AppContent
    ├── AuthForm (if no user)
    │   ├── Input fields
    │   ├── Login/Signup toggle
    │   └── Submit button
    │
    └── Main App (if user logged in)
        ├── Sidebar
        │   ├── Navigation menu
        │   ├── Create post button
        │   ├── User card
        │   └── Logout button
        │
        ├── Main Content (activeTab routing)
        │   ├── Home
        │   │   ├── Feed
        │   │   │   └── PostCard[]
        │   │   └── Suggestions
        │   │
        │   ├── Explore
        │   │   └── Suggestions (showAll)
        │   │
        │   ├── Messages
        │   │   ├── MessagesList
        │   │   └── MessageThread
        │   │
        │   └── Profile
        │       ├── Profile header
        │       ├── Bio section
        │       └── Posts grid
        │
        └── NewPostDialog
            ├── Image selector
            ├── Caption input
            └── Submit button
```

---

## 🔄 User Interactions

### Creating a Post
```
1. Click [Create Post] button
   ↓
2. Dialog opens
   ↓
3. Select an image from 6 samples
   ↓
4. Write caption
   ↓
5. Click [Post]
   ↓
6. Post appears at top of feed
   ↓
7. Dialog closes
```

### Messaging Flow
```
1. Click "Messages" in sidebar
   ↓
2. View all conversations
   ↓
3. Click a conversation
   ↓
4. See message history
   ↓
5. Type message
   ↓
6. Press Enter or click Send
   ↓
7. Message appears in thread
   ↓
8. Auto-reply appears after 1-3 seconds
```

### Profile Editing
```
1. Click "Profile" in sidebar
   ↓
2. View your profile
   ↓
3. Click [Edit Profile]
   ↓
4. Modify bio/location/website
   ↓
5. Click [Save Changes]
   ↓
6. Profile updates
   ↓
7. Can edit again anytime
```

---

## 📱 Responsive Breakpoints

```
Mobile          Tablet          Desktop
375px          768px           1024px+
─────          ─────           ────────

✗ Sidebar       ✓ Sidebar       ✓ Sidebar
✓ Full width    ✓ Half width    ✓ 3-column
1 column        2 columns       3 columns
Stack layout    Side-by-side    Full layout
Mobile menu     Tab nav         Always visible
```

---

## 🎯 Feature Completion Status

```
FEATURE                 STATUS          NOTES
─────────────────────────────────────────────────
Authentication          ✅ Complete     No verification
Posts Feed             ✅ Complete      Like/comment ready
User Profiles          ✅ Complete      Editable bio
Messaging              ✅ Complete      Backend-ready
User Discovery         ✅ Complete      Follow system
Navigation             ✅ Complete      Tab-based
Responsive Design      ✅ Complete      All breakpoints
Color System           ✅ Complete      Blue/cyan
Component Library      ✅ Complete      50+ Shadcn UI
TypeScript             ✅ Complete      Full typing
```

---

## 🚀 Backend Integration Points

```
Frontend              →  API Endpoint          Database
──────────────────────────────────────────────────────

Login Form            →  POST /auth/login       users
Signup Form           →  POST /auth/signup      users
Create Post           →  POST /posts            posts
Like Post             →  POST /posts/:id/like   likes
Comment               →  POST /comments         comments
Send Message          →  POST /messages         messages
Update Profile        →  PATCH /users/:id       users
Get Conversations     →  GET /conversations     conversations
Get Messages          →  GET /messages/:convId  messages
Follow User           →  POST /follows          followers
Search Users          →  GET /users/search      users
```

---

This visual guide covers all major UI elements and interactions in ConnectSphere!

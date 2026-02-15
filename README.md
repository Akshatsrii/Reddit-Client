<div align="center">

<!-- Colorful Wave Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:10b981,50:059669,100:047857&height=200&section=header&text=Reddit%20Multi-Viewer&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Browse%20Multiple%20Subreddits%20Simultaneously&descAlignY=55&descSize=20" width="100%"/>

<br/>

<!-- Project Logo -->
<img src="https://img.icons8.com/fluency/96/reddit.png" alt="Reddit Logo" width="100"/>

<h1>🚀 Reddit Multi-Viewer</h1>

<p align="center">
  <strong>A modern, responsive web application to browse multiple subreddits side-by-side in real-time</strong>
</p>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-problem-statement">Problem</a> •
  <a href="#-solution">Solution</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a>
</p>

<br/>

<!-- Problem Statement Link -->
<a href="https://roadmap.sh/projects/reddit-client">
  <img src="https://img.shields.io/badge/🎯_Project_Challenge-roadmap.sh-10b981?style=for-the-badge" alt="Roadmap.sh Challenge"/>
</a>

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 Problem Statement](#-problem-statement)
- [💡 Solution](#-solution)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📊 System Flow](#-system-flow)
- [🚀 Installation](#-installation)
- [💻 Usage](#-usage)
- [📸 Screenshots](#-screenshots)
- [🗂️ Project Structure](#️-project-structure)
- [🔮 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🎨 **Modern UI** | Clean white theme with elegant green accents |
| 📱 **Fully Responsive** | Optimized for mobile, tablet, and desktop |
| 🔄 **Real-time Updates** | Refresh button with loading states |
| 🎯 **Multi-Lane View** | Browse multiple subreddits simultaneously |
| 🔍 **Smart Search** | Quick suggestions with popular subreddits |
| 📊 **Multiple Sorting** | Hot, New, and Top post sorting |
| 💾 **Local Storage** | Persists your subreddit preferences |
| ⚡ **Fast Loading** | Optimized performance with React hooks |
| 🎭 **Rich Post Cards** | Thumbnails, badges, flairs, and metadata |
| ⌨️ **Keyboard Shortcuts** | Enter to add, Esc to clear |

</div>

---

## 🎯 Problem Statement

<div align="center">
<img src="https://img.shields.io/badge/Challenge-Reddit%20Client-10b981?style=for-the-badge" alt="Challenge"/>
</div>

### 📌 Original Challenge

Build a Reddit client application that allows users to browse posts from multiple subreddits. The application should use the Reddit JSON API to fetch posts and display them in a user-friendly interface.

**Source:** [roadmap.sh/projects/reddit-client](https://roadmap.sh/projects/reddit-client)

### 🚨 Key Challenges
```mermaid
mindmap
  root((Reddit Client<br/>Challenges))
    Multiple Subreddits
      Side-by-side viewing
      Responsive layout
      Performance optimization
    API Integration
      CORS handling
      Rate limiting
      Error management
    User Experience
      Real-time updates
      Loading states
      Search functionality
    Data Management
      Local storage
      State management
      Type safety
```

### 💭 Core Problems to Solve

1. **Multi-Column Layout**: How to display multiple subreddits simultaneously on different screen sizes?
2. **API Limitations**: Reddit's JSON API doesn't support authentication but has rate limits
3. **State Management**: Managing multiple async data sources efficiently
4. **Responsive Design**: Providing optimal UX across mobile, tablet, and desktop
5. **Performance**: Loading and rendering multiple feeds without lag
6. **Type Safety**: Ensuring robust TypeScript types for Reddit's complex data structure

---

## 💡 Solution

### 🎨 Design Approach

Our solution implements a **clean, modern, multi-lane interface** with the following innovations:
```mermaid
graph TB
    A[User Input] --> B{Device Type?}
    B -->|Mobile/Tablet| C[Vertical Stack]
    B -->|Desktop| D[Horizontal Lanes]
    
    C --> E[Full Width Cards]
    D --> F[Side-by-Side Lanes]
    
    E --> G[Optimized Scrolling]
    F --> G
    
    G --> H[Real-time Updates]
    H --> I[Local Storage Sync]
    
    style A fill:#10b981,color:#fff
    style H fill:#10b981,color:#fff
    style I fill:#10b981,color:#fff
```

### 🔧 Technical Solutions

| Problem | Solution | Implementation |
|---------|----------|----------------|
| **Multiple Lanes** | Responsive Grid System | CSS Grid for mobile, Flexbox for desktop |
| **API Fetching** | Custom React Hooks | `useEffect` + `useCallback` for optimization |
| **State Management** | Local Storage Hook | Custom `useLocalStorage` hook with persistence |
| **Type Safety** | TypeScript Interfaces | Comprehensive Reddit API types |
| **Performance** | Component Optimization | React.memo, lazy loading, debouncing |
| **Error Handling** | Graceful Degradation | Retry mechanisms, error boundaries |

---

## 🏗️ Architecture

### 📐 Component Hierarchy
```mermaid
graph TD
    A[App.tsx] --> B[Header]
    A --> C[Lane Manager]
    
    B --> D[Search Input]
    B --> E[Popular Suggestions]
    
    C --> F[Lane 1]
    C --> G[Lane 2]
    C --> H[Lane N]
    
    F --> I[Sort Controls]
    F --> J[Post List]
    
    J --> K[PostCard 1]
    J --> L[PostCard 2]
    J --> M[PostCard N]
    
    K --> N[Thumbnail]
    K --> O[Metadata]
    K --> P[Badges]
    
    style A fill:#10b981,color:#fff
    style C fill:#059669,color:#fff
    style J fill:#047857,color:#fff
```

### 🔄 Data Flow
```mermaid
sequenceDiagram
    participant User
    participant Header
    participant App
    participant Lane
    participant Reddit API
    participant LocalStorage

    User->>Header: Enter subreddit
    Header->>App: addSubreddit()
    App->>LocalStorage: Save subreddit list
    App->>Lane: Create new lane
    Lane->>Reddit API: Fetch posts
    Reddit API-->>Lane: Return JSON data
    Lane->>Lane: Update state
    Lane-->>User: Display posts
    
    User->>Lane: Click refresh
    Lane->>Reddit API: Fetch new posts
    Reddit API-->>Lane: Return updated data
    Lane-->>User: Display updated posts
```

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Framework
<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50" alt="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" height="50" alt="TypeScript"/>
</p>

**React 18** with **TypeScript** for type-safe component development

---

### Styling
<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="50" height="50" alt="Tailwind CSS"/>
  <img src="https://lucide.dev/logo.light.svg" width="50" height="50" alt="Lucide Icons"/>
</p>

**Tailwind CSS** for utility-first styling + **Lucide React** for beautiful icons

---

### Build Tool
<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="50" height="50" alt="Vite"/>
</p>

**Vite** for lightning-fast development and optimized production builds

---

### State Management
<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50" alt="React Hooks"/>
</p>

**React Hooks** (useState, useEffect, useCallback) + Custom Hooks

---

### API
<p>
  <img src="https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png" width="50" height="50" alt="Reddit API"/>
</p>

**Reddit JSON API** - No authentication required

</div>

---

## 📊 System Flow

### 🔄 Application Flow
```mermaid
flowchart TD
    Start([User Opens App]) --> Check{Subreddits<br/>in Storage?}
    
    Check -->|No| Default[Load Default:<br/>javascript]
    Check -->|Yes| Load[Load Saved<br/>Subreddits]
    
    Default --> Display[Display Lanes]
    Load --> Display
    
    Display --> UserAction{User Action}
    
    UserAction -->|Add Subreddit| Validate{Valid<br/>Name?}
    UserAction -->|Remove Subreddit| Remove[Remove Lane]
    UserAction -->|Refresh| Fetch[Fetch New Posts]
    UserAction -->|Change Sort| Sort[Update Sort Order]
    
    Validate -->|Yes| AddLane[Create New Lane]
    Validate -->|No| Error[Show Error]
    
    AddLane --> SaveStorage[Save to LocalStorage]
    Remove --> SaveStorage
    
    SaveStorage --> Display
    Error --> Display
    Fetch --> Display
    Sort --> Display
    
    style Start fill:#10b981,color:#fff
    style Display fill:#059669,color:#fff
    style SaveStorage fill:#047857,color:#fff
```

### 🌐 API Request Flow
```mermaid
sequenceDiagram
    autonumber
    participant C as Component
    participant H as React Hook
    participant A as Reddit API
    participant S as State

    C->>H: Trigger fetchPosts()
    H->>S: Set loading = true
    H->>A: GET /r/{subreddit}/{sort}.json
    
    alt Success
        A-->>H: 200 OK + JSON Data
        H->>S: Set posts = data
        H->>S: Set loading = false
        S-->>C: Re-render with posts
    else Error 404
        A-->>H: 404 Not Found
        H->>S: Set error = "Subreddit not found"
        S-->>C: Show error message
    else Error 403
        A-->>H: 403 Forbidden
        H->>S: Set error = "Private subreddit"
        S-->>C: Show error message
    else Network Error
        A-->>H: Network Error
        H->>S: Set error = "Failed to load"
        S-->>C: Show retry button
    end
```

---

## 🚀 Installation

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Step-by-Step Setup

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/reddit-multi-viewer.git
   cd reddit-multi-viewer
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start development server**
```bash
   npm run dev
```

4. **Build for production**
```bash
   npm run build
```

5. **Preview production build**
```bash
   npm run preview
```

### 📦 Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.5.3",
    "vite": "^5.4.0",
    "tailwindcss": "^3.4.1"
  }
}
```

---

## 💻 Usage

### Basic Usage

1. **Adding a Subreddit**
   - Type a subreddit name in the search bar (e.g., "javascript")
   - Press Enter or click the "Add" button
   - The subreddit will appear as a new lane

2. **Quick Add**
   - Click on the search bar to see popular subreddits
   - Click any suggestion to instantly add it

3. **Managing Lanes**
   - Click the ❌ button to remove a lane
   - Click the 🔄 button to refresh posts
   - Use Hot/New/Top tabs to change sorting

4. **Responsive Views**
   - **Desktop**: Horizontal scrolling lanes
   - **Mobile/Tablet**: Vertical stacked lanes

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Add subreddit |
| `Esc` | Clear input field |


## 🗂️ Project Structure
```
reddit-multi-viewer/
├── 📁 public/              # Static assets
├── 📁 src/
│   ├── 📁 components/      # React components
│   │   ├── Header.tsx      # Search bar & navigation
│   │   ├── Lane.tsx        # Subreddit lane container
│   │   └── PostCard.tsx    # Individual post card
│   ├── 📁 hooks/           # Custom React hooks
│   │   └── useLocalStorage.tsx
│   ├── 📁 types/           # TypeScript definitions
│   │   └── reddit.ts       # Reddit API types
│   ├── 📁 utils/           # Utility functions
│   │   └── reddit.ts       # Helper functions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── 📄 index.html           # HTML template
├── 📄 package.json         # Dependencies
├── 📄 tsconfig.json        # TypeScript config
├── 📄 tailwind.config.js   # Tailwind config
├── 📄 vite.config.ts       # Vite config
└── 📄 README.md            # This file
```

---

## 🔮 Future Enhancements

<div align="center">
```mermaid
timeline
    title Roadmap
    Phase 1 : Dark Mode Toggle
           : Save Sort Preferences
           : Infinite Scroll
    Phase 2 : Comment Viewing
           : Post Filtering
           : Custom Themes
    Phase 3 : User Authentication
           : Save to Cloud
           : Share Configurations
    Phase 4 : PWA Support
           : Offline Mode
           : Push Notifications
```

</div>

### 🎯 Planned Features

- [ ] 🌙 Dark/Light theme toggle
- [ ] 💬 View comments in modal
- [ ] ♾️ Infinite scroll pagination
- [ ] 🔖 Bookmark favorite posts
- [ ] 🎨 Custom color themes
- [ ] 📤 Share lane configurations
- [ ] 🔐 OAuth authentication
- [ ] ☁️ Cloud sync
- [ ] 📱 Progressive Web App
- [ ] 🔔 Real-time notifications
- [ ] 🎥 Video player integration
- [ ] 📊 Analytics dashboard

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📝 Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic
- Test on multiple screen sizes

---

## 👨‍💻 Author

<div align="center">

**Akshat Srivastava**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourusername)

</div>

---

## 🙏 Acknowledgments

- [roadmap.sh](https://roadmap.sh) for the project challenge
- [Reddit](https://reddit.com) for the free JSON API
- [Lucide Icons](https://lucide.dev) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for amazing utility classes
- [Vite](https://vitejs.dev) for blazing fast development

---

## 📊 Project Stats

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/reddit-multi-viewer?style=for-the-badge&color=10b981)
![GitHub stars](https://img.shields.io/github/stars/yourusername/reddit-multi-viewer?style=for-the-badge&color=059669)
![GitHub forks](https://img.shields.io/github/forks/yourusername/reddit-multi-viewer?style=for-the-badge&color=047857)
![GitHub issues](https://img.shields.io/github/issues/yourusername/reddit-multi-viewer?style=for-the-badge&color=10b981)

</div>

---

<div align="center">

### 💚 If you found this project helpful, please give it a ⭐!

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:10b981,50:059669,100:047857&height=100&section=footer" width="100%"/>

</div>
```

---

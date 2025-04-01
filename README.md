# FlowLoops ⏱️🎮

> A quirky, ADHD-friendly time tracker that turns focus into a game of mystery.

## 🌟 What is FlowLoops?

FlowLoops is an experimental alternative to traditional time management tools. It's specifically designed for people who:
- Get anxious watching timer countdowns
- Need variety and unpredictability to stay engaged 
- Want to track time without feeling constrained by it
- Prefer gamification over rigid scheduling systems

Instead of showing you exactly how much time is left, FlowLoops hides the running timer completely. You interact with random time values, never knowing exactly when the current interval will end. This uncertainty creates a more playful, less stressful relationship with time tracking.

## ✨ Key Features

### Core Experience
- **Hidden Timer Engine** - The active countdown is completely invisible
- **Mystery Button Grid** - 7 clickable buttons with randomized time values (2-21 minutes)
- **Random Auto-Continuation** - When a timer completes, a new one automatically starts
- **Dynamic Session History** - Track your completed intervals and total time

### Thoughtful Design
- **Distraction-Free Interface** - Minimalist design keeps you focused on your task, not the app
- **Hypnotic Background** - Subtle animated background changes with session state
- **Mobile & Desktop Support** - Works seamlessly across all your devices
- **Installable PWA** - Add to your home screen for an app-like experience

### Technical Features
- **Fully Offline Capable** - Works without an internet connection
- **No Account Required** - Start using immediately with no login or signup
- **Browser Notifications** - Get alerted when intervals complete
- **Lightweight & Fast** - Small bundle size for quick loading

## 🚀 Getting Started

1. **Visit:** [FlowLoops Web App](https://MiguelDiLalla.github.io/not-pomodoro-app/)
2. **Press "Run"** to start your first session
3. **Click any time value** to reset the hidden timer
4. **Enable notifications** when prompted for the full experience

---

## 📋 How to Use FlowLoops

1. **Start a Session** - Press the "Run" button to begin
2. **Work on Your Task** - Focus on your work without watching a timer
3. **Reset When Needed** - Click any of the time buttons if you want to change the current interval
4. **Track Your Progress** - View your session history in the sidebar (desktop) or bottom bar (mobile)

## 💡 The Science Behind It

FlowLoops builds on research about time perception, unpredictability, and focus. By removing the visible countdown, it may help reduce:
- Clock-watching anxiety
- Time pressure stress
- Perfectionist tendencies  

The unpredictable nature of the app mirrors how our brains often work best with novelty and gentle surprises.

---

## 🛠️ For Developers

```bash
# Clone the repository
git clone https://github.com/MiguelDiLalla/not-pomodoro-app.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```


## ⚠️ Development Security Advisory

As of version 1.0.0, this project uses `vite@5.x`, which depends on a vulnerable version of `esbuild`. This issue only affects the development server (`npm run dev`) and does **not** impact the production build.

> Reference: [GitHub Advisory GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)

To upgrade safely in future versions, update to `vite@6.x` and review plugin compatibility.

✅ Deployment to GitHub Pages and production usage remain secure.

---

## 📄 License

MIT © Miguel Di Lalla

---

Made with care and curiosity for everyone who struggles with traditional time management tools.
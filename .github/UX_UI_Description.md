# 🧩 FlowLoops UI Layout

> A breakdown of the key interface elements that define the FlowLoops user experience.

FlowLoops is designed as a quirky, minimalist timer with an ADHD-friendly twist. Its layout is intentionally simple yet dynamic, encouraging user interaction through curiosity and intuitive design.

---

## 🖼️ Visual Overview
The application consists of **three main panels**, positioned horizontally across the screen, layered over a dynamic animated background:

```
┌────────────────────┬────────────────────┬────────────────────┐
│  Title & Text      │     Buttons        │     History        │
│  Panel             │     Panel          │     Sidebar        │
│  ───────────────   │  ───────────────   │  ───────────────   │
│  TitlePanel.jsx    │  ButtonsPanel.jsx  │  HistorySidebar.jsx│
│                   │  ButtonGrid.jsx    │  useHistoryLog.js  │
│                   │  RunPauseButton.jsx│                    │
└────────────────────┴────────────────────┴────────────────────┘
          ↑ Background Layer: AnimatedBackground.jsx + animations.css
```

Each panel plays a specific role in guiding user focus and supporting the core gameplay of the hidden timer mechanism.

Each panel plays a specific role in guiding user focus and supporting the core gameplay of the hidden timer mechanism.

---

## 🎨 Animated Background
- File: `src/components/AnimatedBackground.jsx`
- Styles: `src/styles/animations.css`
- Role: Provides immersive motion backdrop with procedural styling.

### ✨ Design Spec
The animated background features:
- A **teal base layer** (`teal-600` Tailwind tone)
- Two **soft red blobs** (`red-400`) with blur and transparency
- Blobs **translate slowly** and **interact visually** using `mix-blend-mode` and `filter: blur`
- Movement direction and positioning are **responsive to viewport size**
- Animations run in a loop, simulating a "metaball" or lava-lamp style motion

```text
┌──────────────────────────── Full-Screen Container ─────────────────────────────┐
│                                                                                │
│    [ Red Blob A ]    <-- animate left to right with slow drift                 │
│                         blend softly with background and second blob          │
│                                                                                │
│                      [ Red Blob B ]     <-- counter-drift                      │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

This animated layer sits behind all content and respects the full viewport size (`w-screen h-screen`).
- File: `src/components/AnimatedBackground.jsx`
- Styles: `src/styles/animations.css`
- Role: Provides subtle, animated visuals behind the UI. Gives the app a dynamic and immersive feel.

---

## 📋 Title & Text Panel (Left)
- File: `src/components/TitlePanel.jsx`
- Role: Displays the app title, phase-specific messages, and motivational blurbs. Sets the tone for each session.

### 🧩 Design Spec
- Title uses `MontaguSlap`, styled with Tailwind class `font-title`
- Subheadings and text use `Lexend Deca`, styled with `font-sans`
- Panel is vertically centered, with left/right padding
- Rounded edges, fits inside a column container (with `rounded-2xl`, `p-4`, etc.)

```text
┌────────────────────────────────────┐
│   "FlowLoops"                     │   ← Large title (MontaguSlap)
│   "Time is a game. Play it."      │   ← Subheading (Lexend Deca)
└────────────────────────────────────┘
```
- File: `src/components/TitlePanel.jsx`
- Role: Displays the app title, phase-specific messages, and motivational blurbs. Sets the tone for each session.

---

## 🎛️ Buttons Panel (Center)
- Files:
  - `src/components/ButtonsPanel.jsx`
  - `src/components/ButtonGrid.jsx`
  - `src/components/RunPauseButton.jsx`
- Role: Main interactive zone with 8 mystery buttons. One is active (secret timer); others are clickable for timer resets. Central Run/Pause control included.

### 🧩 Design Spec
- All buttons are stacked vertically like an always-open **combo box**
- Uses `flex-col` and equal spacing
- Each button styled with `.mystery-button`, rounded, interactive hover/active states
- Layout is fully centered and responsive

```text
┌────────────────────────────┐
│ [ Button 1 ]               │
│ [ Button 2 ]               │
│ [ Button 3 ]               │
│ [ Button 4 ]               │
│ [ Button 5 ]               │
│ [ Button 6 ]               │
│ [ Button 7 ]               │
│───────────────────────────│
│ [ Run / Pause Button ]     │
└────────────────────────────┘
```
- Files:
  - `src/components/ButtonsPanel.jsx`
  - `src/components/ButtonGrid.jsx`
  - `src/components/RunPauseButton.jsx`
- Role: Main interactive zone with 8 mystery buttons. One is active (secret timer); others are clickable for timer resets. Central Run/Pause control included.

---

## 📈 History Sidebar (Right)
- File: `src/components/HistorySidebar.jsx`
- Hook: `src/hooks/useHistoryLog.js`
- Role: Displays session history (button clicks, timer triggers, total time). 

### 🧭 Responsive Behavior
| Device | Visibility | Position | Content |
|--------|------------|----------|---------|
| **Desktop** | Always visible | Right Panel | Full history log (bottom-aligned), total time at the bottom |
| **Mobile** | Compact bar | Bottom nav-like element | Only shows total time + last entry summary |

- Background color: same red tone as metaballs (`red-400`), blended softly
- Layout: No scroll — content must **fit or clip**, always within `overflow-hidden`

```text
Desktop Layout:
┌──────────────┐
│ History Log  │   ← scrollable div (flex-col-reverse)
│  ...         │
│  Session #3  │
│──────────────│
│ Total Time:  │   ← fixed at bottom
└──────────────┘

Mobile Layout:
┌────────────────────────── Bottom Bar ──────────────────────────┐
│  Total Time: XX:XX  |  Last Event: "Paused at 11:42"           │
└────────────────────────────────────────────────────────────────┘
```

## 📊 Timer Logic & Notifications
- Timer Engine: `src/utils/timer.js`
- Timer Context: `src/context/TimerContext.jsx`
- Notification API Handler: `src/components/NotificationManager.jsx`
- Role: Manages the hidden timer lifecycle and user notifications.

---

## 📂 File Overview: Roles, Standards, and Relationships

### 🎨 Animated Background
| File | Role | Location | Component Type | Standards/Practices | Dependencies |
|------|------|----------|----------------|----------------------|---------------|
| `AnimatedBackground.jsx` | Renders subtle animated visuals as a background layer | `src/components/` | Presentational | Isolated, re-usable | `animations.css` |
| `animations.css` | Contains custom animation styles (e.g., blur, motion) | `src/styles/` | Stylesheet | Tailwind plugin friendly | N/A |

### 📋 Title & Text Panel (Left)
| File | Role | Location | Component Type | Standards/Practices | Dependencies |
|------|------|----------|----------------|----------------------|---------------|
| `TitlePanel.jsx` | Displays app title, motivational text, session phase prompts | `src/components/` | Presentational | Clean JSX, responsive layout | TailwindCSS |

### 🎛️ Buttons Panel (Center)
| File | Role | Location | Component Type | Standards/Practices | Dependencies |
|------|------|----------|----------------|----------------------|---------------|
| `ButtonsPanel.jsx` | Wraps the button grid and run/pause control | `src/components/` | Container | Modular layout, click forwarding | `ButtonGrid.jsx`, `RunPauseButton.jsx` |
| `ButtonGrid.jsx` | Renders 8 dynamic mystery buttons | `src/components/` | Presentational | Iterative button rendering | `timer.js`, TailwindCSS |
| `RunPauseButton.jsx` | Central control for the session logic | `src/components/` | Interactive | Icon-based, responsive, accessible | `TimerContext.jsx` |

### 📈 History Sidebar (Right)
| File | Role | Location | Component Type | Standards/Practices | Dependencies |
|------|------|----------|----------------|----------------------|---------------|
| `HistorySidebar.jsx` | Displays a scrollable or toggleable history of interactions | `src/components/` | Presentational | Conditional rendering, smooth transitions | `useHistoryLog.js` |
| `useHistoryLog.js` | Manages session history and updates | `src/hooks/` | Custom Hook | Stateful, clean hook logic | React state APIs |

### ⏱️ Timer Logic & Notifications
| File | Role | Location | Component Type | Standards/Practices | Dependencies |
|------|------|----------|----------------|----------------------|---------------|
| `timer.js` | Handles countdown logic and timer state changes | `src/utils/` | Utility | Pure function-based | JS timer methods |
| `TimerContext.jsx` | Provides shared timer state via React Context | `src/context/` | Context Provider | Encapsulated shared logic | React Context API |
| `NotificationManager.jsx` | Controls browser notifications when time ends | `src/components/` | Behavior Component | Side effect management | Notifications API |

### 🧱 Foundational Layout & Config
| File | Role | Location | Component Type | Standards/Practices | Dependencies |
|------|------|----------|----------------|----------------------|---------------|
| `App.jsx` | Main layout: assembles the 3-panel interface | `src/` | Root Component | Grid-based layout | All 3 panels |
| `main.jsx` | React entry point: renders `<App />` | `src/` | Entrypoint | Minimalist, Vite standard | ReactDOM |
| `index.css` | Tailwind base + custom CSS styles | `src/` | Stylesheet | Tailwind-first | N/A |
| `index.html` | Root HTML page loaded by Vite | `public/` | Static file | Metadata setup, font preload | Manifest, CSS |
| `manifest.json` | Defines PWA properties | `public/` | PWA Config | Chrome installable, app name | Icons, service worker |
| `click.mp3` | Button click sound effect | `public/sounds/` | Asset | Audio feedback standard | Audio tag or Web Audio API |
| `package.json` | Project metadata and deploy script | `/` | Config | GitHub Pages deploy, `gh-pages` package | npm |
| `tailwind.config.js` | Custom theme, fonts, layout options | `/` | Config | Just-in-Time enabled | TailwindCSS |
| `vite.config.js` | Dev server + GitHub deploy config | `/` | Config | `base` set to `/not-pomodoro-app/` | Vite, gh-pages |

## 🚧 Development Roadmap: Populating the Code


### ✅ Phase 1: Foundation & Scaffolding 
1. **`main.jsx`** – Setup ReactDOM to render `<App />` ✔️
2. **`App.jsx`** – Define three-column layout, import and render all panels ✔️
3. **`index.css`** – Include Tailwind directives and global styles ✔️
4. **`tailwind.config.js` + `vite.config.js`** – Confirm Tailwind and deployment settings ✔️
5. **`index.html`** – Load fonts, metadata, and root container ✔️


---

### 🖼️ Phase 2: Visual Layer 
6. **`AnimatedBackground.jsx`** – Add animated backdrop using utility classes ✔️
7. **`animations.css`** – Define blur/motion styles (optional CSS keyframes) ✔️

---

### 📋 Phase 3: Title Panel (Left)
8. **`TitlePanel.jsx`** – Render heading, motivational subtitle, and props for dynamic state (e.g., session mode) ✔️

---

### 🎛️ Phase 4: Button Panel (Center)
9. **`ButtonsPanel.jsx`** – Render RunPauseButton and ButtonGrid in a flexbox/column layout ✔️
10. **`RunPauseButton.jsx`** – Trigger `start`, `pause`, or `reset` via TimerContext ✔️
11. **`ButtonGrid.jsx`** – Render 8 dynamic buttons; each sets a new mystery time via `TimerContext` ✔️

---

### 📈 Phase 5: History Panel (Right)
12. **`useHistoryLog.js`** – Implement a custom hook to log timer events and button clicks ✔️
13. **`HistorySidebar.jsx`** – Display logs from `useHistoryLog`; style with overflow and fade ✔️

---

### ⏱️ Phase 6: Timer Mechanics & Notifications
14. **`TimerContext.jsx`** – Build global timer context and provide state + handlers ✔️
15. **`timer.js`** – Implement hidden countdown logic (start/stop/reset) ✔️
16. **`NotificationManager.jsx`** – Trigger system notifications when timer ends ✔️

---

### 🔉 Phase 7: Polish & Feedback
17. **Add `click.mp3` sound** to buttons via audio API ✔️
18. **Test across mobile/desktop** for responsiveness ✔️
19. **Add meta tags to `manifest.json` and `index.html`** for PWA support ✔️

---

### 🚀 Final Step: Build & Deploy
20. `npm run build`
21. `npm run preview` — verify locally
22. `npm run deploy` — push to GitHub Pages

---

## 🖼️ App Icons & PWA Requirements

To support full installability and proper appearance across devices, FlowLoops requires two core icons:

| Icon File | Size | Purpose |
|-----------|------|---------|
| `icon-192.png` | 192x192 px | Android launcher / notification icon |
| `icon-512.png` | 512x512 px | Homescreen / install icon (PWA requirement) |

### 📁 Storage Location
Place both icon files in:
```
/public/icons/
```

### 🔧 Manifest Configuration Example
Update `public/manifest.json` like this:
```json
"icons": [
  {
    "src": "/icons/icon-192.png",
    "sizes": "192x192",
    "type": "image/png"
  },
  {
    "src": "/icons/icon-512.png",
    "sizes": "512x512",
    "type": "image/png"
  }
],
```

You may also want to add a `favicon.ico` for tab visibility and include:
```html
<link rel="icon" href="/icons/icon-192.png" />
```

## 📄 Foundational Files & Configs
- `src/App.jsx` — Renders the 3 panels and layout structure.
- `src/main.jsx` — Entry point, renders `<App />` into `#root`.
- `src/index.css` — Tailwind base + custom styles.
- `public/index.html` — Basic HTML template.
- `public/manifest.json` — Metadata for installability.
- `public/sounds/click.wav` — Auditory feedback.
- `tailwind.config.js` — Design tokens and custom theme.
- `vite.config.js` — Configures base path for GitHub Pages.
- `package.json` — Scripts, dependencies, and deployment setup.

---

## 🧩 Layout Philosophy
FlowLoops embraces a tactile, experimental interface where:
- The user isn't overloaded with metrics.
- Feedback is subtle, but deliberate.
- Every click counts, but no timer is visible.

This layout encourages immersion through restriction, and satisfaction through interaction.

---

Crafted with intention, weirdness, and focus.

---

_Questions, tweaks or improvements? [Open an issue](https://github.com/MiguelDiLalla/not-pomodoro-app/issues)._


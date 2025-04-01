

# Copilot Project Instructions: FlowLoop

> A weird little timer game to trick you into tracking your time.

## 🧠 Concept

**FlowLoop** (working title) is an ADHD-friendly, gamified alternative to the traditional Pomodoro timer. It’s a minimalist, installable, browser-based app that plays with randomness, uncertainty, and user agency. The interface revolves around hidden timers and button-triggered resets — the user never quite knows what time is running... but that’s the point.

This is a **frontend-only** React Progressive Web App (PWA) — no backend. All logic is handled client-side, and the app is installable on desktop and mobile via Chrome's "Add to Home Screen" feature.

---

## 🔁 Core Mechanic

- When the user presses **Run**:
    - 8 random time intervals (2–21 min in ms) are generated.
    - One is secretly chosen and started.
    - The remaining 7 fill visible buttons.

- If the user clicks a button:
    - The current countdown resets to that time.
    - That button is replaced with a new random interval.

- When the countdown completes:
    - A browser notification fires showing:
        - How long that round lasted
        - Total time since the session began
    - One random button is auto-triggered (as if clicked).

- Pausing hides button values and disables interaction.

---

## 🧩 Components

**UI Elements**
- `RunPauseButton` – toggles between Run / Pause states
- `ButtonGrid` – 7 clickable randomized buttons
- `NotificationManager` – manages browser notifications
- `Sidebar` (on hover) – shows past intervals and total elapsed time
- `PanelOne` – Welcome screen and how-it-works info
- `PanelTwo` – Live interface: buttons + current state
- `ProceduralBackground` – visual noise or abstract minimal background

---

## 🎨 Aesthetic + Layout

- **Fonts**: `MontaguSlap` (title, fun UI), `Lexend Deca` (body, numbers)
- **Color palette**: Tailwind’s `red-400` and `teal-600` combo
- **Visual tone**: weird, gentle chaos — functional but odd
- **Layout**:
    - 2 stacked panels (info + interface)
    - Right-side hoverable sidebar with timer history
    - No clutter. Minimal UI. Transitions preferred over popups.

---

## 📦 Tech Stack

- `React` (with Hooks)
- `Vite` (as the bundler)
- `TailwindCSS` (for styling)
- `Notifications API` (browser)
- `PWA manifest` (for install support)
- `No Redux`, `No backend`, `No routing`

---

## 🚫 Out of Scope (for now)

- No user login
- No server-side tracking or analytics
- No database
- No save/resume sessions
- No sound effects unless local + preloaded

---

## 📁 Folder Structure (already scaffolded)

```
not-pomodoro-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── sounds/click.mp3
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
│       ├── RunPauseButton.jsx
│       ├── ButtonGrid.jsx
│       └── NotificationManager.jsx
├── copilot-instructions.md
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## ✨ Notes for Copilot

- Focus on logic inside functional components.
- Prioritize simplicity in state updates.
- Use `setInterval` and `clearInterval` safely via `useEffect`.
- Code should feel like a *small game engine*, not a typical timer app.
- Style with Tailwind where possible — no external stylesheets.
- Fonts can be loaded from Miguel’s personal web host or Google Fonts.

---

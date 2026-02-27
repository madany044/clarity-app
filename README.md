# clarity. — Minimalist To-Do & Habit Tracker

A clean, distraction-free productivity app built with React + Vite + Supabase.

## ✨ Features

| Feature | Details |
|---|---|
| ✅ Task management | Create, edit, delete, complete tasks |
| 🏷️ Priority & tags | High / Medium / Low + custom tags |
| 📅 Due dates | With browser notifications at due time and 1hr before |
| 📆 Calendar view | Monthly calendar with task dots per day |
| 🎯 Focus Mode | Fully working Pomodoro timer (25/5) with notifications |
| 🔁 Habit Tracker | Daily habits with 7-day grid + streak counter |
| 📦 Archive | Completed tasks with stats + search + filter |
| 🌙 Dark mode | Toggle from sidebar |
| 🔄 Real-time sync | Live updates via Supabase Realtime |
| 📴 Offline fallback | Works offline with localStorage when not logged in |

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/clarity-app.git
cd clarity-app
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a **free account**
2. Click **New Project**, give it a name (e.g. `clarity`)
3. Once created, go to **SQL Editor** in the left sidebar
4. Paste the entire contents of `supabase-schema.sql` and click **Run**
5. Go to **Project Settings → API**
6. Copy your **Project URL** and **anon public** key

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — the app is running!

---

## 🌐 Deploy to Vercel (Recommended — Free)

### Option A: GitHub + Vercel (easiest)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/clarity-app.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` → your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` → your Supabase anon key
5. Click **Deploy** — you'll get a live URL in ~60 seconds!

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
# Follow the prompts, then add env vars:
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel --prod
```

---

## 🌐 Deploy to GitHub Pages (Alternative)

GitHub Pages doesn't support client-side routing out of the box. You need one extra step:

1. Install the gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add to `vite.config.js`:
```js
export default defineConfig({
  base: '/clarity-app/', // your repo name
  plugins: [react()],
})
```

3. Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

4. Deploy:
```bash
npm run deploy
```

Your app will be live at `https://YOUR_USERNAME.github.io/clarity-app`

> ⚠️ **Note:** Environment variables are embedded at build time with Vite. Never commit your `.env` file. For GitHub Pages, use GitHub Actions secrets.

---

## 📁 Project Structure

```
clarity-app/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── TaskItem.jsx    # Individual task row
│   │   └── TaskModal.jsx   # Add/Edit task form
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.jsx     # Supabase auth state
│   │   ├── useTasks.js     # Task CRUD + realtime
│   │   ├── useHabits.js    # Habit CRUD + logs
│   │   ├── useTimer.js     # Pomodoro timer logic
│   │   └── useNotifications.js # Browser notifications
│   ├── lib/
│   │   └── supabase.js     # Supabase client
│   ├── pages/
│   │   ├── AuthPage.jsx    # Sign in / Sign up
│   │   ├── Dashboard.jsx   # Shell + sidebar nav
│   │   ├── TodayPage.jsx   # Main task view
│   │   ├── CalendarPage.jsx
│   │   ├── FocusPage.jsx   # Pomodoro focus mode
│   │   ├── HabitsPage.jsx  # Habit tracker
│   │   └── ArchivePage.jsx # Completed tasks
│   ├── styles/
│   │   └── global.css      # CSS variables + resets
│   ├── App.jsx             # Routes + auth guard
│   └── main.jsx            # React entry point
├── public/
│   └── favicon.svg
├── supabase-schema.sql     # Database setup script
├── .env.example
├── vite.config.js
└── package.json
```

---

## 🔔 Browser Notifications

Notifications are requested on first login. They fire:
- **1 hour before** a task's due time
- **At the exact due time**
- **When a Pomodoro session ends / break is over**

To test: add a task with a due time ~1 minute from now.

---

## 🛠️ Tech Stack

- **React 18** + **Vite** — fast dev build
- **React Router v6** — client-side routing
- **Supabase** — auth + PostgreSQL + real-time subscriptions
- **date-fns** — date formatting/comparison
- **CSS Modules** — scoped styles, no CSS-in-JS needed

---

## 🔮 Future Ideas

- [ ] Google Calendar sync
- [ ] Cross-device habit sync (already works via Supabase!)
- [ ] Weekly review email digest
- [ ] Drag-and-drop task reordering
- [ ] Recurring tasks
- [ ] Mobile app (React Native)

---

Made with ☕ and clarity.

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

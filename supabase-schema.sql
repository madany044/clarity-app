-- =============================================
-- CLARITY APP — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- TASKS
create table if not exists public.tasks (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade not null,
  title        text not null,
  completed    boolean default false,
  completed_at timestamptz,
  due_date     date,
  due_time     time,
  priority     text check (priority in ('high','medium','low')) default 'medium',
  tag          text,
  notes        text,
  created_at   timestamptz default now()
);

alter table public.tasks enable row level security;

create policy "Users can manage their own tasks"
  on public.tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- HABITS
create table if not exists public.habits (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  name       text not null,
  icon       text default '⭐',
  color      text default '#c85a2a',
  created_at timestamptz default now()
);

alter table public.habits enable row level security;

create policy "Users can manage their own habits"
  on public.habits for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- HABIT LOGS
create table if not exists public.habit_logs (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  habit_id   uuid references public.habits(id) on delete cascade not null,
  log_date   date not null,
  created_at timestamptz default now(),
  unique (habit_id, log_date)
);

alter table public.habit_logs enable row level security;

create policy "Users can manage their own habit logs"
  on public.habit_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Enable realtime for tasks
alter publication supabase_realtime add table public.tasks;

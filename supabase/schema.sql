create table if not exists public.ecovolts_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ecovolts_diagnostics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  profile jsonb not null,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ecovolts_acquisition_simulations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  mode text not null,
  scenario jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ecovolts_installation_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  progress integer not null default 3,
  updated_at timestamptz not null default now()
);

create table if not exists public.ecovolts_care_metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  metrics jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ecovolts_support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  category text not null,
  description text not null,
  status text not null default 'Aberta',
  created_at timestamptz not null default now()
);

alter table public.ecovolts_profiles enable row level security;
alter table public.ecovolts_diagnostics enable row level security;
alter table public.ecovolts_acquisition_simulations enable row level security;
alter table public.ecovolts_installation_progress enable row level security;
alter table public.ecovolts_care_metrics enable row level security;
alter table public.ecovolts_support_requests enable row level security;

create policy "Users can manage own EcoVolts profiles" on public.ecovolts_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own EcoVolts diagnostics" on public.ecovolts_diagnostics
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own EcoVolts simulations" on public.ecovolts_acquisition_simulations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own EcoVolts installation" on public.ecovolts_installation_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own EcoVolts care" on public.ecovolts_care_metrics
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own EcoVolts support" on public.ecovolts_support_requests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

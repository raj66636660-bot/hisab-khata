-- ==========================================================
-- হিসাব খাতা — Supabase স্কিমা
-- এই পুরো ফাইলটা Supabase Dashboard > SQL Editor এ পেস্ট করে "Run" চাপুন
-- ==========================================================

create extension if not exists pgcrypto;

-- প্রতিটা বিক্রি হওয়া কপি/ব্যবসার জন্য একটা করে সারি
create table workspaces (
  id uuid primary key default gen_random_uuid(),
  activation_code text unique not null,
  business_name text default '',
  logo_url text,
  activated boolean not null default false,
  created_at timestamptz default now()
);

-- Supabase Auth ইউজারকে workspace-এর সাথে সংযুক্ত করে
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  workspace_id uuid references workspaces(id) on delete cascade,
  phone text,
  created_at timestamptz default now()
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  name text not null,
  phone text,
  address text,
  created_at timestamptz default now()
);

create table transactions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  type text not null check (type in ('sale','payment')),
  amount numeric not null check (amount > 0),
  note text,
  tx_date timestamptz default now()
);

create index on customers (workspace_id);
create index on transactions (workspace_id);
create index on transactions (customer_id);

-- ==========================================================
-- বর্তমান লগইন-করা ইউজারের workspace_id বের করার ফাংশন
-- ==========================================================
create or replace function current_workspace_id()
returns uuid language sql stable as $$
  select workspace_id from profiles where id = auth.uid()
$$;

-- ==========================================================
-- Row Level Security চালু করা — যাতে কেউ অন্যের ডেটা দেখতে না পারে
-- ==========================================================
alter table workspaces enable row level security;
alter table profiles enable row level security;
alter table customers enable row level security;
alter table transactions enable row level security;

create policy "own workspace read" on workspaces
  for select using (id = current_workspace_id());
create policy "own workspace update" on workspaces
  for update using (id = current_workspace_id());

create policy "own profile read" on profiles
  for select using (id = auth.uid());
create policy "own profile update" on profiles
  for update using (id = auth.uid());

create policy "customers within own workspace" on customers
  for all using (workspace_id = current_workspace_id())
  with check (workspace_id = current_workspace_id());

create policy "transactions within own workspace" on transactions
  for all using (workspace_id = current_workspace_id())
  with check (workspace_id = current_workspace_id());

-- ==========================================================
-- অ্যাক্টিভেশন কোড যাচাই ও ব্যবহারের ফাংশন
-- (workspaces টেবিল সরাসরি অচেনা মানুষের কাছে খোলা রাখা হয়নি,
--  শুধু এই দুটো ফাংশনের মাধ্যমেই কোড ব্যবহার করা যাবে)
-- ==========================================================
create or replace function check_activation_code(p_code text)
returns boolean language sql security definer as $$
  select exists(
    select 1 from workspaces where activation_code = p_code and activated = false
  )
$$;

create or replace function activate_workspace(p_code text, p_phone text)
returns uuid language plpgsql security definer as $$
declare
  v_workspace_id uuid;
begin
  select id into v_workspace_id from workspaces
    where activation_code = p_code and activated = false;

  if v_workspace_id is null then
    raise exception 'invalid_or_used_code';
  end if;

  update workspaces set activated = true where id = v_workspace_id;

  insert into profiles (id, workspace_id, phone)
    values (auth.uid(), v_workspace_id, p_phone)
  on conflict (id) do update
    set workspace_id = excluded.workspace_id, phone = excluded.phone;

  return v_workspace_id;
end;
$$;

grant execute on function check_activation_code(text) to anon, authenticated;
grant execute on function activate_workspace(text, text) to authenticated;

-- ==========================================================
-- লোগোর জন্য Storage বাকেট
-- ==========================================================
insert into storage.buckets (id, name, public)
  values ('logos', 'logos', true)
  on conflict (id) do nothing;

create policy "logo public read" on storage.objects
  for select using (bucket_id = 'logos');

create policy "logo upload own workspace" on storage.objects
  for insert with check (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = current_workspace_id()::text
  );

create policy "logo update own workspace" on storage.objects
  for update using (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = current_workspace_id()::text
  );

-- ==========================================================
-- একটা নতুন কাস্টমার বিক্রি করার সময় এভাবে একটা কোড বানাবেন:
-- (SQL Editor-এ এই লাইনটা রান করুন, নিচে ফলাফলে কোডটা দেখাবে)
-- ==========================================================
-- insert into workspaces (activation_code) values ('HK-' || upper(substr(md5(random()::text),1,6))) returning activation_code;

-- Schema usage
grant usage on schema public to anon, authenticated;

-- RPC: adatta le firme se diverse
do $$
begin
  begin grant execute on function public.fn_home_progetti_live()        to anon, authenticated; exception when undefined_function then null; end;
  begin grant execute on function public.fn_progetto_tree(uuid)         to anon, authenticated; exception when undefined_function then null; end;
  begin grant execute on function public.udf_add_def(uuid,text,jsonb)   to authenticated;        exception when undefined_function then null; end;
  begin grant execute on function public.udf_set_value(uuid,text,jsonb) to authenticated;        exception when undefined_function then null; end;
  begin grant execute on function public.udf_list_for_instance(uuid)    to anon, authenticated; exception when undefined_function then null; end;
end $$;
-- ACL CUP per lettura anon
create table if not exists public.cup_acl (
  cup_id uuid primary key references public.cup(id) on delete cascade,
  allow_anon boolean not null default false
);
create index if not exists ix_cup_acl_cup on public.cup_acl(cup_id);
-- Abilita RLS
alter table public.cup        enable row level security;
alter table public.procedura  enable row level security;

-- Policy anon (lettura consentita solo se CUP whitelisted)
create policy if not exists anon_select_cup on public.cup
for select to anon
using (exists (select 1 from public.cup_acl a where a.cup_id = cup.id and a.allow_anon = true));

create policy if not exists anon_select_procedura on public.procedura
for select to anon
using (exists (select 1 from public.cup_acl a where a.cup_id = procedura.cup_id and a.allow_anon = true));

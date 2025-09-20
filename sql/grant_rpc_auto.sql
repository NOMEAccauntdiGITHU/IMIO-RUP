do $$
declare r record;
begin
  for r in
    select n.nspname, p.proname, pg_get_function_identity_arguments(p.oid) args
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in ('fn_home_progetti_live','fn_progetto_tree','udf_list_for_instance','udf_set_value','udf_add_def')
  loop
    execute format(
      'grant execute on function %I.%I(%s) to %s;',
      r.nspname, r.proname, r.args,
      case when r.proname in ('udf_set_value','udf_add_def')
           then 'authenticated'
           else 'anon, authenticated'
      end
    );
  end loop;
end $$;

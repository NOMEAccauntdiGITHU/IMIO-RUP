select proname, pg_get_function_arguments(p.oid) as args
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public'
  and proname in ('fn_home_progetti_live','fn_progetto_tree','udf_list_for_instance','udf_set_value','udf_add_def')
order by proname;

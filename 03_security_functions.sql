

-- Introspection RPCs (safe helpers)
create or replace function introspect_tables()
returns table(table_name text) language sql security definer set search_path=public as $$
  select tab.table_name
    from information_schema.tables tab
      where tab.table_schema = 'public' and tab.table_type='BASE TABLE'
        order by tab.table_name;
        $$;

        create or replace function introspect_columns(p_table text)
        returns table(column_name text, data_type text, is_nullable text)
        language sql security definer set search_path=public as $$
          select col.column_name, col.data_type, col.is_nullable
            from information_schema.columns col
              where col.table_schema='public' and col.table_name = p_table
                order by col.ordinal_position;
                $$;

                
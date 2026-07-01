-- STORAGE BUCKET: MEDIA
insert into storage.buckets (id, name, public) 
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public Access" on storage.objects for select using ( bucket_id = 'media' );
create policy "Authenticated users can upload" on storage.objects for insert to authenticated with check ( bucket_id = 'media' );
create policy "Authenticated users can update" on storage.objects for update to authenticated using ( bucket_id = 'media' );
create policy "Authenticated users can delete" on storage.objects for delete to authenticated using ( bucket_id = 'media' );

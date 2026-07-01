ALTER TABLE public.vehicle_categories
ADD COLUMN seats TEXT,
ADD COLUMN price TEXT,
ADD COLUMN features JSONB DEFAULT '[]'::jsonb;

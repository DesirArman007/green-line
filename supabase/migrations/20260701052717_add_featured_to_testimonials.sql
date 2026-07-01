ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

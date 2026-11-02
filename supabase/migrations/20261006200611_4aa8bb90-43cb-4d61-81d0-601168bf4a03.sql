CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.contractor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  business_name text,
  business_type text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  project_zip text,
  website text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.cabinet_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  project_zip text NOT NULL,
  project_type text NOT NULL,
  collection_interest text,
  project_stage text NOT NULL,
  timing text NOT NULL,
  details text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
GRANT INSERT ON public.contractor_applications TO anon, authenticated;
GRANT ALL ON public.contractor_applications TO service_role;
GRANT INSERT ON public.cabinet_projects TO anon, authenticated;
GRANT ALL ON public.cabinet_projects TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contractor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cabinet_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visitors can send an inquiry" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "visitors can apply for contractor pricing" ON public.contractor_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "visitors can submit a cabinet project" ON public.cabinet_projects FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.contact_recent_count(_email text)
RETURNS bigint LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT count(*) FROM public.contact_submissions WHERE lower(email) = lower(_email) AND created_at > now() - interval '1 hour' $$;

CREATE OR REPLACE FUNCTION public.contractor_recent_count(_email text)
RETURNS bigint LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT count(*) FROM public.contractor_applications WHERE lower(email) = lower(_email) AND created_at > now() - interval '1 hour' $$;

CREATE OR REPLACE FUNCTION public.cabinet_recent_count(_email text)
RETURNS bigint LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT count(*) FROM public.cabinet_projects WHERE lower(email) = lower(_email) AND created_at > now() - interval '1 hour' $$;

GRANT EXECUTE ON FUNCTION public.contact_recent_count(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.contractor_recent_count(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cabinet_recent_count(text) TO anon, authenticated;
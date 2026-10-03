DROP POLICY IF EXISTS "Visitors can send an inquiry" ON public.inquiries;
REVOKE INSERT ON public.inquiries FROM anon, authenticated;
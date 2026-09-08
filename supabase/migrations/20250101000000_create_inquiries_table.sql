-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  services TEXT[] NOT NULL,
  goals TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow only the service role to insert inquiries
CREATE POLICY "Allow service role to insert inquiries"
  ON inquiries
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow only the service role to read inquiries (for admin purposes)
CREATE POLICY "Allow service role to read inquiries"
  ON inquiries
  FOR SELECT
  TO service_role
  USING (true);

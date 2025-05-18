/*
  # Initial schema setup
  
  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `digital_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `type` (text)
      - `category` (text)
      - `last_used_date` (timestamp)
      - `usage_frequency` (text)
      - `importance` (text)
      - `platform` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `health_checks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `check_date` (timestamp)
      - `total_items` (integer)
      - `unused_items` (integer)
      - `recommendations` (text[])
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create digital_items table
CREATE TABLE IF NOT EXISTS digital_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  category text NOT NULL,
  last_used_date timestamptz,
  usage_frequency text NOT NULL,
  importance text NOT NULL,
  platform text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create health_checks table
CREATE TABLE IF NOT EXISTS health_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  check_date timestamptz DEFAULT now(),
  total_items integer NOT NULL,
  unused_items integer NOT NULL,
  recommendations text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_checks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own digital items"
  ON digital_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create digital items"
  ON digital_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own digital items"
  ON digital_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own digital items"
  ON digital_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own health checks"
  ON health_checks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create health checks"
  ON health_checks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

# Zakat App with Google Login

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Create `.env.local` file
   ```env
   POSTGRES_URL=your_neon_url
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. Run locally
   ```bash
   npm run dev
   ```

4. Deploy on Vercel and set the same env vars in project settings.

## Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  image TEXT,
  role VARCHAR(10) DEFAULT 'user',
  created TIMESTAMP DEFAULT NOW()
);

ALTER TABLE zakat_logs
  ADD COLUMN user_id INT REFERENCES users(id);
```

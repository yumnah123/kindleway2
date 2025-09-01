
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Pool } from "@vercel/postgres";

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const client = await pool.connect();
      try {
        await client.query(
          `INSERT INTO users (name, email, image)
           VALUES ($1, $2, $3)
           ON CONFLICT (email) DO UPDATE
           SET name = EXCLUDED.name, image = EXCLUDED.image`,
          [user.name, user.email, user.image]
        );
      } finally {
        client.release();
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);


import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Zakat App with Google Login</h1>
      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <p className="mb-4">Welcome {session.user.name}</p>
          <div className="flex gap-4">
            <Link href="/submit" className="text-blue-500 underline">
              Submit Zakat
            </Link>
            <Link href="/admin" className="text-blue-500 underline">
              Admin Dashboard
            </Link>
          </div>
          <button
            onClick={() => signOut()}
            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
          >
            Sign out
          </button>
        </>
      )}
    </main>
  );
}

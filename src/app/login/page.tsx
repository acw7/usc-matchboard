"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  if (session) {
    return (
      <main className="p-6 space-y-4">
        <p>Signed in as {session.user?.email}</p>
        <button className="px-3 py-2 rounded bg-gray-200" onClick={() => signOut()}>
          Sign out
        </button>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4 max-w-md">
      <h1 className="text-2xl font-semibold">Sign in with USC email</h1>
      <form
        onSubmit={(e) => { e.preventDefault(); signIn("email", { email, callbackUrl: "/" }); }}
        className="space-y-3"
      >
        <input
          type="email"
          required
          placeholder="yourname@usc.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button className="px-3 py-2 rounded bg-black text-white">Email me a link</button>
      </form>
      <p className="text-sm text-gray-500">We only accept @usc.edu addresses.</p>
    </main>
  );
}

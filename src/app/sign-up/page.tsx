"use client";

import { useState } from "react";
import { authClient } from "../../../lib/auth-client";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { data, error } = await authClient.signUp.email(
      { email, password, name, callbackURL: "/dashboard" },
      {
        onRequest: () => console.log("Signing up..."),
        onSuccess: () => {
          window.location.href = "/dashboard";
        },
        onError: (ctx) => alert(ctx.error.message),
      }
    );

    console.log(data, error);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

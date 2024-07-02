"use client";

import { Button } from "@/components/ui/button";
import { account, ID } from "@/appwrite/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { OAuthProvider } from "appwrite";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      await account.createEmailPasswordSession(email, password);
      //setUser(await account.get())
      setEmail("");
      setPassword("");
      toast.success("LogIn successfully");
      router.push("/home");
    } catch (e) {
      console.error(e);
    }
  }
  async function registerwithGoogle() {
    try {
      account.createOAuth2Session(
        OAuthProvider.Google, // provider
        "http://localhost:3000/home" // redirect here on success
      );
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">SignUp</h2>
        <form>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-center m-auto mt-4">
            <Button type="button" onClick={registerwithGoogle}>
              LogIn with Google
            </Button>
          </div>
          <div className="flex items-center justify-center m-auto mt-4">
            <Button type="button" onClick={handleLogin}>
              LogIn
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

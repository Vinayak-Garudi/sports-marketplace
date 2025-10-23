"use client";

import { useState } from "react";
import { Input } from "@/components/custom/Input";
import { Button } from "@/components/custom/Button";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Hash password using SHA-256
  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Hash the password before sending
      const hashedPassword = await hashPassword(password);

      const loginData = {
        username,
        password: hashedPassword,
      };

      // TODO: Implement admin authentication logic
      console.log("Login attempt:", loginData);
      console.log("Logging in with:", { username, userRole: "admin" });

      // Set user role in cookies
      document.cookie = `user-role=admin; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days expiry

      // Implement your authentication logic here
      // For example: call an API route, verify credentials, redirect, etc.

      setIsLoading(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
          maxLength={50}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full"
        />
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="showPassword"
            className="ml-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
          >
            Show password
          </label>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

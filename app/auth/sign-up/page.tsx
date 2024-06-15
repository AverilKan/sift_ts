"use client"

import { useState } from "react"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase/config"

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CreateUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  
  const handleSignUp = async () => {
    try {
      const res = await CreateUserWithEmailAndPassword(email, password);
      console.log(res);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  }
  
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-[400px] space-y-6 p-6 md:p-8">
        <div className="text-center">
          <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Enter your details to get started.
          </CardDescription>
        </div>
        <form className="grid gap-4" onSubmit={handleSignUp}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="./sign-in" className="font-medium text-gray-900 hover:underline dark:text-gray-400" prefetch={false}>
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  )
}
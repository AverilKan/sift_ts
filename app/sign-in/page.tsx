"use client"

import { useState } from "react"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase/config"
import { useRouter } from "next/navigation"

export default function Component() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
  const router = useRouter();

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password)
        console.log(res)
        setEmail("")
        setPassword("")
        if (res) {
            router.push("/")
        }
    } catch (e) {
        console.error(e)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-[400px] space-y-6 p-6 md:p-8">
        <div className="text-center">
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Enter your details to access your account.
          </CardDescription>
        </div>
        <form className="grid gap-4" onSubmit={handleSignIn}>
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
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link href="/sign-up" className="font-medium text-gray-900 hover:underline dark:text-gray-400" prefetch={false}>
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  )
}
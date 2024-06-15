import Link from "next/link"

export default function Component() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-[800px] rounded-2xl bg-white shadow-lg dark:bg-gray-950">
        <div className="flex w-1/2 flex-col items-center justify-center space-y-6 rounded-l-2xl bg-gray-900 p-8 text-white">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-gray-300">Sign in to your account to continue.</p>
          <Link
            href="auth/sign-in"
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-300"
            prefetch={false}
          >
            Sign In
          </Link>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center space-y-6 rounded-r-2xl bg-white p-8 dark:bg-gray-950">
          <h1 className="text-3xl font-bold">Join us today!</h1>
          <p className="text-gray-500 dark:text-gray-400">Create an account to get started.</p>
          <Link
            href="auth/sign-up"
            className="inline-flex h-10 w-full items-center justify-center rounded-md border border-gray-200 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:ring-gray-300"
            prefetch={false}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
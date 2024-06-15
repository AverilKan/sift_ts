'use client'

import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import CanvasArea from "@/components/canvas/CanvasArea";
import Head from "next/head";


export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (!user) {
    router.push("/auth");
  }

  return (
    <div>
      <Head>
        <title>Canvas Node App</title>
        <meta name="description" content="Interactive canvas to add and link nodes" />
      </Head>
      <main>
        <h1>Canvas Node Linker</h1>
        <CanvasArea />
      </main>
    </div>
  );
}

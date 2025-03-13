"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Pour accéder à la <span className="text-primary">plateforme</span>, veuillez vous connecter.
      </h1>
      <div className="container flex flex-col items-center py-20">
        <Button variant="secondary" onClick={() => signIn("authentik", { callbackUrl: "/dashboard" })}>
          <img src="https://git.inpt.fr/inp-net/visual-identity/-/raw/main/derivations/auth.svg" />
          Connexion avec INP-net
        </Button>
      </div>
    </div>
  )
}


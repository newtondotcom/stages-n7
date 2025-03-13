"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Accueil",
      active: pathname === "/",
    },
    {
      href: "/internships",
      label: "Explorer",
      active: pathname === "/internships" || (pathname.startsWith("/internships/") && !pathname.includes("/new")),
    },
    {
      href: "/internships/new",
      label: "Déclarer",
      active: pathname === "/internships/new",
    },
    {
      href: "/dashboard",
      label: "Tableau de bord",
      active: pathname === "/dashboard",
    },
  ]

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <img src="/n7.png" alt="ENSEEIHT Stages" width={50} />
        <span className="font-bold hidden md:inline-block">Stages</span>
      </Link>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}


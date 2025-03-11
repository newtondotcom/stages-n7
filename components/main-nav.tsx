"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { GraduationCap } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/internships",
      label: "Browse",
      active: pathname === "/internships" || (pathname.startsWith("/internships/") && !pathname.includes("/new")),
    },
    {
      href: "/internships/new",
      label: "Declare",
      active: pathname === "/internships/new",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
  ]

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <GraduationCap className="h-6 w-6" />
        <span className="font-bold hidden md:inline-block">ENSEEIHT Internships</span>
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


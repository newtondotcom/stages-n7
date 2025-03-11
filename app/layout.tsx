import type React from "react";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ENSEEIHT Internship Platform",
  description: "Find and share internship opportunities for ENSEEIHT students",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="flex min-h-screen flex-col">
              <header className="border-b">
                <div className="container mx-auto flex h-16 items-center px-4">
                  <MainNav />
                  <div className="ml-auto flex items-center space-x-4">
                    <UserNav />
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} ENSEEIHT Internship Platform •
                  Developed by the ENSEEIHT Student Team
                </div>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";

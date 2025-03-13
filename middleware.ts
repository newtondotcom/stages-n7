export { default } from "next-auth/middleware";

// Ajouter des exceptions pour les pages publiques
export const config = {
  matcher: ["/dashboard", "/internships/new", "/internships/:path*"],
};

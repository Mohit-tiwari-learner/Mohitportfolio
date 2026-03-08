"use client";
import SplashCursor from "@/components/ui/splash-cursor";

// This wrapper exists so layout.tsx (Server Component) can safely 
// include browser-only components via a Client Component boundary.
export function ClientProviders() {
    return <SplashCursor />;
}

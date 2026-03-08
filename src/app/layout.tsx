import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientProviders } from "@/components/ClientProviders";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Mohit Tiwari — Data Scientist & ML Engineer",
    description:
        "Portfolio of Mohit Tiwari. ML Engineer & Data Scientist building intelligent systems with Python, NLP, and data science. View projects, case studies, and experience.",
    authors: [{ name: "Mohit Tiwari" }],
    keywords: [
        "data scientist",
        "ML engineer",
        "machine learning",
        "portfolio",
        "Mohit Tiwari",
        "Python",
        "NLP",
        "AI",
    ],
    openGraph: {
        title: "Mohit Tiwari — Data Scientist & ML Engineer",
        description:
            "ML Engineer building intelligent systems with Python, NLP, and data science.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mohit Tiwari — Data Scientist & ML Engineer",
        description:
            "ML Engineer building intelligent systems with Python, NLP, and data science.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
            <body className="font-sans antialiased">
                <SmoothScroll>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <ClientProviders />
                    </ThemeProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}

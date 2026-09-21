import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundDots } from "@/components/aceternity/background-dots";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/layout/command-menu";
import { AIAssistant } from "@/components/layout/ai-assistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Hussien | Full Stack Software Engineer & Founder at CyberLabs",
  description:
    "Elite Portfolio of Ahmed Hussien — Full Stack Software Engineer & Founder at CyberLabs. Specialized in Next.js, NestJS, and pure software cloud architecture.",
  keywords: [
    "Ahmed Hussien",
    "CyberLabs",
    "Full Stack Engineer",
    "Software Engineer",
    "NestJS",
    "Next.js",
    "TypeScript",
    "Cloud Architecture",
  ],
  authors: [{ name: "Ahmed Hussien" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans antialiased text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundDots>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <CommandMenu />
            <AIAssistant />
          </BackgroundDots>
        </ThemeProvider>
      </body>
    </html>
  );
}

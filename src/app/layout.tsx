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
  title: "Ahmed Hussien | Senior Full Stack Software Engineer & Cloud Architect",
  description:
    "Production portfolio of Ahmed Hussien — Senior Full Stack Software Engineer & Cloud Solutions Architect. Specialized in Next.js 16, NestJS, TypeScript, and high-performance cloud infrastructure.",
  keywords: [
    "Ahmed Hussien",
    "Senior Software Engineer",
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LayoutModeProvider } from "@/providers/layout-mode-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MartirisDev | Full Stack Software Engineer",
    template: "%s | MartirisDev"
  },
  description: "Full Stack Developer specializing in scalable architectures, React, and Supabase. View my case studies and technical articles.",
  keywords: ["Full Stack Developer", "Software Engineer", "React", "Next.js", "Supabase", "TypeScript", "Portfolio"],
  authors: [{ name: "Martiris Yordenis Guzman" }],
  creator: "Martiris Yordenis Guzman",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://martirisdev.com",
    title: "MartirisDev | Full Stack Software Engineer",
    description: "Full Stack Developer specializing in scalable architectures, React, and Supabase.",
    siteName: "MartirisDev Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "MartirisDev | Full Stack Software Engineer",
    description: "Full Stack Developer specializing in scalable architectures, React, and Supabase.",
    creator: "@martirisdev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased selection:bg-primary/10 selection:text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutModeProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </LayoutModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

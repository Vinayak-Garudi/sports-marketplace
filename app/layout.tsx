import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tennis Marketplace - Buy Second-Hand Tennis Equipment",
  description: "Buy quality used tennis gear. Connect directly with local sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col">
            <div className="fixed top-4 right-4 z-50">
              <ThemeSwitcher />
            </div>
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t py-8 mt-auto">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>© 2025 Tennis Marketplace. Connect with local sellers.</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

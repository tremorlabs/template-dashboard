import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Sidebar } from "@/components/ui/navigation/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950 min-h-screen scroll-auto`}
        suppressHydrationWarning
      >
        <div className="max-w-screen-2xl mx-auto">
          <ThemeProvider defaultTheme="system" attribute="class">
            <Sidebar />
            <section className="lg:pl-64">{children}</section>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

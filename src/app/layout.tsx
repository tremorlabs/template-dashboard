import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

import { Sidebar } from "@/components/ui/navigation/sidebar"
import { siteConfig } from "./siteConfig"

export const metadata: Metadata = {
  metadataBase: new URL("https://yoururl.com"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
  authors: [
    {
      name: "yourname",
      url: "",
    },
  ],
  creator: "yourname",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
}

function Banner() {
  return (
    <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 transition hover:-translate-y-px">
      <a
        href="https://blocks.tremor.so/templates"
        className="rounded-full bg-gray-950 px-6 py-3 shadow-lg shadow-black/20 ring-1 ring-white/10 hover:bg-gray-900"
      >
        <span className="font-medium text-white">Get this template</span>
      </a>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-y-scroll scroll-auto antialiased selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-screen-2xl">
          <ThemeProvider defaultTheme="system" attribute="class">
            <Sidebar />
            <main className="lg:pl-72">{children}</main>
            <Banner />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}

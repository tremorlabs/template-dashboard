import { RiGithubFill } from "@remixicon/react"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

import { ArrowAnimated } from "@/components/ui/icons/ArrowAnimated"
import { Sidebar } from "@/components/ui/navigation/Sidebar"
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
    <div className="hidden fixed bottom-10 left-1/2 z-50 -translate-x-1/2 transition">
      <div className="flex items-center gap-x-1 rounded-full bg-gray-950 p-1 text-sm shadow-xl shadow-black/20 ring-1 ring-white/10">
        <a
          className="flex items-center gap-x-2 rounded-l-[20px] rounded-r-md bg-gray-900 py-2 pl-4 pr-2 font-semibold text-gray-50 ring-1 ring-inset ring-white/20 hover:bg-gray-800/90 hover:text-white"
          href="[GITHUB_REPO_LINK]"
          target="_blank"
        >
          <RiGithubFill className="-ml-1 size-5 shrink-0" aria-hidden="true" />
          Get OSS version
        </a>
        <a
          className="group flex items-center gap-0.5 rounded-l-md rounded-r-[20px] bg-gradient-to-b from-white to-gray-200 px-4 py-2 font-semibold text-gray-900 ring-1 ring-inset ring-indigo-400/30 transition"
          href="https://blocks.tremor.so/templates#template-dashboard"
          target="_blank"
        >
          Get full code
          <ArrowAnimated />
        </a>
      </div>
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

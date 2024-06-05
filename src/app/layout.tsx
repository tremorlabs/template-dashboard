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
    <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 transition hover:-translate-y-px">
      <div
        className="text-sm rounded-full flex items-center gap-x-1 bg-gray-950 p-1 py-1 shadow-xl shadow-black/20 ring-1 ring-white/10 hover:bg-gray-900"
      >
        <a
          className="font-medium text-white py-2 pr-2 pl-4 rounded-l-full flex items-center gap-x-2"
          href="[GITHUB_REPO_LINK]"
          target="_blank"
        >
          <RiGithubFill className="-ml-1 size-5 shrink-0" aria-hidden="true" />
          Get OSS version
        </a>
        <a
          className="font-medium py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full ring-1 ring-inset ring-indigo-400/30"
          href="https://blocks.tremor.so/templates#template-dashboard"
          target="_blank"

        >
          Get full code
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

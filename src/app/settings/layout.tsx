"use client"

import { siteConfig } from "@/app/siteConfig"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationSettings = [
  { name: "General", href: siteConfig.baseLinks.settings.general },
  { name: "Billing & Usage", href: siteConfig.baseLinks.settings.billing },
  { name: "Users", href: siteConfig.baseLinks.settings.users },
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Settings
      </h1>
      <TabNavigation className="mt-4 sm:mt-6 lg:mt-10">
        {navigationSettings.map((item) => (
          <TabNavigationLink
            key={item.name}
            asChild
            active={pathname === item.href}
          >
            <Link href={item.href}>{item.name}</Link>
          </TabNavigationLink>
        ))}
      </TabNavigation>
      <div className="pt-6">{children}</div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/app/siteConfig"
import {
    TabNavigation,
    TabNavigationLink,
} from "@/components/TabNavigation"

const navigationSettings = [
    { name: 'General', href: siteConfig.baseLinks.general },
    { name: 'Billing & Usage', href: siteConfig.baseLinks.billing },
    { name: 'Users', href: siteConfig.baseLinks.users },
]

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname();
    return (
        // @CHRIS: rework HTML semantics
        <nav>
            <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
            <TabNavigation className="mt-8">
                {navigationSettings.map((item) => (
                    <TabNavigationLink key={item.name} asChild active={pathname === item.href}>
                        <Link href={item.href}>{item.name}</Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>
            <div className="pt-6">
                {children}
            </div>
        </nav>
    )
}

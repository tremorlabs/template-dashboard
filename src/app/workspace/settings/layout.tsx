"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/siteConfig";
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation";
import MobileSidebar from "@/components/ui/navbar/mobile-sidebar";

const navigationSettings = [
  { name: "General", href: siteConfig.baseLinks.general },
  { name: "Billing & Usage", href: siteConfig.baseLinks.billing },
  { name: "Users", href: siteConfig.baseLinks.users },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    // @CHRIS: rework HTML semantics
    <nav>
      <div className="mt-6 flex items-center gap-2">
        {/* <RiMenuLine className="size-5 shrink-0 text-gray-900" aria-hidden="true" /> */}
        {/* <MobileSidebar /> */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Settings</h1>
      </div>
      <TabNavigation className="mt-8">
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
    </nav>
  );
}

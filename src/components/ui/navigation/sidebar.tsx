"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/siteConfig";
import { cx, focusRing } from "@/lib/utils";
import { RiHome2Line, RiSettings5Line, RiListCheck } from "@remixicon/react";

import {
  WorkspacesDropdownDesktop,
  WorkspacesDropdownMobile,
} from "./sidebar-workspaces-dropdown";

import MobileSidebar from "./mobile-sidebar";

import { UserProfileDesktop, UserProfileMobile } from "./user-profile";

const navigation = [
  { name: "Overview", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Details", href: siteConfig.baseLinks.details, icon: RiListCheck },
  {
    name: "Settings",
    href: siteConfig.baseLinks.settings,
    icon: RiSettings5Line,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <aside className="px-6 py-4 flex grow flex-col gap-y-6 overflow-y-auto bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
          <div className="-mx-2">
            <WorkspacesDropdownDesktop />
          </div>
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col"
          >
            <ul role="list" className="-mx-2 space-y-1.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cx(
                      pathname === item.href || pathname.includes(item.href)
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:dark:text-gray-50",
                      "hover:bg-gray-100 hover:dark:bg-gray-900 font-medium flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm transition",
                      focusRing
                    )}
                  >
                    <item.icon className="size-5 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="-mx-2 mt-auto">
            <UserProfileDesktop />
          </div>
        </aside>
      </nav>

      {/* top navbar (xs-lg) */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-2 shadow-sm sm:gap-x-6 sm:px-4 lg:hidden">
        <WorkspacesDropdownMobile />
        <div className="flex items-center gap-2">
          <UserProfileMobile />
          <MobileSidebar />
        </div>
      </div>
    </>
  );
}

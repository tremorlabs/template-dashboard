"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/siteConfig";
import { cx } from "@/lib/utils";
import { RiTableLine, RiHome2Line, RiSettings5Line } from "@remixicon/react";
// import { WorkspacesDropdownDesktop } from "./sidebar-dropdown-2";

import {
  WorkspacesDropdownDesktop,
  WorkspacesDropdownMobile,
} from "./sidebar-workspaces-dropdown";

import MobileSidebar from "./mobile-sidebar";

import { UserProfileDesktop, UserProfileMobile } from "./user-profile";

const navigation = [
  { name: "Overview", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Details", href: siteConfig.baseLinks.details, icon: RiTableLine },
  { name: "Settings", href: siteConfig.baseLinks.settings, icon: RiSettings5Line },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {/* sidebar (lg+) */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        {/* @SEV/CHRIS: shadow-inner only right hand side */}
        <div className="px-6 py-4 flex grow flex-col gap-y-4 overflow-y-auto bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
          {/* @SEV/CHRIS: other workspace dropdown version /sidebar-dropdown-2 */}
          <div className="-mx-2">
            <WorkspacesDropdownDesktop />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {/* @SEV: should we componentize this */}
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cx(
                          pathname === item.href || pathname.includes(item.href)
                            // ? "text-indigo-600 bg-indigo-50 dark:text-gray-50",
                            ? "text-indigo-600 dark:text-indigo-500"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:dark:text-gray-50",
                          "hover:bg-gray-100 hover:dark:bg-gray-900 font-medium flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm leading-6",
                        )}
                      >
                        <item.icon
                          className={cx(
                            'size-5 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-2 mt-auto">
                <UserProfileDesktop />
              </li>
            </ul>
          </nav>
        </div>
      </div>
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


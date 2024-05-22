"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/siteConfig";
import { cx } from "@/lib/utils";
import { RiGroupLine, RiHome2Line, RiStackLine } from "@remixicon/react";

import {
  WorkspacesDropdownDesktop,
  WorkspacesDropdownMobile,
} from "./sidebar-workspaces-dropdown";

import MobileSidebar from "./mobile-sidebar";

import { UserProfileDesktop, UserProfileMobile } from "./user-profile";

const navigation = [
  { name: "Overview", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Details", href: siteConfig.baseLinks.details, icon: RiGroupLine },
  { name: "Settings", href: siteConfig.baseLinks.settings, icon: RiStackLine },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {/* sidebar (lg+) */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-7 overflow-y-auto bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 px-6 pb-4">
          <div className="-mx-2 mt-6">
            <WorkspacesDropdownDesktop />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-0.5">
                  {/* @SEV: should we componentize this */}
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cx(
                          pathname === item.href || pathname.includes(item.href)
                            ? "text-indigo-700 bg-indigo-50 dark:text-gray-50 dark:bg-indigo-400/10"
                            : "text-gray-900 dark:text-gray-50 hover:bg-indigo-50 hover:dark:bg-indigo-400/10",
                          "group font-medium flex items-center gap-x-3 rounded-md px-2 py-1.5 text-sm leading-6",
                        )}
                      >
                        {/* <item.icon
                          className={cx(
                            'size-4 shrink-0 text-gray-900'
                          )}
                          aria-hidden="true"
                        /> */}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* --- TEMP --- */}
              <li className="-mx-2 mt-auto">
                {/* <ModalAddWorkspace>
                  <span className="w-full">(TEMP )Add workspace</span>
                </ModalAddWorkspace> */}
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

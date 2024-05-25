"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/siteConfig";
import { cx } from "@/lib/utils";
import { RiTableLine, RiHome2Line, RiSettings5Line } from "@remixicon/react";
import { WorkspacesDropdownDesktop } from "./sidebar-dropdown-2";

import {
  // WorkspacesDropdownDesktop,
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
        <div className="flex grow flex-col overflow-y-auto bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
          <div className="-mx-2 h-20 px-6 flex items-center border-b border-gray-200 dark:border-gray-800">
            {/* <WorkspacesDropdownDesktop /> */}
            <WorkspacesDropdownDesktop />
          </div>
          <nav className="pt-4 px-6 pb-4 flex flex-1 flex-col">
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
                            ? "text-indigo-600 dark:text-gray-50"
                            : "text-gray-900 dark:text-gray-50",
                          "hover:bg-indigo-50 font-medium flex items-center gap-x-3 rounded-md px-2 py-1.5 text-sm leading-6",
                        )}
                      >
                        <item.icon
                          className={cx(
                            'size-4 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* --- TEMP --- */}
              {/* <li className="-mx-2 mt-auto">
                <ModalAddWorkspace>
                  <span className="w-full">(TEMP )Add workspace</span>
                </ModalAddWorkspace>
              </li> */}
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


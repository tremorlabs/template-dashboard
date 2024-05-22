/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import React from 'react'
import { RiGroupLine, RiHome2Line, RiStackLine } from "@remixicon/react";
import { cx } from '@/lib/utils'
import { RiMenuLine } from '@remixicon/react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { siteConfig } from '@/app/siteConfig'
import { Button } from '@/components/Button';
import {
    Drawer,
    DrawerBody,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/Drawer"


const navigation = [
    { name: "Overview", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
    { name: "Details", href: siteConfig.baseLinks.details, icon: RiGroupLine },
    { name: "Settings", href: siteConfig.baseLinks.settings, icon: RiStackLine },
];


export default function MobileSidebar() {
    const pathname = usePathname();
    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button
                        variant="ghost"
                        aria-label="open sidebar"
                        // @SEV: focus glitch when focusInput is not used, with focusInput -> focusInput stays until clicked again -> not good
                        className={cx(
                            // focusInput,
                            "group flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100 hover:dark:bg-gray-400/10 focus:outline-none",
                        )}
                    >
                        <RiMenuLine className="size-5 shrink-0" aria-hidden="true" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="sm:max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle>Retail Analytics</DrawerTitle>
                        {/* <DrawerDescription className="mt-1 text-sm">
                            Your account has been created successfully. You can now login to
                            your account. For more information, please contact us.
                        </DrawerDescription> */}
                    </DrawerHeader>
                    <DrawerBody>
                        <ul role="list" className="-mx-2 space-y-0.5">
                            {/* @SEV: should we componentize this */}
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <DrawerClose asChild>
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
                                    </DrawerClose>
                                </li>
                            ))}
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

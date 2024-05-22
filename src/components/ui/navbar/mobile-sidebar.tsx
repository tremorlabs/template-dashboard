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

// @CHRIS: consolidate Fragment
import { Fragment } from 'react'
import React from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { RiGroupLine, RiHome2Line, RiStackLine } from "@remixicon/react";
import { cx } from '@/lib/utils'
import { RiCloseLine, RiMenuLine } from '@remixicon/react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { siteConfig } from '@/app/siteConfig'

const navigation = [
    { name: "Overview", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
    { name: "Details", href: siteConfig.baseLinks.details, icon: RiGroupLine },
    { name: "Settings", href: siteConfig.baseLinks.settings, icon: RiStackLine },
];


export default function MobileSidebar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const pathname = usePathname();
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div>
                {/* @CHRIS: replace button + bring back p-2.5 */}
                <button type="button" className="p-2 flex items-center justify-center text-gray-900 lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                    <span className="sr-only">Open sidebar</span>
                    <RiMenuLine className="size-5 shrink-0" aria-hidden="true" />
                </button>
                <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog className="relative z-50 lg:hidden" onClose={setMobileMenuOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setMobileMenuOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <RiCloseLine className="size-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* @CHRIS: dark mode */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                        <nav className="mt-6 flex flex-1 flex-col">
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
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </>
    )
}

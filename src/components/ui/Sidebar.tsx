'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { siteConfig } from "@/app/siteConfig"
import { cx } from "@/lib/utils";
import {
    RiArrowRightSLine,
    RiExpandUpDownLine,
    RiGroupLine,
    RiHome2Line,
    RiMenuLine,
    RiSettings2Line,
    RiStackLine
} from "@remixicon/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../Dropdown";

const navigation = [
    { name: 'Overview', href: siteConfig.baseLinks.overview, icon: RiHome2Line },
    { name: 'Details', href: siteConfig.baseLinks.details, icon: RiGroupLine },
    { name: 'Settings', href: siteConfig.baseLinks.settings, icon: RiStackLine },
]

const data = [
    {
        value: 'retail-analytics',
        name: 'Retail analytics',
        initials: 'CK',
        role: 'Admin',
        color: 'bg-indigo-600',
    },
    {
        value: 'livestream',
        name: 'Livestream',
        initials: 'LI',
        role: 'Admin',
        color: 'bg-blue-600',
    },
    {
        value: 'data-science-workspace',
        name: 'Data science workspace',
        initials: 'DS',
        role: 'Viewer',
        color: 'bg-cyan-600',
    },
    {
        value: 'retail-analytics',
        name: 'Retail analytics',
        initials: 'RE',
        role: 'Admin',
        color: 'bg-purple-600',
    },
];



export function Sidebar() {
    const pathname = usePathname();
    return (
        <>
            {/* sidebar (lg+) */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-7 overflow-y-auto bg-white border-r px-6 pb-4">
                    <div className="-mx-2 mt-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none">
                                    <span
                                        className={cx(
                                            'flex size-8 aspect-square items-center justify-center rounded bg-indigo-600 p-2 text-xs font-medium text-white',
                                        )}
                                        aria-hidden="true"
                                    >
                                        CK
                                    </span>
                                    <div className="flex w-full items-center justify-between gap-x-4 truncate">
                                        <div className="truncate">
                                            <p className="truncate whitespace-nowrap text-sm font-medium text-gray-900">
                                                Retail analytics
                                            </p>
                                            <p className="whitespace-nowrap text-left text-xs text-gray-700">
                                                Admin
                                            </p>
                                        </div>
                                        <RiExpandUpDownLine
                                            className="size-5 shrink-0 text-gray-500"
                                            aria-hidden={true}
                                        />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Workspaces (4)</DropdownMenuLabel>
                                    {data.map((item) => (
                                        <DropdownMenuItem key={item.value}>
                                            <div className="flex w-full items-center gap-x-2.5">
                                                <span
                                                    className={cx(
                                                        item.color,
                                                        'flex size-8 aspect-square items-center justify-center rounded p-2 text-xs font-medium text-white',
                                                    )}
                                                    aria-hidden={true}
                                                >
                                                    {item.initials}
                                                </span>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-gray-700">
                                                        {item.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Log out all</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-0.5">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cx(
                                                    pathname === item.href
                                                        ? 'text-indigo-700 bg-indigo-50'
                                                        : 'text-gray-900 hover:bg-indigo-50',
                                                    'group font-medium flex items-center gap-x-3 rounded-md px-2 py-1.5 text-sm leading-6'
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
                            <li className="mt-auto">
                                <a
                                    href="#"
                                    className="group -mx-2 flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-100"
                                >
                                    <RiSettings2Line
                                        className="size-5 shrink-0 text-gray-700"
                                        aria-hidden="true"
                                    />
                                    Emma Pfeiffer
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div >

            {/* sidebar (xs-lg) */}
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
                <div className="-mx-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-x-1.5 p-2 rounded-md hover:bg-gray-100 focus:outline-none">
                                <span
                                    className={cx(
                                        'flex size-7 aspect-square items-center justify-center rounded bg-indigo-600 p-2 text-xs font-medium text-white',
                                    )}
                                    aria-hidden="true"
                                >
                                    CK
                                </span>
                                <RiArrowRightSLine className="size-4 shrink-0 text-gray-500" aria-hidden={true} />
                                <div className="flex w-full items-center justify-between gap-x-3 truncate">
                                    <p className="truncate whitespace-nowrap font-medium text-gray-900">
                                        Retail analytics
                                    </p>
                                    <RiExpandUpDownLine
                                        className="size-4 shrink-0 text-gray-500"
                                        aria-hidden={true}
                                    />
                                </div>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="!min-w-72">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Workspaces (4)</DropdownMenuLabel>
                                {data.map((item) => (
                                    <DropdownMenuItem key={item.value}>
                                        <div className="flex w-full items-center gap-x-2.5">
                                            <span
                                                className={cx(
                                                    item.color,
                                                    'flex size-8 aspect-square items-center justify-center rounded p-2 text-xs font-medium text-white',
                                                )}
                                                aria-hidden={true}
                                            >
                                                {item.initials}
                                            </span>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-700">
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Log out all</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <button type="button" className="-m-2.5 p-2.5 text-gray-700">
                    <span className="sr-only">Open sidebar</span>
                    <RiMenuLine className="size-6" aria-hidden={true} />
                </button>
            </div>
        </>
    )
}

"use client"

import { Input } from "@/components/Input"

export function Searchbar() {
    return (
        <div className="sticky top-0 z-40 h-20 shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-2 sm:gap-x-6 sm:px-6 hidden lg:flex">
            <Input type="search" placeholder="Search metrics..." className="w-80" />
        </div>
    )
}
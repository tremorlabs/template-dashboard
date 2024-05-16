"use client"

import { RiAddCircleLine, RiCloseLine, RiDownloadLine, RiSettings2Line } from "@remixicon/react"
import { cx } from "@/lib/utils"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/Button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/Dropdown"

interface DataTableStatusFilterProps<TData> {
    table: Table<TData>
}

export function DataTableStatusFilter<TData>({
    table,
}: DataTableStatusFilterProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="flex items-center gap-x-1.5 rounded-full px-2 py-1 hover:bg-gray-50 border border-gray-300 border-dashed text-xs text-gray-600 font-semibold"
                >
                    <RiAddCircleLine className="-ml-1 size-4 shrink-0" aria-hidden={true} />
                    Amount
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Display properties</DropdownMenuLabel>
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanHide()
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
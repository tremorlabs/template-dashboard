"use client"

import { RiEqualizer2Line } from "@remixicon/react"
import { cx, focusInput } from "@/lib/utils"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/Button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/Dropdown"

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>
}


// @Maxime: how to default hide 1 or 2 column? Does not seem to work via this https://tanstack.com/table/v8/docs/guide/column-visibility?

export function DataTableViewOptions<TData>({
    table,
}: DataTableViewOptionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className={cx(
                        // focusInput,
                        "ml-auto hidden py-1.5 lg:flex gap-x-2 font-semibold focus:outline-none"
                    )}
                >
                    <RiEqualizer2Line className="-ml-0.5 size-4" aria-hidden={true} />
                    View options
                </Button>
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
"use client"

import { RiCloseLine, RiDownloadLine, RiSettings2Line } from "@remixicon/react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function Filterbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-x-2">
                {/* @CHRIS/SEV: focusRing does not work */}
                <Input
                    placeholder="Filter transactions..."
                    type="search"
                    value={(table.getColumn("owner")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("owner")?.setFilterValue(event.target.value)
                    }
                    className="w-[150px] lg:w-[250px]"
                />
                {isFiltered && (
                    <Button
                        variant="secondary"
                        onClick={() => table.resetColumnFilters()}
                        className="py-1.5 px-2 lg:px-3"
                    >
                        Reset
                        <RiCloseLine className="ml-2 size-4" />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary" className="gap-x-2 font-semibold">
                    <RiDownloadLine className="-ml-0.5 size-4 shrink-0" aria-hidden={true} />
                    Export
                </Button>
                <DataTableViewOptions table={table} />
            </div>
        </div>
    )
}
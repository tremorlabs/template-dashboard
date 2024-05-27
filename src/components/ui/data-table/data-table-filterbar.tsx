"use client";

import { RiDownloadLine } from "@remixicon/react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/Button";
import { Searchbar } from "@/components/Searchbar";

import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFilter } from "./data-table-filter";

import { regions, status, conditions } from "@/data/data"
import { formatters } from "@/lib/utils"
import React from "react"

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function Filterbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex flex-wrap sm:gap-x-6 items-center justify-between">
            <div className="flex flex-wrap flex-1 items-center gap-2">
                {table.getColumn("status")?.getIsVisible() && (
                    <DataTableFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={status}
                        type="select"
                    />
                )}
                {table.getColumn("region")?.getIsVisible() && (
                    <DataTableFilter
                        column={table.getColumn("region")}
                        title="Region"
                        options={regions}
                        type="checkbox"
                    />
                )}
                {table.getColumn("costs")?.getIsVisible() && (
                    <DataTableFilter
                        column={table.getColumn("costs")}
                        title="Costs"
                        type="number"
                        options={conditions}
                        formatter={formatters.currency}
                    />
                )}
                {table.getColumn("owner")?.getIsVisible() && (
                    <Searchbar
                        placeholder="Search by owner..."
                        variant="light"
                        // @Maxime: how to allow more columns (e.g. status, owner or region)
                        value={(table.getColumn("owner")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("owner")?.setFilterValue(event.target.value)
                        }
                        className="[&>input]:h-[30px] w-full sm:max-w-[250px] lg:max-w-[300px]"
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="px-2 py-1 text-indigo-600 font-semibold"
                    >
                        Clear filters
                        {/* <RiCloseLine className="ml-2 size-4" /> */}
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary" className="hidden lg:flex gap-x-2 py-1 px-2">
                    <RiDownloadLine className="-ml-px size-4 shrink-0" aria-hidden="true" />
                    Export
                </Button>
                <DataTableViewOptions table={table} />
            </div>
        </div>
    )
}

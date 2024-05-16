"use client"

import * as React from "react"
import { cx } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableFoot,
    TableHead,
    TableHeaderCell,
    TableRow,
} from "@/components/Table"

import { Filterbar } from "./data-table-filterbar"
import { DataTablePagination } from "./data-table-pagination"

import {
    flexRender,
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
            // columnVisibility,
        },
        initialState: {
            columnVisibility: {
                "owner": false
            },
            // pagination: {
            //     pageIndex: 0,
            //     pageSize: pageSize,
            // },
        },
        enableRowSelection: true,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <>
            <div className="space-y-4">
                <Filterbar table={table} />
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-y border-gray-200"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHeaderCell
                                        key={header.id}
                                        className={cx(
                                            header.column.columnDef.meta?.align,
                                            "py-2.5"
                                        )}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </TableHeaderCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    {/* @CHRIS: add whitespace-nowrap to cells */}
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => row.toggleSelected(!row.getIsSelected())}
                                    className="group select-none hover:bg-gray-50"
                                >
                                    {row.getVisibleCells().map((cell, index) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cx(
                                                row.getIsSelected()
                                                    ? 'bg-gray-50'
                                                    : '',
                                                cell.column.columnDef.meta?.align,
                                                'relative py-3',
                                            )}
                                        >
                                            {index === 0 && row.getIsSelected() && (
                                                <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                            )}
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    {/* <TableFoot>
                    <TableRow>
                        <TableHeaderCell colSpan={1}>
                            <Checkbox
                                {...{
                                    checked: table.getIsAllPageRowsSelected(),
                                    indeterminate: table.getIsSomePageRowsSelected(),
                                    onChange: table.getToggleAllPageRowsSelectedHandler(),
                                }}
                                className="translate-y-0.5"
                            />
                        </TableHeaderCell>
                        <TableHeaderCell colSpan={7} className="font-normal tabular-nums py-3">
                            {Object.keys(rowSelection).length} of{' '}
                            {table.getRowModel().rows.length} Page Row(s) selected
                        </TableHeaderCell>
                    </TableRow>
                </TableFoot> */}
                </Table>
                <DataTablePagination table={table} pageSize={20} />
            </div>
        </>
    )
}
// import {
//     Table,

//   } from "@/components/Table"

import {
    Table, TableBody,
    TableCell,
    TableFoot,
    TableHead,
    TableHeaderCell,
    TableRow,
} from "@/components/Table"

import * as React from "react"

import {
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
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
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="border-b border-tremor-border dark:border-dark-tremor-border"
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHeaderCell
                                    key={header.id}
                                    className={classNames(header.column.columnDef.meta.align)}
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
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            onClick={() => row.toggleSelected(!row.getIsSelected())}
                            className="group select-none hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted"
                        >
                            {row.getVisibleCells().map((cell, index) => (
                                <TableCell
                                    key={cell.id}
                                    className={classNames(
                                        row.getIsSelected()
                                            ? 'bg-tremor-background-muted dark:bg-dark-tremor-background-muted'
                                            : '',
                                        cell.column.columnDef.meta.align,
                                        'relative',
                                    )}
                                >
                                    {index === 0 && row.getIsSelected() && (
                                        <div className="absolute inset-y-0 left-0 w-0.5 bg-tremor-brand dark:bg-dark-tremor-brand" />
                                    )}
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFoot>
                    <TableRow>
                        <TableHeaderCell colSpan={1}>
                            <IndeterminateCheckbox
                                {...{
                                    checked: table.getIsAllPageRowsSelected(),
                                    indeterminate: table.getIsSomePageRowsSelected(),
                                    onChange: table.getToggleAllPageRowsSelectedHandler(),
                                }}
                                className="-translate-y-[1px]"
                            />
                        </TableHeaderCell>
                        <TableHeaderCell colSpan={7} className="font-normal tabular-nums">
                            {Object.keys(rowSelection).length} of{' '}
                            {table.getRowModel().rows.length} Page Row(s) selected
                        </TableHeaderCell>
                    </TableRow>
                </TableFoot>
            </Table>

        </>
    )
}
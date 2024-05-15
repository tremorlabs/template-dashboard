"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "@/data/schema"
import { Checkbox } from "@/components/Checkbox"

export const columns: ColumnDef<Transaction>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
                className="-translate-y-[1px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
                className="-translate-y-[1px]"
            />
        ),
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Workspace',
        accessorKey: 'workspace',
        enableSorting: true,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Owner',
        accessorKey: 'owner',
        enableSorting: true,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Region',
        accessorKey: 'region',
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Capacity',
        accessorKey: 'capacity',
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Costs',
        accessorKey: 'costs',
        enableSorting: false,
        meta: {
            align: 'text-right',
        },
    },
    {
        header: 'Last edited',
        accessorKey: 'lastEdited',
        enableSorting: false,
        meta: {
            align: 'text-right',
        },
    },

]


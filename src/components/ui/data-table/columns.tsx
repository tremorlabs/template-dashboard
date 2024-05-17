"use client"

import { RiDeleteBin7Line, RiPencilLine, RiPlayListAddLine } from "@remixicon/react"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Transaction } from "@/data/schema"
import { Checkbox } from "@/components/Checkbox"
import { DataTableRowActions } from "./data-table-row-actions"
import { ConditionFilter } from "./data-table-filter"
import { formatters } from "@/lib/utils"

export const columns: ColumnDef<Transaction>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            // @Maxime: ideally add indeterminate logic for all selected: checked="indeterminate"
            <Checkbox
                checked={table.getIsSomeRowsSelected() ? "indeterminate" : table.getIsAllRowsSelected()}
                onCheckedChange={() => table.toggleAllRowsSelected()}
                className="translate-y-0.5"
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                // disabled={!row.getCanSelect()}
                onCheckedChange={() => row.toggleSelected()}
                className="translate-y-0.5"
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    // @CHRIS: bring back later, just more whitespace
    // {
    //     header: 'Workspace',
    //     accessorKey: 'workspace',
    //     enableSorting: true,
    //     meta: {
    //         align: 'text-left',
    //     },
    // },
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
        filterFn: "arrIncludesSome"
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
        cell: ({ getValue }) => formatters.currency(getValue()),
        filterFn: (row, columnId, filterValue: ConditionFilter) => {
            const value = row.getValue(columnId) as number
            const [min, max] = filterValue.value as [number, number]
            
            switch (filterValue.condition) {
                case "is-equal-to":
                    return value === min
                case "is-between":
                    return value >= min && value <= max
                case "is-greater-than":
                    return value > min
                case "is-less-than":
                    return value < min
                default:
                    return true
            }
        }
    },
    {
        header: 'Created at',
        accessorKey: 'lastEdited',
        enableSorting: false,
        meta: {
            align: 'text-right',
        },
    },
    {
        header: "Edit",
        accessorKey: 'edit',
        enableSorting: false,
        meta: {
            align: 'text-right',
        },
        cell: ({ row }) => <DataTableRowActions row={row} />,
    }

]


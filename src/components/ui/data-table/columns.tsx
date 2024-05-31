"use client"

import { Checkbox } from "@/components/Checkbox"
import { Transaction } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { ConditionFilter } from "./data-table-filter"
import { DataTableRowActions } from "./data-table-row-actions"

const columnHelper = createColumnHelper<Transaction>()
export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={() => table.toggleAllPageRowsSelected()}
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
    enableHiding: false,
    meta: {
      align: "text-left",
      displayName: "Select",
    },
  }),
  columnHelper.accessor("owner", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    enableSorting: true,
    meta: {
      align: "text-left",
      displayName: "Owner",
    },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
    meta: {
      align: "text-left",
      displayName: "Status",
    },
  }),
  columnHelper.accessor("region", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    enableSorting: false,
    meta: {
      align: "text-left",
      displayName: "Region",
    },
    filterFn: "arrIncludesSome",
  }),
  columnHelper.accessor("capacity", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    enableSorting: false,
    meta: {
      align: "text-left",
      displayName: "Capacity",
    },
  }),
  columnHelper.accessor("costs", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Costs" />
    ),
    enableSorting: true,
    meta: {
      align: "text-left",
      displayName: "Costs",
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
    },
  }),
  // @CHRIS: wording consistency
  columnHelper.accessor("lastEdited", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    enableSorting: false,
    meta: {
      align: "text-right",
      displayName: "Last edited",
    },
  }),
  columnHelper.display({
    id: "edit",
    header: "Edit",
    enableSorting: false,
    enableHiding: false,
    meta: {
      align: "text-right",
      displayName: "Edit",
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
]

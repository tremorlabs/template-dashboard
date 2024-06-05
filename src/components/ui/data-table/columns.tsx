"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { Checkbox } from "@/components/Checkbox"
import { statuses } from "@/data/data"
import { Usage } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { ConditionFilter } from "./DataTableFilter"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<Usage>()

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
        onCheckedChange={() => row.toggleSelected()}
        className="translate-y-0.5"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      displayName: "Select",
    },
  }),
  columnHelper.accessor("owner", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "Owner",
    },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Status",
    },
    cell: ({ row }) => {
      const status = statuses.find(
        (item) => item.value === row.getValue("status"),
      )

      if (!status) {
        return null
      }

      return (
        <Badge variant={status.variant as BadgeProps["variant"]}>
          {status.label}
        </Badge>
      )
    },
  }),
  columnHelper.accessor("region", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Region",
    },
    filterFn: "arrIncludesSome",
  }),
  columnHelper.accessor("stability", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stability" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Stability",
    },
    cell: ({ getValue }) => {
      const value = getValue()

      function Indicator({ number }: { number: number }) {
        let category
        if (number === 0) {
          category = "zero"
        } else if (number < 9) {
          category = "bad"
        } else if (number >= 9 && number <= 15) {
          category = "ok"
        } else {
          category = "good"
        }

        const getBarClass = (index: number) => {
          if (category === "zero") {
            return "bg-gray-300 dark:bg-gray-800"
          } else if (category === "good") {
            return "bg-indigo-600 dark:bg-indigo-500"
          } else if (category === "ok" && index < 2) {
            return "bg-indigo-600 dark:bg-indigo-500"
          } else if (category === "bad" && index < 1) {
            return "bg-indigo-600 dark:bg-indigo-500"
          }
          return "bg-gray-300 dark:bg-gray-800"
        }

        return (
          <div className="flex gap-0.5">
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(0)}`} />
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(1)}`} />
            <div className={`h-3.5 w-1 rounded-sm ${getBarClass(2)}`} />
          </div>
        )
      }

      return (
        <div className="flex items-center gap-0.5">
          <span className="w-6">{value}</span>
          <Indicator number={value} />
        </div>
      )
    },
  }),
  columnHelper.accessor("costs", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Costs" />
    ),
    enableSorting: true,
    meta: {
      className: "text-right",
      displayName: "Costs",
    },
    cell: ({ getValue }) => {
      return (
        <span className="font-medium">{formatters.currency(getValue())}</span>
      )
    },
    filterFn: (row, columnId, filterValue: ConditionFilter) => {
      const value = row.getValue(columnId) as number
      const [min, max] = filterValue.value as [number, number]

      switch (filterValue.condition) {
        case "is-equal-to":
          return value == min
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
  columnHelper.accessor("lastEdited", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last edited" />
    ),
    enableSorting: false,
    meta: {
      className: "tabular-nums",
      displayName: "Last edited",
    },
  }),
  columnHelper.display({
    id: "edit",
    header: "Edit",
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "text-right",
      displayName: "Edit",
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
] as ColumnDef<Usage>[]

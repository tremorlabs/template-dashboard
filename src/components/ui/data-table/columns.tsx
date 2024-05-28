"use client";

import { ColumnDef, Row, createColumnHelper } from "@tanstack/react-table";
import { Transaction } from "@/data/schema";
import { Checkbox } from "@/components/Checkbox";
import { DataTableRowActions } from "./data-table-row-actions";
import { ConditionFilter } from "./data-table-filter";
import { formatters } from "@/lib/utils";

const columnHelper = createColumnHelper<Transaction>();
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
    },
  }),
  columnHelper.accessor("owner", {
    header: "Owner",
    enableSorting: true,
    meta: {
      align: "text-left",
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    enableSorting: false,
    meta: {
      align: "text-left",
    },
  }),
  columnHelper.accessor("region", {
    header: "Region",
    enableSorting: false,
    meta: {
      align: "text-left",
    },
    filterFn: "arrIncludesSome",
  }),
  columnHelper.accessor("capacity", {
    header: "Capacity",
    enableSorting: false,
    meta: {
      align: "text-left",
    },
  }),
  columnHelper.accessor("costs", {
    header: "Costs",
    enableSorting: false,
    meta: {
      align: "text-right",
    },
    cell: ({ getValue }) => formatters.currency(getValue()),
    filterFn: (row, columnId, filterValue: ConditionFilter) => {
      const value = row.getValue(columnId) as number;
      const [min, max] = filterValue.value as [number, number];

      switch (filterValue.condition) {
        case "is-equal-to":
          return value === min;
        case "is-between":
          return value >= min && value <= max;
        case "is-greater-than":
          return value > min;
        case "is-less-than":
          return value < min;
        default:
          return true;
      }
    },
  }),
  columnHelper.accessor("lastEdited", {
    header: "Created at",
    enableSorting: false,
    meta: {
      align: "text-right",
    },
  }),
  columnHelper.display({
    id: "edit",
    header: "Edit",
    enableSorting: false,
    enableHiding: false,
    meta: {
      align: "text-right",
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
];

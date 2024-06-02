import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react"
import { Column } from "@tanstack/react-table"

import { cx } from "@/lib/utils"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cx(className)}>{title}</div>
  }

  return (
    <div
      onClick={column.getToggleSortingHandler()}
      className={cx(
        column.columnDef.enableSorting === true
          ? "-mx-2 inline-flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50 hover:dark:bg-gray-900"
          : "",
      )}
    >
      <span>{title}</span>
      {column.getCanSort() ? (
        <div className="-space-y-2">
          <RiArrowUpSLine
            className={cx(
              "size-3.5 text-gray-900 dark:text-gray-50",
              column.getIsSorted() === "desc" ? "opacity-30" : "",
            )}
            aria-hidden="true"
          />
          <RiArrowDownSLine
            className={cx(
              "size-3.5 text-gray-900 dark:text-gray-50",
              column.getIsSorted() === "asc" ? "opacity-30" : "",
            )}
            aria-hidden="true"
          />
        </div>
      ) : null}
    </div>
  )
}

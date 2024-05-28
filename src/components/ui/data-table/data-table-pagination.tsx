import { cx } from "@/lib/utils";
import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightDoubleLine,
} from "@remixicon/react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/Button";
import { Tooltip } from "@/components/Tooltip";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSize: number;
}

export function DataTablePagination<TData>({
  table,
  pageSize,
}: DataTablePaginationProps<TData>) {
  const paginationButtons = [
    {
      icon: RiArrowLeftDoubleLine,
      onClick: () => table.setPageIndex(0),
      disabled: !table.getCanPreviousPage(),
      srText: "First page",
      mobileView: "hidden sm:block",
    },
    {
      icon: RiArrowLeftSLine,
      onClick: () => table.previousPage(),
      disabled: !table.getCanPreviousPage(),
      srText: "Previous page",
      mobileView: "",
    },
    {
      icon: RiArrowRightSLine,
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage(),
      srText: "Next page",
      mobileView: "",
    },
    {
      icon: RiArrowRightDoubleLine,
      onClick: () => table.setPageIndex(table.getPageCount() - 1),
      disabled: !table.getCanNextPage(),
      srText: "Last page",
      mobileView: "hidden sm:block",
    },
  ];

  // Calculate the range for the last page
  const totalRows = table.getFilteredRowModel().rows.length;
  const lastPageStartIndex = Math.floor(totalRows / pageSize) * pageSize + 1;
  const lastPageEndIndex = Math.min(
    totalRows,
    lastPageStartIndex + pageSize - 1,
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="tabular-nums text-sm text-gray-500">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="flex items-center gap-x-6 lg:gap-x-8">
          <p className="hidden sm:block text-sm tabular-nums text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              {/* @Sev: simplify? */}
              {table.getState().pagination.pageIndex ===
                Math.floor(totalRows / pageSize)
                ? lastPageStartIndex + "-" + lastPageEndIndex
                : table.getState().pagination.pageIndex * pageSize +
                1 +
                "-" +
                (table.getState().pagination.pageIndex + 1) * pageSize}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              {table.getFilteredRowModel().rows.length}
            </span>
          </p>
          <div className="flex items-center gap-x-1.5">
            {/* @CHRIS: idx consistency */}
            {paginationButtons.map((button, idx) => (
              // @SEV: make tooltip work on disabled button
              <Tooltip
                side="top"
                sideOffset={5}
                content={button.srText}
                key={idx}
                triggerAsChild={true}
              >
                <Button
                  key={idx}
                  variant="secondary"
                  className={cx(button.mobileView, "p-1.5")}
                  onClick={() => {
                    button.onClick();
                    table.resetRowSelection();
                  }}
                  disabled={button.disabled}
                >
                  <span className="sr-only">{button.srText}</span>
                  <button.icon className="size-4 shrink-0" aria-hidden="true" />
                </Button>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

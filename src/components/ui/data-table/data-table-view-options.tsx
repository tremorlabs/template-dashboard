"use client";

import { RiEqualizer2Line, RiDraggable } from "@remixicon/react";
import { cx, focusInput } from "@/lib/utils";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/Button";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/Popover";
import { Checkbox } from "@/components/Checkbox";
import React from "react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [isEditable, setIsEditable] = React.useState(false);
  const [parentRef, columnOrder, _, updateConfig] = useDragAndDrop<
    HTMLUListElement,
    string
  >(
    table.getAllColumns().map((column) => column.id),
    {
      dragHandle: ".drag-icon",
      plugins: [animations()],
      disabled: !isEditable,
    },
  );

  React.useEffect(() => {
    updateConfig({ disabled: !isEditable });
  }, [isEditable]);

  React.useEffect(() => {
    table.setColumnOrder(columnOrder);
  }, [columnOrder]);

  return (
    <Popover onOpenChange={(isOpen) => setIsEditable(isOpen)}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className={cx(
            // focusInput,
            "ml-auto hidden py-1 px-2 lg:flex gap-x-2 focus:outline-none",
          )}
        >
          <RiEqualizer2Line className="-ml-px size-4" aria-hidden="true" />
          View options
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="space-y-2 max-w-52">
        <h3 className="text-xs font-medium text-gray-500 mb-2">
          Display properties
        </h3>
        <ul role="list" ref={parentRef} className="space-y-2">
          {columnOrder.map((columnId) => {
            const column = table.getColumn(columnId);
            if (!column) return null;
            const header = column.columnDef.header as string;

            return (
              <li
                key={column.id}
                className={cx(
                  "flex items-center justify-between gap-x-2 drag-icon cursor-grab active:cursor-grabbing",
                  !column.getCanHide() && "hidden",
                )}
              >
                <span className="flex items-center gap-x-2">
                  <Checkbox
                    checked={column.getIsVisible()}
                    onCheckedChange={() => column.toggleVisibility()}
                  />
                  <span className="text-gray-900">{header}</span>
                </span>
                <RiDraggable className="text-gray-400 dark:text-gray-600 size-5" />
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

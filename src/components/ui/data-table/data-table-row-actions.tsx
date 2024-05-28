"use client";

import { Row } from "@tanstack/react-table";
import { RiMoreFill } from "@remixicon/react";
import { Button } from "@/components/Button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="aspect-square p-1.5 group data-[state=open]:bg-gray-50 data-[state=open]:dark:bg-gray-900 data-[state=open]:border-gray-300 data-[state=open]:dark:border-gray-700 hover:border hover:border-gray-300 hover:dark:border-gray-700"
        >
          {/* @SEV: data-[state=open]:text-gray-700: does not work in icon */}
          <RiMoreFill
            className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 data-[state=open]:text-gray-700 group-hover:dark:text-gray-300 data-[state=open]:dark:text-gray-300"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem>Add</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-rose-600 dark:text-rose-500">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

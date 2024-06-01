"use client"

import { RowSelectionState, Table } from "@tanstack/react-table"
import {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
  CommandBarSeperator,
  CommandBarValue,
} from "./data-table-command-bar"

type DataTableBulkEditorProps<TData> = {
  table: Table<TData>
  rowSelection: RowSelectionState
}

function DataTableBulkEditorNew<TData>({
  table,
  rowSelection,
}: DataTableBulkEditorProps<TData>) {
  const hasSelectedRows = Object.keys(rowSelection).length > 0
  return (
    <CommandBar open={hasSelectedRows}>
      <CommandBarBar>
        <CommandBarValue>
          {Object.keys(rowSelection).length} selected
        </CommandBarValue>
        <CommandBarSeperator />
        <CommandBarCommand
          label="Edit"
          action={() => {
            console.log("Edit")
          }}
          shortcut="e"
        />
        <CommandBarSeperator />
        <CommandBarCommand
          label="Delete"
          action={() => {
            console.log("Delete")
          }}
          shortcut="d"
        />
        <CommandBarSeperator />
        <CommandBarCommand
          label="Reset selection"
          action={() => {
            table.resetRowSelection()
          }}
          shortcut="Escape"
        />
      </CommandBarBar>
    </CommandBar>
  )
}

export { DataTableBulkEditorNew }

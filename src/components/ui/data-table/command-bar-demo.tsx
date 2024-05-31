"use client"

import { RowSelectionState } from "@tanstack/react-table"
import {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
  CommandBarSeperator,
  CommandBarValue,
} from "./data-table-command-bar"

function DataTableBulkEditorNew(rowSelection: {
  rowSelection: RowSelectionState
}) {
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
      </CommandBarBar>
    </CommandBar>
  )
}

export { DataTableBulkEditorNew }

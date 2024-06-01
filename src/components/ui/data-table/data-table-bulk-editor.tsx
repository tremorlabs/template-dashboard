import {
    RiCloseLine
} from "@remixicon/react"

import { cx } from "@/lib/utils"
import { RowSelectionState, Table } from "@tanstack/react-table"

type DataTableBulkEditorProps<TData> = {
    table: Table<TData>
    rowSelection: RowSelectionState
}

export function DataTableBulkEditor<TData>({
    table,
    rowSelection,
}: DataTableBulkEditorProps<TData>) {
    return (
        <div
            className={cx(
                'fixed inset-x-0 bottom-8 mx-auto flex w-fit items-center gap-x-3 rounded-full border border-gray-600 bg-gray-900 px-4 py-2 text-sm font-medium shadow-lg',
                Object.keys(rowSelection).length > 0 ? '' : 'hidden',
            )}
        >
            <button
                type="button"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-all -mr-1"
                onClick={() => table.resetRowSelection()}
            >
                <span className="select-none tabular-nums">
                    {Object.keys(rowSelection).length} selected
                </span>
                <RiCloseLine className="-ml-px size-4" />
            </button>
            <span
                className="h-4 w-px bg-gray-600"
                aria-hidden="true"
            />
            <span className="flex items-center space-x-2">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-gray-50 transition-all"
                >
                    Edit
                    <span className="flex size-6 select-none items-center justify-center rounded-md bg-gray-800 text-gray-400 ring-1 ring-inset ring-gray-700">
                        E
                    </span>
                </button>
            </span>
            <span
                className="h-4 w-px bg-gray-600"
                aria-hidden="true"
            />
            <span className="flex items-center space-x-2">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-gray-50 transition-all"
                >
                    Delete
                    <span className="flex items-center space-x-1">
                        <span className="flex size-6 select-none items-center justify-center rounded-md bg-gray-800 text-gray-400 ring-1 ring-inset ring-gray-700">
                            ⌘
                        </span>
                        <span className="flex size-6 select-none items-center justify-center rounded-md bg-gray-800 text-gray-400 ring-1 ring-inset ring-gray-700">
                            D
                        </span>
                    </span>
                </button>
            </span>
        </div>
    )
}

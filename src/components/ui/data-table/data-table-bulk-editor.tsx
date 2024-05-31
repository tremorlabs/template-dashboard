import { cx } from "@/lib/utils"
import { RowSelectionState } from "@tanstack/react-table"

type DataTableBulkEditorProps = {
    rowSelection: RowSelectionState
}

export function DataTableBulkEditor({ rowSelection }: DataTableBulkEditorProps) {
    return (
        <div
            className={cx(
                // @CHRIS: two times a border
                'absolute inset-x-0 -bottom-14 mx-auto flex w-fit items-center space-x-3 rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium shadow-lg ring-1 ring-gray-800',
                Object.keys(rowSelection).length > 0 ? '' : 'hidden',
            )}
        >
            <p className="select-none tabular-nums text-gray-400">
                {Object.keys(rowSelection).length} selected
            </p>
            <span
                className="h-4 w-px bg-gray-600"
                aria-hidden="true"
            />
            <span className="flex items-center space-x-2">
                <button
                    className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-gray-50"
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
                    className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-gray-50"
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

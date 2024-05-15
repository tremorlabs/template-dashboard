
"use client"

import { Row } from "@tanstack/react-table"
import { RiMoreFill, RiPencilLine, RiPlayListAddLine, RiDeleteBin7Line } from "@remixicon/react";
import { cx } from "@/lib/utils";
import { Tooltip } from "@/components/Tooltip";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}


// @CHRIS where to store
const options = [
    {
        label: 'Edit entry',
        icon: RiPencilLine,
    },
    {
        label: 'Add new entry',
        icon: RiPlayListAddLine,
    },
    {
        label: 'More actions',
        icon: RiMoreFill
    }
]


export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    return (
        // @CHRIS: min-w-14 (magic value)
        <div className="min-w-14 relative flex items-center justify-end">
            <div className="flex items-center justify-end">
                <RiMoreFill className="size-4 shrink-0 text-gray-500" aria-hidden={true} />
            </div>
            {/* @CHRIS: -right-2.5 (magic value) */}
            <div className="absolute -right-2.5 top-1/2 hidden h-full -translate-y-1/2 items-center group-hover:flex">
                <div className="inline-flex items-center rounded-md shadow-sm">
                    {options.map((item, index) => (
                        // @MAXIME how to add only a dropdown menu for last category?
                        <Tooltip
                            side="top"
                            showArrow={false}
                            sideOffset={5}
                            content={item.label}
                            key={index}
                            triggerAsChild={true}
                        >
                            <button
                                type="button"
                                className={cx(
                                    index === 0
                                        ? 'rounded-l-md'
                                        : index === options.length - 1
                                            ? '-ml-px rounded-r-md'
                                            : '-ml-px',
                                    // @CHRIS: add focusInput 
                                    "relative inline-flex items-center bg-white px-2.5 py-1.5 text-gray-700 ring-1 ring-inset ring-gray-300 hover:text-gray-900 focus:z-10"
                                )}
                                onClick={
                                    // add stopPropagation to avoid row selection when clicking button
                                    (e) => {
                                        e.stopPropagation();
                                    }
                                }
                            >
                                <item.icon
                                    className="size-4"
                                    aria-hidden={true}
                                    aria-label="Edit"
                                />
                            </button>
                        </Tooltip>
                    ))}
                </div>
            </div >
        </div >
    )
}

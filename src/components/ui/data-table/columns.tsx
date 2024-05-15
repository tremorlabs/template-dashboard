"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "@/data/schema"

export const columns: ColumnDef<Transaction>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
                className="-translate-y-[1px]"
            />
        ),
        cell: ({ row }) => (
            <IndeterminateCheckbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
                className="-translate-y-[1px]"
            />
        ),
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Workspace',
        accessorKey: 'workspace',
        enableSorting: true,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Owner',
        accessorKey: 'owner',
        enableSorting: true,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Region',
        accessorKey: 'region',
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Capacity',
        accessorKey: 'capacity',
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Costs',
        accessorKey: 'costs',
        enableSorting: false,
        meta: {
            align: 'text-right',
        },
    },
    {
        header: 'Last edited',
        accessorKey: 'lastEdited',
        enableSorting: false,
        meta: {
            align: 'text-right',
        },
        cell: ({ getValue }) => (
            <div className="relative">
                <span>{getValue()}</span>
                <div className="absolute right-0 top-1/2 hidden h-full -translate-y-1/2 items-center bg-tremor-background-muted group-hover:flex dark:bg-dark-tremor-background-muted">
                    <div className="inline-flex items-center rounded-tremor-small shadow-tremor-input dark:shadow-dark-tremor-input">
                        <button
                            type="button"
                            className="relative inline-flex items-center rounded-l-tremor-small bg-tremor-background px-4 py-2 text-tremor-content-emphasis ring-1 ring-inset ring-tremor-ring hover:text-tremor-content-strong focus:z-10 dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis dark:ring-tremor-content-emphasis hover:dark:text-dark-tremor-content-strong"
                            onClick={
                                // add stopPropagation to avoid row selection when clicking button
                                (e) => {
                                    e.stopPropagation();
                                }
                            }
                        >
                            <RiPencilLine
                                className="h-4 w-4"
                                aria-hidden={true}
                                aria-label="Edit"
                            />
                        </button>
                        <button
                            type="button"
                            className="relative -ml-px inline-flex items-center bg-tremor-background px-4 py-2 text-tremor-content-emphasis ring-1 ring-inset ring-tremor-ring hover:text-tremor-content-strong focus:z-10 dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis dark:ring-tremor-content-emphasis hover:dark:text-dark-tremor-content-strong"
                            onClick={
                                // add stopPropagation to avoid row selection when clicking button
                                (e) => {
                                    e.stopPropagation();
                                }
                            }
                        >
                            <RiPlayListAddLine
                                className="h-4 w-4"
                                aria-hidden={true}
                                aria-label="Add"
                            />
                        </button>
                        <button
                            type="button"
                            className="relative -ml-px inline-flex items-center rounded-r-tremor-small bg-tremor-background px-4 py-2 text-tremor-content-emphasis ring-1 ring-inset ring-tremor-ring hover:text-tremor-content-strong focus:z-10 dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis dark:ring-tremor-content-emphasis hover:dark:text-dark-tremor-content-strong"
                            onClick={
                                // add stopPropagation to avoid row selection when clicking button
                                (e) => {
                                    e.stopPropagation();
                                }
                            }
                        >
                            <RiDeleteBin7Line
                                className="h-4 w-4"
                                aria-hidden={true}
                                aria-label="Delete"
                            />
                        </button>
                    </div>
                </div>
            </div>
        ),
    },

]


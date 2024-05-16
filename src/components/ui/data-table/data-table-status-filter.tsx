"use client"

import { RiAddCircleLine, RiArrowDownSLine } from "@remixicon/react"
import { Column } from "@tanstack/react-table"

import { cx } from "@/lib/utils"

import { Label } from "@/components/Label"
import { Button } from "@/components/Button"
import { SelectNative } from "@/components/SelectNative"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/Popover"

interface DataTableStatusFilterProps<TData, TValue> {
    column?: Column<TData, TValue>
    title?: string
    options: {
        label: string
        value: string
    }[]
}

const dummy = [
    {
        item: 1
    },
    {
        item: 1
    },
    {
        item: 1
    },
]

export function DataTableStatusFilter<TData, TValue>({
    column,
    title,
    options,
}: DataTableStatusFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues()
    const selectedValues = new Set(column?.getFilterValue() as string[])
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className="flex items-center gap-x-1.5 rounded-full px-2 py-1 hover:bg-gray-50 border border-gray-300 border-dashed text-xs text-gray-600 font-semibold"
                >
                    <RiAddCircleLine className="-ml-1 size-4 shrink-0" aria-hidden={true} />
                    {title}
                    {dummy?.length > 0 && (
                        <>
                            {/* @Maxime: shows labels explicitly until 3 are met, then first label name + number of other selected */}
                            <span className="h-4 w-px bg-gray-300" aria-hidden={true} />
                            <span className="text-indigo-600 font-semibold">Live, </span>
                            <span className="text-indigo-600 font-semibold">and 4 more</span>
                            < RiArrowDownSLine className="size-4 shrink-0 text-gray-500" aria-hidden={true} />
                        </>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={7} className="w-fit space-y-2 max-w-52">
                <Label className="text-xs font-semibold">Filter by {title}</Label>
                <SelectNative>
                    {options.map((option) => {
                        return (
                            <option
                                key={option.value}
                            >
                                {option.label}
                            </option>
                        )
                    })}
                </SelectNative>
                <PopoverClose className="w-full">
                    <Button className="w-full py-1">Apply</Button>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}
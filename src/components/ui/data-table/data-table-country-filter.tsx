"use client"

import { RiAddCircleLine, RiArrowDownSLine } from "@remixicon/react"
import { Column } from "@tanstack/react-table"


import { Label } from "@/components/Label"
import { Button } from "@/components/Button"
import { SelectNative } from "@/components/SelectNative"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/Popover"
import { Checkbox } from "@/components/Checkbox"

interface DataTableCountryFilterProps<TData, TValue> {
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

export function DataTableCountryFilter<TData, TValue>({
    column,
    title,
    options,
}: DataTableCountryFilterProps<TData, TValue>) {
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
                            <span className="h-4 w-px bg-gray-300" aria-hidden={true} />
                            <span className="text-indigo-600 font-semibold">Germany, </span>
                            <span className="text-indigo-600 font-semibold">Switzerland, </span>
                            <span className="text-indigo-600 font-semibold">Italy</span>
                            < RiArrowDownSLine className="size-4 shrink-0 text-gray-500" aria-hidden={true} />
                        </>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={7} className="max-w-52">
                <div>
                    <Label className="font-medium">Filter by {title}</Label>
                    <div className="space-y-3 mt-3 mb-2 max-h-36 overflow-y-auto">
                        {options.map((option) => {
                            return (
                                <div key={option.label} className="flex items-center gap-2">
                                    <Checkbox id={option.value} />
                                    <Label htmlFor={option.value}>{option.label}</Label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <PopoverClose className="w-full">
                    <Button className="w-full py-1">Apply</Button>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}
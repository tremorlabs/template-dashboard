"use client"

import { RiAddCircleLine, RiArrowDownSLine } from "@remixicon/react"
import { Column } from "@tanstack/react-table"

import { Label } from "@/components/Label"
import { Button } from "@/components/Button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/Popover"
import React from "react"
import { Checkbox } from "@/components/Checkbox"
import { SelectNative } from "@/components/SelectNative"

type FilterType = "select" | "checkbox"

interface DataTableFilterProps<TData, TValue> {
    column: Column<TData, TValue> | undefined
    title?: string
    options: {
        label: string
        value: string
    }[]
    type?: FilterType
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

const ColumnFiltersLabel = ({ selectedValues }: { selectedValues: string[] | undefined }) => {
    if (!selectedValues) return null

    if (selectedValues.length < 3) {
        return (
            <>
                {selectedValues.map((value, index) => (
                    <span key={value} className={"font-semibold"}>
                        {value}
                        {index < selectedValues.length - 1 && ", "}
                    </span>
                ))}
            </>
        )
    }

    return (
        <>
            <span className="font-semibold">{selectedValues[0]}</span>
            <span className="text-indigo-600 font-semibold">, and {selectedValues.length - 1} more</span>
        </>
    )
}


export function DataTableFilter<TData, TValue>({
    column,
    title,
    options,
    type = "select"
}: DataTableFilterProps<TData, TValue>) {
    const columnFilters = column?.getFilterValue() as string | string[] | undefined
    const [selectedValues, setSelectedValues] = React.useState<string | string[] | undefined>(columnFilters)

    {/* @Chris: usefull if you wan't to generate dynamically your options based on unisque values of your table */}
    // const uniqueValues = React.useMemo(() => {
    //     const values = table.getCoreRowModel().flatRows.map(row => row.getValue(columnName)) as string[]
    //     return Array.from(new Set(values));
    // }, [table, columnName]);



    const getFisplayedFilter = () => {
        {/* @Chris: Here you can create one separate component by case if you want */}
        switch (type) {
            case "select":
                const hasEmptyOption = options.some((option) => option.value === "")
                return (
                    <SelectNative
                        value={selectedValues as string}
                        onChange={(e) => {
                            const value = e.target.value === "" ? undefined : e.target.value
                            setSelectedValues(value)
                        }}
                        >
                            {!hasEmptyOption && (
                                <option value="">All</option>
                            )}
                            {options.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </SelectNative>
                )
            case "checkbox":
                return (
                    <div className="space-y-3 mt-3 mb-2 max-h-36 overflow-y-auto">
                        {options.map((option) => {
                            return (
                                <div key={option.label} className="flex items-center gap-2">
                                    <Checkbox
                                        id={option.value}
                                        checked={selectedValues?.includes(option.value)}
                                        onCheckedChange={(checked) => {
                                            setSelectedValues((prev) => {
                                                if (checked) {
                                                    return prev ? [...(prev as string[]), option.value] : [option.value]
                                                } else {
                                                    return (prev as string[]).filter((value) => value !== option.value)
                                                }
                                            })
                                        }}
                                    />
                                    <Label htmlFor={option.value}>{option.label}</Label>
                                </div>
                            )
                        })}
                    </div>
                )
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className="flex items-center gap-x-1.5 rounded-full px-2 py-1 hover:bg-gray-50 border border-gray-300 border-dashed text-xs text-gray-600 font-semibold"
                >
                    <RiAddCircleLine className="-ml-1 size-4 shrink-0" aria-hidden={true} />
                    {title}
                    {/* @Maxime: shows labels explicitly until 3 are met, then first label name + number of other selected */}
                    {columnFilters && <span className="h-4 w-px bg-gray-300" aria-hidden={true} />}
                    <ColumnFiltersLabel selectedValues={!selectedValues ? undefined : Array.isArray(selectedValues) ? selectedValues : [selectedValues]} />
                    <RiArrowDownSLine className="size-4 shrink-0 text-gray-500" aria-hidden={true} />
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={7} className="w-fit space-y-2 max-w-52">
                <div>
                    <Label className="font-medium">Filter by {title}</Label>
                    {getFisplayedFilter()}
                </div>
                <PopoverClose className="w-full">
                    <Button onClick={() => column?.setFilterValue(selectedValues)} className="w-full py-1">Apply</Button>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}
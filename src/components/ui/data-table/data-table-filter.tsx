"use client"

import { RiAddCircleLine, RiArrowDownSLine, RiCornerDownRightLine } from "@remixicon/react"
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
import { Input } from "@/components/Input"
import { formatters } from "@/lib/utils"

export type ConditionFilter = {
    condition: string
    value: [number | string, number | string]
}


type FilterType = "select" | "checkbox" | "number"

interface DataTableFilterProps<TData, TValue> {
    column: Column<TData, TValue> | undefined
    title?: string
    options?: {
        label: string
        value: string
    }[]
    type?: FilterType
}


const ColumnFiltersLabel = ({ columnFilterLabels }: { columnFilterLabels: string[] | undefined }) => {
    if (!columnFilterLabels) return null

    if (columnFilterLabels.length < 3) {
        return (
            <>
                {columnFilterLabels.map((value, index) => (
                    <span key={value} className={"text-indigo-600 font-semibold"}>
                        {/* {type === "number" ? (
                            formatters.currency(value)
                        ) : (
                            { value }
                        )} */}
                        {value}
                        {index < columnFilterLabels.length - 1 && ", "}
                    </span>
                ))}
            </>
        )
    }

    return (
        <>
            <span className="text-indigo-600 font-semibold">
                {/* {type === "number" ? (
                    formatters.currency(columnFilterLabels[0])
                ) : (
                    columnFilterLabels[0]
                )} */}
                {columnFilterLabels[0]}
            </span>
            <span className="text-indigo-600 font-semibold"> and {columnFilterLabels.length - 1} more</span>
        </>
    )
}

type FilterValues = string | string[] | ConditionFilter

export function DataTableFilter<TData, TValue>({
    column,
    title,
    options,
    type = "select"
}: DataTableFilterProps<TData, TValue>) {
    const columnFilters = column?.getFilterValue() as FilterValues

    // @Maxime
    // const [selectedCondition, setSelectedCondition] = React.useState<string | undefined>(undefined);

    const [selectedValues, setSelectedValues] = React.useState<FilterValues>(columnFilters)

    {/* @Chris: usefull if you wan't to generate dynamically your options based on unisque values of your table */ }
    // const uniqueValues = React.useMemo(() => {
    //     const values = table.getCoreRowModel().flatRows.map(row => row.getValue(columnName)) as string[]
    //     return Array.from(new Set(values));
    // }, [table, columnName]);

    const columnFilterLabels = React.useMemo(() => {
        if (!selectedValues) return undefined

        if (Array.isArray(selectedValues)) {
            return selectedValues
        }

        if (typeof selectedValues === "string") {
            return [selectedValues]
        }

        if (typeof selectedValues === "object" && "condition" in selectedValues) {
            const condition = options?.find((option) => option.value === selectedValues.condition)?.label
            if (!condition || !selectedValues.value?.[0]) return undefined
            if (selectedValues.value?.[1] === "") return [`${condition} ${selectedValues.value?.[0]}`]
            return [`${condition} ${selectedValues.value?.[0]} and ${selectedValues.value?.[1]}`]
        }

        return undefined
    }, [selectedValues, options])


    const getFisplayedFilter = () => {
        const hasEmptyOption = options?.some((option) => option.value === "")

        {/* @Chris: Here you can create one separate component by case if you want */ }
        switch (type) {
            case "select":
                return (
                    <SelectNative
                        value={selectedValues as string}
                        onChange={(e) => {
                            setSelectedValues(e.target.value)
                        }}
                        className="mt-2 py-1"
                    >
                        {!hasEmptyOption && (
                            <option value="">All</option>
                        )}
                        {options?.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </SelectNative>
                )
            case "checkbox":
                return (
                    <div className="space-y-3 mt-2 max-h-36 overflow-y-auto">
                        {options?.map((option) => {
                            return (
                                <div key={option.label} className="flex items-center gap-2">
                                    <Checkbox
                                        id={option.value}
                                        checked={(selectedValues as string[])?.includes(option.value)}
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
            case "number":
                const isBetween = (selectedValues as ConditionFilter)?.condition === "is-between"
                return (
                    <div className="space-y-2">
                        <SelectNative
                            value={(selectedValues as ConditionFilter)?.condition}
                            onChange={(e) => {
                                const value = e.target.value
                                setSelectedValues((prev) => {
                                    return {
                                        condition: value,
                                        value: [value !== "" ? (prev as ConditionFilter)?.value?.[0] : "", ""]
                                    }
                                })
                            }}
                            className="mt-2"
                        >
                            {!hasEmptyOption && (
                                <option value="">Select a condition</option>
                            )}
                            {options?.map((condition) => (
                                <option key={condition.value} value={condition.value}>
                                    {condition.label}
                                </option>
                            ))}
                        </SelectNative>
                        <div className="flex items-center gap-2">
                            <RiCornerDownRightLine className="size-4 text-gray-500 shrink-0" aria-hidden={true} />
                            <Input
                                type="number"
                                placeholder="$0"
                                className="py-1"
                                value={(selectedValues as ConditionFilter)?.value?.[0]}
                                onChange={(e) => {
                                    setSelectedValues((prev) => {
                                        return {
                                            condition: (prev as ConditionFilter)?.condition,
                                            value: [Number(e.target.value), isBetween ? (prev as ConditionFilter)?.value?.[1] : ""]
                                        }
                                    })
                                }}
                            />
                            {(selectedValues as ConditionFilter)?.condition === "is-between" && (
                                <>
                                    <span className="text-xs font-medium text-gray-500">and</span>
                                    <Input
                                        type="number"
                                        placeholder="$0"
                                        className="py-1"
                                        value={(selectedValues as ConditionFilter)?.value?.[1]}
                                        onChange={(e) => {
                                            setSelectedValues((prev) => {
                                                return {
                                                    condition: (prev as ConditionFilter)?.condition,
                                                    value: [(prev as ConditionFilter)?.value?.[0], Number(e.target.value)]
                                                }
                                            })
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className="flex items-center gap-x-1.5 rounded-md px-2 py-1 hover:bg-gray-50 border border-gray-300 border-dashed text-sm text-gray-600 font-semibold"
                >
                    <RiAddCircleLine className="-ml-1 size-4 shrink-0" aria-hidden={true} />
                    {title}
                    {(columnFilterLabels && columnFilterLabels.length > 0) && <span className="h-4 w-px bg-gray-300" aria-hidden={true} />}
                    {/* @Maxime: how to make this that type is forwarded here?  */}
                    <ColumnFiltersLabel
                        columnFilterLabels={columnFilterLabels}
                    // type={} 
                    />
                    <RiArrowDownSLine className="size-4 shrink-0 text-gray-500" aria-hidden={true} />
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={7} className="w-fit space-y-2 max-w-52">
                <div>
                    <Label className="font-medium">Filter by {title}</Label>
                    {getFisplayedFilter()}
                </div>
                <PopoverClose className="w-full" onClick={() => column?.setFilterValue(selectedValues)}>
                    <Button className="w-full py-1">Apply</Button>
                    {/* --- remove logic: --- */}
                    {/* onClick={() => column?.setFilterValue(undefined)} */}
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}
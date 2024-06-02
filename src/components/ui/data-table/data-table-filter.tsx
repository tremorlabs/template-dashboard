"use client"

import {
  RiAddLine,
  RiArrowDownSLine,
  RiCornerDownRightLine,
} from "@remixicon/react"
import { Column } from "@tanstack/react-table"

import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { cx, focusRing } from "@/lib/utils"
import React from "react"

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
  formatter?: (value: any) => string
}

const ColumnFiltersLabel = ({
  columnFilterLabels,
}: {
  columnFilterLabels: string[] | undefined
}) => {
  if (!columnFilterLabels) return null

  if (columnFilterLabels.length < 3) {
    return (
      <>
        {columnFilterLabels.map((value, index) => (
          <span
            key={value}
            className={"font-semibold text-indigo-600 dark:text-indigo-400"}
          >
            {value}
            {index < columnFilterLabels.length - 1 && ", "}
          </span>
        ))}
      </>
    )
  }

  return (
    <>
      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
        {columnFilterLabels[0]} and {columnFilterLabels.length - 1} more
      </span>
    </>
  )
}

type FilterValues = string | string[] | ConditionFilter | undefined

export function DataTableFilter<TData, TValue>({
  column,
  title,
  options,
  type = "select",
  formatter = (value) => value.toString(),
}: DataTableFilterProps<TData, TValue>) {
  const columnFilters = column?.getFilterValue() as FilterValues

  const [selectedValues, setSelectedValues] =
    React.useState<FilterValues>(columnFilters)

  const columnFilterLabels = React.useMemo(() => {
    if (!selectedValues) return undefined

    if (Array.isArray(selectedValues)) {
      return selectedValues.map((value) => formatter(value))
    }

    if (typeof selectedValues === "string") {
      return [formatter(selectedValues)]
    }

    if (typeof selectedValues === "object" && "condition" in selectedValues) {
      const condition = options?.find(
        (option) => option.value === selectedValues.condition,
      )?.label
      if (!condition) return undefined
      if (!selectedValues.value?.[0] && !selectedValues.value?.[1])
        return [`${condition}`]
      if (!selectedValues.value?.[1])
        return [`${condition} ${formatter(selectedValues.value?.[0])}`]
      return [
        `${condition} ${formatter(selectedValues.value?.[0])} and ${formatter(
          selectedValues.value?.[1],
        )}`,
      ]
    }

    return undefined
  }, [selectedValues, options, formatter])

  const getDisplayedFilter = () => {
    switch (type) {
      case "select":
        return (
          <Select
            value={selectedValues as string}
            onValueChange={(value) => {
              setSelectedValues(value)
            }}
          >
            <SelectTrigger className="mt-2 sm:py-1">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "checkbox":
        return (
          <div className="mt-2 max-h-40 space-y-3 overflow-y-auto">
            {options?.map((option) => {
              return (
                <div key={option.label} className="flex items-center gap-2">
                  <Checkbox
                    id={option.value}
                    checked={(selectedValues as string[])?.includes(
                      option.value,
                    )}
                    onCheckedChange={(checked) => {
                      setSelectedValues((prev) => {
                        if (checked) {
                          return prev
                            ? [...(prev as string[]), option.value]
                            : [option.value]
                        } else {
                          return (prev as string[]).filter(
                            (value) => value !== option.value,
                          )
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
        const isBetween =
          (selectedValues as ConditionFilter)?.condition === "is-between"
        return (
          <div className="space-y-2">
            <Select
              value={(selectedValues as ConditionFilter)?.condition}
              onValueChange={(value) => {
                setSelectedValues((prev) => {
                  return {
                    condition: value,
                    value: [
                      value !== "" ? (prev as ConditionFilter)?.value?.[0] : "",
                      "",
                    ],
                  }
                })
              }}
            >
              <SelectTrigger className="mt-2 sm:py-1">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {options?.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <RiCornerDownRightLine
                className="size-4 shrink-0 text-gray-500"
                aria-hidden="true"
              />
              <Input
                disabled={!(selectedValues as ConditionFilter)?.condition}
                type="number"
                placeholder="$0"
                className="sm:[&>input]:py-1"
                value={(selectedValues as ConditionFilter)?.value?.[0]}
                onChange={(e) => {
                  setSelectedValues((prev) => {
                    return {
                      condition: (prev as ConditionFilter)?.condition,
                      value: [
                        e.target.value,
                        isBetween ? (prev as ConditionFilter)?.value?.[1] : "",
                      ],
                    }
                  })
                }}
              />
              {(selectedValues as ConditionFilter)?.condition ===
                "is-between" && (
                <>
                  <span className="text-xs font-medium text-gray-500">and</span>
                  <Input
                    disabled={!(selectedValues as ConditionFilter)?.condition}
                    type="number"
                    placeholder="$0"
                    className="sm:[&>input]:py-1"
                    value={(selectedValues as ConditionFilter)?.value?.[1]}
                    onChange={(e) => {
                      setSelectedValues((prev) => {
                        return {
                          condition: (prev as ConditionFilter)?.condition,
                          value: [
                            (prev as ConditionFilter)?.value?.[0],
                            e.target.value,
                          ],
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

  React.useEffect(() => {
    setSelectedValues(columnFilters)
  }, [columnFilters])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cx(
            "flex items-center gap-x-1.5 whitespace-nowrap rounded-md border border-gray-300 px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-900",
            selectedValues &&
              ((typeof selectedValues === "object" &&
                "condition" in selectedValues &&
                selectedValues.condition !== "") ||
                (typeof selectedValues === "string" && selectedValues !== "") ||
                (Array.isArray(selectedValues) && selectedValues.length > 0))
              ? ""
              : "border-dashed",
            focusRing,
          )}
        >
          <span
            aria-hidden="true"
            onClick={(e) => {
              if (selectedValues) {
                e.stopPropagation()
                column?.setFilterValue("")
                setSelectedValues("")
              }
            }}
          >
            <RiAddLine
              className={cx(
                "-ml-px size-4 shrink-0 transition",
                selectedValues && "rotate-45 hover:text-red-500",
              )}
              aria-hidden="true"
            />
          </span>
          {title}
          {columnFilterLabels && columnFilterLabels.length > 0 && (
            <span
              className="h-4 w-px bg-gray-300 dark:bg-gray-700"
              aria-hidden="true"
            />
          )}
          <ColumnFiltersLabel columnFilterLabels={columnFilterLabels} />
          <RiArrowDownSLine
            className="size-4 shrink-0 text-gray-500"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={7}
        className="max-w-52"
        onInteractOutside={() => {
          if (
            !columnFilters ||
            (typeof columnFilters === "string" && columnFilters === "") ||
            (Array.isArray(columnFilters) && columnFilters.length === 0) ||
            (typeof columnFilters === "object" &&
              "condition" in columnFilters &&
              columnFilters.condition === "")
          ) {
            column?.setFilterValue("")
            setSelectedValues("")
          }
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            column?.setFilterValue(selectedValues)
          }}
        >
          <div className="space-y-2">
            <div>
              <Label className="font-medium">Filter by {title}</Label>
              {getDisplayedFilter()}
            </div>
            <PopoverClose className="w-full" asChild>
              <Button type="submit" className="w-full sm:py-1">
                Apply
              </Button>
            </PopoverClose>
            {columnFilterLabels && columnFilterLabels.length > 0 && (
              <Button
                variant="secondary"
                className="w-full sm:py-1"
                type="button"
                onClick={() => {
                  column?.setFilterValue("")
                  setSelectedValues(
                    type === "checkbox"
                      ? []
                      : type === "number"
                        ? { condition: "", value: ["", ""] }
                        : "",
                  )
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

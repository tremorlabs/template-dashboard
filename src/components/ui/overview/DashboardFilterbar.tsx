"use client"

import {
  Select,
  SelectContent,
  SelectItemPeriod,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"

import { Label } from "@/components/Label"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog"

import { PeriodValue } from "@/app/(main)/overview/page"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { DateRangePicker } from "@/components/DatePicker"
import { cx } from "@/lib/utils"
import { RiSettings5Line } from "@remixicon/react"
import { eachDayOfInterval, interval, subDays, subYears } from "date-fns"
import React from "react"
import { DateRange } from "react-day-picker"
import { ChartCard } from "./DashboardChartCard"

type Period = {
  value: PeriodValue
  label: string
}

const periods: Period[] = [
  {
    value: "previous-period",
    label: "Previous period",
  },
  {
    value: "last-year",
    label: "Last year",
  },
  {
    value: "no-comparison",
    label: "No comparison",
  },
]

export const getPeriod = (
  dateRange: DateRange | undefined,
  value: PeriodValue,
): DateRange | undefined => {
  if (!dateRange) return undefined
  const from = dateRange.from
  const to = dateRange.to
  switch (value) {
    case "previous-period":
      let previousPeriodFrom
      let previousPeriodTo
      if (from && to) {
        const datesInterval = interval(from, to)
        const numberOfDaysBetween = eachDayOfInterval(datesInterval).length
        previousPeriodTo = subDays(from, 1)
        previousPeriodFrom = subDays(previousPeriodTo, numberOfDaysBetween)
      }
      return { from: previousPeriodFrom, to: previousPeriodTo }
    case "last-year":
      let lastYearFrom
      let lastYearTo
      if (from) {
        lastYearFrom = subYears(from, 1)
      }
      if (to) {
        lastYearTo = subYears(to, 1)
      }
      return { from: lastYearFrom, to: lastYearTo }
    case "no-comparison":
      return undefined
  }
}

type FilterbarProps = {
  maxDate?: Date
  minDate?: Date
  selectedDates: DateRange | undefined
  onDatesChange: (dates: DateRange | undefined) => void
  selectedPeriod: PeriodValue
  onPeriodChange: (period: PeriodValue) => void
  categories: any[]
  setSelectedCategories: any
  selectedCategories: any
}

export function Filterbar({
  maxDate,
  minDate,
  selectedDates,
  onDatesChange,
  selectedPeriod,
  onPeriodChange,
  categories,
  setSelectedCategories,
  selectedCategories,
}: FilterbarProps) {
  const [tempSelectedCategories, setTempSelectedCategories] =
    React.useState(selectedCategories)

  const handleCategoryChange = (category: string) => {
    setTempSelectedCategories((prev: any) =>
      prev.includes(category)
        ? prev.filter((item: any) => item !== category)
        : [...prev, category],
    )
  }

  const handleApply = () => {
    setSelectedCategories(tempSelectedCategories)
  }
  return (
    <div className="flex w-full justify-between">
      <div className="w-full sm:flex sm:items-center sm:gap-2">
        <DateRangePicker
          value={selectedDates}
          onChange={onDatesChange}
          className="w-full sm:w-fit"
          toDate={maxDate}
          fromDate={minDate}
          align="start"
        />
        <span className="hidden text-sm font-medium text-gray-500 sm:block">
          compared to
        </span>
        <Select
          defaultValue="no-comparison"
          value={selectedPeriod}
          onValueChange={(value) => {
            onPeriodChange(value as PeriodValue)
          }}
        >
          <SelectTrigger className="mt-2 w-full sm:mt-0 sm:w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {periods.map((period) => (
              <SelectItemPeriod
                key={period.value}
                value={period.value}
                period={getPeriod(selectedDates, period.value)}
              >
                {period.label}
              </SelectItemPeriod>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="hidden gap-2 px-2 py-1 sm:flex"
          >
            <RiSettings5Line
              className="-ml-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <span>Edit</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Customise overview charts</DialogTitle>
            <DialogDescription className="sr-only">
              Add or remove the charts for the overview panel.
            </DialogDescription>
          </DialogHeader>
          <div
            className={cx(
              "mt-8 grid max-h-[70vh] grid-cols-1 gap-4 overflow-y-scroll sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
            )}
          >
            {categories.map((category) => {
              return (
                <Label
                  htmlFor={category.title}
                  key={category.title}
                  className="relative cursor-pointer rounded-md border border-gray-200 p-4 shadow-sm dark:border-gray-800"
                >
                  <Checkbox
                    id={category.title}
                    className="absolute right-4"
                    checked={tempSelectedCategories.includes(category.title)}
                    onCheckedChange={() => handleCategoryChange(category.title)}
                  />
                  <div className="pointer-events-none">
                    <ChartCard
                      title={category.title}
                      type={category.type}
                      selectedDates={selectedDates}
                      selectedPeriod={selectedPeriod}
                      isThumbnail={true}
                    />
                  </div>
                </Label>
              )
            })}
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
              >
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="w-full sm:w-fit" onClick={handleApply}>
                Apply
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client";

import {
  Select,
  SelectContent,
  SelectItemPeriod,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";

import { DateRangePicker } from "@/components/DatePicker";
import { DateRange } from "react-day-picker";
import React from "react";
import { PeriodValue } from "@/app/workspace/overview/page";
import { eachDayOfInterval, interval, subDays, subYears } from "date-fns";
import { OverviewData } from "@/data/schema";
import { overviews } from "@/data/data";

type Period = {
  value: PeriodValue;
  label: string;
};

const periods: Period[] = [
  {
    value: "previous-period",
    label: "Previous period",
  },
  {
    // @Maxime: means same period last year (e.g. if seven days are selected, the same 7 days 1 year ago :)
    value: "last-year",
    label: "Last year",
  },
  {
    value: "no-comparison",
    label: "No comparison",
  },
];

export const getPeriod = (
  dateRange: DateRange | undefined,
  value: PeriodValue,
): DateRange | undefined => {
  if (!dateRange) return undefined;
  const from = dateRange.from;
  const to = dateRange.to;
  switch (value) {
    case "previous-period":
      let previousPeriodFrom;
      let previousPeriodTo;
      if (from && to) {
        const datesInterval = interval(from, to);
        const numberOfDaysBetween = eachDayOfInterval(datesInterval).length;
        previousPeriodTo = subDays(from, 1);
        previousPeriodFrom = subDays(previousPeriodTo, numberOfDaysBetween);
      }
      return { from: previousPeriodFrom, to: previousPeriodTo };
    case "last-year":
      let lastYearFrom;
      let lastYearTo;
      if (from) {
        lastYearFrom = subYears(from, 1);
      }
      if (to) {
        lastYearTo = subYears(to, 1);
      }
      return { from: lastYearFrom, to: lastYearTo };
    case "no-comparison":
      return undefined;
  }
};

const getMaxDate = (data: OverviewData[]): Date => {
  return new Date(
    Math.max(...data.map((item) => new Date(item.date).getTime())),
  );
};

// @CHRIS/SEV: old filterbar in /Filterbar.tsx

export type FilterbarProps = {
  maxDate?: Date;
  selectedDates: DateRange | undefined;
  onDatesChange: (dates: DateRange | undefined) => void;
  selectedPeriod: PeriodValue;
  onPeriodChange: (period: PeriodValue) => void;
};

export function Filterbar({
  maxDate,
  selectedDates,
  onDatesChange,
  selectedPeriod,
  onPeriodChange,
}: FilterbarProps) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <DateRangePicker
          value={selectedDates}
          onChange={onDatesChange}
          className="w-fit"
          toDate={maxDate}
          align="start"
        />
        <span className="text-sm text-gray-500 font-medium">compared to</span>
        <Select
          defaultValue="no-comparison"
          value={selectedPeriod}
          onValueChange={(value) => {
            onPeriodChange(value as PeriodValue);
          }}
        >
          <SelectTrigger className="w-fit py-1 px-2">
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
    </>
  );
}

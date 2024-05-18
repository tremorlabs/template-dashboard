"use client";
import { Button } from "@/components/Button"
import { RiAddLine } from "@remixicon/react"
import { Card } from "@/components/ui/dashboard/cards"
import { Filterbar } from "@/components/ui/dashboard/dashboard-filterbar"
import React from "react"
import { DateRange } from "react-day-picker"
import { subDays, toDate } from "date-fns";
import { overviews } from "@/data/data";


export type PeriodValue = "previous-period" | "last-year" | "no-comparison"

const categories = [
    {
        title: "Sales",
        type: "currency",
    },
    {
        title: "Profit",
        type: "currency",
    },
    {
        title: "Users",
        type: "unit",
    },
] as const

const overviewsDates = overviews.map((item) => toDate(item.date).getTime())
const maxDate = toDate(Math.max(...overviewsDates))
export default function Example() {
    const [selectedDates, setSelectedDates] = React.useState<DateRange | undefined>({
        from: subDays(maxDate, 10),
        to: maxDate
    })
    const [selectedPeriod, setSelectedPeriod] = React.useState<PeriodValue>('no-comparison')

    return (
        <>
            <div className="border-b pb-4">
                <h1 className="text-lg font-semibold text-gray-900">Overview</h1>
                <div className="flex items-center justify-between mt-4">
                    <Filterbar 
                        maxDate={maxDate}
                        selectedDates={selectedDates} 
                        onDatesChange={(dates) => setSelectedDates(dates)}
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={(period) => setSelectedPeriod(period)}
                    />
                    {/* <div className="flex items-center gap-x-2">
                        <Button variant="secondary">
                            Edit
                        </Button>
                        <Button className="gap-x-1">
                            Add
                            <RiAddLine className="-mr-1 size-5 shrink-0" aria-hidden={true} />
                        </Button>
                    </div> */}
                </div>
            </div>
            <dl className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {categories.map((item) => (
                    <Card 
                        key={item.title} 
                        title={item.title} 
                        // value={item.value} 
                        type={item.type} 
                        selectedDates={selectedDates}
                        selectedPeriod={selectedPeriod}
                    />
                ))}
            </dl>
        </>
    )
}
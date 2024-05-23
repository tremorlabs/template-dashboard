"use client";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { RiSettings5Line } from "@remixicon/react";
import { MetricsCard } from "@/components/ui/dashboard/cards";
import { Filterbar } from "@/components/ui/dashboard/dashboard-filterbar";
import React from "react";
import { DateRange } from "react-day-picker";
import { subDays, toDate } from "date-fns";
import { overviews } from "@/data/data";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { cx } from "@/lib/utils";

export type PeriodValue = "previous-period" | "last-year" | "no-comparison"

// @CHRIS: declare via types
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

const overviewsDates = overviews.map((item) => toDate(item.date).getTime());
const maxDate = toDate(Math.max(...overviewsDates));
export default function Example() {
    const [isEditable, setIsEditable] = React.useState(false)
    const [parentRef, KPICardsOrder, _, updateConfig] = useDragAndDrop<HTMLUListElement, string>(categories.map((item) => item.title), {
        // dragHandle: ".drag-icon",
        disabled: !isEditable,
        plugins: [animations()],
    })
    const [selectedDates, setSelectedDates] = React.useState<DateRange | undefined>({
        from: subDays(maxDate, 10),
        to: maxDate
    })
    const [selectedPeriod, setSelectedPeriod] = React.useState<PeriodValue>('no-comparison')

    React.useEffect(() => {
        updateConfig({ disabled: !isEditable })
    }, [isEditable])

    return (
        <>
            {/* @CHRIS: section with ID */}
            <section>
                <h1 className="text-lg font-semibold text-gray-900">Today</h1>
                <div className="mt-6 grid grid-cols-3 gap-6">
                    <Card>
                        <h2 className="text-sm text-gray-900 font-bold">Sales</h2>
                        <dd className="text-xl text-gray-900">4,500</dd>
                        <div className="mt-4 h-20 bg-gray-100 rounded-md" />
                    </Card>
                </div>
            </section>
            <section className="mt-10">
                <div className="border-b pb-4">
                    <h1 className="text-lg font-semibold text-gray-900">Overview</h1>
                    <div className="flex items-center justify-between mt-4">
                        <Filterbar
                            maxDate={maxDate}
                            selectedDates={selectedDates}
                            onDatesChange={(dates) => setSelectedDates(dates)}
                            selectedPeriod={selectedPeriod}
                            onPeriodChange={(period) => setSelectedPeriod(period)}
                            isEditable={isEditable}
                        />
                        <Button
                            variant={isEditable ? "primary" : "secondary"}
                            className="gap-2"
                            onClick={() => {
                                setIsEditable((prev) => !prev)
                            }}
                        >
                            {!isEditable && (
                                <RiSettings5Line className="-ml-1 size-4 shrink-0" aria-hidden="true" />
                            )}
                            {isEditable ? "Save" : "Edit"}
                        </Button>
                    </div>
                </div>
                <dl
                    ref={parentRef}
                    className={cx(
                        "mt-4 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 rounded-lg p-1 border border-dashed border-transparent",
                        isEditable ? "border-gray-200 bg-gray-50" : ""
                    )}
                >
                    {KPICardsOrder.map((item) => {
                        const category = categories.find((category) => category.title === item)
                        if (!category) return null
                        return (
                            <MetricsCard
                                key={item}
                                title={category.title}
                                // value={category.value} 
                                type={category.type}
                                selectedDates={selectedDates}
                                selectedPeriod={selectedPeriod}
                                isEditable={isEditable}
                            />
                        )
                    })}
                </dl>
            </section>
        </>
    )
}

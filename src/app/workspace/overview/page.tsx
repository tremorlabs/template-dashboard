"use client";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { RiArrowRightSLine, RiTableLine, RiGitBranchLine, RiSettings5Line } from "@remixicon/react";
import { MetricsCard } from "@/components/ui/dashboard/cards";
import { Filterbar } from "@/components/ui/dashboard/dashboard-filterbar";
import React from "react";
import { DateRange } from "react-day-picker";
import { set, subDays, toDate } from "date-fns";
import { overviews } from "@/data/data";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { cx } from "@/lib/utils";
import { ProgressCircle } from "@/components/ProgressCircle";
import { Divider } from "@/components/Divider";
import { LineChart, LineChartEventProps } from "@/components/LineChart2";
import { ProgressBar } from "@/components/ProgressBar";
import { dummyData } from "@/data/data";
import { Input } from "@/components/Input";

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

const dataRows = [
    {
        title: "Rows read",
        percentage: 48.1,
        current: 48.1,
        allowed: 100,
        unit: "M"
    },
    {
        title: "Rows written",
        percentage: 78.3,
        current: 78.3,
        allowed: 100,
        unit: "M"
    },
    {
        title: "Storage",
        percentage: 26,
        current: 5.2,
        allowed: 20,
        unit: "GB"
    },
]

// @CHRIS: for count-up animation

type InitialAverageValues = {
    "Rows read": {
        start: number,
        end: number
    },
    "Rows written": {
        start: number,
        end: number
    }
}
const initialAverageValues: InitialAverageValues = {
    "Rows read": {
        start: 0,
        end: dummyData.reduce((sum, dataPoint) => sum + dataPoint["Rows read"], 0) / dummyData.length
    },
    "Rows written": {
        start: 0,
        end: dummyData.reduce((sum, dataPoint) => sum + dataPoint["Rows written"], 0) / dummyData.length
    }
}

type Categories = keyof InitialAverageValues


const overviewsDates = overviews.map((item) => toDate(item.date).getTime());
const maxDate = toDate(Math.max(...overviewsDates));
export default function Example() {
    const [isEditable, setIsEditable] = React.useState(false)
    const [parentRef, KPICardsOrder, _, updateConfig] = useDragAndDrop<HTMLUListElement, string>(categories.map((item) => item.title), {
        // @CHRIS
        // dragHandle: ".drag-icon",
        disabled: !isEditable,
        plugins: [animations()],
    })
    const [selectedDates, setSelectedDates] = React.useState<DateRange | undefined>({
        from: subDays(maxDate, 10),
        to: maxDate
    })
    const [selectedPeriod, setSelectedPeriod] = React.useState<PeriodValue>('no-comparison')
    const [values, setValues] = React.useState<InitialAverageValues>(initialAverageValues)
    const [categoryClicked, setCategoryClicked] = React.useState<Categories | null>(null)

    const handleValueChange = (e: LineChartEventProps) => {
        const category = e?.categoryClicked as Categories
        switch (e?.eventType) {
            case 'dot':
                setValues((prev) => ({
                    ...prev,
                    [category]: {
                        start: prev?.[category]?.end,
                        end: e?.[category]
                    }
                }))
                setCategoryClicked(category)
                break;
            case 'category':
                setValues((prev) => ({
                    ...prev,
                    [category]: {
                        start: prev?.[category]?.end,
                        end: initialAverageValues[category].end
                    }
                }))
                setCategoryClicked(category)
                break;
            default:
                setValues(initialAverageValues)
                setCategoryClicked(null)
                break;
        }

    }

    React.useEffect(() => {
        updateConfig({ disabled: !isEditable })
    }, [isEditable])

    return (
        <>
            {/* @CHRIS: add ID to section */}
            {/* @CHRIS: pay attention between title alignment of first and second card */}

            <h1 className="text-lg font-semibold text-gray-900">Today</h1>
            <div className="mt-4 gap-px bg-gray-200 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {/* @CHRIS: padding */}
                <Card className="xl:col-span-2 border-transparent shadow-none rounded-none pl-0 pt-2 pr-0 sm:pr-8">
                    <div className="flex items-center gap-10">
                        <div
                            className={categoryClicked && categoryClicked !== "Rows read" ? "opacity-50" : ""}
                        >
                            <h2 className="text-sm text-gray-900 font-bold">Rows read</h2>
                            <dd className="mt-1 text-2xl text-gray-900">
                                88.0M
                            </dd>
                        </div>
                        <div
                            className={categoryClicked && categoryClicked !== "Rows written" ? "opacity-50" : ""}
                        >
                            <h2 className="text-sm text-gray-900 font-bold">Rows written</h2>
                            <dd className="mt-1 text-2xl text-gray-900">
                                82.0M
                            </dd>
                        </div>
                    </div>
                    <LineChart
                        data={dummyData}
                        index="date"
                        categories={["Rows read", "Rows written"]}
                        colors={["indigo", "amber"]}
                        showYAxis={false}
                        onValueChange={handleValueChange}
                        className="h-64"
                    />
                </Card>
                {/* @CHRIS: padding */}
                <Card className="xl:col-span-1 border-transparent shadow-none rounded-none pl-0 pr-0 sm:pl-8 pt-8 sm:pt-2">
                    {/* @CHRIS: dt/dl syntax */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-900">Usage</h3>
                            <Badge variant="neutral">67%</Badge>
                        </div>
                    </div>
                    <ul role="list" className="mt-10 space-y-5">
                        {dataRows.map((item) => (
                            <li key={item.title}>
                                <p className="text-sm flex justify-between">
                                    <span className="font-medium text-gray-900">{item.title}</span>
                                    <span className="font-medium text-gray-900">
                                        {item.current} out of{" "}
                                        <span className="font-normal text-gray-500">{item.allowed}{item.unit}</span>
                                    </span>
                                </p>
                                <ProgressBar value={item.percentage} className="mt-2 [&>*]:h-1.5" />
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-xs text-gray-500">
                        Monthly usage resets in 12 days.{" "}
                        <a href="#" className="text-indigo-600">Manage plan.</a>
                    </p>
                </Card>
            </div >
            <h1 className="mt-10 text-lg font-semibold text-gray-900">Overview</h1>
            <div className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between py-4">
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
                    className="hidden sm:flex gap-2 py-1"
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

            <dl
                ref={parentRef}
                className={cx(
                    "mt-8 grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 rounded-lg border border-dashed border-transparent",
                    isEditable ? "p-2 border-gray-200 bg-gray-50" : "transition"
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
        </>
    )
}

import { formatters, percentageFormatter } from "@/lib/utils";
import { Badge } from "@/components/Badge";
import { LineChart } from "@/components/LineChart";
import { DateRange } from "react-day-picker";
import { PeriodValue } from "@/app/workspace/overview/page";
import React from "react";
import { overviews } from "@/data/data";
import { getPeriod } from "./dashboard-filterbar";
import { eachDayOfInterval, formatDate, interval, isEqual, isWithinInterval, toDate } from "date-fns";
import { OverviewData } from "@/data/schema";

//   @CHRIS: import mono font for number
//   import { lusitana } from '@/app/ui/fonts';


// @Maxime/Chris: dummy data -> remover afterwards

export type CardProps = {
    title: keyof OverviewData;
    type: 'currency' | 'unit';
    selectedDates: DateRange | undefined;
    selectedPeriod: PeriodValue;
};

const formattingMap = {
    currency: formatters.currency,
    unit: formatters.unit,
};

export const getBadgeType = (value: number) => {
    if (value > 0) {
        return "success";
    } else if (value < 0) {
        if (value < -50) {
            return "warning";
        }
        return "error";
    } else {
        return "neutral";
    }
}

export function Card({
    title,
    type,
    selectedDates,
    selectedPeriod,
}: CardProps) {
    const formatter = formattingMap[type];
    const selectedDatesInterval = selectedDates?.from && selectedDates?.to ? interval(selectedDates.from, selectedDates.to) : null;
    const allDatesInInterval = selectedDates?.from && selectedDates?.to ? eachDayOfInterval(interval(selectedDates.from, selectedDates.to)) : null;
    const prevDates = getPeriod(selectedDates, selectedPeriod);
    
    const prevDatesInterval = prevDates?.from && prevDates?.to ? interval(prevDates.from, prevDates.to) : null;

    const data = overviews.filter((overview) => {
        if (selectedDatesInterval) {
            return isWithinInterval(overview.date, selectedDatesInterval);
        }
        return true;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const prevData = overviews.filter((overview) => {
        if (prevDatesInterval) {
            return isWithinInterval(overview.date, prevDatesInterval);
        }
        return false;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    

    const chartData = allDatesInInterval?.map((date, index) => {
        const overview = data[index];
        const prevOverview = prevData[index];
        const value = overview?.[title] as number || null;
        const previousValue = prevOverview?.[title] as number || null;

        return {
            title,
            date: date,
            formattedDate: formatDate(date, "dd/MM/yyyy"),
            value,
            previousDate: prevOverview?.date,
            previousFormattedDate: prevOverview ? formatDate(prevOverview.date, "dd/MM/yyyy") : null,
            previousValue: selectedPeriod !== "no-comparison" ? previousValue : null,
            evolution: selectedPeriod !== "no-comparison" && value && previousValue ? (value - previousValue) / previousValue : undefined,
        };
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const categories = selectedPeriod === "no-comparison" ? ["value"] : ["value", "previousValue"];
    const value = chartData?.reduce((acc, item) => acc + (item.value || 0), 0) || 0;
    const previousValue = chartData?.reduce((acc, item) => acc + (item.previousValue || 0), 0) || 0;
    const evolution = selectedPeriod !== "no-comparison" ? (value - previousValue) / previousValue : 0;

    return (
        <div className="rounded-lg border border-gray-200 p-6 bg-white shadow-sm">
            <div className="flex items-center gap-x-2">
                <dt className="text-sm text-gray-900 font-bold">{title}</dt>
                {selectedPeriod !== "no-comparison" && (
                    <Badge variant={getBadgeType(evolution)}>{percentageFormatter(evolution)}</Badge>
                )}
            </div>
            <div className="mt-2 flex items-baseline justify-between">
                <dd className="text-xl text-gray-900">{formatter(value)}</dd>
                {selectedPeriod !== "no-comparison" && (
                    <dd className="text-sm text-gray-500">from {formatter(previousValue)}</dd>
                )}
            </div>
            <LineChart
                className="mt-8 h-32"
                data={chartData || []}
                index="formattedDate"
                colors={["indigo", "gray"]}
                startEndOnly={true}
                valueFormatter={(value) => formatter(value as number)}
                showYAxis={false}
                showLegend={false}
                categories={categories}
            />

        </div>
    );
}

//   @CHRIS: for second font
//   <p
//   className={`${lusitana.className}
//     truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
// >
//   {value}
// </p>


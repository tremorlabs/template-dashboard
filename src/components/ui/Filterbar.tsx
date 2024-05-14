'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/Select'

import { DateRangePicker } from '@/components/DatePicker';


const data = [
    {
        value: 'today',
        label: 'Today',
    },
    {
        value: 'last-7-days',
        label: 'Last 7 days',
    },
    {
        value: 'last-4-weeks',
        label: 'Last 4 weeks',
    },
    {
        value: 'last-3-months',
        label: 'Last 3 months',
    },
    {
        value: 'last-12-months',
        label: 'Last 12 months',
    },
    {
        value: 'month-to-date',
        label: 'Month to date',
    },
    {
        value: 'quarter-to-date',
        label: 'Quarter to date',
    },
    {
        value: 'year-to-date',
        label: 'Year to date',
    },
    {
        value: 'all-time',
        label: 'All time',
    },
]


export function Filterbar() {
    return (
        <div className="mt-4">
            <div className="inline-flex items-center rounded-md text-sm font-medium shadow-sm">
                <Select defaultValue="custom">
                    <SelectTrigger className="shadow-none w-fit rounded-none rounded-l-md">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {data.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <DateRangePicker
                    defaultValue={{
                        from: new Date(new Date().setDate(new Date().getDate() - 10)),
                        to: new Date(),
                    }}
                    className="-ml-px w-fit shadow-none rounded-none rounded-r-md"
                />
            </div>
        </div>
    )
}

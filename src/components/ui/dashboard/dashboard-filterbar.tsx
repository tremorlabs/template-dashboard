'use client';

import {
    Select,
    SelectContent,
    SelectItemPeriod,
    SelectTrigger,
    SelectValue,
} from '@/components/Select'

import { DateRangePicker } from '@/components/DatePicker';


const periods = [
    {
        value: 'previous-period',
        label: 'Previous period',
        period: '4 May – 10 May'
    },
    {
        // @Maxime: means same period last year (e.g. if seven days are selected, the same 7 days 1 year ago :) 
        value: 'last-year',
        label: 'Last year',
        period: '11 May – 17 May 2023'
    },
    {
        value: 'no-comparison',
        label: 'No comparison',
    },
]

// @CHRIS/SEV: old filterbar in /Filterbar.tsx

export function Filterbar() {
    return (
        <>
            <div className="flex items-center gap-x-2">
                <DateRangePicker
                    defaultValue={{
                        from: new Date(new Date().setDate(new Date().getDate() - 10)),
                        to: new Date(),
                    }}
                    className="w-fit"
                />
                <span className="text-sm text-gray-500 font-medium">compared to</span>
                <Select defaultValue="no-comparison">
                    <SelectTrigger className="w-fit py-1 px-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {periods.map((period) => (
                            <SelectItemPeriod key={period.value} value={period.value} period={period.period}>
                                {period.label}
                            </SelectItemPeriod>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}

import { formatters } from "@/lib/utils";
import { Badge } from "@/components/Badge";
import { LineChart } from "@/components/LineChart";

//   @CHRIS: import mono font for number
//   import { lusitana } from '@/app/ui/fonts';


// @Maxime/Chris: dummy data -> remover afterwards
const chartdata = [
    {
        date: "Jan 23",
        value: 2890,
        previousValue: 2338,
    },
    {
        date: "Feb 23",
        value: 2756,
        previousValue: 2103,
    },
    {
        date: "Mar 23",
        value: 3322,
        previousValue: 2194,
    },
    {
        date: "Apr 23",
        value: 3470,
        previousValue: 2108,
    },
    {
        date: "May 23",
        value: 3475,
        previousValue: 1812,
    },
    {
        date: "Jun 23",
        value: 3129,
        previousValue: 1726,
    },
    {
        date: "Jul 23",
        value: 3490,
        previousValue: 1982,
    },
    {
        date: "Aug 23",
        value: 2903,
        previousValue: 2012,
    },
    {
        date: "Sep 23",
        value: 2643,
        previousValue: 2342,
    },
    {
        date: "Oct 23",
        value: 2837,
        previousValue: 2473,
    },
    {
        date: "Nov 23",
        value: 2954,
        previousValue: 3848,
    },
    {
        date: "Dec 23",
        value: 3239,
        previousValue: 3736,
    },
]



export type CardProps = {
    title: string;
    value: number | string;
    type: 'currency' | 'unit';
};

const formattingMap = {
    currency: formatters.currency,
    unit: formatters.unit,
};

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'currency' | 'unit';
}) {
    const formatter = formattingMap[type];
    return (
        <div>
            <div className="flex items-center gap-x-2">
                <dt className="text-sm text-gray-900 font-bold">{title}</dt>
                <Badge variant="success">+12.3</Badge>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
                <dd className="text-xl text-gray-900">{formatter(value)}</dd>
                {/* don't show if comparison is not selected */}
                <dd className="text-sm text-gray-500">from {formatter(3034)}</dd>
            </div>
            <LineChart
                className="mt-8 h-40"
                data={chartdata}
                index="date"
                colors={["indigo", "gray"]}
                maxValue={5000}
                startEndOnly={true}
                showYAxis={false}
                showLegend={false}
                categories={["value", "previousValue"]}
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


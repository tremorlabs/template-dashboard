
"use client"

// const numberFormatter = (number: number) => {
//     return Intl.NumberFormat('us').format(number).toString();
// };

// const percentageFormatter = (number: number) => {
//     return Intl.NumberFormat('us').format(number).toString() + '%';
// };

// function formatPercentage(payload, percentage) {
//     if (!payload || isNaN(percentage)) return '--';
//     const sign = percentage > 0 ? '+' : '';
//     return `${sign}${percentage.toFixed(1)}%`;
// }

// const data = [
//     { date: 'Jan 23', users: 234, sessions: 1432, churn: 5.2, }, { date: 'Feb 23', users: 431, sessions: 1032, churn: 4.3, }, { date: 'Mar 23', users: 543, sessions: 1089, churn: 5.1, }, { date: 'Apr 23', users: 489, sessions: 988, churn: 5.4, }, { date: 'May 23', users: 391, sessions: 642, churn: 5.5, }, { date: 'Jun 23', users: 582, sessions: 786, churn: 4.8, }, { date: 'Jul 23', users: 482, sessions: 673, churn: 4.5, }, { date: 'Aug 23', users: 389, sessions: 761, churn: 0, }, { date: 'Sep 23', users: 521, sessions: 793, churn: 0, }, { date: 'Oct 23', users: 434, sessions: 543, churn: 0, }, { date: 'Nov 23', users: 332, sessions: 678, churn: 0, }, { date: 'Dec 23', users: 275, sessions: 873, churn: 0, },
// ];

// const categories = [
//     { name: 'Monthly users', chartCategory: 'users', valueFormatter: numberFormatter, }, { name: 'Monthly sessions', chartCategory: 'sessions', valueFormatter: numberFormatter, }, { name: 'Monthly churn (%)', chartCategory: 'churn', valueFormatter: percentageFormatter, },
// ];


// const customTooltipHandler = (props, setselectedChartData) => {
//     if (props.active) {
//         setselectedChartData((prev) => {
//             if (prev?.label === props?.label) return prev;
//             return props;
//         });
//     } else {
//         setselectedChartData(null);
//     }
//     return null;
// };


// function CustomChart({ item }) {
//     const [selectedChartData, setselectedChartData] = useState(null);
//     const payload = selectedChartData?.payload[0];

//     const value = payload?.payload[item.chartCategory];

//     const customTooltipIndex = 'date';

//     const previousIndex = data.findIndex(
//         (e) => e[customTooltipIndex] === payload?.payload?.date,
//     );
//     const previousValues = previousIndex > 0 ? data[previousIndex - 1] : {};

//     const prev = previousValues ? previousValues[item.chartCategory] : undefined;
//     const percentage = ((value - prev) / prev) * 100 ?? undefined;

//     const formattedValue = payload
//         ? item.valueFormatter(payload?.payload[item.chartCategory])
//         : item.valueFormatter(data[0][item.chartCategory]);
//     return (
//         <Card>
//             <p className="flex items-center justify-between">
//                 <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
//                     {item.name}
//                 </span>
//                 <span className="rounded-tremor-small bg-tremor-background-subtle px-2 py-0.5 text-tremor-label font-medium text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
//                     {formatPercentage(payload, percentage)}
//                 </span>
//             </p>
//             <p className="mt-1 flex items-baseline justify-between">
//                 <span className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
//                     {formattedValue}
//                 </span>
//                 <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
//                     {payload ? `${payload?.payload?.date}` : `${data[0].date}`}
//                 </span>
//             </p>
//             <AreaChart
//                 data={data}
//                 index="date"
//                 categories={[item.chartCategory]}
//                 showLegend={false}
//                 showYAxis={false}
//                 showGridLines={false}
//                 showGradient={false}
//                 startEndOnly={true}
//                 className="-mb-2 mt-3 h-24"
//                 customTooltip={(props) => {
//                     customTooltipHandler(props, setselectedChartData);
//                 }}
//             />
//         </Card>
//     );
// }

const categories = [
    {
        name: "Sales",
        value: 1324
    },
    {
        name: "Revenue",
        value: 93324
    },
    {
        name: "Users",
        value: 123
    },
]

export default function Example() {
    return (
        <main className="p-4 sm:p-6">
            <h1 className="text-lg font-semibold text-gray-900">Overview</h1>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((item) => (
                    <div key={item.name} className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
                        <h3 className="text-sm text-gray-500">{item.name}</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{item.value}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}

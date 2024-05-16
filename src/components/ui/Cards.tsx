import { formatters } from "@/lib/utils";

//   @CHRIS: import mono font for number
//   import { lusitana } from '@/app/ui/fonts';

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
        <div className="rounded-lg border border-gray-300 p-4 shadow-sm">
            <h3 className="text-sm text-gray-500">{title}</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{formatter(value)}</p>
            <div className="mt-4 h-14 rounded-md bg-gray-100" />
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


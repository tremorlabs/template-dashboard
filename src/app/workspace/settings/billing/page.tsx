import { RiArrowRightUpLine } from "@remixicon/react";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/Button";

const data = [
    { name: 'Starter plan', description: 'Discounted plan for start-ups and growing companies', value: '$90.00', capacity: null, current: null, },
    { name: 'Storage used', description: 'Used 1.1 GB', value: '$0.00', capacity: '10 GB included', current: null, percentageValue: 11, },
    { name: 'Users', description: 'Used 9', value: '$0.00', capacity: '50 users included', current: 9, percentageValue: 18, },
    { name: 'Query super caching (EU-Central 1)', description: '4 GB query cache, $120/mo', value: '$120.00', capacity: null, current: null, },
];


// ----- TODOs -------:

// - Componentize


export default function Billing() {
    return (
        <>
            {/* <h2 className="font-semibold text-gray-900">Billing & Usage</h2> */}
            {/* <p className="mt-2 text-sm leading-6 text-gray-500">
                See the breakdown of your costs for the upcoming payment.{' '}
                <a
                    href="#"
                    className="inline-flex items-center gap-1 text-indigo-600 hover:underline hover:underline-offset-4"
                >
                    Compare pricing plans
                    <RiExternalLinkLine className="size-4 shrink-0" aria-hidden={true} />
                </a>
            </p> */}
            <div className="rounded-lg bg-gray-50 p-6 ring-1 ring-inset ring-gray-200 sm:max-w-7xl">
                <h4 className="text-base font-semibold text-gray-900">
                    This workspace is currently on free plan
                </h4>
                <p className="mt-1 text-sm text-gray-500 max-w-2xl leading-6">
                    Boost your analytics and unlock advanced features with our premium
                    plans.
                </p>
                <div className="mt-6 flex items-center space-x-2">
                    <Button asChild>
                        <a href="#" className="flex items-center gap-x-1">
                            Compare plans
                            <RiArrowRightUpLine className="size-4 shrink-0" aria-hidden="true" />
                        </a>
                    </Button>
                    <Button variant="secondary">
                        Dismiss
                    </Button>
                </div>
            </div>
            {/* @CHRIS: take care of other existing dataCard => naming */}
            <Card className="mt-6 overflow-hidden p-0">
                <div className="flex items-start px-5 py-2">
                    <ul role="list" className="w-full divide-y">
                        {data.map((item) => (
                            <li key={item.name} className="py-4 text-sm">
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium text-gray-900">
                                            {item.name}
                                        </p>
                                        <p className="font-medium text-gray-700">
                                            {item.value}
                                        </p>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        {item.percentageValue && (
                                            <ProgressBar
                                                value={item.percentageValue}
                                                className="mt-2 [&>*]:h-1.5"
                                            />
                                        )}
                                        <p className="mt-1 flex items-center justify-between text-xs text-gray-500">
                                            <span>{item.description}</span>
                                            <span>{item.capacity}</span>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
                    <p className="flex items-center justify-between text-sm font-medium text-gray-900">
                        <span>Total for May 24</span>
                        <span className="font-semibold">$210.00</span>
                    </p>
                </div>
            </Card>
        </>
    )
}
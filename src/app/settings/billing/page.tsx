"use client"

import { RiArrowRightUpLine } from "@remixicon/react";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { Divider } from "@/components/Divider";
import { Input } from "@/components/Input";
import { ProgressCircle } from "@/components/ProgressCircle";
import { Switch } from "@/components/Switch";
import { Label } from "@/components/Label";

const data = [
  {
    name: "Starter plan",
    description: "Discounted plan for start-ups and growing companies",
    value: "$90",
  },
  {
    name: "Storage",
    description: "Used 10.1 GB",
    value: "$40",
    capacity: "100 GB included",
    percentageValue: 10.1,
  },
  {
    name: "Bandwith",
    description: "Used 2.9 GB",
    value: "$10",
    capacity: "5 GB included",
    percentageValue: 58,
  },
  {
    name: "Users",
    description: "Used 9",
    value: "$20",
    capacity: "50 users included",
    percentageValue: 18,
  },
  {
    name: "Query super caching (EU-Central 1)",
    description: "4 GB query cache, $120/mo",
    value: "$120.00",
  },
];


// ----- TODOs (CHRIS) -------:

// - Componentize

export default function Billing() {
  return (
    <>
      <div className="rounded-lg bg-gray-50 dark:bg-gray-400/10 p-6 ring-1 ring-inset ring-gray-200 dark:ring-gray-800 sm:max-w-7xl">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
          This workspace is currently on free plan
        </h4>
        <p className="mt-1 text-sm text-gray-500 max-w-2xl leading-6">
          Boost your analytics and unlock advanced features with our premium
          plans.{" "}
          <a href="#" className="inline-flex items-center gap-x-1 text-indigo-600 dark:text-indigo-500">
            Compare plans
            <RiArrowRightUpLine
              className="size-4 shrink-0"
              aria-hidden="true"
            />
          </a>
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-8 gap-x-14 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-50">
            Billing
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Overview of current billing cycle based on fixed and on-demand charges.
          </p>
        </div>
        <div className="md:col-span-2">
          <ul
            role="list"
            className="w-full divide-y divide-gray-200 dark:divide-gray-800 border-b border-gray-200 dark:border-gray-800"
          >
            {data.map((item) => (
              <li key={item.name} className="py-4 px-2 md:p-4 text-sm">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 dark:text-gray-50">
                      {item.name}
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
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
          {/* <div className="mt-2 px-4 py-2.5 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"> */}
          <div className="px-2 py-4 md:p-4">
            <p className="flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-50">
              <span>Total for May 24</span>
              <span className="font-semibold">$280</span>
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-1 gap-y-8 gap-x-14 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-50">
            Cost spend management
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Set hard caps for on-demand charges.
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ProgressCircle value={62.2} radius={20} strokeWidth={4.5} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    &#36;280 / 350 (62.2&#37;)
                  </p>
                  <Label
                    htmlFor="spend-mgmt"
                    className="text-gray-500 dark:text-gray-500"
                  >
                    Spend management enabled
                  </Label>
                </div>
              </div>
              <Switch id="spend-mgmt" name="spend-mgmt" defaultChecked />
            </div>
            {/* <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-900 dark:text-gray-50">
                Set amount ($)
              </p>
              <Input
                placeholder="$120"
                enableStepper={false}
                className="w-20"
              />
            </div> */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Label className="font-medium">
                  Set amount
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="350$"
                  type="number"
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="font-medium">
                  Provide email for notifications
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="admin@company.com"
                  type="email"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="mt-6 grid grid-cols-1 gap-y-8 gap-x-14 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-50">
            Add-Ons
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Additional services to boost your services.
          </p>
        </div>
      </div>
    </>
  );
}

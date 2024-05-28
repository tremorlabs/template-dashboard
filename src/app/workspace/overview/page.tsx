"use client";
import { Button } from "@/components/Button";
import { RiSettings5Line } from "@remixicon/react";
import { ChartCard } from "@/components/ui/dashboard/dashboard-chart-card";
import { Filterbar } from "@/components/ui/dashboard/dashboard-filterbar";
import React from "react";
import { DateRange } from "react-day-picker";
import { set, subDays, toDate } from "date-fns";
import { overviews } from "@/data/data";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { cx } from "@/lib/utils";
import { ProgressBarCard } from "@/components/ui/dashboard/dashboard-progress-bar-card";
import { CategoryBarCard } from "@/components/ui/dashboard/dashboard-category-bar-card";
import BodyNavbar from "@/components/ui/navigation/body-navbar";

export type PeriodValue = "previous-period" | "last-year" | "no-comparison";

// @CHRIS: declare via types
const categories = [
  {
    title: "Rows read",
    type: "unit",
  },
  {
    title: "Rows written",
    type: "unit",
  },
  {
    title: "Queries",
    type: "unit",
  },
  {
    title: "Rows read",
    type: "unit",
  },
  {
    title: "Rows written",
    type: "unit",
  },
  {
    title: "Queries",
    type: "unit",
  },
  {
    title: "Rows read",
    type: "unit",
  },
  {
    title: "Rows written",
    type: "unit",
  },
  {
    title: "Queries",
    type: "unit",
  },
] as const;

const data = [
  {
    title: "Rows read",
    percentage: 48.1,
    current: 48.1,
    allowed: 100,
    unit: "M",
  },
  {
    title: "Rows written",
    percentage: 78.3,
    current: 78.3,
    allowed: 100,
    unit: "M",
  },
  {
    title: "Storage",
    percentage: 26,
    current: 5.2,
    allowed: 20,
    unit: "GB",
  },
];

const data2 = [
  {
    title: "Active users",
    percentage: 21.7,
    current: 21.7,
    allowed: 100,
    unit: "%",
  },
  {
    title: "Total users",
    percentage: 40,
    current: 8,
    allowed: 20,
    unit: "",
  },
  {
    title: "Uptime",
    percentage: 98.3,
    current: 98.3,
    allowed: 100,
    unit: "%",
  },
];

const data3 = [
  {
    title: "Base tier",
    percentage: 68.1,
    value: "$200",
    color: "bg-indigo-600 dark:bg-indigo-500",
  },
  {
    title: "On-demand charges",
    percentage: 20.8,
    value: "$61.1",
    color: "bg-purple-600 dark:bg-indigo-500",
  },
  {
    title: "Caching",
    percentage: 11.1,
    value: "$31.9",
    color: "bg-gray-400 dark:bg-gray-600",
  },
];

const overviewsDates = overviews.map((item) => toDate(item.date).getTime());
const maxDate = toDate(Math.max(...overviewsDates));
export default function Example() {
  const [isEditable, setIsEditable] = React.useState(false);
  const [parentRef, KPICardsOrder, _, updateConfig] = useDragAndDrop<
    HTMLUListElement,
    string
  >(
    categories.map((item) => item.title),
    {
      // @CHRIS
      // dragHandle: ".drag-icon",
      disabled: !isEditable,
      plugins: [animations()],
    },
  );
  const [selectedDates, setSelectedDates] = React.useState<
    DateRange | undefined
  >({
    from: subDays(maxDate, 10),
    to: maxDate,
  });
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<PeriodValue>("last-year");

  React.useEffect(() => {
    updateConfig({ disabled: !isEditable });
  }, [isEditable]);

  return (
    <>
      {/* @CHRIS: add ID to section */}

      {/* @SEV: can also be put into /overview/Layout.tsx? */}
      <BodyNavbar />

      <h1 className="lg:mt-6 text-lg font-semibold text-gray-900 dark:text-gray-50">
        Today
      </h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-14">
        <ProgressBarCard
          title="Usage"
          change="+0.2%"
          value="68.1%"
          valueDescription="of allowed capacity"
          ctaDescription="Monthly usage resets in 12 days."
          ctaText="Manage plan."
          ctaLink="#"
          data={data}
        />
        <ProgressBarCard
          title="Workspace"
          change="+2.9%"
          value="21.7%"
          valueDescription="active users"
          ctaDescription="With free plan, up to 20 members can be invited."
          ctaText="Invite users."
          ctaLink="#"
          data={data2}
        />
        <CategoryBarCard
          title="Costs"
          change="-1.4%"
          value="$293.5"
          valueDescription="current billing cycle"
          subtitle="Current costs"
          ctaDescription="Set hard caps in"
          ctaText="cost spend management."
          ctaLink="#"
          data={data3}
        />
      </div>

      <h1 className="mt-16 text-lg font-semibold text-gray-900 dark:text-gray-50">
        Overview
      </h1>

      <div className="sticky lg:px-0 lg:mx-0 top-16 lg:top-[68px] z-20 bg-white/90 dark:bg-gray-950/90 backdrop-blur-nav border-b border-gray-200 dark:border-gray-800 flex items-center justify-between py-4 lg:pt-2 pb-4">
        {/* @CHRIS: bring "Edit"-button in filterbar */}
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
          className="hidden sm:flex gap-2 py-1 px-2"
        // @CHRIS
        // onClick={() => {
        //     setIsEditable((prev) => !prev)
        // }}
        >
          {!isEditable && (
            <RiSettings5Line
              className="-ml-1 size-4 shrink-0"
              aria-hidden="true"
            />
          )}
          {isEditable ? "Save" : "Edit"}
        </Button>
      </div>

      <dl
        ref={parentRef}
        className={cx(
          "mt-8 grid grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
          isEditable
            ? "p-2 border-gray-200 dark:border-gray-800 dark:bg-gray-900 bg-gray-50"
            : "transition",
        )}
      >
        {KPICardsOrder.map((item) => {
          const category = categories.find(
            (category) => category.title === item,
          );
          if (!category) return null;
          return (
            <ChartCard
              key={item}
              title={category.title}
              // value={category.value}
              type={category.type}
              selectedDates={selectedDates}
              selectedPeriod={selectedPeriod}
              isEditable={isEditable}
            />
          );
        })}
      </dl>
    </>
  );
}

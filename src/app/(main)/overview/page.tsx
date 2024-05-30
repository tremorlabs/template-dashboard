"use client";
import { ChartCard } from "@/components/ui/overview/dashboard-chart-card";
import { Filterbar } from "@/components/ui/overview/dashboard-filterbar";
import React from "react";
import { DateRange } from "react-day-picker";
import { set, subDays, toDate } from "date-fns";
import { overviews } from "@/data/data";
import { cx } from "@/lib/utils";
import { ProgressBarCard } from "@/components/ui/overview/dashboard-progress-bar-card";
import { CategoryBarCard } from "@/components/ui/overview/dashboard-category-bar-card";
import { OverviewData } from "@/data/schema";
import { CardProps } from "@/components/Card";

export type PeriodValue = "previous-period" | "last-year" | "no-comparison";

// @CHRIS: declare via types
const categories: {
  title: keyof OverviewData;
  type: "currency" | "unit";
}[] = [
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
];

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
    title: "Weekly active users",
    percentage: 21.7,
    current: 21.7,
    allowed: 100,
    unit: "%",
  },
  {
    title: "Total users",
    percentage: 70,
    current: 28,
    allowed: 40,
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
  const [selectedDates, setSelectedDates] = React.useState<
    DateRange | undefined
  >({
    from: subDays(maxDate, 10),
    to: maxDate,
  });
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<PeriodValue>("last-year");

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    categories.map((category) => category.title),
  );

  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Current billing cycle
      </h1>

      <div className="mt-4 sm:mt-6 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-14">
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
          valueDescription="weekly active users"
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
          categories={categories}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
        />
      </div>

      <dl
        className={cx(
          "mt-8 grid grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 transition",
        )}
      >
        {categories
          .filter((category) => selectedCategories.includes(category.title))
          .map((category) => {
            return (
              <ChartCard
                key={category.title}
                title={category.title}
                // value={category.value}
                type={category.type}
                selectedDates={selectedDates}
                selectedPeriod={selectedPeriod}
              />
            );
          })}
      </dl>
    </>
  );
}

"use client";

import {
  RiAddCircleLine,
  RiArrowDownSLine,
  RiCornerDownRightLine,
} from "@remixicon/react";
import { Column } from "@tanstack/react-table";

import { Label } from "@/components/Label";
import { Button } from "@/components/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/Popover";
import React from "react";
import { Checkbox } from "@/components/Checkbox";
import { SelectNative } from "@/components/SelectNative";
import { Input } from "@/components/Input";

export type ConditionFilter = {
  condition: string;
  value: [number | string, number | string];
};

type FilterType = "select" | "checkbox" | "number";

interface DataTableFilterProps<TData, TValue> {
  column: Column<TData, TValue> | undefined;
  title?: string;
  options?: {
    label: string;
    value: string;
  }[];
  type?: FilterType;
  formatter?: (value: any) => string;
}

const ColumnFiltersLabel = ({
  columnFilterLabels,
}: {
  columnFilterLabels: string[] | undefined;
}) => {
  if (!columnFilterLabels) return null;

  if (columnFilterLabels.length < 3) {
    return (
      <>
        {columnFilterLabels.map((value, index) => (
          <span
            key={value}
            className={"text-indigo-600 dark:text-indigo-400 font-semibold"}
          >
            {value}
            {index < columnFilterLabels.length - 1 && ", "}
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
        {columnFilterLabels[0]} and {columnFilterLabels.length - 1} more
      </span>
    </>
  );
};

type FilterValues = string | string[] | ConditionFilter | undefined;

export function DataTableFilter<TData, TValue>({
  column,
  title,
  options,
  type = "select",
  formatter = (value) => value.toString(),
}: DataTableFilterProps<TData, TValue>) {
  const columnFilters = column?.getFilterValue() as FilterValues;

  // @Maxime
  // const [selectedCondition, setSelectedCondition] = React.useState<string | undefined>(undefined);

  const [selectedValues, setSelectedValues] =
    React.useState<FilterValues>(columnFilters);

  {
    /* @Chris: usefull if you wan't to generate dynamically your options based on unisque values of your table */
  }
  // const uniqueValues = React.useMemo(() => {
  //     const values = table.getCoreRowModel().flatRows.map(row => row.getValue(columnName)) as string[]
  //     return Array.from(new Set(values));
  // }, [table, columnName]);

  const columnFilterLabels = React.useMemo(() => {
    if (!selectedValues) return undefined;

    if (Array.isArray(selectedValues)) {
      return selectedValues.map((value) => formatter(value));
    }

    if (typeof selectedValues === "string") {
      return [formatter(selectedValues)];
    }

    if (typeof selectedValues === "object" && "condition" in selectedValues) {
      const condition = options?.find(
        (option) => option.value === selectedValues.condition,
      )?.label;
      if (!condition || !selectedValues.value?.[0]) return undefined;
      if (selectedValues.value?.[1] === "")
        return [`${condition} ${formatter(selectedValues.value?.[0])}`];
      return [
        `${condition} ${formatter(selectedValues.value?.[0])} and ${formatter(selectedValues.value?.[1])}`,
      ];
    }

    return undefined;
  }, [selectedValues, options, formatter]);

  const getDisplayedFilter = () => {
    const hasEmptyOption = options?.some((option) => option.value === "");

    {
      /* @Chris: Here you can create one separate component by case if you want */
    }
    switch (type) {
      case "select":
        return (
          <SelectNative
            value={selectedValues as string}
            onChange={(e) => {
              setSelectedValues(e.target.value);
            }}
            className="mt-2 sm:py-1"
          >
            {!hasEmptyOption && <option value="">All</option>}
            {options?.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </SelectNative>
        );
      case "checkbox":
        return (
          <div className="space-y-3 mt-2 max-h-36 overflow-y-auto">
            {options?.map((option) => {
              return (
                <div key={option.label} className="flex items-center gap-2">
                  <Checkbox
                    id={option.value}
                    checked={(selectedValues as string[])?.includes(
                      option.value,
                    )}
                    onCheckedChange={(checked) => {
                      setSelectedValues((prev) => {
                        if (checked) {
                          return prev
                            ? [...(prev as string[]), option.value]
                            : [option.value];
                        } else {
                          return (prev as string[]).filter(
                            (value) => value !== option.value,
                          );
                        }
                      });
                    }}
                  />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              );
            })}
          </div>
        );
      case "number":
        const isBetween =
          (selectedValues as ConditionFilter)?.condition === "is-between";
        return (
          <div className="space-y-2">
            <SelectNative
              value={(selectedValues as ConditionFilter)?.condition}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedValues((prev) => {
                  return {
                    condition: value,
                    value: [
                      value !== "" ? (prev as ConditionFilter)?.value?.[0] : "",
                      "",
                    ],
                  };
                });
              }}
              className="mt-2 sm:py-1"
            >
              {!hasEmptyOption && <option value="">Select a condition</option>}
              {options?.map((condition) => (
                <option key={condition.value} value={condition.value}>
                  {condition.label}
                </option>
              ))}
            </SelectNative>
            <div className="flex items-center gap-2">
              <RiCornerDownRightLine
                className="size-4 text-gray-500 shrink-0"
                aria-hidden="true"
              />
              <Input
                type="number"
                placeholder="$0"
                className="sm:[&>input]:py-1"
                value={(selectedValues as ConditionFilter)?.value?.[0]}
                onChange={(e) => {
                  setSelectedValues((prev) => {
                    return {
                      condition: (prev as ConditionFilter)?.condition,
                      value: [
                        e.target.value,
                        isBetween ? (prev as ConditionFilter)?.value?.[1] : "",
                      ],
                    };
                  });
                }}
              />
              {(selectedValues as ConditionFilter)?.condition ===
                "is-between" && (
                <>
                  <span className="text-xs font-medium text-gray-500">and</span>
                  <Input
                    type="number"
                    placeholder="$0"
                    className="sm:[&>input]:py-1"
                    value={(selectedValues as ConditionFilter)?.value?.[1]}
                    onChange={(e) => {
                      setSelectedValues((prev) => {
                        return {
                          condition: (prev as ConditionFilter)?.condition,
                          value: [
                            (prev as ConditionFilter)?.value?.[0],
                            e.target.value,
                          ],
                        };
                      });
                    }}
                  />
                </>
              )}
            </div>
          </div>
        );
    }
  };

  React.useEffect(() => {
    setSelectedValues(columnFilters);
  }, [columnFilters]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* clean up region array, e.g. US-West-1 */}
        <button
          type="button"
          className="flex items-center gap-x-1.5 rounded-md px-2 py-1.5 hover:bg-gray-50 hover:dark:bg-gray-900 border border-gray-300 dark:border-gray-700 border-dashed text-xs text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap"
        >
          <RiAddCircleLine
            className="-ml-px size-4 shrink-0"
            aria-hidden="true"
          />
          {title}
          {columnFilterLabels && columnFilterLabels.length > 0 && (
            <span
              className="h-4 w-px bg-gray-300 dark:bg-gray-700"
              aria-hidden="true"
            />
          )}
          <ColumnFiltersLabel columnFilterLabels={columnFilterLabels} />
          <RiArrowDownSLine
            className="size-4 shrink-0 text-gray-500"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={7}
        className="space-y-2 max-w-52"
      >
        <div>
          <Label className="font-medium">Filter by {title}</Label>
          {getDisplayedFilter()}
        </div>
        <PopoverClose
          className="w-full"
          onClick={() => column?.setFilterValue(selectedValues)}
        >
          <Button className="w-full sm:py-1">Apply</Button>
        </PopoverClose>
        {columnFilterLabels && columnFilterLabels.length > 0 && (
          <Button
            variant="secondary"
            className="w-full sm:py-1"
            onClick={() => {
              column?.setFilterValue("");
              setSelectedValues((prev) => {
                if (typeof prev === "object" && "condition" in prev)
                  return { condition: "", value: ["", ""] };
                return "";
              });
            }}
          >
            Reset
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}

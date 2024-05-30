import { cx } from "@/lib/utils";
import { Searchbar } from "@/components/Searchbar";
import { Button } from "@/components/Button";
import {
  RiQuestionLine,
  RiSettings5Line,
  RiNotification4Line,
} from "@remixicon/react";

export default function BodyNavbar() {
  return (
    <>
      <div
        className={cx(
          "sticky hidden top-0 z-50 lg:flex items-center justify-between bg-white/90 backdrop-blur-nav dark:bg-gray-950/90 transition-all pt-6 pb-3 px-6",
        )}
      >
        <Searchbar placeholder="Search" className="w-72 -mx-2" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className={cx(
                "group flex items-center rounded-md p-1.5 hover:bg-gray-100 hover:dark:bg-gray-900",
              )}
            >
              <RiQuestionLine
                className="size-5 text-gray-600 group-hover:text-gray-900 dark:text-gray-400 group-hover:dark:text-gray-50"
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="ghost"
              className={cx(
                "group flex items-center rounded-md p-1.5 hover:bg-gray-100 hover:dark:bg-gray-900",
              )}
            >
              <RiSettings5Line
                className="size-5 text-gray-600 group-hover:text-gray-900 dark:text-gray-400 group-hover:dark:text-gray-50"
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="ghost"
              className={cx(
                "group flex items-center rounded-md p-1.5 hover:bg-gray-100 hover:dark:bg-gray-900",
              )}
            >
              <RiNotification4Line
                className="size-5 text-gray-600 group-hover:text-gray-900 dark:text-gray-400 group-hover:dark:text-gray-50"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

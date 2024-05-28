import { cx } from "@/lib/utils";
import { Searchbar } from "@/components/Searchbar";
import { Button } from "@/components/Button";
import {
  RiQuestionLine,
  RiSettings5Line,
  RiNotification4Line,
} from "@remixicon/react";
// @CHRIS: kickout useScroll

import useScroll from "@/lib/use-scroll";

export default function BodyNavbar() {
  return (
    <>
      {/* filling element between top of page and sticky search bar when page is scrolled */}
      <div className="fixed z-30 top-0 h-4 bg-white/90 backdrop-blur-nav dark:bg-gray-950/90 inset-x-0" />
      <div
        className={cx(
          "sticky hidden top-4 z-30 lg:flex lg:items-center lg:justify-between bg-white/90 dark:bg-gray-950/90 backdrop-blur-nav py-2 transition-all",
        )}
      >
        {/* @SEV: the Searchbar is built based on input -> wanted to add variant to Input but too much divergence from "base" styling -> discussion */}
        <Searchbar placeholder="Search metrics..." className="w-80 -mx-2" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className={cx(
                // focusInput,
                "group flex items-center rounded-md p-1.5 hover:bg-gray-100 hover:dark:bg-gray-900 focus:outline-none",
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
                // focusInput,
                "group flex items-center rounded-md p-1.5 hover:bg-gray-100 hover:dark:bg-gray-900 focus:outline-none",
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
                // focusInput,
                "group flex items-center rounded-md p-1.5 hover:bg-gray-100 hover:dark:bg-gray-900 focus:outline-none",
              )}
            >
              <RiNotification4Line
                className="size-5 text-gray-600 group-hover:text-gray-900 dark:text-gray-400 group-hover:dark:text-gray-50"
                aria-hidden="true"
              />
            </Button>
          </div>
          <Button className="hidden sm:flex py-1 px-2">Add metric</Button>
        </div>
      </div>
    </>
  );
}

import { Button } from "@/components/Button"
import { Searchbar } from "@/components/Searchbar"
import { cx } from "@/lib/utils"
import {
  RiNotification4Line,
  RiQuestionLine,
  RiSettings5Line,
} from "@remixicon/react"

export default function BodyNavbar() {
  return (
    <>
      <div
        className={cx(
          "backdrop-blur-nav sticky top-0 z-50 hidden items-center justify-between bg-white/90 px-6 pb-3 pt-6 transition-all lg:flex dark:bg-gray-950/90",
        )}
      >
        <Searchbar placeholder="Search" className="-mx-2 w-72" />
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
  )
}

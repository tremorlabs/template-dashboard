"use client";

import * as React from "react";
import { RiMore2Fill } from "@remixicon/react";
import { cx } from "@/lib/utils";
import { Button } from "@/components/Button";

import { DropdownUserProfile } from "./dropdown-user-profile";


export const UserProfileDesktop = () => {
  return (
    <DropdownUserProfile>
      <Button
        variant="ghost"
        // @SEV: focus glitch when focusInput is not used, with focusInput -> focusInput stays until clicked again -> not good
        className={cx(
          // focusInput,
          "group w-full flex items-center justify-between rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:dark:bg-gray-400/10 focus:outline-none",
        )}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 dark:border-gray-800 bg-white text-xs text-gray-700 dark:bg-gray-950 dark:text-gray-300"
            aria-hidden="true"
          >
            ES
          </span>
          <span>Emma Stone</span>
        </span>
        <RiMore2Fill
          className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  )
}

export const UserProfileMobile = () => {
  return (
    <DropdownUserProfile align="end">
      <Button
        variant="ghost"
        // @SEV: focus glitch when focusInput is not used, with focusInput -> focusInput stays until clicked again -> not good
        className={cx(
          // focusInput,
          "group flex items-center rounded-md p-1 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:dark:bg-gray-400/10 focus:outline-none",
        )}
      >

        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-300 dark:border-gray-800 bg-white text-xs text-gray-700 dark:bg-gray-950 dark:text-gray-300"
          aria-hidden="true"
        >
          ES
        </span>
      </Button>
    </DropdownUserProfile>
  )
}


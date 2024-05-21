"use client";

import * as React from "react";
import { RiArrowRightUpLine, RiMore2Fill, RiMoonLine, RiSunLine, RiComputerLine } from "@remixicon/react";
import { useTheme } from "next-themes"
import { cx } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSubMenu,
  DropdownMenuGroup,
  DropdownMenuSubMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/Dropdown";
import { Button } from "@/components/Button";


export function UserProfile() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  // @CHRIS: harmonize React. usage
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>emma.stone@acme.com</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSubMenu>
              <DropdownMenuSubMenuTrigger>Theme</DropdownMenuSubMenuTrigger>
              <DropdownMenuSubMenuContent>
                <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={(value) => {
                    setTheme(value)
                  }}>
                  {/* @SEV: technically it should be a radio button group, but check-icon suits better here */}
                  <DropdownMenuRadioItem
                    aria-label="Switch to Light Mode"
                    value="light"
                    iconType="check"
                  >
                    <RiSunLine className="size-4 shrink-0" aria-hidden="true" />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    aria-label="Switch to Dark Mode"
                    value="dark"
                    iconType="check"
                  >
                    <RiMoonLine className="size-4 shrink-0" aria-hidden="true" />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    aria-label="Switch to System Mode"
                    value="system"
                    iconType="check"
                  >
                    <RiComputerLine className="size-4 shrink-0" aria-hidden="true" />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubMenuContent>
            </DropdownMenuSubMenu>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Changelog
              <RiArrowRightUpLine
                className="ml-1 mb-1 text-gray-500 size-2.5 shrink-0"
                aria-hidden="true"
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              Documentation
              <RiArrowRightUpLine
                className="ml-1 mb-1 text-gray-500 size-2.5 shrink-0"
                aria-hidden="true"
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              Join Slack community
              <RiArrowRightUpLine
                className="ml-1 mb-1 text-gray-500 size-2.5 shrink-0"
                aria-hidden="true"
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

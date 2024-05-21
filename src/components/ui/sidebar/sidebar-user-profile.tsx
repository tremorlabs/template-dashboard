"use client";

import { RiArrowRightUpLine, RiMore2Fill } from "@remixicon/react";
import { cx, focusInput } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSubMenu,
  DropdownMenuGroup,
  DropdownMenuSubMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubMenuContent,
} from "@/components/Dropdown";
import { Button } from "@/components/Button";


export function UserProfile() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            // @SEV: focus glitch when focusInput is not used, with focusInput -> focusInput stays until clicked again -> not good
            className={cx(
              // focusInput,
              "group w-full flex items-center justify-between rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none",
            )}
          >
            <span className="flex items-center gap-3">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700"
                aria-hidden="true"
              >
                ES
              </span>
              <span>Emma Stone</span>
            </span>
            <RiMore2Fill
              className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700"
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
                {/* @SEV: technically it should be a radio button group, but check-icon suits better here */}
                <DropdownMenuCheckboxItem
                  checked
                // @SEV
                // checked={ }
                // onCheckedChange={ }
                >
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                // @SEV
                // checked={ }
                // onCheckedChange={ }
                >
                  Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                // @SEV
                // checked={ }
                // onCheckedChange={ }
                >
                  System
                </DropdownMenuCheckboxItem>
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

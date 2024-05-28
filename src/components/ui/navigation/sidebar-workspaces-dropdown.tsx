"use client";

import { cx, focusInput, focusRing } from "@/lib/utils";
import { RiArrowRightSLine, RiExpandUpDownLine } from "@remixicon/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Dropdown";
import { ModalAddWorkspace } from "./modal-add-workspace";
import React from "react";

const workspaces = [
  {
    value: "retail-analytics",
    name: "Retail analytics",
    initials: "RA",
    role: "Member",
    color: "bg-indigo-600 dark:bg-indigo-500",
  },
  // Add more workspaces...
];

export const WorkspacesDropdownDesktop = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null);
  const focusRef = React.useRef<null | HTMLButtonElement>(null);

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current;
  };

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  };
  return (
    <>
      {/* sidebar (lg+) */}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button
            className={cx(
              focusInput,
              // @CHRIS: focusRing or focusInput (focus:outline-none)
              "flex w-full items-center gap-x-2.5 rounded-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-2 text-sm shadow-sm hover:bg-gray-50 hover:dark:bg-gray-900 transition-all"
            )}
          >
            <span
              className="flex size-8 aspect-square items-center justify-center rounded bg-indigo-600 dark:bg-indigo-500 p-2 text-xs font-medium text-white"
              aria-hidden="true"
            >
              RA
            </span>
            <div className="flex w-full items-center justify-between gap-x-4 truncate">
              <div className="truncate">
                <p className="truncate whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  Retail analytics
                </p>
                <p className="whitespace-nowrap text-left text-xs text-gray-700 dark:text-gray-300">
                  Member
                </p>
              </div>
              <RiExpandUpDownLine
                className="size-5 shrink-0 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus();
              focusRef.current = null;
              event.preventDefault();
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Workspaces ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.value}>
                <div className="flex w-full items-center gap-x-2.5">
                  <span
                    className={cx(
                      workspace.color,
                      "flex size-8 aspect-square items-center justify-center rounded p-2 text-xs font-medium text-white"
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {workspace.name}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-400">
                      {workspace.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddWorkspace
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add workspace"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const WorkspacesDropdownMobile = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null);
  const focusRef = React.useRef<null | HTMLButtonElement>(null);

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current;
  };

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  };
  return (
    <>
      {/* sidebar (xs-lg) */}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-x-1.5 p-2 rounded-md hover:bg-gray-100 hover:dark:bg-gray-900 focus:outline-none">
            <span
              className={cx(
                "flex size-7 aspect-square items-center justify-center rounded bg-indigo-600 dark:bg-indigo-500 p-2 text-xs font-medium text-white"
              )}
              aria-hidden="true"
            >
              RA
            </span>
            <RiArrowRightSLine
              className="size-4 shrink-0 text-gray-500"
              aria-hidden="true"
            />
            <div className="flex w-full items-center justify-between gap-x-3 truncate">
              <p className="truncate whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                Retail analytics
              </p>
              <RiExpandUpDownLine
                className="size-4 shrink-0 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="!min-w-72"
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus();
              focusRef.current = null;
              event.preventDefault();
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Workspaces ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.value}>
                {/* @SEV/CHRIS: [ALL Dropdowns] consider whether it makes sense to use dummy <Link /> here as this would be used in production */}
                <div className="flex w-full items-center gap-x-2.5">
                  <span
                    className={cx(
                      workspace.color,
                      "flex size-8 aspect-square items-center justify-center rounded p-2 text-xs font-medium text-white"
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {workspace.name}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {workspace.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddWorkspace
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add workspace"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

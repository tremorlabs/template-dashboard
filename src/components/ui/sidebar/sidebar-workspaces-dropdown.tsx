"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/siteConfig";
import { cx } from "@/lib/utils";
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

const workspaces = [
  {
    value: "retail-analytics",
    name: "Retail analytics",
    initials: "RA",
    role: "Member",
    color: "bg-indigo-600",
  },
  // Add more workspaces...
];

export const WorkspacesDropdownDesktop = () => {
  return (
    <>
      {/* sidebar (lg+) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none">
            <span
              className={cx(
                "flex size-8 aspect-square items-center justify-center rounded bg-indigo-600 p-2 text-xs font-medium text-white",
              )}
              aria-hidden="true"
            >
              RA
            </span>
            <div className="flex w-full items-center justify-between gap-x-4 truncate">
              <div className="truncate">
                <p className="truncate whitespace-nowrap text-sm font-medium text-gray-900">
                  Retail analytics
                </p>
                <p className="whitespace-nowrap text-left text-xs text-gray-700">
                  Member
                </p>
              </div>
              <RiExpandUpDownLine
                className="size-5 shrink-0 text-gray-500"
                aria-hidden={true}
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
                      "flex size-8 aspect-square items-center justify-center rounded p-2 text-xs font-medium text-white",
                    )}
                    aria-hidden={true}
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {workspace.name}
                    </p>
                    <p className="text-xs text-gray-700">{workspace.role}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddWorkspace>
            <DropdownMenuItem>
              Add workspace
            </DropdownMenuItem>
          </ModalAddWorkspace>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const WorkspacesDropdownMobile = () => {
  return (
    <>
      {/* sidebar (xs-lg) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-x-1.5 p-2 rounded-md hover:bg-gray-100 focus:outline-none">
            <span
              className={cx(
                "flex size-7 aspect-square items-center justify-center rounded bg-indigo-600 p-2 text-xs font-medium text-white",
              )}
              aria-hidden="true"
            >
              RA
            </span>
            <RiArrowRightSLine
              className="size-4 shrink-0 text-gray-500"
              aria-hidden={true}
            />
            <div className="flex w-full items-center justify-between gap-x-3 truncate">
              <p className="truncate whitespace-nowrap font-medium text-gray-900">
                Retail analytics
              </p>
              <RiExpandUpDownLine
                className="size-4 shrink-0 text-gray-500"
                aria-hidden={true}
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="!min-w-72">
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
                      "flex size-8 aspect-square items-center justify-center rounded p-2 text-xs font-medium text-white",
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {workspace.name}
                    </p>
                    <p className="text-xs text-gray-700">{workspace.role}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ModalAddWorkspace>
              Add workspace
            </ModalAddWorkspace>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

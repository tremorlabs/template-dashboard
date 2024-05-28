"use client";

import { RiAddLine, RiMore2Fill } from "@remixicon/react";
import { Button } from "@/components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { Tooltip } from "@/components/Tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown";
import { ModalAddUser } from "@/components/ui/settings/modal-add-user";
import { roles } from "@/data/data";

// @CHRIS: move to data?
const data = [
  {
    name: "Emma Stone",
    initials: "ES",
    email: "a.stone@gmail.com",
    role: "viewer",
  },
  {
    name: "Alissia McCalister",
    initials: "AM",
    email: "a.stone@gmail.com",
    role: "viewer",
  },
  {
    name: "Emily Bern",
    initials: "EB",
    email: "e.bern@gmail.com",
    role: "member",
  },
  {
    name: "Aaron Wave",
    initials: "AW",
    email: "a.flow@acme.com",
    role: "contributor",
  },
  {
    name: "Thomas Palstein",
    initials: "TP",
    email: "t.palstein@acme.com",
    role: "viewer",
  },
  {
    name: "Sarah Johnson",
    initials: "SJ",
    email: "s.johnson@gmail.com",
    role: "admin",
  },
  {
    name: "Megan Brown",
    initials: "MB",
    email: "m.brown@gmail.com",
    role: "contributor",
  },
];

// ----- TODOs (CHRIS) -------:

// - Pending invitations? -> UI
// - Componentize

export default function Users() {
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Users
          </h3>
          <p className="text-sm leading-6 text-gray-500">
            Workspace administrators can add, manage, and remove members.
          </p>
        </div>
        <ModalAddUser>
          <Button className="mt-4 w-full sm:w-fit sm:mt-0 gap-2">
            <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
            Add user
            {/* @CHRIS: aria-hidden="true" consistency */}
          </Button>
        </ModalAddUser>
      </div>
      <ul
        role="list"
        className="mt-6 divide-y divide-gray-200 dark:divide-gray-800"
      >
        {data.map((member) => (
          <li
            key={member.name}
            className="flex items-center justify-between gap-x-4 py-2.5"
          >
            <div className="flex items-center space-x-4 truncate">
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 text-xs text-gray-700 dark:text-gray-300"
                aria-hidden="true"
              >
                {member.initials}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* @SEV/CHRIS: [Sidenote]: SelectTrigger Icon is not in <SelectNative /> show */}
              {member.role === "admin" ? (
                <Tooltip
                  content="A workspace must have at least one admin"
                  className="text-xs max-w-44"
                  sideOffset={5}
                  triggerAsChild={true}
                >
                  <div>
                    <Select
                      defaultValue={member.role}
                      disabled={member.role === "admin"}
                    >
                      <SelectTrigger className="h-8 w-32">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent align="end">
                        {roles.map((role) => (
                          <SelectItem
                            key={role.value}
                            value={role.value}
                            disabled={role.value === "admin"}
                          >
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </Tooltip>
              ) : (
                <Select
                  defaultValue={member.role}
                  disabled={member.role === "admin"}
                >
                  <SelectTrigger className="h-8 w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {roles.map((role) => (
                      <SelectItem
                        key={role.value}
                        value={role.value}
                        disabled={role.value === "admin"}
                      >
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="aspect-square group hover:bg-gray-50 data-[state=open]:bg-gray-50 hover:dark:bg-gray-900 data-[state=open]:dark:bg-gray-900 hover:border hover:border-gray-300 data-[state=open]:border-gray-300 hover:dark:border-gray-700 data-[state=open]:dark:border-gray-700 h-8"
                  >
                    <RiMore2Fill
                      className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
                      aria-hidden="true"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem disabled={member.role === "admin"}>
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-rose-600 dark:text-rose-500"
                    disabled={member.role === "admin"}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

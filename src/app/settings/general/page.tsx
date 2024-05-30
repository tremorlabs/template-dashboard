"use client";
import { RiExternalLinkLine } from "@remixicon/react";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Divider } from "@/components/Divider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/Select";

import { roles } from "@/data/data";

// ----- TODOs (CHRIS) -------:

// save settings Button UI?
// - Componentize

export default function General() {
  return (
    <>
      {/* <h2 className="font-semibold text-gray-900">General</h2> */}
      <div className="space-y-10">
        <form className="sm:max-w-6xl">
          <div className="grid grid-cols-1 gap-y-8 gap-x-14 md:grid-cols-3">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-50">
                Personal information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Manage your personal information and role.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <div className="col-span-full sm:col-span-3">
                  <Label htmlFor="first-name" className="font-medium">
                    First name
                  </Label>
                  <Input
                    type="text"
                    id="first-name"
                    name="first-name"
                    autoComplete="given-name"
                    placeholder="Emma"
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <Label htmlFor="last-name" className="font-medium">
                    Last name
                  </Label>
                  <Input
                    type="text"
                    id="last-name"
                    name="last-name"
                    autoComplete="family-name"
                    placeholder="Stone"
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full">
                  <Label htmlFor="email" className="font-medium">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="emma@acme.com"
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <Label htmlFor="year" className="font-medium">
                    Birth year
                  </Label>
                  <Input
                    id="birthyear"
                    name="year"
                    type="number"
                    placeholder="1994"
                    enableStepper={false}
                    className="mt-2"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <Label htmlFor="email" className="font-medium">
                    Role
                  </Label>
                  <Select defaultValue="member">
                    <SelectTrigger
                      name="role"
                      id="role"
                      className="mt-2"
                      disabled
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-2 text-xs text-gray-500">
                    Roles can only be changed by system admin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Divider />
        <form className="sm:max-w-6xl">
          <div className="grid grid-cols-1 gap-y-8 gap-x-14 md:grid-cols-3">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-50">
                Notification settings
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Configure the types of notifications you want to receive.
              </p>
            </div>
            <div className="md:col-span-2">
              <fieldset>
                <legend className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  Team
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Configure the types of team alerts you want to receive.
                </p>
                <ul
                  role="list"
                  className="mt-4 divide-y divide-gray-200 dark:divide-gray-800"
                >
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox
                      id="team-requests"
                      name="team-requests"
                      defaultChecked
                    />
                    <Label htmlFor="team-requests">Team join requests</Label>
                  </li>
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox id="team-activity-digest" />
                    <Label htmlFor="team-activity-digest">
                      Weekly team activity digest
                    </Label>
                  </li>
                </ul>
              </fieldset>
              <fieldset className="mt-6">
                <legend className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  Usage
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Configure the types of usage alerts you want to receive.
                </p>
                <ul
                  role="list"
                  className="mt-4 divide-y divide-gray-200 dark:divide-gray-800"
                >
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox id="api-requests" name="api-requests" />
                    <Label htmlFor="api-requests">API incidents</Label>
                  </li>
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox
                      id="workspace-execution"
                      name="workspace-execution"
                    />
                    <Label htmlFor="workspace-execution">
                      Platform incidents
                    </Label>
                  </li>
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox
                      id="query-caching"
                      name="query-caching"
                      defaultChecked
                    />
                    <Label htmlFor="query-caching">Payment transactions</Label>
                  </li>
                  <li className="flex items-center gap-x-3 py-3">
                    <Checkbox id="storage" name="storage" defaultChecked />
                    <Label htmlFor="storage">User behavior</Label>
                  </li>
                </ul>
              </fieldset>
            </div>
          </div>
        </form>
        <Divider />
        <form className="sm:max-w-6xl">
          <div className="grid grid-cols-1 gap-y-8 gap-x-14 md:grid-cols-3">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-50">
                Danger zone
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Manage general workspace. Contact system admin for more
                information.{" "}
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline hover:underline-offset-4"
                >
                  Learn more
                  <RiExternalLinkLine
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </p>
            </div>
            <div className="md:col-span-2 space-y-6">
              <Card className="p-4">
                <div className="flex items-start gap-10 justify-between">
                  <div>
                    <h4 className="text-sm text-gray-900 dark:text-gray-50 font-medium">
                      Leave workspace
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Revoke your access to this team. Other people you have
                      added to the workspace will remain.
                    </p>
                  </div>
                  {/* @CHRIS: dark mode in button */}
                  <Button
                    variant="secondary"
                    className="text-rose-600 dark:text-rose-500"
                  >
                    Leave
                  </Button>
                </div>
              </Card>
              <Card className="overflow-hidden p-0">
                <div className="p-4 flex items-start gap-10 justify-between">
                  <div>
                    <h4 className="text-sm text-gray-400 dark:text-gray-600 font-medium">
                      Delete workspace
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-gray-400 dark:text-gray-600">
                      Revoke your access to this team. Other people you have
                      added to the workspace will remain.
                    </p>
                  </div>
                  {/* @CHRIS: dark mode in button */}
                  <Button
                    variant="secondary"
                    disabled
                    className="text-rose-600 dark:text-rose-500 disabled:text-rose-300 disabled:dark:text-rose-700 disabled:opacity-50 whitespace-nowrap"
                  >
                    Delete workspace
                  </Button>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-900">
                  <p className="text-sm text-gray-500">
                    You cannot delete the workspace because you are not the
                    system admin.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

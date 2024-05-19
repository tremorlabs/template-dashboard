"use client"
import { RiExternalLinkLine } from "@remixicon/react";
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { Card } from "@/components/Card";
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Divider } from "@/components/Divider";

// ----- TODOs -------:

// - appearance preference settigns
// - Componentize

export default function General() {
    return (
        <>
            {/* <h2 className="font-semibold text-gray-900">General</h2> */}
            <div className="space-y-10">
                <form className="sm:max-w-6xl">
                    <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Personal information
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Manage your personal information and role.
                            </p>
                        </div>
                        <div className="sm:max-w-3xl md:col-span-2">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                                <div className="col-span-full sm:col-span-3">
                                    <label
                                        htmlFor="first-name"
                                        className="text-sm font-medium text-gray-900"
                                    >
                                        First name
                                    </label>
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
                                    <label
                                        htmlFor="last-name"
                                        className="text-sm font-medium text-gray-900"
                                    >
                                        Last name
                                    </label>
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
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-900"
                                    >
                                        Email
                                    </label>
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
                                    <Label
                                        htmlFor="year"
                                        className="text-sm font-medium text-gray-900"
                                    >
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
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-900"
                                    >
                                        Role
                                    </Label>
                                    {/* @CHRIS: replace with Select */}
                                    <Input
                                        type="text"
                                        id="role"
                                        name="role"
                                        placeholder="Viewer"
                                        disabled
                                        className="mt-2"
                                    />
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
                    <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Notification settings
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Configure the types of notifications you want to receive.
                            </p>
                        </div>
                        <div className="sm:max-w-3xl md:col-span-2">
                            <fieldset>
                                <legend className="text-sm font-medium text-gray-900">
                                    Team
                                </legend>
                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    Configure the types of team alerts you want to receive.
                                </p>
                                <ul role="list" className="mt-4 divide-y">
                                    <li className="flex items-center gap-x-3 py-3">
                                        <Checkbox
                                            id="team-requests"
                                            name="team-requests"
                                            defaultChecked
                                        />
                                        <Label
                                            htmlFor="team-requests"
                                        >
                                            Team join requests
                                        </Label>
                                    </li>
                                    <li className="flex items-center gap-x-3 py-3">
                                        <Checkbox
                                            id="team-activity-digest"
                                        />
                                        <Label
                                            htmlFor="team-activity-digest"
                                        >
                                            Weekly team activity digest
                                        </Label>
                                    </li>
                                </ul>
                            </fieldset>
                            <fieldset className="mt-6">
                                <legend className="text-sm font-medium text-gray-900">
                                    Usage
                                </legend>
                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    Configure the types of usage alerts you want to receive.
                                </p>
                                <ul role="list" className="mt-4 divide-y">
                                    <li className="flex items-center gap-x-3 py-3">
                                        <Checkbox
                                            id="api-requests"
                                            name="api-requests"
                                        />
                                        <Label
                                            htmlFor="api-requests"
                                        >
                                            API incidents
                                        </Label>
                                    </li>
                                    <li className="flex items-center gap-x-3 py-3">
                                        <Checkbox
                                            id="workspace-execution"
                                            name="workspace-execution"
                                        />
                                        <Label
                                            htmlFor="workspace-execution"
                                        >
                                            Platform incidents
                                        </Label>
                                    </li>
                                    <li className="flex items-center gap-x-3 py-3">
                                        <Checkbox
                                            id="query-caching"
                                            name="query-caching"
                                            defaultChecked
                                        />
                                        <Label
                                            htmlFor="query-caching"
                                        >
                                            Payment transactions
                                        </Label>
                                    </li>
                                    <li className="flex items-center gap-x-3 py-3">
                                        <Checkbox
                                            id="storage"
                                            name="storage"
                                            defaultChecked
                                        />
                                        <Label
                                            htmlFor="storage"
                                        >
                                            User behavior
                                        </Label>
                                    </li>
                                </ul>
                            </fieldset>
                        </div>
                    </div>
                </form>
                <Divider />
                <form className="sm:max-w-6xl">
                    <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Danger zone
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Manage general workspace. Contact system admin for more information.{" "}
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-1 text-indigo-600 hover:underline hover:underline-offset-4"
                                >
                                    Learn more
                                    <RiExternalLinkLine className="size-4 shrink-0" aria-hidden={true} />
                                </a>
                            </p>
                        </div>
                        <div className="sm:max-w-3xl md:col-span-2 space-y-6">
                            <Card className="p-4">
                                <div className="flex items-start gap-10 justify-between">
                                    <div>
                                        <h4 className="text-sm text-gray-900 font-medium">Leave workspace</h4>
                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            Revoke your access to this team. Other people you have added to the workspace will remain.
                                        </p>
                                    </div>
                                    {/* @CHRIS: dark mode in button */}
                                    <Button variant="secondary" className="text-rose-600">Leave</Button>
                                </div>
                            </Card>
                            <Card className="overflow-hidden p-0">
                                <div className="p-4 flex items-start gap-10 justify-between">
                                    <div>
                                        <h4 className="text-sm text-gray-400 font-medium">Delete workspace</h4>
                                        <p className="mt-2 text-sm leading-6 text-gray-400">
                                            Revoke your access to this team. Other people you have added to the workspace will remain.
                                        </p>
                                    </div>
                                    {/* @CHRIS: dark mode in button */}
                                    <Button variant="secondary" disabled className="text-rose-600 disabled:text-rose-300 disabled:opacity-50 whitespace-nowrap">Delete workspace</Button>
                                </div>
                                <div className="p-4 border-t border-gray-200 bg-gray-50">
                                    <p className="text-sm text-gray-500">
                                        You cannot leave the team because you are not the system admin.
                                    </p>
                                </div>
                            </Card>

                        </div>
                    </div>
                </form>
            </div>


            {/* <form action="#" method="POST">
                <div className="mt-6 space-y-8 sm:max-w-lg">
                    <div>
                        <Label className="text-sm font-semibold text-gray-900">
                            Name
                        </Label>
                        <Input
                            className="mt-2"
                            disabled
                            placeholder="sales-dashboard"
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            Contact your admin to change workspace names in production.
                        </p>
                    </div>
                    <div>
                        <Label
                            htmlFor="select-input-1"
                            className="text-sm font-semibold text-gray-900"
                        >
                            Default model
                        </Label>
                        <Select
                        >
                            <SelectTrigger
                                name="select-input-1"
                                id="select-input-1"
                                className="mt-2"
                            >
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">
                                    GPT-3.5 (OpenAI)
                                </SelectItem>
                                <SelectItem value="2">
                                    BERT (Google)
                                </SelectItem>
                                <SelectItem value="3">
                                    LLaMA (Facebook)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label
                            htmlFor="select-input-2"
                            className="text-sm font-semibold text-gray-900"
                        >
                            Training cycle
                        </Label>
                        <Select>
                            <SelectTrigger
                                name="select-input-2"
                                id="select-input-2"
                                className="mt-2"
                            >
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">
                                    Every 24 hours
                                </SelectItem>
                                <SelectItem value="2">
                                    Once in a week
                                </SelectItem>
                                <SelectItem value="3">
                                    Once in a month
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                            Workspace governance
                        </h4>
                        <div className="mt-6 space-y-6">
                            <div className="relative flex items-start">
                                <div className="flex h-6 items-center">
                                    <Checkbox
                                        id="checkbox-name-1"
                                        aria-describedby="checkbox-name-1-description"
                                        name="checkbox-name-1"
                                    />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                    <Label
                                        htmlFor="checkbox-name-1"
                                        className="font-medium"
                                    >
                                        Require team member approval for deploy requests
                                    </Label>
                                    <p
                                        id="checkbox-name-1-description"
                                        className="text-gray-500"
                                    >
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="flex h-6 items-center">
                                    <Checkbox
                                        id="checkbox-name-2"
                                        aria-describedby="checkbox-name-2-description"
                                        name="checkbox-name-2"
                                    />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                    <Label
                                        htmlFor="checkbox-name-2"
                                        className="font-medium"
                                    >
                                        Enable audit logs
                                    </Label>
                                    <p
                                        id="checkbox-name-2-description"
                                        className="text-gray-500"
                                    >
                                        Lorem ipsum dolor sit amet.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="flex h-6 items-center">
                                    <Checkbox
                                        id="checkbox-name-3"
                                        aria-describedby="checkbox-name-3-description"
                                        name="checkbox-name-3"
                                    />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                    <Label
                                        htmlFor="checkbox-name-3"
                                        className="font-medium"
                                    >
                                        Enable email notifications for model deployment activities
                                    </Label>
                                    <p
                                        id="checkbox-name-3-description"
                                        className="text-gray-500"
                                    >
                                        Labore et dolore magna aliquyam erat. Lorem ipsum dolor
                                        sit amet, consetetur sadipscing elitr.{' '}
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-1 text-indigo-600 hover:underline hover:underline-offset-4"
                                        >
                                            Go to email settings
                                            <RiExternalLinkLine
                                                className="size-4"
                                                aria-hidden={true}
                                            />
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider className="my-10" />
                <div className="flex items-center justify-end space-x-4">
                    <Button variant="secondary">
                        Cancel
                    </Button>
                    <Button>
                        Save settings
                    </Button>
                </div>
            </form> */}
        </>
    )
}
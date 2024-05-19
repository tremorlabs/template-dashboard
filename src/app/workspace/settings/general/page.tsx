"use client"
import { RiExternalLinkLine } from "@remixicon/react";
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Divider } from "@/components/Divider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"

export default function General() {
    return (
        <>
            <h2 className="font-semibold text-gray-900">General</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
            </p>
            <form action="#" method="POST">
                <div className="mt-6 rounded-lg bg-gray-50 p-6 ring-1 ring-inset ring-gray-200 sm:max-w-7xl">
                    <h4 className="text-sm font-semibold text-gray-900">
                        This workspace is currently on free plan
                    </h4>
                    <p className="mt-2 text-sm text-gray-500">
                        Boost your analytics and unlock advanced features with our premium
                        plans.
                    </p>
                    <div className="mt-6 flex items-center space-x-2">
                        {/* @CHRIS: first to link */}
                        <Button >
                            Compare plans
                        </Button>
                        <Button variant="secondary">
                            Dismiss
                        </Button>
                    </div>
                </div>
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
                                            className="inline-flex items-center gap-1 text-tremor-default text-tremor-brand hover:underline hover:underline-offset-4 dark:text-dark-tremor-brand"
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
            </form>
        </>
    )
}
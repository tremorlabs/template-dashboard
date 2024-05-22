"use client";

import * as React from "react";
import { RiArrowRightUpLine, RiMoonLine, RiSunLine, RiComputerLine } from "@remixicon/react";
import { useTheme } from "next-themes"
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

export type DropdownUserProfileProps = {
    children: React.ReactNode;
    align?: "center" | "start" | "end"
};

export function DropdownUserProfile({ children, align = "start" }: DropdownUserProfileProps) {
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
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align={align}>
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

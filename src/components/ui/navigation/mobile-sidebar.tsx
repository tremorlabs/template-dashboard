import React from "react";
import { RiHome2Line, RiSettings5Line, RiListCheck } from "@remixicon/react";
import { focusRing } from "@/lib/utils";
import { cx } from "@/lib/utils";
import { RiMenuLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/app/siteConfig";
import { Button } from "@/components/Button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Drawer";

const navigation = [
  { name: "Overview", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Details", href: siteConfig.baseLinks.details, icon: RiListCheck },
  {
    name: "Settings",
    href: siteConfig.baseLinks.settings,
    icon: RiSettings5Line,
  },
];

export default function MobileSidebar() {
  const pathname = usePathname();
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            aria-label="open sidebar"
            className="group flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100 data-[state=open]:bg-gray-100 hover:dark:bg-gray-400/10 data-[state=open]:bg-gray-400/10"
          >
            <RiMenuLine className="size-5 shrink-0" aria-hidden="true" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Retail Analytics</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <ul role="list" className="space-y-1.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <DrawerClose asChild>
                    <Link
                      href={item.href}
                      className={cx(
                        pathname === item.href || pathname.includes(item.href)
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:dark:text-gray-50",
                        "hover:bg-gray-100 hover:dark:bg-gray-900 font-medium flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-base sm:text-sm transition",
                        focusRing,
                      )}
                    >
                      <item.icon
                        className="size-5 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </DrawerClose>
                </li>
              ))}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

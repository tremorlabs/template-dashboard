"use client"

import * as Popover from "@radix-ui/react-popover"
import * as React from "react"

import { cx, focusRing } from "@/lib/utils"

const shortcutStyles = cx(
  "flex h-6 select-none items-center justify-center rounded-md bg-gray-800 px-2 text-sm text-gray-400 ring-1 ring-inset ring-gray-700",
)

interface CommandBarProps extends React.PropsWithChildren {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  disableAutoFocus?: boolean
}

const CommandBar = ({
  open = false,
  onOpenChange,
  defaultOpen = false,
  disableAutoFocus = true,
  children,
}: CommandBarProps) => {
  return (
    <Popover.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {/* <Portal.Root> */}
      <Popover.Anchor
        className={cx(
          "fixed inset-x-0 bottom-8 mx-auto flex w-fit items-center",
        )}
      />
      {/* </Portal.Root> */}
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={0}
          onOpenAutoFocus={(e) => {
            if (disableAutoFocus) {
              e.preventDefault()
            }
          }}
          className={cx(
            "z-50",
            "data-[state=closed]:animate-hide",
            "data-[side=top]:animate-slideUpAndFade",
          )}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
CommandBar.displayName = "CommandBar"

const CommandBarValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx(
        "px-3 py-2.5 text-sm tabular-nums text-gray-300",
        className,
      )}
      {...props}
    />
  )
})
CommandBarValue.displayName = "CommandBar.Value"

const CommandBarBar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx(
        "relative flex items-center rounded-lg bg-gray-900 px-1 shadow-lg shadow-black/30",
        className,
      )}
      {...props}
    />
  )
})
CommandBarBar.displayName = "CommandBarBar"

const CommandBarSeperator = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<"div">, "children">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx("h-4 w-px bg-gray-700", className)}
      {...props}
    />
  )
})
CommandBarSeperator.displayName = "CommandBar.Seperator"

interface CommandProps
  extends Omit<
    React.ComponentPropsWithoutRef<"button">,
    "children" | "onClick"
  > {
  action: () => void | Promise<void>
  label: string
  shortcut: { shortcut: string; label?: string }
}

const CommandBarCommand = React.forwardRef<HTMLButtonElement, CommandProps>(
  (
    {
      className,
      type = "button",
      label,
      action,
      shortcut,
      disabled,
      ...props
    }: CommandProps,
    ref,
  ) => {
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === shortcut.shortcut) {
          event.preventDefault()
          event.stopPropagation()
          action()
        }
      }

      if (!disabled) {
        document.addEventListener("keydown", handleKeyDown)
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [action, shortcut, disabled])

    return (
      <button
        ref={ref}
        className={cx(
          focusRing,
          "flex items-center gap-x-2 rounded-lg bg-gray-900 px-3 py-2.5 text-base text-gray-50 outline-none transition focus:z-10",
          "focus-visible:bg-gray-800 focus-visible:hover:bg-gray-800",
          "hover:bg-gray-800",
          "disabled:text-gray-500",
          "last-of-type:-mr-1",
          className,
        )}
        type={type}
        onClick={action}
        disabled={disabled}
        {...props}
      >
        <span>{label}</span>
        <span className={shortcutStyles}>
          {shortcut.label
            ? shortcut.label.toUpperCase()
            : shortcut.shortcut.toUpperCase()}
        </span>
      </button>
    )
  },
)
CommandBarCommand.displayName = "CommandBar.Command"

export {
  CommandBar,
  CommandBarBar,
  CommandBarCommand,
  CommandBarSeperator,
  CommandBarValue,
}

"use client"

import * as Popover from "@radix-ui/react-popover"
import * as React from "react"

import { cx } from "@/lib/utils"

const shortcutStyles = cx(
  "flex size-6 select-none items-center justify-center rounded bg-gray-800 text-sm text-gray-400 ring-1 ring-inset ring-gray-700",
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
        className={cx("absolute bottom-8 left-1/2 h-px w-px -translate-x-1/2")}
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
            "z-50 will-change-[transform,opacity]",
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
        "relative flex items-center overflow-hidden rounded-lg bg-gray-900 px-1 shadow-lg shadow-black/30",
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
  shortcut: string
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
        if (event.key === shortcut) {
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
          "flex items-center gap-x-2 bg-gray-900 px-3 py-2.5 text-base text-gray-50 outline-none",
          "focus-visible:bg-ui-contrast-bg-highlight focus-visible:hover:bg-ui-contrast-bg-base-hover hover:bg-ui-contrast-bg-base-hover active:bg-ui-contrast-bg-base-pressed focus-visible:active:bg-ui-contrast-bg-base-pressed",
          "disabled:!bg-gray-800 disabled:!text-gray-400",
          "last-of-type:-mr-1 last-of-type:pr-4",
          className,
        )}
        type={type}
        onClick={action}
        {...props}
      >
        <span>{label}</span>
        <span className={shortcutStyles}>{shortcut.toUpperCase()}</span>
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
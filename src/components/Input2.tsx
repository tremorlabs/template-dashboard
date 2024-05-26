// Tremor Raw Input [v1.0.0]

import * as React from "react";
import { RiEyeFill, RiEyeOffFill, RiSearchLine } from "@remixicon/react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx, focusInput, focusRing, hasErrorInput } from "@/lib/utils";

const inputStyles = tv({
    base: [
        // base
        "relative peer block w-full appearance-none rounded-md px-2.5 py-2 outline-none transition text-sm",
        // background
        // @CHRIS dark mode
        "bg-transparent hover:bg-gray-100 focus:bg-gray-100",
        // text color
        "text-gray-900 dark:text-gray-50",
        // placeholder color
        "placeholder-gray-600 dark:placeholder-gray-400",
        // disabled
        // @CHRIS dark mode -> feedback to Sev to have placeholder also disabled styled
        "disabled:bg-gray-100 disabled:text-gray-400 disabled:placeholder:text-gray-400",
        "disabled:dark:bg-gray-800 disabled:dark:text-gray-500",
        // invalid (optional)
        // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
        // remove search cancel button (optional)
        "[&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
    ],
    variants: {
        hasError: {
            true: hasErrorInput,
        },
    },
});

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
    inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            inputClassName,
            hasError,
            ...props
        }: InputProps,
        forwardedRef,
    ) => {

        return (
            <div className={cx("relative w-full", className)}>
                <input
                    ref={forwardedRef}
                    type="search"
                    className={cx(
                        inputStyles({ hasError }),
                        // to fit input text next to search icon
                        "pl-9",
                        inputClassName,
                    )}
                    {...props}
                />
                <div
                    className={cx(
                        // base
                        "pointer-events-none absolute bottom-0 left-2 flex h-full items-center justify-center",
                        // text color
                        "text-gray-600 dark:text-gray-400",
                        // disabled 
                        // @CHRIS: dark mode
                        "peer-disabled:text-gray-400 peer-disabled:dark:text-gray-600",
                    )}
                >
                    <RiSearchLine
                        className="size-4 shrink-0"
                        aria-hidden="true"
                    />
                </div>
            </div>
        );
    },
);

Input.displayName = "Input";

export { Input, inputStyles, type InputProps };

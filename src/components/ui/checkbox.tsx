import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "~/lib/utils";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, ...props }, ref) => {
  if (!!label) {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          ref={ref}
          className={cn(
            "peer h-5 w-5 shrink-0 rounded-sm border border-primary  bg-secondary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            className,
          )}
          {...props}
          id={label}
        />
        <label
          htmlFor={label}
          className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    );
  }
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-sm border border-primary  bg-secondary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-5 w-5 " />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

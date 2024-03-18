"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "~/lib/utils";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
export type ComboxOption = {
  value: string;
  label: string;
};
type ComboboxProps = {
  options: ComboxOption[];
  opt?: ComboxOption;
  isMultiSelect?: boolean;
  onChange: (option: ComboxOption) => void;
  placeholder?: string;
};

export function Combobox({
  opt,
  onChange,
  options = frameworks,
  placeholder = "velg alternativ...",
  isMultiSelect = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [opt2, setOpt] = React.useState<ComboxOption | null>(null);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {opt
            ? options.find((options) => options.value === opt.value)?.label
            : opt2
              ? options.find((options) => options.value === opt2?.value)?.label
              : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  if (isMultiSelect) {
                    const newOpt = options.find(
                      (options) => options.value === currentValue,
                    );

                    setOpt(newOpt ?? null);
                  }
                  onChange(
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    option,
                  );
                  setOpen(false);
                }}
                className="text-white"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    opt?.value === option.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

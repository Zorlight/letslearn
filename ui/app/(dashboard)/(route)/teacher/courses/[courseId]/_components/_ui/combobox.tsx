"use client";

import { Check } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/lib/shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/shadcn/popover";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  initialValue?: string | null;
  options: string[];
  onChange: (value: string) => void;
  children: React.ReactNode;
}

export function Combobox({
  name,
  initialValue,
  options,
  onChange,
  children,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${name.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>{`No ${name.toLowerCase()} found.`}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    setValue(currentValue === option ? null : option);
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value == option ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

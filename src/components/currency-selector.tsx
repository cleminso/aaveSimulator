"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { CurrencyMode } from "@/libs/currency";
import { getFilteredCurrencies } from "@/libs/currency";

interface CurrencySelectorProps {
  onSelectCurrency: (currency: string) => void;
  className?: string;
  mode: CurrencyMode;
}

export function CurrencySelector({
  onSelectCurrency,
  className,
  mode,
}: CurrencySelectorProps) {
  const currencies = React.useMemo(() => getFilteredCurrencies(mode), [mode]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleCurrencySelect = (currencyValue: string) => {
    setValue(currencyValue === value ? "" : currencyValue);
    setOpen(false);
    onSelectCurrency(currencyValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={cn("w-full", className)}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          data-testid="currency-selector"
        >
          {value
            ? currencies.find((currency) => currency.value === value)?.label
            : "Select currency..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0 bg-zinc-100", className)}>
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.value}
                  value={currency.value}
                  onSelect={() => handleCurrencySelect(currency.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === currency.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {currency.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

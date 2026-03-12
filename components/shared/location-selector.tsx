"use client";

import * as React from "react";
import { Check, MapPin, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Province, getProvinces } from "@/services/location.service";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface LocationSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export function LocationSelector({
  value,
  onChange,
  placeholder,
  className,
  error,
}: LocationSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [search, setSearch] = React.useState("");
  const t = useTranslations("Common");

  React.useEffect(() => {
    getProvinces().then(setProvinces);
  }, []);

  const filteredProvinces = provinces.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white h-11 transition-all",
            error && "border-red-500/50",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-4 h-4 text-white/40 shrink-0" />
            <span className={cn(!value && "text-white/30")}>
              {value || placeholder || t("location.placeholder")}
            </span>
          </div>
          {value && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange?.("");
              }}
              className="p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[--radix-popover-trigger-width] p-0 bg-[#0a0a14]/95 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden" 
        align="start"
      >
        <div className="flex items-center border-b border-white/5 p-2">
          <Search className="w-4 h-4 text-white/40 mr-2 ml-1" />
          <Input
            placeholder={t("location.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 border-none bg-transparent focus-visible:ring-0 text-sm placeholder:text-white/20"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-1">
          <AnimatePresence mode="popLayout">
            {filteredProvinces.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-6 text-center text-sm text-white/30"
              >
                {t("location.noResults")}
              </motion.div>
            ) : (
              filteredProvinces.map((province) => (
                <motion.button
                  key={province.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    onChange?.(province.name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm text-white transition-colors hover:bg-white/5 group",
                    value === province.name && "bg-violet-500/10 text-violet-400"
                  )}
                >
                  <span className="truncate text-left">{province.name}</span>
                  {value === province.name && (
                    <Check className="w-4 h-4 text-violet-400 shrink-0 ml-2" />
                  )}
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </div>
      </PopoverContent>
    </Popover>
  );
}

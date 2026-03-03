"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";

interface SearchInputProps {
  placeholder: string;
  defaultValue?: string;
  className?: string;
}

export function SearchInput({
  placeholder,
  defaultValue = "",
  className,
}: SearchInputProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value !== defaultValue) {
        const params = new URLSearchParams(searchParams);
        if (value) {
          params.set("query", value);
        } else {
          params.delete("query");
        }
        params.set("page", "1"); // Reset to page 1 on new search

        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [value, pathname, router, searchParams, defaultValue]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

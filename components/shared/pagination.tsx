"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  className?: string;
}

export function Pagination({
  totalPages,
  currentPage,
  className,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    router.push(createPageURL(page));
  };

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="icon"
        onClick={() => handlePageChange(1)}
        className={cn(
          "w-9 h-9",
          currentPage === 1
            ? "bg-violet-600 hover:bg-violet-500 text-white border-transparent"
            : "border-white/10 text-white/70 hover:bg-white/5",
        )}
      >
        1
      </Button>,
    );

    if (showEllipsisStart) {
      pages.push(
        <div
          key="ellipsis-start"
          className="w-9 h-9 flex items-center justify-center text-white/30"
        >
          <MoreHorizontal className="w-4 h-4" />
        </div>,
      );
    }

    // Show current page and neighbors
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="icon"
          onClick={() => handlePageChange(i)}
          className={cn(
            "w-9 h-9",
            currentPage === i
              ? "bg-violet-600 hover:bg-violet-500 text-white border-transparent"
              : "border-white/10 text-white/70 hover:bg-white/5",
          )}
        >
          {i}
        </Button>,
      );
    }

    if (showEllipsisEnd) {
      pages.push(
        <div
          key="ellipsis-end"
          className="w-9 h-9 flex items-center justify-center text-white/30"
        >
          <MoreHorizontal className="w-4 h-4" />
        </div>,
      );
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="icon"
          onClick={() => handlePageChange(totalPages)}
          className={cn(
            "w-9 h-9",
            currentPage === totalPages
              ? "bg-violet-600 hover:bg-violet-500 text-white border-transparent"
              : "border-white/10 text-white/70 hover:bg-white/5",
          )}
        >
          {totalPages}
        </Button>,
      );
    }

    return pages;
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-9 h-9 border-white/10 text-white/70 hover:bg-white/5 disabled:opacity-30"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {renderPageNumbers()}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-9 h-9 border-white/10 text-white/70 hover:bg-white/5 disabled:opacity-30"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

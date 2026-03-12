"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanCard, Applicant } from "./kanban-card";
import { useTranslations } from "next-intl";
import { MoreHorizontal, Plus } from "lucide-react";

interface KanbanColumnProps {
  stage: {
    id: string;
    title: string;
  };
  applicants: Applicant[];
  onCardClick?: (applicant: Applicant) => void;
}

export function KanbanColumn({
  stage,
  applicants,
  onCardClick,
}: KanbanColumnProps) {
  const t = useTranslations("Common");
  const { setNodeRef } = useDroppable({
    id: stage.id,
    data: {
      type: "Column",
    },
  });

  return (
    <div className="flex flex-col w-[300px] min-w-[300px] group/column">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {stage.title}
          </h3>
          <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
            {applicants.length}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover/column:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-accent rounded text-muted-foreground/30 hover:text-foreground transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-accent rounded text-muted-foreground/30 hover:text-foreground transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Column Content */}
      <div
        ref={setNodeRef}
        className="flex-1 rounded-2xl bg-muted/50 border border-border p-3 min-h-[500px] transition-colors group-hover/column:bg-muted/70"
      >
        <SortableContext
          items={applicants.map((a) => a.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {applicants.map((applicant) => (
              <KanbanCard
                key={applicant.id}
                applicant={applicant}
                onClick={onCardClick}
              />
            ))}
          </div>
        </SortableContext>

        {applicants.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-2 border-2 border-dashed border-border rounded-xl">
            <p className="text-xs text-muted-foreground/30 font-medium">
              {t("noApplicants")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Star } from "lucide-react";

import { Application } from "@/types/jobs";

export interface Applicant {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  fitScore: number;
  stage: string;
  appliedDate: string;
  fullData?: Application;
}

interface KanbanCardProps {
  applicant: Applicant;
  onClick?: (applicant: Applicant) => void;
}

export function KanbanCard({ applicant, onClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: applicant.id,
    data: {
      type: "Applicant",
      applicant,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 border-2 border-dashed border-violet-500 rounded-xl h-[120px] mb-3"
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick?.(applicant)}
      className="bg-card border-border p-4 mb-3 hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing group shadow-md"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={applicant.avatar} alt={applicant.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">
              {applicant.name}
            </h4>
            <p className="text-[10px] text-muted-foreground">{applicant.role}</p>
          </div>
        </div>
        <button className="text-muted-foreground/30 hover:text-foreground transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1.5">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-foreground/80">
            {applicant.fitScore}%
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground/50">
          {applicant.appliedDate}
        </span>
      </div>
    </Card>
  );
}

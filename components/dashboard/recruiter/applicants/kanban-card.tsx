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
      className="bg-[#12121e] border-white/5 p-4 mb-3 hover:border-violet-500/30 transition-all cursor-grab active:cursor-grabbing group shadow-lg"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src={applicant.avatar} alt={applicant.name} />
            <AvatarFallback className="bg-violet-600/20 text-violet-400 text-[10px]">
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">
              {applicant.name}
            </h4>
            <p className="text-[10px] text-white/40">{applicant.role}</p>
          </div>
        </div>
        <button className="text-white/30 hover:text-white transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1.5">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-white/80">
            {applicant.fitScore}%
          </span>
        </div>
        <span className="text-[10px] text-white/30">
          {applicant.appliedDate}
        </span>
      </div>
    </Card>
  );
}

"use client";

import { useState, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { KanbanColumn } from "@/components/dashboard/recruiter/applicants/kanban-column";
import { KanbanCard } from "@/components/dashboard/recruiter/applicants/kanban-card";
import type { Applicant } from "@/components/dashboard/recruiter/applicants/kanban-card";
import { updateApplicationStage } from "@/actions/applications.actions";
import { Application, HiringStep } from "@/types/jobs";

interface JobKanbanBoardProps {
  initialApplications: Application[];
  stages: HiringStep[];
}

function toApplicant(app: Application): Applicant {
  return {
    id: app.id,
    name: app.profiles?.full_name ?? "Unknown",
    avatar: app.profiles?.avatar_url ?? undefined,
    role: app.profiles?.email ?? "",
    fitScore: app.fit_score ?? 0,
    stage: app.stage ?? "sourcing",
    appliedDate: app.applied_date
      ? new Date(app.applied_date).toLocaleDateString("vi-VN")
      : "",
  };
}

export function JobKanbanBoard({
  initialApplications,
  stages,
}: JobKanbanBoardProps) {
  const [applicants, setApplicants] = useState<Applicant[]>(
    initialApplications.map(toApplicant),
  );
  const [activeApplicant, setActiveApplicant] = useState<Applicant | null>(
    null,
  );
  const dragItemInitialStage = useRef<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const getApplicantsByStage = (stageId: string) =>
    applicants.filter((a) => a.stage === stageId);

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Applicant") {
      const applicant = event.active.data.current.applicant;
      setActiveApplicant(applicant);
      dragItemInitialStage.current = applicant.stage;
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveAnApplicant = active.data.current?.type === "Applicant";
    const isOverAnApplicant = over.data.current?.type === "Applicant";

    if (!isActiveAnApplicant) return;

    if (isActiveAnApplicant && isOverAnApplicant) {
      setApplicants((prev) => {
        const activeIndex = prev.findIndex((a) => a.id === activeId);
        const overIndex = prev.findIndex((a) => a.id === overId);
        if (prev[activeIndex].stage !== prev[overIndex].stage) {
          const next = [...prev];
          next[activeIndex] = {
            ...next[activeIndex],
            stage: prev[overIndex].stage,
          };
          return arrayMove(next, activeIndex, overIndex - 1);
        }
        return arrayMove(prev, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveAnApplicant && isOverAColumn) {
      setApplicants((prev) => {
        const activeIndex = prev.findIndex((a) => a.id === activeId);
        const next = [...prev];
        next[activeIndex] = { ...next[activeIndex], stage: overId as string };
        return arrayMove(next, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveApplicant(null);
    const { active, over } = event;
    if (!over) {
      dragItemInitialStage.current = null;
      return;
    }

    const isActiveAnApplicant = active.data.current?.type === "Applicant";
    const isOverAColumn = over.data.current?.type === "Column";
    const isOverAnApplicant = over.data.current?.type === "Applicant";

    let newStage = "";
    if (isActiveAnApplicant && isOverAColumn) {
      newStage = over.id as string;
    } else if (isActiveAnApplicant && isOverAnApplicant) {
      newStage = over.data.current?.applicant.stage;
    }

    if (newStage && dragItemInitialStage.current !== newStage) {
      const { error } = await updateApplicationStage(
        active.id as string,
        newStage,
      );
      if (error) {
        console.error("Failed to update stage:", error);
      }
    }
    dragItemInitialStage.current = null;
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
        {stages.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={{ id: stage.id, title: stage.label }}
            applicants={getApplicantsByStage(stage.id)}
          />
        ))}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: { active: { opacity: "0.5" } },
              }),
            }}
          >
            {activeApplicant ? (
              <div className="w-[280px]">
                <KanbanCard applicant={activeApplicant} />
              </div>
            ) : null}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}

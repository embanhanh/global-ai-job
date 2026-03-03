"use client";

import { useState } from "react";
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
import { useTranslations } from "next-intl";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard, Applicant } from "./kanban-card";
import { createPortal } from "react-dom";
import { updateApplicationStage } from "@/actions/applications.actions";

interface KanbanBoardProps {
  initialApplicants: Applicant[];
}

export function KanbanBoard({ initialApplicants }: KanbanBoardProps) {
  const t = useTranslations("Dashboard.recruiter.applicants.stages");
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [activeApplicant, setActiveApplicant] = useState<Applicant | null>(
    null,
  );

  const stages = [
    { id: "sourcing", title: t("sourcing") },
    { id: "screening", title: t("screening") },
    { id: "interview", title: t("interview") },
    { id: "offer", title: t("offer") },
    { id: "hired", title: t("hired") },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const getApplicantsByStage = (stageId: string) => {
    return applicants.filter((a) => a.stage === stageId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Applicant") {
      setActiveApplicant(event.active.data.current.applicant);
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

    // Dropping an Applicant over another Applicant
    if (isActiveAnApplicant && isOverAnApplicant) {
      setApplicants((prev) => {
        const activeIndex = prev.findIndex((a) => a.id === activeId);
        const overIndex = prev.findIndex((a) => a.id === overId);

        if (prev[activeIndex].stage !== prev[overIndex].stage) {
          const newApplicants = [...prev];
          newApplicants[activeIndex] = {
            ...newApplicants[activeIndex],
            stage: prev[overIndex].stage,
          };
          return arrayMove(newApplicants, activeIndex, overIndex - 1);
        }

        return arrayMove(prev, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Dropping an Applicant over a Column
    if (isActiveAnApplicant && isOverAColumn) {
      setApplicants((prev) => {
        const activeIndex = prev.findIndex((a) => a.id === activeId);
        const newApplicants = [...prev];
        newApplicants[activeIndex] = {
          ...newApplicants[activeIndex],
          stage: overId as string,
        };
        return arrayMove(newApplicants, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveApplicant(null);
    const { active, over } = event;
    if (!over) return;

    const isActiveAnApplicant = active.data.current?.type === "Applicant";
    const isOverAColumn = over.data.current?.type === "Column";
    const isOverAnApplicant = over.data.current?.type === "Applicant";

    let newStage = "";
    if (isActiveAnApplicant && isOverAColumn) {
      newStage = over.id as string;
    } else if (isActiveAnApplicant && isOverAnApplicant) {
      newStage = over.data.current?.applicant.stage;
    }

    const activeApplicantData = active.data.current?.applicant as Applicant;

    if (newStage && activeApplicantData.stage !== newStage) {
      await updateStage(active.id as string, newStage);
    }
  };

  const updateStage = async (id: string, newStage: string) => {
    const { success, error } = await updateApplicationStage(id, newStage);
    if (!success) {
      console.error("Failed to update stage:", error);
    }
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
            stage={stage}
            applicants={getApplicantsByStage(stage.id)}
          />
        ))}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: "0.5",
                  },
                },
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

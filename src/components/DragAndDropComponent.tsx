'use client'

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDroppable
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

type Task = {
  id: string;
  content: string;
};

type Tasks = {
  [key: string]: Task[];
};

const initialTasks: Tasks = {
  todo: [
    { id: "1", content: "Tarea 1" },
    { id: "2", content: "Tarea 2" },
  ],
  "in-progress": [{ id: "3", content: "Tarea 3" }],
  done: [],
};

interface SortableItemProps {
  id: string;
  content: string;
}

function SortableItem({ id, content }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    padding: "8px 16px",
    marginBottom: 8,
    backgroundColor: isDragging ? "#eee" : "white",
    border: "1px solid #ccc",
    borderRadius: 4,
    cursor: "grab",
  };

  console.log('id => ', id);
  console.log('content => ', content);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </div>
  );
}

function DroppableColumn({ columnId, children }: { columnId: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef} // ✅ marca el contenedor como zona droppable
      style={{
        padding: 16,
        width: 250,
        minHeight: 400,
        backgroundColor: "#f0f0f0",
        borderRadius: 6,
      }}
    >
      <h3>{columnId.toUpperCase()}</h3>
      {children}
    </div>
  );
}

export default function DragAndDropComponent() {
  const [tasks, setTasks] = useState<Tasks>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    if (activeIdStr !== overIdStr) {
      let fromColumn: string | null = null;
      for (const column in tasks) {
        if (tasks[column].some(task => task.id === activeIdStr)) {
          fromColumn = column;
          break;
        }
      }

      if (!fromColumn) {
        setActiveId(null);
        return;
      }

      let toColumn: string | null = null;
      let toIndex: number = -1;

      if (tasks[overIdStr]) {
        toColumn = overIdStr;
        toIndex = tasks[toColumn].length;
      } else {
        for (const column in tasks) {
          const index = tasks[column].findIndex(task => task.id === overIdStr);
          if (index !== -1) {
            toColumn = column;
            toIndex = index;
            break;
          }
        }
      }

      if (toColumn) {
        const activeTask = tasks[fromColumn].find(task => task.id === activeIdStr);
        if (!activeTask) {
          setActiveId(null);
          return;
        }

        const newFromTasks = tasks[fromColumn].filter(task => task.id !== activeIdStr);
        const newToTasks = [...tasks[toColumn]];

        let insertIndex = toIndex;
        if (fromColumn === toColumn) {
          const oldIndex = tasks[toColumn].findIndex(task => task.id === activeIdStr);
          if (oldIndex < toIndex) {
            insertIndex = toIndex - 1;
          }
        }

        newToTasks.splice(insertIndex, 0, activeTask);

        setTasks({
          ...tasks,
          [fromColumn]: newFromTasks,
          [toColumn]: newToTasks,
        });
      }
    }

    setActiveId(null);
  };


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div style={{ display: "flex", gap: 20 }}>
        {Object.entries(tasks).map(([columnId, items]) => (
          <DroppableColumn key={columnId} columnId={columnId}>
            <SortableContext
              items={items.map(item => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map(({ id, content }) => (
                <SortableItem key={id} id={id} content={content} />
              ))}
            </SortableContext>
          </DroppableColumn>
        ))}

      </div>

      <DragOverlay>
        {activeId ? (
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            {Object.values(tasks)
              .flat()
              .find(task => task.id === activeId)?.content}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

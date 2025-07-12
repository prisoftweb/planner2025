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
  useDroppable,
  rectIntersection
} from "@dnd-kit/core";
import { ProjectMin } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import { showToastMessageError } from "../Alert";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { InsertConditionInProject } from "@/app/api/routeProjects";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

// type Task = {
//   id: string;
//   content: string;
// };

// type Tasks = {
//   [key: string]: Task[];
// };

type TProjects = {
  [key: string]: ProjectMin[];
};

// const initialTasks: TQuotations = {
//   // todo: [
//   //   { id: "1", content: "Tarea 1" },
//   //   { id: "2", content: "Tarea 2" },
//   // ],
//   // "in-progress": [{ id: "3", content: "Tarea 3" }],
//   // done: [],
//   todo: [],
//   "in-progress": [],
//   done: []
// };

interface SortableItemProps {
  id: string;
  content: string;
}

const arrId: Options[] = [
  {
    label: "NUEVO",
    value: "661964a1ca3bfa35200c1628"
  }, 
  {
    label: "PRESUPUESTADO",
    value: "66350d80144933050f66a194"
  }, 
  {
    label: "CANCELADO",
    value: "66196435ca3bfa35200c1622"
  },
  {
    label: "EVALUADO",
    value: "66c3c6ee0600ee65ccc0dbb7"
  },
  {
    label: "EN EJECUCION",
    value: "66c3c68c0600ee65ccc0dbb4"
  },
  {
    label: "PAUSADO",
    value: "66c3c6570600ee65ccc0dbb1"
  },
  {
    label: "EN GARANTIA",
    value: "663d1e821d1c43ae98d77273"
  },
  {
    label: "COMPLETADO",
    value: "66e0a1a4c6d95ffb8aa0ff31"
  },
  {
    label: "NO EVALUADO",
    value: "684842305989ba5421dd583c"
  },
]

function SortableItem(p : ProjectMin) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: p._id  });

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

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* {content} */}
      <div>
        <div className="flex items-center gap-x-2">
          <img src={p.photo} alt="projecto" className="w-9 h-9 rounded-full" />
          <div>
            {/* <RatingComponent setValue={() => {}} value={q.score} /> */}
            <p className="text-blue-500">{p.client.name.substring(0, 10)}{p.client.name.length > 10? '...': ''}</p>
          </div>
        </div>
        {/* <div className="flex items-center justify-between gap-x-2 mt-2"></div> */}
        <p className="text-slate-500 text-sm">{CurrencyFormatter({
          currency: 'MXN',
          value: p.amount
        })}</p>
        <p className="text-green-500 text-sm">{p.title.substring(0, 15)}{p.title.length > 15? '...': ''}</p>
      </div>
    </div>
  );
}

function DroppableColumn({ columnId, children }: { columnId: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: columnId });

  // console.log("DroppableColumn render:", { columnId });

  return (
    <div
      ref={setNodeRef} // ✅ marca el contenedor como zona droppable
      key={columnId}
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

export default function DragAndDropProjects({projectsParam, token, user}: 
  {projectsParam: ProjectMin[], token:string, user:string}) {
  // const [tasks, setTasks] = useState<Tasks>(initialTasks);

  const arr1: ProjectMin[]=[];
  const arr2: ProjectMin[]=[];
  const arr3: ProjectMin[]=[];
  const arr4: ProjectMin[]=[];
  const arr5: ProjectMin[]=[];
  const arr6: ProjectMin[]=[];
  const arr7: ProjectMin[]=[];
  const arr8: ProjectMin[]=[];
  const arr9: ProjectMin[]=[];

  projectsParam.map((p) => {
    // console.log('segement => ', p);
    if(p.category.name.includes("NUEVO")){
      arr1.push(p);
    }else{
      if(p.category.name.includes("PRESUPUESTADO")){
        arr2.push(p);
      }else{
        if(p.category.name.includes("CANCELADO")){
          arr3.push(p);
        }else{
          if(p.category.name.includes("NO EVALUADO")){
            arr9.push(p);
          }else{
            if(p.category.name.includes("EN EJECUCION")){
              arr5.push(p);
            }else{
              if(p.category.name.includes("PAUSADO")){
                arr6.push(p);
              }else{
                if(p.category.name.includes("EN GARANTIA")){
                  arr7.push(p);
                }else{
                  if(p.category.name.includes("COMPLETADO")){
                    arr8.push(p);
                  }else{
                    arr4.push(p);
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  
console.log('no evaluados => ', arr9);
  const initialProjects: TProjects = {
    "NUEVO": arr1,
    "PRESUPUESTADO": arr2,
    "CANCELADO": arr3,
    "EVALUADO": arr4,
    "EN EJECUCION": arr5,
    "PAUSADO": arr6,
    "EN GARANTIA": arr7,
    "COMPLETADO": arr8,
    "NO EVALUADO": arr9,
  };

  const [projects, setProjects] = useState<TProjects>(initialProjects);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    // console.log('active => ', active);
    // console.log('over => ', over);

    // 🛑 Si se suelta el ítem sobre sí mismo, no hacer nada
    if (activeIdStr === overIdStr) return;

    // 🔍 Encontrar columna de origen
    let fromColumn: string | null = null;
    for (const column in projects) {
      if (projects[column].some(p => p._id === activeIdStr)) {
        fromColumn = column;
        break;
      }
    }

    if (!fromColumn) return;

    // 🎯 Determinar columna de destino
    let toColumn: string | null = null;
    let toIndex = 0;

    if (projects.hasOwnProperty(overIdStr)) {
      // El ítem fue soltado sobre una columna (posiblemente vacía)
      toColumn = overIdStr;
      toIndex = projects[toColumn].length;
    } else {
      // El ítem fue soltado sobre otro ítem existente
      for (const column in projects) {
        const index = projects[column].findIndex(q => q._id === overIdStr);
        if (index !== -1) {
          toColumn = column;
          toIndex = index;
          break;
        }
      }
    }

    if (!toColumn) return;

    updateStatus(toColumn, activeIdStr);

    const movingItem = projects[fromColumn].find(p => p._id === activeIdStr);
    if (!movingItem) return;

    // Evitar errores de orden si se reordena dentro de la misma columna
    const newFrom = projects[fromColumn].filter(p => p._id !== activeIdStr);
    const newTo = [...projects[toColumn]];

    if (fromColumn === toColumn) {
      const currentIndex = projects[toColumn].findIndex(q => q._id === activeIdStr);
      if (currentIndex < toIndex) {
        toIndex -= 1;
      }
    }

    newTo.splice(toIndex, 0, movingItem);

    // 🆕 Actualizar estado
    setProjects({
      ...projects,
      [fromColumn]: newFrom,
      [toColumn]: newTo,
    });
  };

  const updateStatus = async (id: string, idP:string) => {
    const status = arrId.find((i) => i.label === id);
    if(status){
      const data = {
        condition: [
          {
              glossary: status.value,
              user
          }
        ]
      }
      const res = await InsertConditionInProject(token, idP, data);
      if(typeof(res) === 'string'){
        showToastMessageError(res);
      }

    }else{
      showToastMessageError("No se pudo actualizar el estado del projecto");
    }
  }

  return (
    // <DndContext
    //   sensors={sensors}
    //   collisionDetection={closestCenter}
    //   onDragStart={onDragStart}
    //   onDragEnd={onDragEnd}
    // >
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection} // ✅ nuevo algoritmo
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div style={{ display: "flex", gap: 20 }}>
        {Object.entries(projects).map(([columnId, items]) => (
          <DroppableColumn key={columnId} columnId={columnId}>
            <SortableContext
              items={items.map(item => item._id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((i) => (
                <SortableItem key={i._id} _id={i._id} account={i.account} client={i.client} 
                  title={i.title} amount={i.amount} amountotal={i.amountotal} category={i.category}
                  code={i.code} company={i.company} date={i.date} guaranteefund={i.guaranteefund} 
                  hasguaranteefund={i.hasguaranteefund} photo={i.photo} progress={i.progress} segment={i.segment}
                  status={i.status} type={i.type} amountChargeOff={i.amountChargeOff} />
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
            {Object.values(projects)
              .flat()
              .find(p => p._id === activeId)?.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
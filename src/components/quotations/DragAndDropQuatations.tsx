'use client'

import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDroppable,
  rectIntersection
} from "@dnd-kit/core";
import { IQuotationMin } from "@/interfaces/Quotations";
import { Options } from "@/interfaces/Common";
import { showToastMessageError } from "../Alert";
import { insertConditionInQuotation } from "@/app/api/routeQuotations";
import { CurrencyFormatter } from "@/app/functions/Globals";
import RatingComponent from "./RatingComponent"
import {Tooltip} from "@nextui-org/react";
import { propsTooltip } from "@/libs/animations";

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

type TQuotations = {
  [key: string]: IQuotationMin[];
};

const arrId: Options[] = [
  {
    label: "EN PROGRESO",
    value: "67b910014643d85abda93cc0"
  }, 
  {
    label: "LISTA",
    value: "67b910cf4643d85abda93cc2"
  }, 
  {
    label: "ENVIADA",
    value: "67b910f64643d85abda93cc4"
  },
  {
    label: "ASIGNADA",
    value: "67b911e74643d85abda93cc6"
  },
  {
    label: "TERMINADA",
    value: "67b912364643d85abda93cc8"
  },
  {
    label: "EN NEGOCIACION",
    value: "67be2df1b2df60407a55953e"
  },
  {
    label: "ACEPTADA",
    value: "678ecefcc5f08e8a0f36d5db"
  },
  {
    label: "RECHAZADA",
    value: "67be2e4bb2df60407a559540"
  },
  {
    label: "VENCIDA",
    value: "67be2eb9b2df60407a559542"
  },
  {
    label: "CANCELADA",
    value: "678ecf6ec5f08e8a0f36d5dd"
  },
  {
    label: "ADJUDICADA CTE",
    value: "67dc5d592c542181a38ad4c6"
  },
  {
    label: "EN LICITACION CTE",
    value: "67dc5aa32c542181a38ad461"
  },
]

function SortableItem(q : IQuotationMin) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: q._id  });

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
      <div>
        <div className="flex items-center gap-x-2">
          <img src={q.user.photo} alt="usuario" className="w-9 h-9 rounded-full" />
          <div>
            <RatingComponent setValue={() => {}} value={q.score} />
            <p className="text-blue-500">{q.client.name}</p>
          </div>
        </div>
        <p className="text-slate-500 text-sm">{CurrencyFormatter({
          currency: 'USD',
          value: q.cost.subtotal
        })}</p>
        <Tooltip closeDelay={0} delay={100} motionProps={propsTooltip} content={q.title} 
          placement="right" className="text-blue-500 bg-white rounded-md border border-slate-400">
            <p className="text-green-500 text-sm">{q.title.substring(0, 17)}{q.title.length > 17? '...': ''}</p>
        </Tooltip>
      </div>
    </div>
  );
}

function DroppableColumn({ columnId, children }: { columnId: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef} // ✅ marca el contenedor como zona droppable
      key={columnId}
      style={{
        // padding: 16,
        width: 250,
        // minWidth: 200,
        minHeight: 400,
        backgroundColor: "#f0f0f0",
        // backgroundColor: '#4b8fea',
        borderRadius: 6,
        flexShrink: 0,
      }}
    >
      <h3 className="text-center">{columnId.toUpperCase()}</h3>
      {children}
    </div>
  );
}

export default function DragAndDropQuatations({quotationsParam, token, user}: 
  {quotationsParam: IQuotationMin[], token:string, user:string}) {

  const arr1: IQuotationMin[]=[];
  const arr2: IQuotationMin[]=[];
  const arr3: IQuotationMin[]=[];
  const arr4: IQuotationMin[]=[];
  const arr5: IQuotationMin[]=[];
  const arr6: IQuotationMin[]=[];
  const arr7: IQuotationMin[]=[];
  const arr8: IQuotationMin[]=[];
  const arr9: IQuotationMin[]=[];
  const arr10: IQuotationMin[]=[];
  const arr11: IQuotationMin[]=[];
  const arr12: IQuotationMin[]=[];

  quotationsParam.map((q) => {
    if(q.condition[q.condition.length -1].name.toLowerCase().includes("en progreso")){
      arr1.push(q);
    }else{
      if(q.condition[q.condition.length -1].name.toLowerCase().includes("lista")){
        arr2.push(q);
      }else{
        if(q.condition[q.condition.length -1].name.toLowerCase().includes("enviada")){
          arr3.push(q);
        }else{
          if(q.condition[q.condition.length -1].name.toLowerCase().includes("asignada")){
            arr4.push(q);
          }else{
            if(q.condition[q.condition.length -1].name.toLowerCase().includes("terminada")){
              arr5.push(q);
            }else{
              if(q.condition[q.condition.length -1].name.toLowerCase().includes("en negociacion")){
                arr6.push(q);
              }else{
                if(q.condition[q.condition.length -1].name.toLowerCase().includes("aceptada")){
                  arr7.push(q);
                }else{
                  if(q.condition[q.condition.length -1].name.toLowerCase().includes("rechazada")){
                    arr8.push(q);
                  }else{
                    if(q.condition[q.condition.length -1].name.toLowerCase().includes("vencida")){
                      arr9.push(q);
                    }else{
                      if(q.condition[q.condition.length -1].name.toLowerCase().includes("cancelada")){
                        arr10.push(q);
                      }else{
                        if(q.condition[q.condition.length -1].name.toLowerCase().includes("adjudicada cte")){
                          arr11.push(q);
                        }else{
                          arr12.push(q);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  const initialQuotations: TQuotations = {
    "EN PROGRESO": arr1,
    "LISTA": arr2,
    "ENVIADA": arr3,
    "ASIGNADA": arr4,
    "TERMINADA": arr5,
    "EN NEGOCIACION": arr6,
    "ACEPTADA": arr7,
    "RECHAZADA": arr8,
    "VENCIDA": arr9,
    "CANCELADA": arr10,
    "ADJUDICADA CTE": arr11,
    "EN LICITACION CTE": arr12,
  };

  const [quotations, setQuotations] = useState<TQuotations>(initialQuotations);
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

    // 🛑 Si se suelta el ítem sobre sí mismo, no hacer nada
    if (activeIdStr === overIdStr) return;

    // 🔍 Encontrar columna de origen
    let fromColumn: string | null = null;
    for (const column in quotations) {
      if (quotations[column].some(q => q._id === activeIdStr)) {
        fromColumn = column;
        break;
      }
    }

    if (!fromColumn) return;

    // 🎯 Determinar columna de destino
    let toColumn: string | null = null;
    let toIndex = 0;

    if (quotations.hasOwnProperty(overIdStr)) {
      // El ítem fue soltado sobre una columna (posiblemente vacía)
      toColumn = overIdStr;
      toIndex = quotations[toColumn].length;
    } else {
      // El ítem fue soltado sobre otro ítem existente
      for (const column in quotations) {
        const index = quotations[column].findIndex(q => q._id === overIdStr);
        if (index !== -1) {
          toColumn = column;
          toIndex = index;
          break;
        }
      }
    }

    if (!toColumn) return;

    updateStatus(toColumn, activeIdStr);

    const movingItem = quotations[fromColumn].find(q => q._id === activeIdStr);
    if (!movingItem) return;

    // Evitar errores de orden si se reordena dentro de la misma columna
    const newFrom = quotations[fromColumn].filter(q => q._id !== activeIdStr);
    const newTo = [...quotations[toColumn]];

    if (fromColumn === toColumn) {
      const currentIndex = quotations[toColumn].findIndex(q => q._id === activeIdStr);
      if (currentIndex < toIndex) {
        toIndex -= 1;
      }
    }

    newTo.splice(toIndex, 0, movingItem);

    // 🆕 Actualizar estado
    setQuotations({
      ...quotations,
      [fromColumn]: newFrom,
      [toColumn]: newTo,
    });
  };

  const updateStatus = async (id: string, idQ:string) => {
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
      const res = await insertConditionInQuotation(token, idQ, data);
      if(typeof(res) === 'string'){
        showToastMessageError(res);
      }
    }else{
      showToastMessageError("No se pudo actualizar el estado de la cotización");
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection} // ✅ nuevo algoritmo
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div style={{ display: "flex", gap: 20 }}>
        {Object.entries(quotations).map(([columnId, items]) => (
          <DroppableColumn key={columnId} columnId={columnId}>
            <SortableContext
              items={items.map(item => item._id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((i) => (
                <SortableItem key={i._id} _id={i._id} account={i.account} applicant={i.applicant} 
                  applicationdate={i.applicationdate} client={i.client} condition={i.condition} 
                  cost={i.cost} description={i.description} expirationdate={i.expirationdate}
                  score={i.score} title={i.title} user={i.user} />
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
            {Object.values(quotations)
              .flat()
              .find(q => q._id === activeId)?.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
import { useState, useEffect } from "react"
import { showToastMessageError } from "@/components/Alert";
import Button from "@/components/Button";
import { getConceptsInvoice } from "@/app/api/routeInvoices";
import { IConceptsInvoice } from "@/interfaces/Invoices";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../Table";
import AddNewConceptInInvoice from "./AddNewConceptInInvoice";

type DataBasicProps={
  token:string,
  nextStep:Function,
  saveInvoice:Function,
  user:string
}

type TableConceptsInvoice = {
  Clave: string 
  Concepto: string 
  Descripcion: string 
  Unidad: string 
  Cantidad: number 
  Price: number 
  Importe: number
}

export default function ConceptsInvoiceStepperComponent({token, nextStep, saveInvoice, 
  user}: DataBasicProps) {

  const [conceptsInvoice, setConceptsInvoice]=useState<IConceptsInvoice[]>([]);  
  const [showNewConcept, setShowNewConcept]=useState<boolean>(false);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const cons = await getConceptsInvoice(token, idInvoice);
  //     if(typeof(cons)==='string'){
  //       showToastMessageError(cons);
  //     }else{
  //       setConceptsInvoice(cons);
  //     }
  //   }
  //   fetch();
  // }, []);

  const handleAddNewConcept = (concept: IConceptsInvoice) => {
    // console.log('concept new concetp => ', concept);
    setConceptsInvoice((prev) => [...prev, concept]);
    setShowNewConcept(false);
  }

  const handleShowNewConcept = (value:boolean) => {
    setShowNewConcept(value);
  }

  const columnHelper = createColumnHelper<TableConceptsInvoice>();
  
  const columns = [
    columnHelper.accessor('Clave', {
      header: 'Clave',
      id: 'clave',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Clave}</p>
      ),
    }),
    columnHelper.accessor('Concepto', {
      header: 'Concepto',
      id: 'concepto',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Concepto}</p>
      ),
    }),
    columnHelper.accessor('Descripcion', {
      header: 'Descripcion',
      id: 'descripcion',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Descripcion}</p>
      ),
    }),
    columnHelper.accessor('Unidad', {
      header: 'Unidad',
      id: 'unidad',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Unidad}</p>
      ),
    }),
    columnHelper.accessor('Cantidad', {
      header: 'Cantidad',
      id: 'cantidad',
      cell: ({row}) => (
        <p className="cursor-pointer">{row.original.Cantidad}</p>
      ),
    }),
    columnHelper.accessor('Price', {
      header: 'P. U.',
      id: 'precio',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Price
        })}</p>
      ),
    }),
    columnHelper.accessor('Importe', {
      header: 'Monto',
      id: 'monto',
      cell: ({row}) => (
        <p className="cursor-pointer">{CurrencyFormatter({
          currency: 'MXN',
          value: row.original.Importe
        })}</p>
      ),
    }),
  ]

  const data = TransformConceptsInvoice(conceptsInvoice);

  return (
    <div>
      <div className="my-2">
        <Button type="button" onClick={() => setShowNewConcept(true)}>Agregar Concepto</Button>
      </div>
      <Table columns={columns} data={data} placeH="Buscar concepto" />
      

      <div className="flex justify-center gap-x-2">
        <button
          className="text-black border border-black font-normal text-sm bg-white rounded-xl w-36 h-9 py-2 hover:bg-slate-200"
          onClick={() => nextStep(1)}
        >
          Atras
        </button>
        <Button type="button" onClick={() => saveInvoice(conceptsInvoice)}>Guardar</Button>
      </div>
      {showNewConcept && <AddNewConceptInInvoice showForm={handleShowNewConcept} token={token} 
                            updateConcepts={handleAddNewConcept} user={user} />}
    </div>
  )
}

function TransformConceptsInvoice(concepts:IConceptsInvoice[]):TableConceptsInvoice[]{
  const data:TableConceptsInvoice[]=[];
  // console.log('concepts => ', concepts);
  
  concepts.forEach((c) => {
    // console.log('concept => ', c);
    // console.log('concept stimetate => ', c.conceptEstimate);
    data.push({
      Clave:c.conceptEstimate.code,
      Concepto:c.conceptEstimate.name,
      Descripcion:c.conceptEstimate.description,
      Unidad:c.conceptEstimate.unit.name,
      Cantidad:c.quantity,
      Price:c.priceConcepEstimate.cost,
      Importe:c.amount,
    })
  });
  return data;
}
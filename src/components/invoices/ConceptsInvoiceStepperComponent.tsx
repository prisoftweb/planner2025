import { useState, useEffect } from "react"
import Button from "@/components/Button";
import { IConceptsInvoice } from "@/interfaces/Invoices";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../Table";
import AddNewConceptInInvoice from "./AddNewConceptInInvoice";

type DataBasicProps={
  token:string,
  nextStep:Function,
  saveInvoice:Function,
  user:string,
  company:string
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
  user, company}: DataBasicProps) {

  const [conceptsInvoice, setConceptsInvoice]=useState<IConceptsInvoice[]>([]);  
  const [showNewConcept, setShowNewConcept]=useState<boolean>(false);

  const handleAddNewConcept = (concept: IConceptsInvoice) => {
    console.log('handle add new concept => ', concept);
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
      
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar concepto" />
      </div>
      <div className="block sm:hidden w-full">
        <ListData data={data} />
      </div>

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
                            updateConcepts={handleAddNewConcept} user={user} company={company} />}
    </div>
  )
}

const ListData = ({data }: 
  {data: TableConceptsInvoice[] }) => {

  // const [dataReports, setDataReports] = useState(data);

  // const filterData = useMemo(() => {
  //   if(search.trim() === ''){
  //     return data;
  //   }else{
  //     const d = data.filter(item => item.folio.toLowerCase().includes(search.toLowerCase()));
  //     return d;
  //   }
  // }, [search]);

  return(
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border] h-[calc(100vh-249px)]">
        <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700
          overflow-scroll overflow-y-auto overflow-x-hidden" style={{scrollbarColor: '#ada8a8 white', scrollbarWidth: 'thin'}}>

          {data.map((c) => (
            <CardConcept concept={c} key={c.Concepto} />
          ))}
        </nav>
      </div>
    </div>
  )
}

const CardConcept = ({concept }: 
  {concept:TableConceptsInvoice }) => {
  
  return(
    <div role="button"
      // key={concept.Clave}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          {/* <img alt="responsable" src={ invoice.Responsable?.photo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" /> */}
          {/* <RemoveElement id={glossary.id} name={glossary.name} token={token} 
              remove={RemoveGlossary} removeElement={delGlossary} /> */}
            {/* <RemoveElement id={invoice.id} name={invoice.Descripcion} 
              remove={RemoveCost} removeElement={delCost} 
              token={token} colorIcon="text-slate-500 hover:text-slate-300" /> */}
          <p>{concept.Clave}</p>
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {concept.Concepto}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {concept.Descripcion}
              </p>
            </div>
            <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
                {CurrencyFormatter({
                  currency: 'MXN',
                  value: concept.Importe
                })}
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
                {concept.Cantidad}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TransformConceptsInvoice(concepts:IConceptsInvoice[]):TableConceptsInvoice[]{
  const data:TableConceptsInvoice[]=[];
  
  concepts.forEach((c) => {
    data.push({
      Clave:c.conceptEstimate.code,
      Concepto:c.conceptEstimate.name,
      Descripcion:c.conceptEstimate.description,
      Unidad:c.conceptEstimate.unit.name,
      Cantidad:c.quantity,
      Price:c.priceConcepEstimate.cost,
      // Importe:c.amount,
      Importe:c.amount * c.quantity,
    })
  });
  return data;
}
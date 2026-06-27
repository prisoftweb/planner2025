import { useState, useEffect, useMemo } from "react"
import Button from "@/components/Button";
import { IConceptsInvoice } from "@/interfaces/Invoices";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";
import AddNewConceptInInvoice from "../AddNewConceptInInvoice";

type DataBasicProps={
  token:string,
  nextStep:Function,
  saveInvoice:Function,
  user:string,
  company:string,
  step:number,
  folio:string,
  formPaid:string,
  conditionPayment:string,
  date:string,
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

export default function ConceptsReferralsStepperComponent({token, nextStep, saveInvoice, 
  user, company, step, conditionPayment, date, folio, formPaid}: DataBasicProps) {

  const [conceptsInvoice, setConceptsInvoice]=useState<IConceptsInvoice[]>([]);  
  const [showNewConcept, setShowNewConcept]=useState<boolean>(false);

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const localString = (() => { const d = new Date(date); const now = new Date(); d.setHours(now.getHours(), now.getMinutes(), now.getSeconds()); return d.toLocaleString('sv-SE').replace(' ', 'T'); })();

  const handleAddNewConcept = (concept: IConceptsInvoice) => {
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

  // const total=useMemo(() => )
  const total=conceptsInvoice.reduce((acum, item) => acum+=((item?.amount?? 0) * (item?.quantity?? 0)), 0);

  const view1=(
    <>
      <div className="my-2">
        <Button type="button" onClick={() => setShowNewConcept(true)}>Agregar Concepto</Button>
      </div>
      
      <div className="hidden md:block w-full">
        <Table columns={columns} data={data} placeH="Buscar concepto" />
      </div>
      <div className="block sm:hidden w-full">
        <ListData data={data} />
      </div>
    </>
  )

  const view2=(
    <>
      <div>
        {/* <div className="flex flex-col sm:flex-row justify-between gap-x-3 gap-y-3 border-b border-slate-500 pb-3">
          <div className="mt-2 order-2 sm:order-1">
            <p className="text-lg">{client?.legalName}</p>
            <p className="text-lg">{client?.tin}</p>
            <p className="text-sm">{client?.taxRegimeCode}</p>
            <p className="text-sm">{client?.zipCode}</p>
          </div>
  
          <div className=" order-1 sm:order-3 sm:text-right mt-2 sm:mt-0">
            <p className="font-extrabold text-lg text-black">{company?.issuer?.legalName}</p>
            <p className="font-extrabold text-lg text-black">{company?.issuer?.tin}</p>
            <p className="text-sm text-slate-500">{company?.issuer?.taxRegimeCode}</p>
            <p className="text-sm text-slate-500">{company?.issuer.expeditionZipCode}</p>
          </div>
        </div> */}
  
        <div className="md:flex md:justify-around gap-x-3 mt-3">
          <div>
            {/* <div className="flex gap-x-2 items-center">
              <p className="text-slate-600 font-extrabold">Uso de factura</p>
              <p className="text-black font-extrabold">{labelConditionPayment}</p>
            </div> */}
            
            <div className="flex gap-x-2 items-center">
              <p className="text-slate-600 font-extrabold">Forma pago</p>
              <p className="text-black font-extrabold">{formPaid}</p>
            </div>
            
            {/* <div className="flex gap-x-2 items-center">
              <p className="text-slate-600 font-extrabold">Metodo pago</p>
              <p className="text-black font-extrabold">{methodPaid}</p>
            </div> */}
            
            {/* <div className="flex gap-x-2 items-center">
              <p className="text-slate-600 font-extrabold">Tipo</p>
              <p className="text-black font-extrabold">{labelType}</p>
            </div> */}
  
            <div className="flex gap-x-2 items-center">
              <p className="text-slate-600 font-extrabold">Condicion de pago</p>
              <p className="text-black font-extrabold">{conditionPayment}</p>
            </div>
          </div>
  
          <div className="text-right mt-2 lg:mt-0">
            <p className="text-blue-500 font-bold">Factura No: {folio}</p>
            <p className="text-sm">{date?.substring(8, 10)} de {months[new Date(date).getMonth()]} {date?.substring(0, 4)} {localString.substring(11, 19)}</p>
          </div>
  
        </div>
  
        <div className={`grid gap-x-3 gap-y-3`}>
          <div>
            <div className="mt-5 bg-blue-500 py-3">
              <p className="text-white text-center text-lg font-bold">FACTURA</p>
            </div>
  
            <div className="hidden md:block">
              <div className="grid grid-cols-6 gap-x-2 mt-4">
                <p className="text-slate-600 font-bold">CANTIDAD</p>
                <p className="text-slate-600 font-bold col-span-3">DESCRIPCION</p>
                <p className="text-slate-600 font-bold text-right">PRECIO</p>
                <p className="text-slate-600 font-bold text-right">IMPORTE</p>
              </div>
  
              {conceptsInvoice.map((c, index:number) => (
                // <div className="grid grid-cols-6 gap-x-2 mt-3" key={c.idconcept+index}>
                <div className="grid grid-cols-6 gap-x-2 mt-3" key={index}>
                  <p className="text-black">{c?.quantity || 0}</p>
                  <p className="text-black col-span-3">{c.conceptEstimate.description}</p>
                  <p className="text-black text-right">{CurrencyFormatter({
                    currency: 'MXN',
                    value: c?.priceConcepEstimate?.cost || 0
                  })}</p>
                  <p className="text-black text-right">{CurrencyFormatter({
                    currency: 'MXN', 
                    value: (c?.amount || 0) * (c?.quantity?? 0)
                  })}</p>
                </div>
              ))}
            </div>
   
            <div className="mt-6 py-3 flex justify-between items-center border-y-2 border-blue-200">
              <p className="font-extrabold text-slate-600">SUBTOTAL</p>
              <p className="text-blue-600 font-bold">{CurrencyFormatter({
                currency: 'MXN',
                value: total
              })}</p>
            </div>
            
            <div className="py-3 flex justify-between items-center">
              <p className="font-extrabold text-slate-600">(+)IVA</p>
              <p className="text-blue-600 font-bold">{CurrencyFormatter({
                currency: 'MXN',
                value: 0
              })}</p>
            </div>
  
            <div className="py-3 flex justify-between items-center border-y-2 border-blue-500">
              <p className="font-extrabold text-slate-600">Total</p>
              <p className="text-blue-600 font-bold">{CurrencyFormatter({
                currency: 'MXN',
                value: total
              })}</p>
            </div>
  
            {/* <p className="font-extrabold text-slate-600 mt-6">NOTE</p>
            <p className="text-slate-600 text-sm">Validar estimacion vs factura</p>
            <p className="text-slate-600 text-sm">Validar abonos de factura completos</p> */}
          </div>
  
        </div>
      </div>
    </>
  )

  return (
    <div>
     {step==1 && view1} 
     {step==2 && view2}

      <div className="flex justify-center gap-x-2 mt-3">
        {step==1 && (
            <button
              className="text-black border border-black font-normal text-sm bg-white rounded-xl w-36 h-9 py-2 hover:bg-slate-200"
              onClick={() => nextStep(0)}
            >
              Atras
            </button>
        )}
        {step==2 && (
            <button
              className="text-black border border-black font-normal text-sm bg-white rounded-xl w-36 h-9 py-2 hover:bg-slate-200"
              onClick={() => nextStep(1)}
            >
              Atras
            </button>
        )}
        {step==1 && <Button type="button" onClick={() => nextStep(2)}>Siguiente</Button>}
        {step==2 && <Button type="button" onClick={() => saveInvoice(conceptsInvoice)}>Guardar</Button>}
      </div>
      {showNewConcept && step==1 && <AddNewConceptInInvoice showForm={handleShowNewConcept} token={token} 
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
    console.log('c => ', c);
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
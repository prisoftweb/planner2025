import { ISatCLient } from "@/interfaces/Clients";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { IConceptsInvoice } from "@/interfaces/Invoices";

type PropsConfirm = {
  client:ISatCLient|undefined, 
  folio:string, 
  date:string,
  concepts:IConceptsInvoice[],
  subtotal:number,
  total:number,
  iva:number
}

export default function ConfirmSatInvoiceComponent({client, date, folio, concepts, subtotal, total, iva}: PropsConfirm) {

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  console.log('client => ', client);
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between gap-x-3 gap-y-3 border-b border-slate-500 pb-3">
        <div className="mt-2 order-2 sm:order-1">
          <p className="text-lg">{client?.legalName}</p>
          <p className="text-lg">{client?.tin}</p>
          <p className="text-sm">{client?.taxRegimeCode}</p>
          <p className="text-sm">{client?.regime}</p>
          <p className="text-sm">{client?.zipCode}</p>
        </div>

        <div className=" order-1 sm:order-3 sm:text-right mt-2 sm:mt-0">
          <img src="/Palaciosconstrucciones_horizontal.png" alt="palacios"
            className=" h-14 md:h-24 w-auto"
          />
          <p className="font-extrabold text-lg text-black">Samuel Palacios Hernandez</p>
          <p className="font-extrabold text-lg text-black">PAHS76123U25</p>
          <p className="text-sm text-slate-500">Betelgeuze #334</p>
          <p className="text-sm text-slate-500">Del Llano San Luis Potosi, S.L.P.</p>
          <p className="text-sm text-slate-500">CP 78377 Mexico</p>
        </div>
      </div>

      <div className="flex justify-center gap-x-3 mt-3">
        {/* <div>
          <div className="md:hidden">
            <p className="text-slate-500 font-extrabold">ESTIMACION</p>
            <p className="text-black font-extrabold">{invoice?.estimate?.name}</p>
          </div>
          <p className="text-slate-500 font-extrabold mt-3 md:mt-0">PROYECTO</p>
          <p className="text-black font-extrabold">{invoice.project.title}</p>
        </div>

        <div className="hidden md:block">
          <p className="text-slate-500 font-extrabold">ESTIMACION</p>
          <p className="text-black font-extrabold">{invoice?.estimate?.name}</p>
        </div> */}

        <div className="text-right">
          {/* <p className="text-slate-500 font-extrabold">FACTURA</p> */}
          <p className="text-blue-500 font-bold">Factura No: {folio}</p>
          <p className="text-sm">{date?.substring(8, 10)} de {months[new Date(date).getMonth()]} {date?.substring(0, 4)}</p>
          {/* <p className="text-sm">{invoice.useCFDI}</p>
          <p className="text-sm">{invoice.paymentMethod}</p>
          <p className="text-sm">{invoice.paymentWay}</p> */}
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

            {concepts.map((c, index:number) => (
              <div className="grid grid-cols-6 gap-x-2 mt-3" key={c.idconcept+index}>
                <p className="text-black">{c?.quantity || 0}</p>
                <p className="text-black col-span-3">{c.conceptEstimate.description}</p>
                <p className="text-black text-right">{CurrencyFormatter({
                  currency: 'MXN',
                  value: c?.priceConcepEstimate?.cost || 0
                })}</p>
                <p className="text-black text-right">{CurrencyFormatter({
                  currency: 'MXN', 
                  value: c?.amount || 0
                })}</p>
              </div>
            ))}
          </div>

          {/* <div className="md:hidden">
            <ListData data={invoice} />
          </div> */}

          <div className="mt-6 py-3 flex justify-between items-center border-y-2 border-blue-200">
            <p className="font-extrabold text-slate-600">SUBTOTAL</p>
            <p className="text-blue-600 font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: subtotal
            })}</p>
          </div>
          
          <div className="py-3 flex justify-between items-center">
            <p className="font-extrabold text-slate-600">(+)IVA</p>
            <p className="text-blue-600 font-bold">{CurrencyFormatter({
              currency: 'MXN',
              value: iva
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
  )
}

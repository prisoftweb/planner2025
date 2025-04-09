'use client'
import { OneProjectMin } from "@/interfaces/Projects"
import { TbArrowNarrowLeft } from "react-icons/tb";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { Options } from "@/interfaces/Common";
import { IInvoiceMinFull, IConceptInvoice, ITotalInvoicesByProject } from "@/interfaces/Invoices";

type Props = {
  project: OneProjectMin, 
  token: string, 
  user: string, 
  invoice:IInvoiceMinFull, 
  concepts:IConceptInvoice[], 
  totalInvoiceProject: ITotalInvoicesByProject[]
}

export default function ContainerDetailInvoice({project, token, user, invoice, concepts, totalInvoiceProject}: Props) {

  const conceptsLV: Options[] = [];
  concepts.map((c) => {
    conceptsLV.push({
      label: c.conceptEstimate.name,
      value: c.conceptEstimate._id
    });
  });

  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-5">
          <div className="p-1 border border-slate-400 bg-white rounded-md cursor-pointer"
            onClick={() => window.location.replace(`/projects/estimates/${project._id}/invoice`)}
          >
            <TbArrowNarrowLeft className="w-9 h-9 text-slate-600" />
          </div>
          <p className="text-xl ml-4 font-medium">{project.title} {'->'} {invoice?.folio || 'sin factura'} </p>
        </div>
      </div>

      <div className="flex justify-between gap-x-3 border-b border-slate-500 pb-3">
        <div className="mt-2">
          <p className="text-lg">{invoice?.client?.name}</p>
          <p className="text-lg">{invoice?.client?.rfc}</p>

          <p className="text-sm">{invoice?.client?.location?.stret}</p>
          <p className="text-sm">{invoice?.client?.location?.community}</p>
          <p className="text-sm">{invoice?.client?.location?.state}</p>
          <p className="text-sm">{invoice?.client?.location?.cp}</p>
        </div>

        <div className="text-right">
          <img src="/Palaciosconstrucciones_horizontal.png" alt="palacios"
            className="h-24 w-auto"
          />
          <p className="font-extrabold text-lg text-black">Samuel Palacios Hernandez</p>
          <p className="font-extrabold text-lg text-black">PAHS76123U25</p>
          <p className="text-sm text-slate-500">Betelgeuze #334</p>
          <p className="text-sm text-slate-500">Del Llano San Luis Potosi, S.L.P.</p>
          <p className="text-sm text-slate-500">CP 78377 Mexico</p>
        </div>
      </div>

      <div className="flex justify-between gap-x-3 mt-3">
        <div>
          <p className="text-slate-500 font-extrabold">PROYECTO</p>
          <p className="text-black font-extrabold">{invoice.project.title}</p>
          {/* <p>direccion?</p> */}
        </div>

        <div>
          <p className="text-slate-500 font-extrabold">ESTIMACION</p>
          <p className="text-black font-extrabold">{invoice?.estimate?.name}</p>
        </div>

        <div className="text-right">
          <p className="text-slate-500 font-extrabold">FACTURA</p>
          <p className="text-blue-500 font-bold">Factura No: {invoice.folio}</p>
          <p className="text-sm">{invoice.date.substring(8, 10)} de {months[new Date(invoice.date).getMonth()]} {invoice?.date?.substring(0, 4)}</p>
          <p className="text-sm">{invoice.useCFDI}</p>
          <p className="text-sm">{invoice.paymentMethod}</p>
          <p className="text-sm">{invoice.paymentWay}</p>
        </div>

      </div>

      <div className="mt-5 bg-blue-500 py-3">
        <p className="text-white text-center text-lg font-bold">FACTURA</p>
      </div>

      <div className="grid grid-cols-6 gap-x-2 mt-4">
        <p className="text-slate-600 font-bold">CANTIDAD</p>
        <p className="text-slate-600 font-bold col-span-3">DESCRIPCION</p>
        <p className="text-slate-600 font-bold text-right">PRECIO</p>
        <p className="text-slate-600 font-bold text-right">IMPORTE</p>
      </div>

      {invoice.conceptsInvoiceInfo.map((c) => (
        <div className="grid grid-cols-6 gap-x-2 mt-3" key={c._id}>
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

      <div className="mt-6 py-3 flex justify-between items-center border-y-2 border-blue-200">
        <p className="font-extrabold text-slate-600">SUBTOTAL</p>
        <p className="text-blue-600 font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: invoice.cost.subtotal
        })}</p>
      </div>
      
      <div className="py-3 flex justify-between items-center">
        <p className="font-extrabold text-slate-600">(+)IVA</p>
        <p className="text-blue-600 font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: invoice.cost.iva
        })}</p>
      </div>

      <div className="py-3 flex justify-between items-center border-y-2 border-blue-500">
        <p className="font-extrabold text-slate-600">Total</p>
        <p className="text-blue-600 font-bold">{CurrencyFormatter({
          currency: 'MXN',
          value: invoice.cost.total
        })}</p>
      </div>

      <p className="font-extrabold text-slate-600 mt-6">NOTE</p>
      <p className="text-slate-600 text-sm">Validar estimacion vs factura</p>
      <p className="text-slate-600 text-sm">Validar abonos de factura completos</p>

    </>
  )
}
import { Report } from "@/interfaces/Reports"
import Chip from "../providers/Chip"
import Label from "../Label"
import { CurrencyFormatter } from "@/app/functions/Globals"

import { useOneReportStore } from "@/app/store/reportsStore"

export default function NuevoComponente({report, id, token}: 
    {report:Report, id:string, token: string}) {

  const {oneReport} = useOneReportStore();
  const total = CurrencyFormatter({
    currency: "MXN",
    value: oneReport?.total || 0
  });

  const gastado = (oneReport?.ammount || 0) - (oneReport?.total || 0);
  const porcentaje = (oneReport && oneReport?.total && oneReport?.ammount)? ((oneReport.total/oneReport.ammount) * 100).toFixed(0): 0;
  const isPettyCash = oneReport?.ispettycash;

  return (
    <>
      <div className="flex w-full px-2 flex-wrap space-x-2"
          style={{'backgroundColor': '#F8FAFC'}}>
        <div className="grid grid-cols-3 gap-x-3 mt-2">
          <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
            <div>
              <img src={ oneReport? oneReport.project.photo ?? '/img/projects/default.svg'  : '/img/projects/default.svg'} alt="logo" 
                className="w-28 h-auto" />
            </div>
            <div>
              <p className="text-blue-500">{oneReport?.project.title}</p>
              <p className="text-slate-500">{oneReport?.project.code}</p>
              <p className="text-slate-500">{oneReport?.project.glossary?.name || "sin condicion"}</p>
              <p className="text-slate-500">{oneReport?.project.account}</p>
              <div className="mt-3 border-t border-slate-500 pt-2">
                <p className="text-blue-500">{oneReport?.name}</p>
                <p className="text-slate-500">{oneReport?.account}</p>
              </div>
            </div>
          </div>
          
          <div className=" bg-white p-3 rounded-lg shadow-md py-2">
            <div className="flex gap-x-2 justify-between">
              <div>
                <img src={oneReport?.company.logo} alt="logo" className="w-16 h-auto" />
              </div>
              <div>
                <p className="text-slate-700">{oneReport?.company.name}</p>
                <p className="text-blue-600">{oneReport?.department.name}</p>
              </div>
              <div>
                <Chip label={oneReport?.moves[report.moves.length -1]?.condition?.name || 'sin status'} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 my-2">
              <div className="">
                <p className="text-slate-500">Total</p>
                <p className="text-green-600 font-semibold">{total}</p>
              </div>
              <div className="">
                <p className="text-slate-500">Nº gastos</p>
                <p className="text-red-500 font-semibold">{oneReport?.quantity}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-white p-3 rounded-lg shadow-md py-2 ">
            <div className=" border-r-1 border-slate-700 p-2">
              <Label>Fecha</Label>
              <p className="text-lg text-blue-600 mt-2">{oneReport?.date.substring(0, 10)}</p>
            </div>
            <div className="p-2">
              <Label>Comentarios</Label>
              <p className="text-blue-600 mt-2 text-sm">{oneReport?.comment}</p>
            </div>
          </div>

        </div>

        <div className="mt-7 bg-white w-full shadow-md shadow-slate-500">
          <div className="grid grid-cols-6 gap-x-4 p-3">
            <div>
              <Label>Porcentaje gastado</Label>
              <div className="w-full flex justify-center gap-x-1">
                <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                    style={{"width": porcentaje+'%'}}></div>
                </div>
                <p>{porcentaje}%</p>
              </div>
            </div>
            <div>
              <Label>Monto de caja chica</Label>
              <p className=" text-green-500 mt-2">{CurrencyFormatter({
                currency: 'MXN',
                value: oneReport?.ammount || 0
              })}</p>
            </div>
            <div>
              <Label>Gastado</Label>
              <p className="text-red-500 mt-2">{CurrencyFormatter({
                currency: 'MXN',
                value: oneReport?.total || 0
              })}</p>
            </div>
            <div>
              <Label>Saldo actual</Label>
              <p className="text-green-500 mt-2">{CurrencyFormatter({
                currency: 'MXN',
                value: gastado
              })}</p>
            </div>
            <div>
              <Label>Vencimiento</Label>
              <p className="text-blue-500 mt-2">{oneReport?.expirationdate?.substring(0, 10)}</p>
            </div>
            <div>
              <Label>Es Fondo fijo</Label>
              <div className="relative inline-block mt-2 w-8 h-4 rounded-full cursor-pointer">
                <input checked={isPettyCash} id="discount" type="checkbox"
                  className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                    appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                    peer-checked:border-green-500 peer-checked:before:bg-green-500
                    border border-slate-300" />
                <label htmlFor="discount"
                  className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                  <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
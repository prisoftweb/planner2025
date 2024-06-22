import Label from "../Label";
import { Expense } from "@/interfaces/Expenses";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "../providers/Chip";

export default function ProfileExpense({expense}: 
                        {expense:Expense}){

  const amount = CurrencyFormatter({
    currency: "MXN",
    value: expense.cost.subtotal
  });

  const discount = CurrencyFormatter({
    currency: "MXN",
    value: Number(expense.cost.discount)
  });

  const vat = CurrencyFormatter({
    currency: "MXN",
    value: expense.cost.iva? expense.cost.iva : 0
  });

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-x-2">
            <div>
              {/* <img src={expense.project.photo? expense.project.photo : '/img/projects/default.svg'} alt="logo"  */}
              <img src={expense.project?.photo? expense.project.photo : '/img/projects/default.svg'} alt="logo"              
                className="w-28 h-auto" />
            </div>
            <div>
              <p className="text-blue-500">{expense.project?.title || 'Sin proyecto'}</p>
              <p className="text-slate-500">{expense.project?.code || ''}</p>
              <p className="text-slate-500">{expense.project?.types? expense.project.types.name: ''}</p>
              <p className="text-slate-500">{expense.project?.account || ''}</p>
            </div>
          </div>
          <div className=" flex gap-x-2 items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                style={{"width": expense.project?.progress.length > 0? 
                            expense.project.progress[expense.project.progress.length-1].progress : 0}}></div>
            </div>
            <p>{expense.project?.progress.length > 0?
                      expense.project.progress[expense.project.progress.length-1].progress : 0}%</p>
          </div>
        </div>
        
        <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="">
            <div className="flex gap-x-2">
              <div>
                <img src={'/img/provider.svg'} alt="logo" className="w-20 h-20" />
              </div>
              <div className="flex justify-between w-full">
                <div>
                  <p className="text-slate-500">{expense.category?.name || 'Sin categoria'}</p>
                  <p className="text-blue-500">{expense.provider?.name || 'Sin proveedor'}</p>
                </div>
                <div className="h-6">
                  <Chip label={expense.condition.length >0? 
                      expense.condition[expense.condition.length-1].glossary.name: 'sin status'} />
                </div>
              </div>
            </div>
            <Label>{expense.taxfolio}</Label>
          </div>
          
          <div className="grid grid-cols-2 gap-x-2 my-2">
            <div className="">
              <p className="text-slate-500">Importe</p>
              <p className="text-green-600 font-semibold">{amount}</p>
            </div>
            <div className="">
              <p className="text-slate-500">Descuento</p>
              <p className="text-red-600 font-semibold">{discount}</p>
            </div>
          </div>
          <div className="my-2">
            <p className="text-slate-500">IVA</p>
            <p className="text-blue-600 font-semibold">{vat}</p>
            {/* <p className="text-blue-600 font-semibold">${expense.iva? expense.iva : 0} (16%)</p> */}
          </div>
        </div>
        
        <div className="my-2 mt-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="border-r-1 border-gray-700">
              <p className="text-slate-500">Tipo de CFDI</p>
              <p className="text-blue-600 font-semibold">{expense.typeCFDI?.name}</p>
            </div>
            <div>
              <p className="text-slate-500">Fecha</p>
              <p className="text-blue-600 font-semibold">{expense.date.substring(0, 10)}</p>
            </div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-x-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="mt-3">
            <Label>Proveedor</Label>
            <p className="my-0 text-slate-700">{expense.provider?.name || 'Sin proveedor'}</p>
          </div>
          <div className="mt-3">
            <Label>Responsable</Label>
            <p className="my-0 text-slate-700">{expense.user.name}</p>
          </div>
          <div className="mt-3">
            <Label>Descripcion</Label>
            <p className="my-0 text-slate-700">{expense.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}
import Label from "../Label";
import { OneExpense } from "@/interfaces/Expenses";
import { CurrencyFormatter } from "@/app/functions/Globals";
import Chip from "../providers/Chip";
import { useNewExpense } from "@/app/store/newExpense";

export default function ProfileExpense({expense}: 
                        {expense:OneExpense}){

  const {currentExpense} = useNewExpense();
  
  const amount = CurrencyFormatter({
    currency: "MXN",
    value: currentExpense?.cost.subtotal || 0
  });

  const discount = CurrencyFormatter({
    currency: "MXN",
    value: Number(currentExpense?.cost.discount || 0)
  });

  const vat = CurrencyFormatter({
    currency: "MXN",
    value: currentExpense?.cost.iva? currentExpense.cost.iva : 0
  });

  currentExpense? console.log('current expense => ', currentExpense) : console.log('expense => ', expense);

  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex gap-x-2">
            <div>
              {/* <img src={expense.project.photo? expense.project.photo : '/img/projects/default.svg'} alt="logo"  */}
              <img src={currentExpense?.project?.photo? currentExpense?.project.photo : '/img/projects/default.svg'} alt="logo"              
                className="w-28 h-auto" />
            </div>
            <div>
              <p className="text-blue-500">{currentExpense?.project?.title || 'Sin proyecto'}</p>
              <p className="text-slate-500">{currentExpense?.project?.code || ''}</p>
              <p className="text-slate-500">{currentExpense?.project?.glossary? currentExpense?.project.glossary.name: ''}</p>
              <p className="text-slate-500">{currentExpense?.project?.account || ''}</p>
            </div>
          </div>
          <div className=" flex gap-x-2 items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              {/* <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                style={{"width": expense.project?.progress.length > 0? 
                            expense.project.progress[expense.project.progress.length-1].progress : 0}}></div> */}
              <div className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" 
                style={{"width": expense.project?.progress?.length > 0? 
                            expense.project.progress[expense.project?.progress.length-1].progress : 0 || 0}}></div>
            </div>
            <p>{currentExpense && currentExpense?.project?.progress?.length > 0?
                      currentExpense?.project.progress[currentExpense?.project.progress?.length-1].progress : 0 || 0}%</p>
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
                  <p className="text-slate-500">{currentExpense?.category?.name || 'Sin categoria'}</p>
                  <p className="text-blue-500">{currentExpense?.provider?.name || 'Sin proveedor'}</p>
                </div>
                <div className="h-6">
                  {/* <Chip label={currentExpense && currentExpense?.condition.length >0? 
                      currentExpense?.condition[currentExpense?.condition.length-1].glossary.name: 'sin status'} /> */}
                  <Chip label={currentExpense && currentExpense?.estatus? 
                    currentExpense?.estatus.name: 'sin status'} color={currentExpense && currentExpense?.estatus? 
                      currentExpense?.estatus.color: 'gray'} />
                </div>
              </div>
            </div>
            <Label>{currentExpense?.taxfolio}</Label>
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
              <p className="text-blue-600 font-semibold">{currentExpense?.typeCFDI?.name}</p>
            </div>
            <div>
              <p className="text-slate-500">Fecha</p>
              <p className="text-blue-600 font-semibold">{currentExpense?.date.substring(0, 10)}</p>
            </div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-x-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="mt-3">
            <Label>Proveedor</Label>
            <p className="my-0 text-slate-700">{currentExpense?.provider?.name || 'Sin proveedor'}</p>
          </div>
          <div className="mt-3">
            <Label>Responsable</Label>
            <p className="my-0 text-slate-700">{currentExpense?.user.name}</p>
          </div>
          <div className="mt-3">
            <Label>Descripcion</Label>
            <p className="my-0 text-slate-700">{currentExpense?.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}
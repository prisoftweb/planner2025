import { useState, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid";
import { GiSettingsKnobs } from "react-icons/gi";
import NavStepperPaidExpenses from "./NavStepperPaidExpenses";
import { HistoryExpensesTable } from "@/interfaces/Providers";
import HeaderPaidHistoryExpenses from "./HeaderPaidHistoryExpenses";
import { Provider } from "@/interfaces/Providers";
import TableListExpensesPaid from "./TableListsExpensesPaid";
import PaidExpensesHistory from "./PaidExpensesHistory";

export default function PaidHistoryExpenses({showForm, dataTable, provider, token}: 
  {showForm:Function, dataTable: HistoryExpensesTable[], provider: Provider, token:string}) {

  const [heightPage, setHeightPage] = useState<number>(900);
  const [indexStepper, setIndexStepper] = useState<number>(0);

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }
  
  const handleIndexStepper = (value: number) => {
    setIndexStepper(value);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  let viewComponent = indexStepper===1? 
      <PaidExpensesHistory token={token} />: <TableListExpensesPaid data={dataTable} />;
  
  return(
    <>
      <form className="z-10 top-16 w-full max-w-2xl absolute bg-white space-y-5 p-3 right-0"
        style={{height: `${heightPage}px`}}
      >
        <div className="flex justify-between">
          <div className="flex mt-2 items-center">
            <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
            <div className="ml-3">
              <p className="text-xl">Nuevo pago</p>
              <p className="text-gray-500 text-sm">Agrega un nuevo pago a proveedores</p>
            </div>
          </div>
          <XMarkIcon className="w-8 h-8 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>
        
        <NavStepperPaidExpenses index={indexStepper} changeTab={handleIndexStepper} />
        <div className="mt-3">
          <HeaderPaidHistoryExpenses expensesTable={dataTable} provider={provider} />
        </div>
        <div className="mt-3">
          {viewComponent}
        </div>
      </form>
    </>
  )
}

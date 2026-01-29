import { useState, useEffect } from "react"
import { GiSettingsKnobs } from "react-icons/gi";
import { HistoryExpensesTable } from "@/interfaces/Providers";
// import HeaderPaidHistoryExpenses from "../HeaderPaidHistoryExpenses";
import { Provider, ProviderMin } from "@/interfaces/Providers";
import TableListExpensesPaid from "../TableListsExpensesPaid";
import PaidExpensesHistory from "../PaidExpensesHistory";
import { Options } from "@/interfaces/Common";
import { CostsPaymentTable } from "@/interfaces/Providers";
import PaymentPlugin from "../PaymentPlugin";
import TooltipCloseIcon from "@/components/tooltipIcons/TooltipCloseIcon";
import NavStepperAddInvoicesToAdvance from "./NavStepperAddInvoicesToAdvance";
import HeaderAddInvoicesToAdvance from "./HeaderAddInvoicesToAdvance";
import AddInvoicesInAdvance from "./AddInvoicesInAdvance";
import { ICostRelAdvance } from "@/interfaces/Expenses";
import ExpensesToRelacionatedTable from "./ExpensesToRelacionatedTable";
import { OneExpense } from "@/interfaces/Expenses";

type Props = {
  showForm: (value: boolean) => void, 
  provider: ProviderMin, 
  token:string, 
  user: string, 
  open: boolean,
  costs:ICostRelAdvance[],
  pending:number,
  advance:OneExpense,
  updateInvoices: () => Promise<void>
}

export default function AddInvoicesToAdvance({showForm, provider, open, costs, pending, advance, token, user, updateInvoices}: Props) {

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

  const handleClose = () => {
    setIndexStepper(0);
    showForm(false);
  }

  let viewComponent = indexStepper===1? 
      <AddInvoicesInAdvance costs={costs} advance={advance} user={user} token={token} 
          handleClose={handleClose} updateInvoices={updateInvoices} />:
      (<ExpensesToRelacionatedTable costs={costs} handleIndexStepper={handleIndexStepper} />);
  
  return(
    <>
      <div>
        {/* top-16 */}
        <form className="z-10 w-full max-w-5xl absolute bg-white space-y-5 p-5 right-0"
          style={{height: `${heightPage}px`}}
        >
          <div className="flex justify-between border border-slate-400 p-2 rounded-md" style={{backgroundColor:'#F8FAFC'}}>
            <div className="flex mt-2 items-center">
              <GiSettingsKnobs className="w-8 h-8 text-slate-600" />
              <div className="ml-3">
                <p className="text-xl">Facturas a anticipo</p>
                <p className="text-gray-500 text-sm">Se agregan facturas al anticipo</p>
              </div>
            </div>
            <TooltipCloseIcon handleClose={handleClose} />
          </div>
          
          <NavStepperAddInvoicesToAdvance index={indexStepper} changeTab={handleIndexStepper} />
          <div className="mt-3">
            <HeaderAddInvoicesToAdvance provider={provider} costs={costs} pending={pending} />
          </div>
          <div className="mt-3">
            {viewComponent}
          </div>
        </form>
      </div>
    </>
  )
}

import { useState, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid";
import { GiSettingsKnobs } from "react-icons/gi";
import NavStepperPaidExpenses from "./NavStepperPaidExpenses";
import { HistoryExpensesTable } from "@/interfaces/Providers";
import HeaderPaidHistoryExpenses from "./HeaderPaidHistoryExpenses";
import { Provider } from "@/interfaces/Providers";
import TableListExpensesPaid from "./TableListsExpensesPaid";
import PaidExpensesHistory from "./PaidExpensesHistory";
import { Options } from "@/interfaces/Common";
import { CostInPayment } from "@/interfaces/Payments";
import { CostsPaymentTable } from "@/interfaces/Providers";

export default function PaidHistoryExpenses({showForm, dataTable, provider, token, user, 
    updateTable, condition, optTypes}: 
  {showForm:Function, dataTable: HistoryExpensesTable[], provider: Provider, 
    token:string, user: string, updateTable: Function, condition: string, optTypes: Options[]}) {

  const [heightPage, setHeightPage] = useState<number>(900);
  const [indexStepper, setIndexStepper] = useState<number>(0);

  const [costsInPayment, setCostInPayment] = useState<CostsPaymentTable[]>([]);

  useEffect(() => {
    const aux: CostsPaymentTable[] = [];
    dataTable.map((c) => {
      aux.push({
        archivos: c.archivos,
        condition: c.Estatus,
        Fecha: c.Fecha,
        id: c.id,
        isPaid: c.isPaid,
        Responsable: c.Responsable,
        Total: c.Total,
        paid: Number(c.Total.replace(/[$,",", M, X]/g, "")),
        pending: 0,
        parciality: 1,
        conceptCostoCenter: c.conceptCostoCenter,
        discount: c.discount,
        Importe: c.Importe,
        iva: c.iva,
        typeCFDI: c.typeCFDI,
        folio: c.folio,
        folioFiscal: c.folioFiscal
      });
    });
    setCostInPayment(aux);
  }, []);

  const updateCostPartiality = (value: CostsPaymentTable) => {
    const filtered = costsInPayment.filter((c) => c.id !== value.id);
    setCostInPayment([...filtered, value]);
  }

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

  const costs: string[] = [];
  let minDate = '', maxDate = '';

  dataTable.map((cost) => {
    costs.push(cost.id);
    if(minDate === '' && maxDate === ''){
      minDate=cost.Fecha;
      maxDate=cost.Fecha;
    }else{
      if(new Date(minDate) > new Date(cost.Fecha)){
        minDate = cost.Fecha;
      }else{
        if(new Date(maxDate) < new Date(cost.Fecha)){
          maxDate = cost.Fecha;
        }
      }
    }
  });

  let viewComponent = indexStepper===1? 
      <PaidExpensesHistory id={provider._id} token={token} showForm={showForm} condition={condition}
          user={user} costs={costs} maxDate={maxDate} minDate={minDate} updateTable={updateTable} 
          optTypes={optTypes} costsPayment={costsInPayment} />:
      <TableListExpensesPaid data={costsInPayment} nextPage={handleIndexStepper} updateCostPartial={updateCostPartiality} />;
  
  return(
    <>
      <form className="z-10 top-16 w-full max-w-5xl absolute bg-white space-y-5 p-3 right-0"
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
          <HeaderPaidHistoryExpenses expensesTable={costsInPayment} provider={provider} token={token} />
        </div>
        <div className="mt-3">
          {viewComponent}
        </div>
      </form>
    </>
  )
}

import { HistoryExpensesTable } from "@/interfaces/Providers"
import IconText from "./IconText"
import { CurrencyFormatter } from "@/app/functions/Globals";
import { Provider } from "@/interfaces/Providers";
import { ProgressCircle } from "@tremor/react";
import { getPendingPaymentProvider } from "@/app/api/routePayments";
import { useState, useEffect } from "react";
import { pendingPaymentProvider } from "@/interfaces/Payments";
import { showToastMessageError } from "../Alert";
import { CostsPaymentTable } from "@/interfaces/Providers";

export default function HeaderPaidHistoryExpenses({expensesTable, provider, token}:
   {expensesTable: CostsPaymentTable[], provider: Provider, token: string}) {

  const [pending, setPending] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const res :(pendingPaymentProvider[] | string) = await getPendingPaymentProvider(provider._id, token);
      if(typeof(res) !== 'string'){
        setPending(res[0].totalPendingPayment);
      }else{
        showToastMessageError(res);
      }
    }
    fetch();
  })
  
  let amount = 0;
  // let amountP = 0;
  expensesTable.map((exp) => {
    // amount += Number(exp.Total.replace(/[$,%,M,N,X]/g,""));
    console.log('amount => ', amount);
    console.log('paid => ', exp.paid);
    amount += Number(exp.paid);
    console.log('new amount => ', amount);
  });
 
  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="flex items-center gap-x-2 col-span-2">
          <div>
            <IconText size="w-8 h-8" sizeText="" text={provider.name} />
          </div>
          <div>
            <p>{provider.rfc}</p>
            <p>{provider.name}</p>
          </div>
        </div>

        {/* <div>
          <ProgressCircle value={85} title={'85'} />
        </div> */}
      </div>

      <div className="grid grid-cols-3 mt-3">
        <div>
          <p>Monto a pagar</p>
          <p className="text-green-500">{CurrencyFormatter({
            currency: 'MXN',
            value: amount
          })}</p>
        </div>

        <div>
          <p>Pendiente por pagar</p>
          <p className="text-red-500">{CurrencyFormatter({
            currency: 'MXN',
            value: pending
          })}</p>
        </div>

        <div>
          <p>Total de facturas</p>
          <p className="text-blue-500">{expensesTable.length} documentos</p>
        </div>
      </div>
    </div>
  )
}

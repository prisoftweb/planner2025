import { HistoryExpensesTable } from "@/interfaces/Providers"
import IconText from "./IconText"
import { CurrencyFormatter } from "@/app/functions/Globals";
import { Provider } from "@/interfaces/Providers";
import { ProgressCircle } from "@tremor/react";

export default function HeaderPaidHistoryExpenses({expensesTable, provider}:
   {expensesTable: HistoryExpensesTable[], provider: Provider}) {
  
  let amount = 0;
  let amountP = 0;
  expensesTable.map((exp) => {
    amount += Number(exp.Importe.replace(/[$,%,M,N,X]/g,""));
    if(!exp.isPaid){
      amountP += Number(exp.Importe.replace(/[$,%,M,N,X]/g,""));
    }
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

        <div>
          <ProgressCircle value={85} title={'85'} />
        </div>
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
            value: amountP
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

import IconText from "../IconText";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { Provider, ProviderMin } from "@/interfaces/Providers";
import { getPendingPaymentProvider } from "@/app/api/routePayments";
import { useState, useEffect } from "react";
import { pendingPaymentProvider } from "@/interfaces/Payments";
import { showToastMessageError } from "@/components/Alert";
import { CostsPaymentTable } from "@/interfaces/Providers";

type HeaderProps={
  // expensesTable: CostsPaymentTable[], 
  // provider: Provider,
  provider: ProviderMin, 
  // token: string
}

export default function HeaderAddInvoicesToAdvance({provider}: HeaderProps) {

  const [pending, setPending] = useState<number>(0);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res :(pendingPaymentProvider[] | string) = await getPendingPaymentProvider(provider._id, token);
  //     if(typeof(res) !== 'string'){
  //       setPending(res[0].totalPendingPayment);
  //     }else{
  //       showToastMessageError(res);
  //     }
  //   }
  //   fetch();
  // })
  
  // let amount = 0;
  // expensesTable.map((exp) => {
  //   amount += Number(exp.paid);
  // });
 
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

      </div>

      <div className="grid grid-cols-3 mt-3">
        <div>
          <p>Monto a aplicar</p>
          <p className="text-green-500">{CurrencyFormatter({
            currency: 'MXN',
            value: 0
          })}</p>
        </div>

        <div>
          <p>Pendiente de aplicar</p>
          <p className="text-red-500">{CurrencyFormatter({
            currency: 'MXN',
            value: 0
          })}</p>
        </div>

        <div>
          <p>Total de facturas</p>
          {/* <p className="text-blue-500">{expensesTable.length} documentos</p> */}
          <p className="text-blue-500"> documentos</p>
        </div>
      </div>
    </div>
  )
}

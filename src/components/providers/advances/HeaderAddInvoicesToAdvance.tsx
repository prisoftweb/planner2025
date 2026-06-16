import IconText from "../IconText";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { Provider, IProviderMin } from "@/interfaces/Providers";
import { getPendingPaymentProvider } from "@/app/api/routePayments";
import { useState, useEffect } from "react";
import { pendingPaymentProvider } from "@/interfaces/Payments";
import { showToastMessageError } from "@/components/Alert";
import { CostsPaymentTable } from "@/interfaces/Providers";
import { ICostRelAdvanceInv } from "@/interfaces/Expenses";

type HeaderProps={
  // expensesTable: CostsPaymentTable[], 
  // provider: Provider,
  provider: IProviderMin, 
  // token: string
  costs:ICostRelAdvanceInv[],
  pending:number
}

export default function HeaderAddInvoicesToAdvance({provider, costs, pending}: HeaderProps) {

  // const total = costs.reduce((accum, item) => accum+=item.cost?.total > 0? item.cost?.total:0, 0 );
  const total = costs.reduce((accum, item) => accum+=item.invoiceUUID.cost.total, 0);
  // const total=10;
  
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
            value: total
          })}</p>
        </div>

        <div>
          <p>Pendiente de aplicar</p>
          <p className="text-red-500">{CurrencyFormatter({
            currency: 'MXN',
            value: pending
          })}</p>
        </div>

        <div>
          <p>Total de facturas</p>
          {/* <p className="text-blue-500">{expensesTable.length} documentos</p> */}
          <p className="text-blue-500"> {costs.length} documentos</p>
        </div>
      </div>
    </div>
  )
}

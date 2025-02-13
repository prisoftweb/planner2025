import { IInvoice, IInvoiceTable } from "@/interfaces/Invoices";

export function InvoiceDataToTableData(invoices:IInvoice[]){
  const table: IInvoiceTable[] = [];
  invoices.map((inv) => {
    table.push({
      amount: inv.cost.subtotal,
      estimate: inv.estimate,
      folio: inv.folio,
      id: inv._id
    })
  });

  return table;
}
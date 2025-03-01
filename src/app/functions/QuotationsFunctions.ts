import { IQuotationMin, IQuotationTable } from "@/interfaces/Quotations";

export function QuotationsDataToQuotationsTable(quotations:IQuotationMin[]){
  const table: IQuotationTable[] = [];
  quotations.map((quotation, index:number) => {
    table.push({
      id: quotation._id,
      Cliente: quotation.client,
      Detalle: quotation.user,
      Estatus: quotation.condition[0],
      Fechaenv: quotation.shippingdate,
      Fechasol: quotation.shippingdate,
      Folio: quotation.account,
      Monto: quotation.amountotal,
      Titulo: quotation.title
    });
  });

  return table;
}
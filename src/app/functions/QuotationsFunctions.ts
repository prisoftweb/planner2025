import { IQuotationMin, IQuotationTable } from "@/interfaces/Quotations";

export function QuotationsDataToQuotationsTable(quotations:IQuotationMin[]){
  const table: IQuotationTable[] = [];
  quotations.map((quotation) => {
    table.push({
      id: quotation._id,
      Cliente: quotation.client,
      Detalle: quotation.user,
      Estatus: quotation.condition[0],
      Fechaenv: quotation.expirationdate,
      Fechasol: quotation.applicationdate,
      Folio: quotation.account,
      Monto: quotation.cost?.total || 0,
      Titulo: quotation.title
    });
  });

  return table;
}
import { IInvoiceByProject, IInvoiceTable, IConceptInvoice } from "@/interfaces/Invoices";
import { ITableConceptsEstimate } from "@/interfaces/Estimate";

export function InvoiceDataToTableData(invoices:IInvoiceByProject[]){
  const table: IInvoiceTable[] = [];
  invoices.map((inv) => {
    table.push({
      amount: inv.cost.total,
      condition: inv.condition,
      estimate: inv.estimate.name,
      fecha: inv.date,
      folio: inv.folio,
      formpaid: inv.paymentWay,
      id: inv._id,
      methodpaid: inv.paymentMethod,
      usecfdi: inv.useCFDI
    })
  });

  return table;
}

export function ConceptsDataToConceptsTable(conepts:IConceptInvoice[]){
  const table: ITableConceptsEstimate[] = [];
  
  conepts.map((concept) => {
    table.push({
      id: concept.conceptEstimate._id,
      // Cantidad: concept.conceptEstimate.quantity,
      Cantidad: 0,
      Clave: concept.conceptEstimate.code,
      Descripcion: concept.conceptEstimate.description,
      nombre: concept.conceptEstimate.name,
      // PU: concept.conceptEstimate?.priceConcepEstimate? (concept.conceptEstimate?.priceConcepEstimate?.cost? concept.conceptEstimate.priceConcepEstimate.cost: 0) : 0,
      PU: 0,
      // Importe: concept.conceptEstimate?.priceConcepEstimate? (concept.conceptEstimate?.amount? concept.conceptEstimate.amount: 0) : 0,
      Importe: 0,
      Unidad: (concept.conceptEstimate.unit?.name? concept.conceptEstimate.unit?.name: 'Sin unidad') || 'Sin unidad',
      idconcept: concept.conceptEstimate._id
    });
  });

  return table;
}
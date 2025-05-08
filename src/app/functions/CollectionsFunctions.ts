import { ITableCollection, ICollectionMin } from "@/interfaces/Collections";

export function CollectionDataToTableData(collections:ICollectionMin[]){
  const table: ITableCollection[] = [];
  collections.map((col) => {
    table.push({
      Accion: col._id,
      Cuenta: col.account,
      Estimacion: '',
      Facturas: [col.invoices],
      Fecha: col.date.substring(0, 10),
      id: col._id,
      Importe: col.amount,
      Referencia: col.reference,
      status: col.condition,
      concept: col.concept
    })
  });

  return table;
}
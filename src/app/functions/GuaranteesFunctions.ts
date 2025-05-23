import { ITableGuarantee, IGuaranteeMin } from "@/interfaces/Guarantee";
export function GuaranteeDataToTableData(guarantees:IGuaranteeMin[]){
  const table: ITableGuarantee[] = [];
  guarantees.map((gua) => {
    table.push({
      amount: gua.cost.subtotal,
      amountVat: gua.cost.total,
      client: gua.client.name,
      dateGuarantee: gua.dateGuarantee,
      datePayment: gua.datePayment,
      id: gua._id,
      proyect: gua.project.title,
      isValidate: gua.estatus._id.includes('6827d5c2936cac5913f94ad7')
    })
  });

  return table;
}
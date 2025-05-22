import { ITableGuarantee, IGuarantee } from "@/interfaces/Guarantee";
export function GuaranteeDataToTableData(guarantees:IGuarantee[]){
  const table: ITableGuarantee[] = [];
  guarantees.map((gua) => {
    table.push({
      amount: gua.cost.subtotal,
      amountVat: gua.cost.total,
      client: 'sin cliente',
      dateGuarantee: gua.dateGuarantee,
      datePayment: gua.datePayment,
      id: gua._id,
      proyect: gua.project,
      isValidate: gua.condition[gua.condition.length-1].glossary.includes('6827d5c2936cac5913f94ad7')
    })
  });

  return table;
}
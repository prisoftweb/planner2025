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
      isValidate: gua.condition[gua.condition.length-1].glossary.includes('678ed05cc5f08e8a0f36d5e1')
    })
  });

  return table;
}
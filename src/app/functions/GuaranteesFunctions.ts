import { ITableGuarantee, IGuaranteeMin, IGuaranteeResumenByProject } from "@/interfaces/Guarantee";
export function GuaranteeDataToTableData(guarantees:IGuaranteeMin[]){
  const table: ITableGuarantee[] = [];
  guarantees.map((gua) => {
    table.push({
      amount: gua.cost.subtotal,
      amountVat: gua.cost.total,
      client: gua.client.name,
      // dateGuarantee: gua.dateGuarantee,
      dateGuarantee: gua?.date ?? 'Sin fecha',
      datePayment: gua?.datePayment ?? '',
      id: gua._id,
      proyect: gua.project.title,
      isValidate: gua.estatus._id.includes('6827d5c2936cac5913f94ad7')
    })
  });

  return table;
}

export function GuaranteeDataByProjectToTableData(guarantees:IGuaranteeResumenByProject[]){
  const table: ITableGuarantee[] = [];
  guarantees.map((gua) => {
    table.push({
      amount: gua.subtotal,
      amountVat: gua.total,
      client: gua.client,
      // dateGuarantee: gua.dateGuarantee,
      dateGuarantee: 'Sin fecha',
      datePayment: '',
      id: '',
      proyect: gua.project,
      // isValidate: gua.estatus._id.includes('6827d5c2936cac5913f94ad7')
      isValidate: false
    })
  });

  return table;
}
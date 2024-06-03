import { Expense, ExpensesTable } from "@/interfaces/Expenses";
import { CurrencyFormatter } from "./Globals";

export function ExpenseDataToTableData(expenses:Expense[]){
  const table: ExpensesTable[] = [];
  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.subtotal
        });
    // table.push({
    //   id: expense._id,
    //   Descripcion: expense.description,
    //   Estatus: 'condition',
    //   Fecha: expense.date,
    //   Importe: dollar,
    //   Informe: expense.folio,
    //   Proveedor: expense.provider? expense.provider.name: 'sin proveedor',
    //   Proyecto: expense.project.title,
    //   Responsable: {
    //     responsible: expense.user.name,
    //     photo: expense.user.photo
    //   },
    //   condition: expense.condition.length > 0 ? expense.condition[expense.condition.length -1].glossary?.name: 'sin status'
    // })
    table.push({
      id: expense._id,
      Descripcion: expense.description,
      Estatus: 'condition',
      Fecha: expense.date,
      Importe: dollar,
      Informe: expense.report?.name || 'sin informe',
      Proveedor: expense.provider? expense.provider.name: 'sin proveedor',
      Proyecto: expense.project?.title || 'sin proyecto',
      Responsable: {
        responsible: expense.user.name,
        photo: expense.user.photo
      },
      condition: expense.condition.length > 0 ? expense.condition[expense.condition.length -1].glossary?.name: 'sin status'
    })
  });

  return table;
}
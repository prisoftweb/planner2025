import { CurrencyFormatter } from "./Globals";
import { Report } from "@/interfaces/Reports";
import { ReportTable } from "@/interfaces/Reports";
import { CostsTable } from "@/interfaces/Reports";
import { Expense } from "@/interfaces/Expenses";

export function ReportDataToTableData(reports:Report[]){
  const table: ReportTable[] = [];
  reports.map((report) => {
    const dollar = CurrencyFormatter({
      currency: "MXN",
      value: report.total
    })
    
    table.push({
      Company: report.company.logo,
      Total: dollar,
      Depto: report.department.name,
      Fecha: report.date,
      NºGastos: report.quantity.toString(),
      Project: report.project.title,
      Report: report.name,
      Responsible: report.user.photo,
      Status: report.moves[report.moves.length - 1]?.condition?.name || 'Sin status',
      id: report._id,
      color: report.moves[report.moves.length - 1].condition.color || '',
    })
  });

  return table;
}

export function CostsDataToTableData(expenses:Expense[]){
  const table: CostsTable[] = [];
  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.cost.subtotal
        })
    table.push({
      id: expense._id,
      Descripcion: expense.description,
      Estatus: 'condition',
      Fecha: expense.date,
      Importe: dollar,
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
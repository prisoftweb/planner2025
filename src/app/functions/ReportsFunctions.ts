import { CurrencyFormatter } from "./Globals";
import { CostReport, Report, ReportParse } from "@/interfaces/Reports";
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
      account: report.account,
      isPettyCash: report.ispettycash,
    })
  });

  return table;
}

export function ReportParseDataToTableData(reports:ReportParse[]){
  const table: ReportTable[] = [];
  reports.map((report) => {
    console.log(report.total);
    const dollar = CurrencyFormatter({
      currency: "MXN",
      value: report.total
    })
    
    table.push({
      //Company: report._id.company.logo,
      Company: report.company?.logo || 'sin logo',
      Total: dollar,
      Depto: report.department,
      Fecha: report.date,
      NºGastos: report.quantity.toString(),
      Project: report.project?.title || 'sin proyecto',
      Report: report.name,
      Responsible: report.user?.photo || '/img/users/default.jpg',
      Status: report.lastmove?.condition.name || 'sin status',
      id: report._id,
      color: report.lastmove?.condition.color || '',
      account: report.account,
      isPettyCash: report.ispettycash,
    })
  });
  return table;
}

export function CostsDataToTableData(expenses:Expense[]){
  const table: CostsTable[] = [];
  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.cost?.subtotal || 0
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
      condition: expense.estatus.name,
      //condition: expense.condition.length > 0 ? expense.condition[expense.condition.length -1].glossary?.name: 'sin status'
    })
  });

  return table;
}

export function CostsDataToTableDataMin(expenses:CostReport[]){
  const table: CostsTable[] = [];
  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.cost?.subtotal || 0
        })
    table.push({
      id: expense._id,
      Descripcion: expense.description,
      Estatus: 'condition',
      Fecha: expense.date,
      Importe: dollar,
      //Proveedor: expense.provider? expense.provider.name: 'sin proveedor',
      Proveedor: 'sin proveedor',
      Proyecto: expense.project?.title || 'sin proyecto',
      Responsable: {
        responsible: expense.user.name,
        photo: expense.user.photo
      },
      //condition: expense.condition.length > 0 ? expense.condition[expense.condition.length -1].glossary?.name: 'sin status'
      condition: 'sin status'
    })
  });

  return table;
}
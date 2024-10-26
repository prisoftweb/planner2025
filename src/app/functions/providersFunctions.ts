import { Expense } from "@/interfaces/Expenses";
import { HistoryExpensesTable, ExpensesTableProvider, DetailExpensesTableProvider } from "@/interfaces/Providers";
import { CurrencyFormatter } from "./Globals";

export function ExpenseDataToTableHistoryProviderData(expenses:Expense[]){
  const table: HistoryExpensesTable[] = [];
  
  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.cost?.subtotal || 0
        })
    const elements: string[] = [];
    if(expense.category && expense.category?.name.toLowerCase().includes('xml') && expense.category?.name.toLowerCase().includes('pdf')){
      const typeFiles = getTypeFiles(expense);
      if(typeFiles.includes('xml')){
        elements.push('xml');
      }else{
        elements.push('none');
      }

      if(typeFiles.includes('pdf')){
        elements.push('pdf');
      }else{
        elements.push('none');
      }
    }else{
      if(expense.category && expense.category?.name.toLowerCase().includes('xml')){
        const typeFiles = getTypeFiles(expense);
        if(typeFiles.includes('xml')){
          elements.push('xml');
        }else{
          elements.push('none');
        }
      }else{
        if(expense.category && expense.category?.name.toLowerCase().includes('pdf')){
          const typeFiles = getTypeFiles(expense);
          if(typeFiles.includes('pdf')){
            elements.push('pdf');
          }else{
            elements.push('none');
          }
        }else{
          const typeFiles = getTypeFiles(expense);
          if(typeFiles.includes('xml')){
            elements.push('xml');
          }
    
          if(typeFiles.includes('pdf')){
            elements.push('pdf');
          }

          if(elements.length === 0){
            elements.push('none');
          }
        }
      }
    }
    table.push({
      id: expense._id,
      Descripcion: expense.description,
      Estatus: expense.estatus,
      Fecha: expense.date,
      Importe: dollar,
      Informe: expense.report?.name || 'sin reporte',
      Proyecto: expense.project?.title || 'sin proyecto',
      Responsable: {
        responsible: expense.user?.name,
        photo: expense.user?.photo
      },
      condition: expense.estatus.name,
      archivos: elements,
      isPaid: expense.ispaid
    });
  });

  return table;
}

export function getTypeFiles(expense:Expense) {
  const typeFiles: string[] = [];
  expense.files.map((f) => {
      if(f.types === 'application/pdf' || f.types.includes('jpg') || f.types.includes('JPG')
        || f.types.includes('jpeg') || f.types.includes('JPEG') || f.types.includes('png')
        || f.types.includes('PNG') || f.types.includes('pdf') || f.types === 'a'){
          typeFiles.push('pdf');
      }else{
        if(f.types.includes('xml') || f.types.includes('XML') || f.types === 't'){
          typeFiles.push('xml');
        }
      }
    });
  
  return typeFiles;
}

export function ExpenseDataToTablePaidExpensesProviderData(expenses:Expense[]){
  const table: ExpensesTableProvider[] = [];
  
  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.cost?.subtotal || 0
        })
    const elements: string[] = [];
    if(expense.category && expense.category?.name.toLowerCase().includes('xml') && expense.category?.name.toLowerCase().includes('pdf')){
      const typeFiles = getTypeFiles(expense);
      if(typeFiles.includes('xml')){
        elements.push('xml');
      }else{
        elements.push('none');
      }

      if(typeFiles.includes('pdf')){
        elements.push('pdf');
      }else{
        elements.push('none');
      }
    }else{
      if(expense.category && expense.category?.name.toLowerCase().includes('xml')){
        const typeFiles = getTypeFiles(expense);
        if(typeFiles.includes('xml')){
          elements.push('xml');
        }else{
          elements.push('none');
        }
      }else{
        if(expense.category && expense.category?.name.toLowerCase().includes('pdf')){
          const typeFiles = getTypeFiles(expense);
          if(typeFiles.includes('pdf')){
            elements.push('pdf');
          }else{
            elements.push('none');
          }
        }else{
          const typeFiles = getTypeFiles(expense);
          if(typeFiles.includes('xml')){
            elements.push('xml');
          }
    
          if(typeFiles.includes('pdf')){
            elements.push('pdf');
          }

          if(elements.length === 0){
            elements.push('none');
          }
        }
      }
    }
    table.push({
      id: expense._id,
      //Estatus: expense.estatus,
      Estatus: expense.ispaid,
      date: expense.date,
      Responsable: {
        responsible: expense.user?.name,
        photo: expense.user?.photo
      },
      archivos: elements,
      notes: expense.description,
      //paid: expense.cost.subtotal.toString(),
      paid: dollar,
      Quantity: '4',
      range: 'kkjdf',
      reference: 'hkjhf'
    });
  });

  return table;
}

export function ExpenseDataToTableDetailExpensesProviderData(expenses:Expense[]){
  const table: DetailExpensesTableProvider[] = [];
  
  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.cost?.subtotal || 0
        })
    const elements: string[] = [];
    if(expense.category && expense.category?.name.toLowerCase().includes('xml') && expense.category?.name.toLowerCase().includes('pdf')){
      const typeFiles = getTypeFiles(expense);
      if(typeFiles.includes('xml')){
        elements.push('xml');
      }else{
        elements.push('none');
      }

      if(typeFiles.includes('pdf')){
        elements.push('pdf');
      }else{
        elements.push('none');
      }
    }else{
      if(expense.category && expense.category?.name.toLowerCase().includes('xml')){
        const typeFiles = getTypeFiles(expense);
        if(typeFiles.includes('xml')){
          elements.push('xml');
        }else{
          elements.push('none');
        }
      }else{
        if(expense.category && expense.category?.name.toLowerCase().includes('pdf')){
          const typeFiles = getTypeFiles(expense);
          if(typeFiles.includes('pdf')){
            elements.push('pdf');
          }else{
            elements.push('none');
          }
        }else{
          const typeFiles = getTypeFiles(expense);
          if(typeFiles.includes('xml')){
            elements.push('xml');
          }
    
          if(typeFiles.includes('pdf')){
            elements.push('pdf');
          }

          if(elements.length === 0){
            elements.push('none');
          }
        }
      }
    }
    table.push({
      id: expense._id,
      Estatus: expense.estatus,
      date: expense.date,
      Responsable: {
        responsible: expense.user?.name,
        photo: expense.user?.photo
      },
      archivos: elements,
      description: expense.description,
      paid: expense.ispaid,
      project: expense.project.title,
      report: expense.report.name,
      total: dollar
    });
  });

  return table;
}
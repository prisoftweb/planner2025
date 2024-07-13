import { Expense, ExpensesTable } from "@/interfaces/Expenses";
import { CurrencyFormatter } from "./Globals";
import { getProvider } from "../api/routeProviders";
import { Provider } from "@/interfaces/Providers";

export function ExpenseDataToTableData(expenses:Expense[]){
  const table: ExpensesTable[] = [];
  expenses.map((expense) => {
    // if(typeof(expense.costcenter) !== 'string'){
    //   console.log('Error con el cost center');
    //   console.log(expense);
    // }
    
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.cost?.subtotal || 0
        });
    const discount = CurrencyFormatter({
      currency: "MXN",
      value: expense.cost?.discount || 0
    });
    const vat = CurrencyFormatter({
      currency: "MXN",
      value: expense.cost?.iva || 0
    });
    const total = CurrencyFormatter({
      currency: "MXN",
      value: (expense.cost?.subtotal + expense.cost?.iva - expense.cost?.discount) || 0
    });
    const elements: string[] = [];
    if(expense.category.name.toLowerCase().includes('xml') && expense.category.name.toLowerCase().includes('pdf')){
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
      if(expense.category.name.toLowerCase().includes('xml')){
        const typeFiles = getTypeFiles(expense);
        if(typeFiles.includes('xml')){
          elements.push('xml');
        }else{
          elements.push('none');
        }
      }else{
        if(expense.category.name.toLowerCase().includes('pdf')){
          const typeFiles = getTypeFiles(expense);
          if(typeFiles.includes('pdf')){
            elements.push('pdf');
          }else{
            elements.push('none');
          }
        }else{
          //sin archivos
          elements.push('none');
        }
      }
    }
    // table.push({
    //   id: expense._id,
    //   Descripcion: expense.description,
    //   Estatus: 'condition',
    //   Fecha: expense.date,
    //   //costcenter: expense.costocenter? typeof(expense.costocenter)=== 'string'? expense.costocenter: expense.costocenter.name ?? 'error costcenter' : 'Sin centro de costos',
    //   costcenter: expense.costocenter.concept.name,
    //   Importe: dollar,
    //   Informe: expense.report?.name || 'sin informe',
    //   Proveedor: expense.provider? expense.provider.name: 'sin proveedor',
    //   Proyecto: expense.project?.title || 'sin proyecto',
    //   Responsable: {
    //     responsible: expense.user.name,
    //     photo: expense.user.photo
    //   },
    //   //condition: expense.condition.length > 0 ? expense.condition[expense.condition.length -1].glossary?.name: 'sin status',
    //   condition: expense.estatus.name,
    //   archivos: elements,
    //   vat, 
    //   discount, 
    //   total,
    //   taxFolio: expense.taxfolio || ''
    // })
    table.push({
      id: expense._id,
      Descripcion: expense.description,
      Estatus: 'condition',
      Fecha: expense.date,
      //costcenter: typeof(expense.costocenter)=== 'string'? expense.costocenter: expense.costocenter?.name,
      costcenter: expense.costocenter.concept.name,
      Importe: dollar,
      Informe: expense.report?.name || 'sin reporte',
      Proveedor: expense.provider? expense.provider.name: 'sin proveedor',
      Proyecto: expense.project?.title || 'sin proyecto',
      Responsable: {
        responsible: expense.user?.name,
        photo: expense.user?.photo
      },
      //condition: expense.condition?.length > 0 ? expense.condition[expense.condition?.length -1]?.glossary?.name: 'sin status',
      condition: expense.estatus.name,
      archivos: elements,
      vat,
      discount,
      total,
      taxFolio: expense.taxfolio || ''
    });
  });

  return table;
}

export function getTypeFiles(expense:Expense) {
  const typeFiles: string[] = [];
  expense.files.map((f) => {
      if(f.types === 'application/pdf' || f.types.includes('jpg') || f.types.includes('JPG')
        || f.types.includes('jpeg') || f.types.includes('JPEG') || f.types.includes('png')
        || f.types.includes('PNG')){
          typeFiles.push('pdf');
          //console.log('aqui entro => ', f);
          //tiene factura
      }else{
        if(f.types.includes('xml') || f.types.includes('XML')){
          typeFiles.push('xml');
          //console.log('aqui entro => ', f);
          //tiene xml    
        }
      }
    });
  
  return typeFiles;
}

export async function getSupplierCreditProv(token:string, id:string) {
  try {
    const res:Provider = await getProvider(id, token);
    if(typeof(res)==='string'){
      return false;
    }
    return !res.suppliercredit;
  } catch (error) {
    return false;
  }
}
import { Expense } from "@/interfaces/Expenses";
import { HistoryExpensesTable, ExpensesTableProvider, DetailExpensesTableProvider } from "@/interfaces/Providers";
import { CurrencyFormatter } from "./Globals";
import { Payment, PaymentProvider, CostPayment } from "@/interfaces/Payments";

export function ExpenseDataToTableHistoryProviderData(expenses:Expense[]){
  const table: HistoryExpensesTable[] = [];
  
  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.cost?.subtotal || 0
        });
    const total = CurrencyFormatter({
      currency: "MXN",
      value: expense.cost?.total || 0
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
      Total: total,
      Informe: expense.report?.name || 'sin reporte',
      Proyecto: expense.project?.title || 'sin proyecto',
      Responsable: {
        responsible: expense.user?.name,
        photo: expense.user?.photo
      },
      condition: expense.estatus,
      archivos: elements,
      isPaid: expense.ispaid,
      folio: expense.folio,
      folioFiscal: expense.taxfolio,
      discount: expense.cost.discount,
      iva: expense.cost.vat?.value || expense.cost.iva,
      typeCFDI: expense.typeCFDI.name,
      conceptCostoCenter: expense.costocenter.concept.name
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

// export function getTypeFilePayment(pay:CostPayment) {
//   const typeFiles: string[] = [];
//   pay.files.map((f) => {
//       if(f.types === 'application/pdf' || f.types.includes('jpg') || f.types.includes('JPG')
//         || f.types.includes('jpeg') || f.types.includes('JPEG') || f.types.includes('png')
//         || f.types.includes('PNG') || f.types.includes('pdf') || f.types === 'a'){
//           typeFiles.push('pdf');
//       }else{
//         if(f.types.includes('xml') || f.types.includes('XML') || f.types === 't'){
//           typeFiles.push('xml');
//         }
//       }
//     });
  
//   return typeFiles;
// }

// export function ExpenseDataToTablePaidExpensesProviderData(expenses:Expense[]){
//   const table: ExpensesTableProvider[] = [];
  
//   expenses.map((expense) => {
//     const dollar = CurrencyFormatter({
//           currency: "MXN",
//           value: expense.cost?.subtotal || 0
//         })
//     const elements: string[] = [];
//     if(expense.category && expense.category?.name.toLowerCase().includes('xml') && expense.category?.name.toLowerCase().includes('pdf')){
//       const typeFiles = getTypeFiles(expense);
//       if(typeFiles.includes('xml')){
//         elements.push('xml');
//       }else{
//         elements.push('none');
//       }

//       if(typeFiles.includes('pdf')){
//         elements.push('pdf');
//       }else{
//         elements.push('none');
//       }
//     }else{
//       if(expense.category && expense.category?.name.toLowerCase().includes('xml')){
//         const typeFiles = getTypeFiles(expense);
//         if(typeFiles.includes('xml')){
//           elements.push('xml');
//         }else{
//           elements.push('none');
//         }
//       }else{
//         if(expense.category && expense.category?.name.toLowerCase().includes('pdf')){
//           const typeFiles = getTypeFiles(expense);
//           if(typeFiles.includes('pdf')){
//             elements.push('pdf');
//           }else{
//             elements.push('none');
//           }
//         }else{
//           const typeFiles = getTypeFiles(expense);
//           if(typeFiles.includes('xml')){
//             elements.push('xml');
//           }
    
//           if(typeFiles.includes('pdf')){
//             elements.push('pdf');
//           }

//           if(elements.length === 0){
//             elements.push('none');
//           }
//         }
//       }
//     }
//     table.push({
//       id: expense._id,
//       //Estatus: expense.estatus,
//       Estatus: expense.ispaid,
//       date: expense.date,
//       Responsable: {
//         responsible: expense.user?.name,
//         photo: expense.user?.photo
//       },
//       archivos: elements,
//       notes: expense.description,
//       //paid: expense.cost.subtotal.toString(),
//       paid: dollar,
//       Quantity: '4',
//       range: 'kkjdf',
//       reference: 'hkjhf'
//     });
//   });

//   return table;
// }

export function ExpenseDataToTablePaidExpensesProviderData(expenses:PaymentProvider[]){
  const table: ExpensesTableProvider[] = [];
  
  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.payout || 0
        })
    const pending = CurrencyFormatter({
      currency: "MXN",
      value: expense.pending || 0
    })
    // const elements: string[] = [];
    // if(expense.category && expense.category?.name.toLowerCase().includes('xml') && expense.category?.name.toLowerCase().includes('pdf')){
    //   const typeFiles = getTypeFiles(expense);
    //   if(typeFiles.includes('xml')){
    //     elements.push('xml');
    //   }else{
    //     elements.push('none');
    //   }

    //   if(typeFiles.includes('pdf')){
    //     elements.push('pdf');
    //   }else{
    //     elements.push('none');
    //   }
    // }else{
    //   if(expense.category && expense.category?.name.toLowerCase().includes('xml')){
    //     const typeFiles = getTypeFiles(expense);
    //     if(typeFiles.includes('xml')){
    //       elements.push('xml');
    //     }else{
    //       elements.push('none');
    //     }
    //   }else{
    //     if(expense.category && expense.category?.name.toLowerCase().includes('pdf')){
    //       const typeFiles = getTypeFiles(expense);
    //       if(typeFiles.includes('pdf')){
    //         elements.push('pdf');
    //       }else{
    //         elements.push('none');
    //       }
    //     }else{
    //       const typeFiles = getTypeFiles(expense);
    //       if(typeFiles.includes('xml')){
    //         elements.push('xml');
    //       }
    
    //       if(typeFiles.includes('pdf')){
    //         elements.push('pdf');
    //       }

    //       if(elements.length === 0){
    //         elements.push('none');
    //       }
    //     }
    //   }
    // }
    table.push({
      id: expense._id,
      //Estatus: expense.estatus,
      Estatus: expense.status,
      date: expense.date,
      Responsable: {
        responsible: expense.user.name,
        photo: expense.user.photo
      },
      archivos: (!expense.voucher || expense.voucher.includes('default.svg')? false: true),
      notes: expense.notes,
      //paid: expense.cost.subtotal.toString(),
      paid: dollar,
      pending: pending,
      Quantity: expense.quantity.length.toString(),
      range: 'sin rango de fechas',
      reference: expense.reference
    });
  });

  return table;
}

export function ExpenseDataToTableDetailExpensesProviderData(expenses:CostPayment[]){
  const table: DetailExpensesTableProvider[] = [];
  
  expenses.map((expense, index:number) => {
    console.log('expense completo => ', expense);
    console.log('pay parse => ', JSON.stringify(expense));
    console.log('expense pay => ', expense.costs.pay);
    let dollar = '0';
    let d=0;
    if(expense.costs.pay){
      dollar =CurrencyFormatter({
        currency: "MXN",
        // value: expense.costs.cost.subtotal || 0
        // value: expense.costos.costito || 0
        value: expense.costs.pay[0]?.previousbalanceamount || 0
      });
      d = expense.costs.pay[0]?.previousbalanceamount || 0;
    }else{
      dollar=CurrencyFormatter({
        currency: "MXN",
        // value: expense.costs.cost.subtotal || 0
        // value: expense.costos.costito || 0
        value: 0
      });
    }
    let t = expense.costs.pay? expense.costs.pay[0]?.payout : 0 || 0;
    const total = CurrencyFormatter({
      currency: "MXN",
      // value: expense.costs.cost.total || 0
      // value: expense.payout || 0
      value: expense.costs.pay? expense.costs.pay[0]?.payout : 0 || 0
    })

    const u = expense.costs.pay? expense.costs.pay[0]?.unpaidbalanceamount : 0 || 0;
    const unpaid = CurrencyFormatter({
      currency: "MXN",
      // value: expense.costs.cost.subtotal || 0
      // value: expense.costos.costito || 0
      value: expense.costs.pay? expense.costs.pay[0]?.unpaidbalanceamount : 0 || 0
    });

    const elements: string[] = [];
    // const typeFiles = getTypeFiles(expense);
    if(expense.voucher.includes('pdf')){
      elements.push('pdf');
    }

    if(elements.length === 0){
      elements.push('none');
    }
    table.push({
      // id: expense.costs.folio,
      id: expense.costs.cost.exempttax + index.toString(),
      // Estatus: expense.costs.estatus,
      Estatus: expense.costs.estatus,
      date: expense.costs.date,
      // date: expense.date,
      Responsable: {
        // responsible: expense.costs.user?.name,
        // photo: expense.costs.user?.photo
        responsible: expense.user?.name,
        photo: expense.user?.photo
      },
      archivos: elements,
      description: expense.costs.description,
      paid: expense.costs.ispaid, 
      project: expense.costs.project.title,
      report: expense.costs.report.name,
      // previoudbalanceamount: dollar,
      previoudbalanceamount: d,
      // payout: total,
      payout: t,
      partitialnumber: expense.costs.pay? expense.costs.pay[0]?.partialitynumber: 1 || 1,
      // unpaidbalanceamount: unpaid,
      unpaidbalanceamount: u
    });
  });
  return table;
}

// export function ExpenseDataToTableDetailExpensesProviderData(expenses:Payment[]){
//   const table: DetailExpensesTableProvider[] = [];
  
//   expenses.map((expense) => {
//     const dollar = CurrencyFormatter({
//           currency: "MXN",
//           value: expense.payout || 0
//         })
//     const elements: string[] = [];
//     // if(expense.category && expense.category?.name.toLowerCase().includes('xml') && expense.category?.name.toLowerCase().includes('pdf')){
//     //   const typeFiles = getTypeFiles(expense);
//     //   if(typeFiles.includes('xml')){
//     //     elements.push('xml');
//     //   }else{
//     //     elements.push('none');
//     //   }

//     //   if(typeFiles.includes('pdf')){
//     //     elements.push('pdf');
//     //   }else{
//     //     elements.push('none');
//     //   }
//     // }else{
//     //   if(expense.category && expense.category?.name.toLowerCase().includes('xml')){
//     //     const typeFiles = getTypeFiles(expense);
//     //     if(typeFiles.includes('xml')){
//     //       elements.push('xml');
//     //     }else{
//     //       elements.push('none');
//     //     }
//     //   }else{
//     //     if(expense.category && expense.category?.name.toLowerCase().includes('pdf')){
//     //       const typeFiles = getTypeFiles(expense);
//     //       if(typeFiles.includes('pdf')){
//     //         elements.push('pdf');
//     //       }else{
//     //         elements.push('none');
//     //       }
//     //     }else{
//     //       const typeFiles = getTypeFiles(expense);
//     //       if(typeFiles.includes('xml')){
//     //         elements.push('xml');
//     //       }
    
//     //       if(typeFiles.includes('pdf')){
//     //         elements.push('pdf');
//     //       }

//     //       if(elements.length === 0){
//     //         elements.push('none');
//     //       }
//     //     }
//     //   }
//     // }
//     table.push({
//       id: expense._id,
//       Estatus: {
//         color: "#f00",
//         __v: 0,
//         _id: '1',
//         description: "sin condicion",
//         id: '1',
//         name: 'sin condicion',
//         status: true
//       },
//       date: expense.date,
//       // Responsable: {
//       //   responsible: expense.user?.name,
//       //   photo: expense.user?.photo
//       // },
//       Responsable: {
//         responsible: expense.user,
//         photo: '/img/default.jpg'
//       },
//       archivos: elements,
//       description: expense.notes,
//       paid: expense.status,
//       project: 'sin proyecto',
//       report: 'sin reporte',
//       total: dollar
//     });
//   });

//   return table;
// }
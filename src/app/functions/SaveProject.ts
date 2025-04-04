//import { Provider } from "@/interfaces/Providers";
import { projectValidation } from "@/schemas/project.schema";
import { CreateProject } from "../api/routeProjects";
import { ProjectsTable, ProjectsBudgetTable, Project, ProjectMin, OneProjectMin, IProjectWithEstimateMin } from "@/interfaces/Projects";
import { CurrencyFormatter } from "./Globals";
import { BudgetMin } from "@/interfaces/Budget";
import { BudgetTableCostCenter } from "@/interfaces/Budget";
import { FullBudget } from "@/interfaces/BudgetProfile";
import { MoneyFormatter } from "./Globals";

export default async function SaveProject(data:Object, token:string){
  
  // if(data.suppliercredit && (!data.tradeline || Object.keys(data.tradeline).length <= 0)){
  //   return {status: false, message: 'No ha guardado datos en la linea de credito!!'}
  // }
  
  //agregar linea para eliminar campos vacios

  const newObj = Object.fromEntries(Object.entries(data).filter(value => value[1]));

  console.log('obj = ', data);
  console.log('new obj = ',  newObj);
  const res = projectValidation.safeParse(newObj);
  if(res.success){
    try {
      const res = await CreateProject(token, data);
      if(res===201){
        return {
          status: true,
          message: 'Proyecto agregado exitosamente!!'
        }
      }
      return {
        status: false,
        message: res
      }
    } catch (error) {
      return {
        status : false,
        message: 'Error al crear proyecto!!'
      }
    } 
  }else{
    return{
      message: res.error.issues[0].message,
      status: false
    }
  }
}

// export function ProjectDataToTableData(projects:Project[]){
//   const table: ProjectsTable[] = [];
//   projects.map((project) => {
//     let p: string;
//     if(project.progress && project.progress.length > 0){
//       if(project.progress[project.progress.length - 1].progress){
//         p = project.progress[project.progress.length - 1].progress.toString() + '%';
//       }else{
//         p = '0%';
//       }
//     }else{
//       p = '0%';
//     }
//     //La moneda mexicana lleva el mx antes del $
//     const dollar = CurrencyFormatter({
//       currency: "MXN",
//       value: project.amount
//     })
//     //se puede usar dolares si no se quiere el mx antes del $
//     // const dollar = CurrencyFormatter({
//     //   currency: "USD",
//     //   value: project.amount
//     // })

//     let cond: string;

//     if(project.condition.length > 0){
//       cond = project.condition[project.condition.length - 1].glossary.color || '#f00';
//     }else{
//       cond = '#f00';
//     }

//     table.push({
//       //amount: project.amount.toString(),
//       amount: dollar,
//       category: project.category?.name || 'Sin Categoria',
//       client: project.client?.tradename || 'Sin cliente',
//       code: project.code,
//       date: project.date,
//       id: project._id,
//       project:project.title,
//       // status: project.status,
//       condition: cond,
//       percentage: p
//     })
//   });

//   return table;
// }

export function ProjectDataToTableDataMin(projects:ProjectMin[]){
  const table: ProjectsTable[] = [];
  projects.map((project) => {
    let p: string;
    if(project.progress){
      p = project.progress.toString() + '%';
    }else{
      p = '0%';
    }
    //La moneda mexicana lleva el mx antes del $
    // const dollar = CurrencyFormatter({
    //   currency: "MXN",
    //   value: project.amount
    // })

    // const total = CurrencyFormatter({
    //   currency: "MXN",
    //   value: project.amountotal
    // });
    const total = MoneyFormatter(project.amountotal);

    //se puede usar dolares si no se quiere el mx antes del $
    // const dollar = CurrencyFormatter({
    //   currency: "USD",
    //   value: project.amount
    // })
    const dollar = MoneyFormatter(project.amount);

    let cond: string;

    if(project.category){
      cond = project.category.color || '#f00';
    }else{
      cond = '#f00';
    }

    table.push({
      //amount: project.amount.toString(),
      // amount: dollar,
      amount: project.amount,
      category: project.category?.name || 'Sin Categoria',
      client: project.client?.name || 'Sin cliente',
      code: project.code,
      date: project.date,
      id: project._id,
      project:project.title,
      // status: project.status,
      condition: cond,
      percentage: p,
      imgProject: project.photo,
      account: project.account,
      // total: total
      total: project.amountotal
    })
  });

  return table;
}

export function ProjectEstimateDataToTableDataMin(projects:IProjectWithEstimateMin[]){
  const table: ProjectsTable[] = [];
  projects.map((project) => {
    let p: string;
    if(project.porcentage){
      p = project.porcentage.toString() + '%';
    }else{
      p = '0%';
    }
    
    let cond: string;

    if(project?.projectInfoStatusInfo?.color){
      cond = project.projectInfoStatusInfo.color || '#f00';
    }else{
      cond = '#f00';
    }

    table.push({
      amount: project.amount,
      category: project.projectInfoStatusInfo.name,
      client: project.client || 'Sin cliente',
      code: 'codigo',
      date: 'fecha',
      id: project._id,
      project:project.title,
      // status: project.status,
      condition: cond,
      percentage: p,
      imgProject: '/img/projects/default.svg',
      account: project.account,
      // total: total
      total: project.amountotal
    })
  });

  return table;
}

export function ProjectBudgetDataToTableDataMin(budgets:BudgetMin[]){
  const table: ProjectsBudgetTable[] = [];
  budgets.map((budget) => {
    let p: string;
    if(budget.progressAverage){
      p = budget.progressAverage.toString() + '%';
    }else{
      p = '0%';
    }
    //p='0%';
    //La moneda mexicana lleva el mx antes del $
    const dollar = MoneyFormatter(budget.pending);

    // const amountBudget = MoneyFormatter(budget.amount);

    // const budgeted = MoneyFormatter(budget.budgeted);
    
    table.push({
      //amount: budget.amount.toString(),
      // pending: dollar,
      pending: budget.pending,
      id: budget._id,
      project: {
        budget: budget.title,
        project: budget.project.photo
      },
      status: budget.status,
      //condition: cond,
      percentage: p,
      // amountBudget: amountBudget,
      amountBudget: budget.amount,
      //segment: budget.category?.name
      segment: budget.lastmove.condition.name,
      color: budget.lastmove.condition.color,
      // budgeted
      budgeted: budget.budgeted
    })
  });

  return table;
}

export function BudgetDataToTableCostCenter(budget:FullBudget){
  const table: BudgetTableCostCenter[] = [];
  
  budget.newbudget.map((newB) => {
    let p: string;
    if(newB.percent){
      p = newB.percent.toString() + '%';
    }else{
      p = '0%';
    }
    //p='0%';
    //La moneda mexicana lleva el mx antes del $
    const dollar = CurrencyFormatter({
      currency: "MXN",
      //value: budget.amount
      value: newB.cost
    })

    // const amountBudget = CurrencyFormatter({
    //   currency: "MXN",
    //   //value: budget.amount
    //   value: budget.amount
    // });
    
    table.push({
      //id: budget._id,
      id: newB._id,
      percentage: p,
      amount: dollar,
      category: {
        id: newB.costocenter.category._id,
        name: newB.costocenter.category.name        
      },
      concept: {
        id: newB.costocenter.concept._id,
        name: newB.costocenter.concept.name
      }
    })
  });

  return table;
}

export function ParseProjectToOneProjectMin(value: Project){
  try {
    const p = value.progress?.length > 0? value.progress[value.progress.length -1].progress: 0 || 0;
    // console.log('p => ', p);
    const projMin: OneProjectMin = {
      _id: value._id,
      account: value.account,
      amount: value.amount,
      category: value.condition[value.condition.length-1].glossary,
      client: value.client,
      code: value.code,
      company: value.company,
      date: value.date,
      description: value.description,
      guaranteefund: value.guaranteefund,
      hasguaranteefund: value.hasguaranteefund,
      location: value.location,
      photo: value.photo,
      progress: p,
      segment: value.category,
      status: value.status,
      title: value.title,
      type: value.glossary,
      hasamountChargeOff: value.hasamountChargeOff,
      amountChargeOff: value.amountChargeOff
    }
    return projMin;
  } catch (error) {
    console.log('errpr => ', error);
    return "Error al actualizar proyecto..."
  }
}
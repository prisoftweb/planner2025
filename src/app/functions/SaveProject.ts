//import { Provider } from "@/interfaces/Providers";
import { projectValidation } from "@/schemas/project.schema";
import { CreateProject } from "../api/routeProjects";
import { ProjectsTable, Project } from "@/interfaces/Projects";
import { CurrencyFormatter } from "./Globals";

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

export function ProjectDataToTableData(projects:Project[]){
  const table: ProjectsTable[] = [];
  projects.map((project) => {
    let p: string;
    if(project.progress && project.progress.length > 0){
      if(project.progress[project.progress.length - 1].progress){
        p = project.progress[project.progress.length - 1].progress.toString() + '%';
      }else{
        p = '0%';
      }
    }else{
      p = '0%';
    }
    //La moneda mexicana lleva el mx antes del $
    const dollar = CurrencyFormatter({
      currency: "MXN",
      value: project.amount
    })
    //se puede usar dolares si no se quiere el mx antes del $
    // const dollar = CurrencyFormatter({
    //   currency: "USD",
    //   value: project.amount
    // })

    let cond: string;

    if(project.condition.length > 0){
      cond = project.condition[project.condition.length - 1].glossary.color || '#f00';
    }else{
      cond = '#f00';
    }

    table.push({
      //amount: project.amount.toString(),
      amount: dollar,
      category: project.category?.name || 'Sin Categoria',
      client: project.client?.tradename || 'Sin cliente',
      code: project.code,
      date: project.date,
      id: project._id,
      project:project.title,
      // status: project.status,
      condition: cond,
      percentage: p
    })
  });

  return table;
}
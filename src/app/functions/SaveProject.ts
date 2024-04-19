//import { Provider } from "@/interfaces/Providers";
import { projectValidation } from "@/schemas/project.schema";
import { CreateProject } from "../api/routeProjects";

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
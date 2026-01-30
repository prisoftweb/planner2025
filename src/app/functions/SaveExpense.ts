import { CreateCost } from "../api/routeCost";

export default async function SaveExpense(data: Object, token:string){
 const newObj = Object.fromEntries(Object.entries(data).filter(value => value[1]));

  try {
    const res = await CreateCost(token, newObj);
    return res;
  } catch (error) {
    return 'Error al guardar costo!!';
  }
  
}
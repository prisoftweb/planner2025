import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
// import { getAllCostsByCondition } from "../api/routeCost";
import ContainerClient from "@/components/expenses/ContainerClient";
import { getAllCostsByCondition, getAllCostsByUserAdmin, getAllCostsByUserNormal } from "@/app/api/routeCost";
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";


export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // const role = user.rol?.name || '';
  // const isViewReports = role.toLowerCase().includes('residente')? false: true;
  const isViewReports = false;
  
  // let expenses: Expense[] = [];
  // try {
  //   expenses = await GetCostsByUserMIN(token, user._id);
  //   if(typeof(expenses)=== 'string')
  //     return <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
  // } catch (error) {
  //   console.log('page expanses ', error);
  //   return <h1 className="text-lg text-red-500 text-center">Error al obtener costos!!</h1>
  // }

  const role = user.rol?.name || '';
  // const isViewReports = role.toLowerCase().includes('residente')? false: true;
  
  let expenses: Expense[] = [];
  try {
    if(role.toLowerCase().includes('admin')){
      // expenses = await getAllCostsByCondition(token);
      expenses = await getAllCostsByUserAdmin(token);
      console.log('expenses result admin => ', expenses);
    }else{
      expenses = await getAllCostsByUserNormal(token, user._id);
    }
    if(typeof(expenses)=== 'string')
      return <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
  } catch (error) {
    console.log('page expanses ', error);
    return <h1 className="text-lg text-red-500 text-center">Error al obtener costos!!</h1>
  }

  const table: ExpensesTable[] = ExpenseDataToTableData(expenses);

  return(
    <>
      <Navigation user={user} />
      <ContainerClient data={table} expenses={expenses}
        token={token} user={user} isViewReports={isViewReports} isViewUser={true} />
    </>
  )
}
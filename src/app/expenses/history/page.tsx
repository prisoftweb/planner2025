import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import { GetCostsMIN } from "../../api/routeCost";

import ContainerClient from "@/components/expenses/ContainerClient";
import { ExpenseDataToTableData } from "../../functions/CostsFunctions";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const role = user.rol?.name || '';
  const isViewReports = role.toLowerCase().includes('residente')? false: true;

  let expenses: Expense[] = [];
  try {
    expenses = await GetCostsMIN(token);
    if(typeof(expenses)=== 'string')
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
        </>
      )
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-lg text-red-500 text-center">Error al obtener costos!!</h1>
      </>
    )
  }

  const d = new Date();
  const dIni = new Date(d.getFullYear(), d.getMonth(), 1);

  const expensesFil= expenses.filter((e) => new Date(e.date).getTime() >= dIni.getTime() && new Date(e.date).getTime() <= d.getTime())

  const table: ExpensesTable[] = ExpenseDataToTableData(expensesFil);

  return(
    <>
      <Navigation user={user} />
      <ContainerClient data={table} expenses={expenses}
        token={token} user={user} isViewReports={isViewReports} 
        isHistory={true} />
    </>
  )
}

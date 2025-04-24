import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import ContainerClient from "@/components/expenses/ContainerClient";
import { getAllCostsByUserAdmin, getAllCostsByUserNormal } from "@/app/api/routeCost";
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const isViewReports = false;
  
  const role = user.rol?.name || '';
  
  let expenses: Expense[] = [];
  if(role.toLowerCase().includes('admin')){
    expenses = await getAllCostsByUserAdmin(token);
  }else{
    expenses = await getAllCostsByUserNormal(token, user._id);
  }
  
  if(typeof(expenses)=== 'string')
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
        </div>
      </>
    )

  const table: ExpensesTable[] = ExpenseDataToTableData(expenses);

  return(
    <>
      <Navigation user={user} />
      <ContainerClient data={table} expenses={expenses}
        token={token} user={user} isViewReports={isViewReports} isViewUser={true} />
    </>
  )
}
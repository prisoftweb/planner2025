import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import ContainerClient from "@/components/expenses/ContainerClient";
import { getAllCostsByUserNormal, getAllCostsAndNE3ConditionsMIN } from "@/app/api/routeCost";
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // const isViewReports = false;
  
  const role = user.rol?.name || '';

  const isViewReports = role.toLowerCase().includes('residente')? false: true;

  const [resresource] = await Promise.all([
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  let expenses: Expense[] = [];
  if(role.toLowerCase().includes('admin')){
    // expenses = await getAllCostsByUserAdmin(token);
    expenses = await getAllCostsAndNE3ConditionsMIN(token);
  }else{
    expenses = await getAllCostsByUserNormal(token, user._id);
    // expenses = await getAllCostsAndNE3ConditionsMIN(token);
  }
  
  if(typeof(expenses)=== 'string')
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
        </div> */}
        <ComponentError page="/expenses/pending" message={expenses} />
      </>
    )

  const table: ExpensesTable[] = ExpenseDataToTableData(expenses);

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <ContainerClient data={table} expenses={expenses} company={user.profile}
        token={token} user={user} isViewReports={isViewReports} isViewUser={true} />
    </>
  )
}
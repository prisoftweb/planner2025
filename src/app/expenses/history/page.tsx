import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import { GetCostsMIN } from "../../api/routeCost";
import ContainerClient from "@/components/expenses/ContainerClient";
import { ExpenseDataToTableData } from "../../functions/CostsFunctions";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const role = user.rol?.name || '';
  const isViewReports = role.toLowerCase().includes('residente')? false: true;

  // let expenses: Expense[] = await GetCostsMIN(token);

  const [expenses, resresource, rescomponents] = await Promise.all([
    GetCostsMIN(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'expenses', 'history'),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/catalogs`} message={rescomponents} />
      </>
    )
  }
  
  if(typeof(expenses)=== 'string')
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
        </div> */}
        <ComponentError page="/expenses/history" message={expenses} />
      </>
    )

  const d = new Date();
  const dIni = new Date(d.getFullYear(), d.getMonth(), 1);

  const expensesFil= expenses.filter((e: Expense) => new Date(e.date).getTime() >= dIni.getTime() && new Date(e.date).getTime() <= d.getTime())

  const table: ExpensesTable[] = ExpenseDataToTableData(expensesFil);

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <ContainerClient data={table} expenses={expenses}
        token={token} user={user} isViewReports={isViewReports} 
        isHistory={true} company={user.profile} permissions={result} />
    </>
  )
}

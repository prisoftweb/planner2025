import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import { getAllCostsByConditionAndUser } from "../api/routeCost";
import ContainerClient from "@/components/expenses/ContainerClient";
import { ExpenseDataToTableData } from "../functions/CostsFunctions";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const role = user.rol?.name || '';
  const isViewReports = role.toLowerCase().includes('residente')? false: true;
  
  // let expenses: Expense[] = await getAllCostsByConditionAndUser(token, user._id);

  const [expenses, resresource, rescomponents] = await Promise.all([
    getAllCostsByConditionAndUser(token, user._id),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'expenses', ''),
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
        <ComponentError page="/expenses" message={expenses} />
      </>
    )

  const table: ExpensesTable[] = ExpenseDataToTableData(expenses);

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <ContainerClient data={table} expenses={expenses} permissions={result}
        token={token} user={user} isViewReports={isViewReports} company={user.profile} />
    </>
  )
}
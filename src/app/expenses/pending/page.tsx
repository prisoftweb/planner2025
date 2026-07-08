import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import ContainerClient from "@/components/expenses/ContainerClient";
import { getAllCostsByUserNormal, getAllCostsAndNE3ConditionsMIN } from "@/app/api/routeCost";
import { ExpenseDataToTableData } from "@/app/functions/CostsFunctions";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // const isViewReports = false;
  
  const role = user.rol?.name || '';

  const isViewReports = role.toLowerCase().includes('residente')? false: true;

  const [resresource, rescomponents] = await Promise.all([
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

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <ContainerClient data={table} expenses={expenses} company={user.profile} permissions={result}
        token={token} user={user} isViewReports={isViewReports} isViewUser={true} />
    </>
  )
}
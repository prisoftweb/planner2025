import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import ButtonNew from "@/components/expenses/ButtonNew";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import { getAllCostsByCondition } from "../api/routeCost";
import ContainerClient from "@/components/expenses/ContainerClient";
import { ExpenseDataToTableData } from "../functions/CostsFunctions";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const role = user.rol?.name || '';
  const isViewReports = role.toLowerCase().includes('residente')? false: true;
  
  let expenses: Expense[] = [];
  try {
    expenses = await getAllCostsByCondition(token);
    if(typeof(expenses)=== 'string')
      return <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
  } catch (error) {
    console.log('page expanses ', error);
    return <h1 className="text-lg text-red-500 text-center">Error al obtener costos!!</h1>
  }

  // let optConditions: Options[] = [];
  // try {
  //   optConditions = await getCatalogsByNameAndCondition(token, 'cost');
  //   if(typeof(optConditions)==='string') return <h1 className="text-red-500 text-center text-lg">{optConditions}</h1>
  // } catch (error) {
  //   return <h1>Error al consultar catalogos!!</h1>
  // }

  // const idValidado = optConditions.find((cond) => cond.label.toLowerCase().includes('validado'))?.value || '';
  //const idValidado = '';
  //let labour:string = '';
  //let ticket:string = '';

  //labour = optCategories.find((cat) => cat.label.toLowerCase().includes('mano de obra'))?.value || '';
  //ticket = optCategories.find((cat) => cat.label.toLowerCase().includes('ticket'))?.value || '';

  //labour = '';
  //ticket = '';

  // if(!expenses || expenses.length <= 0){
  //   return (
  //     <>
  //       <Navigation user={user} />
  //       <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
  //         <WithOut img="/img/costs/gastos.svg" subtitle="Gastos"
  //           text="Agrega el costo de mano de obra,
  //                 caja chica o proveedor desde esta
  //                 seccion a un determinado proyecto"
  //           title="Gastos">
  //             <ButtonNew token={token} user={user} />
  //         </WithOut>
  //       </div>
  //     </>
  //   )
  // }

  const table: ExpensesTable[] = ExpenseDataToTableData(expenses);

  return(
    <>
      <Navigation user={user} />
      <ContainerClient data={table} expenses={expenses}
        token={token} user={user} isViewReports={isViewReports} />
    </>
  )
}
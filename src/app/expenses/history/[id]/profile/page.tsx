import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import Header from "@/components/HeaderPage";
import { GetCostMIN, GetCostsLV } from "@/app/api/routeCost";
import ExpenseClient from "@/components/expenses/ExpenseClient";
import { OneExpense } from "@/interfaces/Expenses";
import NavTabExpense from "@/components/expenses/NavTabExpense";
import { CurrencyFormatter } from "@/app/functions/Globals";

export default async function Page({ params }: { params: { id: string, idProv:string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let cost: OneExpense;
  try {
    cost = await GetCostMIN(token, params.id);
    if(typeof(cost) === "string")
      return <h1 className="text-center text-red-500">{cost}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del Costo!!</h1>  
  }

  let options: Options[] = [];
  try {
    options = await GetCostsLV(token);
    if(typeof(options) === "string")
      return <h1 className="text-center text-red-500">{options}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los costos!!</h1>  
  }


  const subTotal = CurrencyFormatter({
    currency: "MXN",
    value: cost.cost.subtotal
  });

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={subTotal} previousPage="/expenses/history">
          <Selectize options={options} routePage="expenses/history" subpath="/profile" />
        </Header>
        <NavTabExpense idExp={params.id} tab="1" pending={0} idProv={params.idProv} />
        <NextUiProviders>
          <ExpenseClient expense={cost} id={params.id} token={token} 
              user={user._id} isHistory={true}/>
        </NextUiProviders>
      </div>
    </>
  )
}
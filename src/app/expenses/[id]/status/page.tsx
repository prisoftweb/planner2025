import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import HeaderProfileExpense from "@/components/expenses/HeaderProfileExpense";
import { GetCostMIN, GetCostsLVByCond } from "@/app/api/routeCost";
// import ExpenseClient from "@/components/expenses/ExpenseClient";
import ExpenseStatusClient from "@/components/expenses/ExpenseStatusClient";
import { OneExpense } from "@/interfaces/Expenses";
import NavTabExpense from "@/components/expenses/NavTabExpense";
import { CurrencyFormatter } from "@/app/functions/Globals";

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { prov: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  // console.log('search params', searchParams);

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
    // options = await GetCostsLV(token);
    options = await GetCostsLVByCond(token);
    if(typeof(options) === "string")
      return <h1 className="text-center text-red-500">{options}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los costos!!</h1>  
  }

  const subTotal = CurrencyFormatter({
    currency: "MXN",
    value: cost.cost?.subtotal || 0
  });

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <HeaderProfileExpense options={options} subTotal={subTotal} idProv={searchParams.prov} />
        <NavTabExpense idExp={params.id} tab="5" />
        <NextUiProviders>
          <ExpenseStatusClient expense={cost} id={params.id} token={token} user={user._id}/>
        </NextUiProviders>
      </div>
    </>
  )
}
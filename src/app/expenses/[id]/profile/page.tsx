import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import HeaderProfileExpense from "@/components/expenses/HeaderProfileExpense";
import { GetCostMIN, GetCostsLVByCond } from "@/app/api/routeCost";
import ExpenseClient from "@/components/expenses/ExpenseClient";
import { OneExpense } from "@/interfaces/Expenses";
import NavTabExpense from "@/components/expenses/NavTabExpense";
import { CurrencyFormatter } from "@/app/functions/Globals";

export default async function Page({ params, searchParams }: 
    { params: { id: string }, searchParams: { prov: string, status:string, project:string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const previous = searchParams?.status==='pending' ? 1: 0;

  let cost: OneExpense = await GetCostMIN(token, params.id);
  let options: Options[] = await GetCostsLVByCond(token);
  
  if(typeof(cost) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{cost}</h1>
        </div>
      </>
    )
  
  if(typeof(options) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{options}</h1>
        </div>
      </>
    )

  const subTotal = CurrencyFormatter({
    currency: "MXN",
    value: cost.cost?.subtotal || 0
  });

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <HeaderProfileExpense options={options} subTotal={subTotal}
          idProv={searchParams.prov} pending={previous} idProj={searchParams.project} />
        <NavTabExpense idExp={params.id} tab="1" pending={previous} idProv={searchParams.prov} 
          idProj={searchParams.project}  />
        <NextUiProviders>
          <ExpenseClient expense={cost} id={params.id} token={token} user={user._id}/>
        </NextUiProviders>
      </div>
    </>
  )
}
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import HeaderProfileExpense from "@/components/expenses/HeaderProfileExpense";
import { GetCostMIN, GetCostsLVByCond } from "@/app/api/routeCost";
import ExpenseStatusClient from "@/components/expenses/ExpenseStatusClient";
import NavTabExpense from "@/components/expenses/NavTabExpense";
import { CurrencyFormatter } from "@/app/functions/Globals";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params, searchParams }: 
    { params: { id: string }, searchParams: { prov: string, status:string, project:string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  const [cost, options, resresource] = await Promise.all([
    GetCostMIN(token, params.id),
    GetCostsLVByCond(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  if(typeof(cost) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{cost}</h1>
        </div> */}
        <ComponentError page={`/expenses/${params.id}/status`} message={cost} />
      </>
    )
  
  if(typeof(options) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{options}</h1> */}
        <ComponentError page={`/expenses/${params.id}/status`} message={options} />
      </>
    )

  const subTotal = CurrencyFormatter({
    currency: "MXN",
    value: cost.cost?.subtotal || 0
  });

  // const previous = searchParams?.status==='pending' ? 1: 0;
  const previous = searchParams?.status==='pending' ? 1: searchParams?.status==='concept'? 2: 0;

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <HeaderProfileExpense options={options} subTotal={subTotal} idProv={searchParams.prov} 
          pending={previous} idProj={searchParams.project} />
        <NavTabExpense idExp={params.id} tab="5" pending={previous} 
          idProv={searchParams.prov} idProj={searchParams.project} />
        <NextUiProviders>
          <ExpenseStatusClient expense={cost} id={params.id} token={token} user={user._id}/>
        </NextUiProviders>
      </div>
    </>
  )
}
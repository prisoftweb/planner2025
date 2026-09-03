import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import HeaderProfileExpense from "@/components/expenses/HeaderProfileExpense";
import { GetCostMIN, GetCostsLVByCond } from "@/app/api/routeCost";
import ExpenseClient from "@/components/expenses/ExpenseClient";
import NavTabExpense from "@/components/expenses/NavTabExpense";
import { CurrencyFormatter } from "@/app/functions/Globals";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page({ params, searchParams }: 
    { params: { id: string }, searchParams: { prov: string, status:string, project:string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // const previous = searchParams?.status==='pending' ? 1: 0;
  const previous = searchParams?.status==='pending' ? 1: searchParams?.status==='concept'? 2: 0;

  const [cost, options, resresource, rescomponents] = await Promise.all([
    GetCostMIN(token, params.id),
    GetCostsLVByCond(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'expenses', 'id/profile'),
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
  
  if(typeof(cost) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{cost}</h1>
        </div> */}
        <ComponentError page={`/expenses/${params.id}/profile`} message={cost} />
      </>
    )
  
  if(typeof(options) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{options}</h1>
        </div> */}
        <ComponentError page={`/expenses/${params.id}/profile`} message={options} />
      </>
    )

  const subTotal = CurrencyFormatter({
    currency: "USD",
    value: cost.cost?.subtotal || 0
  });

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <HeaderProfileExpense options={options} subTotal={subTotal}
          idProv={searchParams.prov} pending={previous} idProj={searchParams.project} />
        <NavTabExpense idExp={params.id} tab="1" pending={previous} idProv={searchParams.prov} 
          idProj={searchParams.project}  />
        <NextUiProviders>
          <ExpenseClient expense={cost} id={params.id} token={token} user={user._id} permissions={result} />
        </NextUiProviders>
      </div>
    </>
  )
}
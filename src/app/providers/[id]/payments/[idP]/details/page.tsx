//import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { getProvider, getProviders, GetCostsMIN } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import { DetailExpensesTableProvider, ExpensesTableProvider, Provider } from "@/interfaces/Providers";
import { ExpenseDataToTableDetailExpensesProviderData } from "@/app/functions/providersFunctions";
import ContainerTableDetailsExpenseProvider from "@/components/providers/ContainerTableDetailsExpenseProvider";
// import { Expense } from "@/interfaces/Expenses";
import { CostPayment, OnePayment } from "@/interfaces/Payments";
import { getCostsPayment, getPayment } from "@/app/api/routePayments";

export default async function Page({ params }: { params: { id: string, idP: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let provider: any;
  try {
    provider = await getProvider(params.id, token);
    if(typeof(provider) === "string")
      return <h1 className="text-center text-red-500">{provider}provedor</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proveedor!!</h1>  
  }

  let providers: Provider[];
  try {
    providers = await getProviders(token);
    if(typeof(providers) === "string")
      return <h1 className="text-center text-red-500">{providers} provedores</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los proveedores!!</h1>  
  }

  let costs: CostPayment[];
  try {
    costs = await getCostsPayment(token, params.idP);
    if(typeof(costs) === "string")
      return <h1 className="text-center text-red-500">{costs} costos</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener costos del pago!!</h1>  
  }

  let payment: OnePayment;
  try {
    payment = await getPayment(token, params.idP);
    if(typeof(payment) === "string")
      return <h1 className="text-center text-red-500">{payment} one payment</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del pago!!</h1>  
  }

  if(providers.length <= 0){
    return <h1 className="text-center text-red-500">Error al obtener proveedores...</h1>
  }

  // const arrCosts : Expense[] = [];
  // arrCosts.push(costs);

  
  // console.log('expenses one', JSON.stringify(costs[0]));
  // console.log('pay => ', JSON.stringify(costs[0].costs.pay));

  const table: DetailExpensesTableProvider[] = ExpenseDataToTableDetailExpensesProviderData(costs);
  // const table: DetailExpensesTableProvider[] = [];
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <ContainerTableDetailsExpenseProvider data={table} expenses={costs} token={token}
          user={user} provider={provider} payment={payment} />
      </div>
    </>
  )
}
import { getBudget } from "@/app/api/routeBudget"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { FullBudget } from "@/interfaces/BudgetProfile";
import BudgetCli from "@/components/projects/budget/BudgetClient";

export default async function page({ params }: { params: { id: string }}) {
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let budget: FullBudget;
  try {
    budget = await getBudget(token, params.id);
    if(typeof(budget)==='string'){
      return <h1 className="text-red-500 text-center">{budget}</h1>
    }
  } catch (error) {
    return <h1 className="text-red-500 text-center">Ocurrio un problema al consultar presupuesto!!</h1>
  }
  
  return (
    <>
      <Navigation user={user} />
      <BudgetCli budget={budget} id={params.id} token={token} />
    </>
  )
}
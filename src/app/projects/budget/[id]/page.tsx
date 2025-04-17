import { getBudget } from "@/app/api/routeBudget"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { FullBudget } from "@/interfaces/BudgetProfile";
import BudgetCli from "@/components/projects/budget/BudgetClient";
import { CostCenter } from "@/interfaces/CostCenter";
import { getCostoCenters } from "@/app/api/routeCostCenter";

export default async function page({ params, searchParams }: 
  { params: { id: string }, searchParams: { project: string }}) {
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let budget: FullBudget;
  try {
    budget = await getBudget(token, params.id);
    if(typeof(budget)==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-center">{budget}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-center">Ocurrio un problema al consultar presupuesto!!</h1>
      </>
    )
  }

  let costoCenters: CostCenter[] = [];
  
  try {
    costoCenters = await getCostoCenters(token);
    if(typeof(costoCenters)==='string'){
      return(
        <>
          <Navigation user={user} />
          <p>{costoCenters}</p>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <p>Error al consultas los centros de costos!!!</p>
      </>
    )
  }
  
  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <BudgetCli budget={budget} id={params.id} token={token} 
          costoCenters={costoCenters} user={user._id} projectQuery={searchParams.project} />
      </div>
    </>
  )
}
import { getBudget } from "@/app/api/routeBudget"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { FullBudget } from "@/interfaces/BudgetProfile";
import BudgetCli from "@/components/projects/budget/BudgetClient";
//import Header from "@/components/HeaderPage";
import { CostoCenterLV, CostCenter } from "@/interfaces/CostCenter";
import { getCostoCentersLV, getCostoCenters } from "@/app/api/routeCostCenter";

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

  // let costoCenterLV: CostoCenterLV[] = [];
  
  // try {
  //   costoCenterLV = await getCostoCentersLV(token);
  //   if(typeof(costoCenterLV)==='string'){
  //     return <p>{costoCenterLV}</p>
  //   }
  // } catch (error) {
  //   return <p>Error al consultas los centros de costos!!!</p>
  // }

  let costoCenters: CostCenter[] = [];
  
  try {
    costoCenters = await getCostoCenters(token);
    if(typeof(costoCenters)==='string'){
      return <p>{costoCenters}</p>
    }
  } catch (error) {
    return <p>Error al consultas los centros de costos!!!</p>
  }
  
  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        {/* <Header title={budget.title} previousPage="/projects/budget">
          <></>
        </Header> */}
        <BudgetCli budget={budget} id={params.id} token={token} 
          costoCenters={costoCenters} user={user._id} />
      </div>
    </>
  )
}
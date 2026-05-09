import { getBudget } from "@/app/api/routeBudget"
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import BudgetCli from "@/components/projects/budget/BudgetClient";
import { getCostoCenters } from "@/app/api/routeCostCenter";

export default async function page({ params, searchParams }: 
  { params: { id: string }, searchParams: { project: string }}) {
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [budget, costoCenters] = await Promise.all([
    getBudget(token, params.id),
    getCostoCenters(token)
  ]);
  
  if(typeof(budget)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <h1 className="text-red-500 text-center">{budget}</h1>
      </>
    )
  }
  
  if(typeof(costoCenters)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <p>{costoCenters}</p>
      </>
    )
  }
  
  return (
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <BudgetCli budget={budget} id={params.id} token={token} 
          costoCenters={costoCenters} user={user._id} projectQuery={searchParams.project} />
      </div>
    </>
  )
}
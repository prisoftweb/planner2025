import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { ClientBack } from "@/interfaces/Clients";
import { getClients } from "@/app/api/routeClients";
import { GetProject, getProjects } from "@/app/api/routeProjects";
import { Project } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import NavTabProject from "@/components/projects/NavTabProject";
import ProjectCli from "@/components/projects/ProjectClient";
import Header from "@/components/HeaderPage";

import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "@/app/api/routeCatalogs";

import { GetCost, GetCosts } from "@/app/api/routeCost";
import ExpenseClient from "@/components/expenses/ExpenseClient";
import { Expense } from "@/interfaces/Expenses";
import NavTabExpense from "@/components/expenses/NavTabExpense";
import { CostCenter } from "@/interfaces/CostCenter";
import { getCostCenters } from "@/app/api/routeCostCenter";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let project: Project;
  // try {
  //   project = await GetProject(token, params.id);
  //   if(typeof(project) === "string")
  //     return <h1 className="text-center text-red-500">{project}</h1>
  // } catch (error) {
  //   return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proyecto!!</h1>  
  // }

  // let projects: Project[];
  // try {
  //   projects = await getProjects(token);
  //   if(typeof(projects) === "string")
  //     return <h1 className="text-center text-red-500">{projects}</h1>
  // } catch (error) {
  //   return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los proyectos!!</h1>  
  // }

  // let options: Options[] = [];

  // if(projects.length <= 0){
  //   return <h1 className="text-center text-red-500">Error al obtener proyectos...</h1>
  // }

  // projects.map((proj) => {
  //   options.push({
  //     value: proj._id,
  //     label: proj.title,
  //   })
  // })

  let cost: Expense;
  try {
    cost = await GetCost(token, params.id);
    if(typeof(cost) === "string")
      return <h1 className="text-center text-red-500">{cost}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del Costo!!</h1>  
  }

  let costs: Expense[];
  try {
    costs = await GetCosts(token);
    if(typeof(costs) === "string")
      return <h1 className="text-center text-red-500">{costs}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los costos!!</h1>  
  }

  let options: Options[] = [];

  if(costs.length <= 0){
    return <h1 className="text-center text-red-500">Error al obtener costos...</h1>
  }

  costs.map((cos) => {
    options.push({
      value: cos._id,
      label: cos.description,
    })
  })

  let costcenters: CostCenter[];
  try {
    costcenters = await getCostCenters(token);
    if(typeof(costcenters)==='string'){
      return <h1 className="text-center text-lg text-red-500">{costcenters}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los centros de costos!!</h1>
  }

  const optCostCenter:Options[]= [];
  costcenters.map((costcenter) => {
    optCostCenter.push({
      label: costcenter.name,
      value: costcenter._id
    });
  });

  // let clients: ClientBack[];
  // try {
  //   clients = await getClients(token);
  //   if(typeof(clients)==='string') return <h1 className="text-red-500 text-center text-lg">{clients}</h1>
  // } catch (error) {
  //   return <h1>Error al consultar clientes!!</h1>
  // }

  // let catalogs: GlossaryCatalog[];
  // try {
  //   catalogs = await getCatalogsByName(token, 'projects');
  //   if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  // } catch (error) {
  //   return <h1>Error al consultar catalogos!!</h1>
  // }

  // const optClients: Options[] = [];
  // clients.map((client) => {
  //   optClients.push({
  //     label: client.name,
  //     value: client._id
  //   })
  // })

  // const optCategories: Options[] = [];
  // catalogs[0].categorys.map((category) => {
  //   optCategories.push({
  //     label: category.glossary.name,
  //     value: category.glossary._id
  //   })
  // })

  // const optTypes: Options[] = [];
  // catalogs[0].types.map((type) => {
  //   optTypes.push({
  //     label: type.glossary.name,
  //     value: type.glossary._id
  //   })
  // })

  // const optConditions: Options[] = [];
  // catalogs[0].condition.map((condition) => {
  //   optConditions.push({
  //     label: condition.glossary.name,
  //     value: condition.glossary._id
  //   })
  // })

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={cost.subtotal.toString()} previousPage="/expenses">
          <Selectize options={options} routePage="expenses" subpath="/profile" />
        </Header>
        <NavTabExpense idExp={params.id} tab="1" />
        <NextUiProviders>
          <ExpenseClient expense={cost} id={params.id} token={token} 
              user={user._id} optCostCenter={optCostCenter} />
        </NextUiProviders>
      </div>
    </>
  )
}
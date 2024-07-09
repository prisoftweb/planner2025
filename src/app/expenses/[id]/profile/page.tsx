import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { getProjects } from "@/app/api/routeProjects";
import { Project } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
import Selectize from "@/components/Selectize";
import Header from "@/components/HeaderPage";

import { GetCost, GetCostsLV } from "@/app/api/routeCost";
import ExpenseClient from "@/components/expenses/ExpenseClient";
import { Expense } from "@/interfaces/Expenses";
import NavTabExpense from "@/components/expenses/NavTabExpense";
import { CostCenter } from "@/interfaces/CostCenter";
import { getCostCenters } from "@/app/api/routeCostCenter";
import { Provider } from "@/interfaces/Providers";
import { getProviders } from "@/app/api/routeProviders";
import { getUsers } from "@/app/api/routeUser";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { getCatalogsByName } from "@/app/api/routeCatalogs";
import { GlossaryCatalog } from "@/interfaces/Glossary";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let cost: Expense;
  try {
    cost = await GetCost(token, params.id);
    if(typeof(cost) === "string")
      return <h1 className="text-center text-red-500">{cost}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del Costo!!</h1>  
  }

  let options: Options[] = [];
  try {
    options = await GetCostsLV(token);
    if(typeof(options) === "string")
      return <h1 className="text-center text-red-500">{options}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los costos!!</h1>  
  }

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
    costcenter.categorys.map((category) => {
      optCostCenter.push({
        label: category.name + ' ( ' + costcenter.name + ' ) ',
        value: category._id
      });
      //cat += category.name + ', ';
    })
  });

  let projects: Project[];
  try {
    projects = await getProjects(token);
    if(typeof(projects)==='string'){
      return <h1 className="text-center text-lg text-red-500">{projects}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
  }

  const optProjects:Options[]= [];
  projects.map((project) => {
    optProjects.push({
      label: project.title,
      value: project._id
    });
  });

  let responsibles: UsrBack[];
  try {
    responsibles = await getUsers(token);
    if(typeof(responsibles)==='string'){
      return <h1 className="text-center text-lg text-red-500">{responsibles}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los usuarios!!</h1>
  }

  const optResponsibles:Options[]= [];
  responsibles.map((responsible) => {
    optResponsibles.push({
      label: responsible.name,
      value: responsible._id
    });
  });

  let providers: Provider[];
  try {
    providers = await getProviders(token);
    if(typeof(providers)==='string'){
      return <h1 className="text-center text-lg text-red-500">{providers}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores!!</h1>
  }

  const optProviders:Options[]= [];
  providers.map((provider) => {
    optProviders.push({
      label: provider.name,
      value: provider._id
    });
  });

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'cost');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }

  const optCategories: Options[] = [];
  //const optCategories: Options[] = [];
  catalogs[0].categorys.map((category) => {
    optCategories.push({
      label: category.glossary.name,
      value: category.glossary._id
    })
  })

  const optTypes: Options[] = [];
  //const optTypes: Options[] = [];
  catalogs[0].types.map((type) => {
    optTypes.push({
      label: type.glossary.name,
      value: type.glossary._id
    })
  })

  // const optConditions: Options[] = [];
  // //const optConditions: Options[] = [];
  // catalogs[0].condition.map((condition) => {
  //   optConditions.push({
  //     label: condition.glossary.name,
  //     value: condition.glossary._id
  //   })
  // })

  const subTotal = CurrencyFormatter({
    currency: "MXN",
    value: cost.cost.subtotal
  });

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title={subTotal} previousPage="/expenses">
          <Selectize options={options} routePage="expenses" subpath="/profile" />
        </Header>
        <NavTabExpense idExp={params.id} tab="1" />
        <NextUiProviders>
          <ExpenseClient expense={cost} id={params.id} token={token} 
              user={user._id} optCostCenter={optCostCenter} 
              optProjects={optProjects} optProviders={optProviders} optResponsibles={optResponsibles}
              optCategories={optCategories} optTypes={optTypes}
          />
        </NextUiProviders>
      </div>
    </>
  )
}
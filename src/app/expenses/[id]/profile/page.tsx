import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import { getProjectsLV } from "@/app/api/routeProjects";
//import { Project } from "@/interfaces/Projects";
import { Options } from "@/interfaces/Common";
import { NextUiProviders } from "@/components/NextUIProviderComponent";
import Navigation from "@/components/navigation/Navigation";
//import Selectize from "@/components/Selectize";
//import Header from "@/components/HeaderPage";
import HeaderProfileExpense from "@/components/expenses/HeaderProfileExpense";

import { GetCostMIN, GetCostsLV } from "@/app/api/routeCost";
import ExpenseClient from "@/components/expenses/ExpenseClient";
import { OneExpense } from "@/interfaces/Expenses";
import NavTabExpense from "@/components/expenses/NavTabExpense";
import { CostoCenterLV } from "@/interfaces/CostCenter";
import { getCostoCentersLV } from "@/app/api/routeCostCenter";
//import { Provider } from "@/interfaces/Providers";
import { getProvidersLV } from "@/app/api/routeProviders";
import { getUsersLV } from "@/app/api/routeUser";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { getCatalogsByNameAndCategory, getCatalogsByNameAndType } from "@/app/api/routeCatalogs";
//import { GlossaryCatalog } from "@/interfaces/Glossary";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let cost: OneExpense;
  try {
    cost = await GetCostMIN(token, params.id);
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

  let costcenters: CostoCenterLV[];
  try {
    costcenters = await getCostoCentersLV(token);
    if(typeof(costcenters)==='string'){
      return <h1 className="text-center text-lg text-red-500">{costcenters}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los centros de costos!!</h1>
  }

  const optCostCenter:Options[]= [];
  // costcenters.map((costcenter) => {
  //   costcenter.categorys.map((category) => {
  //     optCostCenter.push({
  //       //label: category.name + ' ( ' + costcenter.name + ' ) ',
  //       label: category.concept?.name + ' ( ' + costcenter.name + ' ) ' || 'sin categoria',
  //       //value: category.concept._id
  //       value: costcenter._id + '/' + category.concept._id
  //     });
  //     //cat += category.name + ', ';
  //   })
  // });
  costcenters.map((costcenter) => {
    optCostCenter.push({
      // label: category.name + ' ( ' + costcenter.name + ' ) ',
      label: costcenter.label || 'sin categoria',
      value: costcenter.categoryid + '/' + costcenter.value
    });
  });

  //let projects: Project[];
  let optProjects:Options[]= [];
  try {
    optProjects = await getProjectsLV(token);
    if(typeof(optProjects)==='string'){
      return <h1 className="text-center text-lg text-red-500">{optProjects}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
  }

  // const optProjects:Options[]= [];
  // projects.map((project) => {
  //   optProjects.push({
  //     label: project.title,
  //     value: project._id
  //   });
  // });

  //let responsibles: UsrBack[];
  let optResponsibles:Options[]= [];
  try {
    optResponsibles = await getUsersLV(token);
    if(typeof(optResponsibles)==='string'){
      return <h1 className="text-center text-lg text-red-500">{optResponsibles}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los usuarios!!</h1>
  }

  // const optResponsibles:Options[]= [];
  // responsibles.map((responsible) => {
  //   optResponsibles.push({
  //     label: responsible.name,
  //     value: responsible._id
  //   });
  // });

  //let providers: Provider[];
  let optProviders:Options[]= [];
  try {
    optProviders = await getProvidersLV(token);
    if(typeof(optProviders)==='string'){
      return <h1 className="text-center text-lg text-red-500">{optProviders}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los proveedores!!</h1>
  }

  // const optProviders:Options[]= [];
  // providers.map((provider) => {
  //   optProviders.push({
  //     label: provider.name,
  //     value: provider._id
  //   });
  // });

  // let catalogs: GlossaryCatalog[];
  // try {
  //   catalogs = await getCatalogsByName(token, 'cost');
  //   if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  // } catch (error) {
  //   return <h1>Error al consultar catalogos!!</h1>
  // }

  // const optCategories: Options[] = [];
  // //const optCategories: Options[] = [];
  // catalogs[0].categorys.map((category) => {
  //   optCategories.push({
  //     label: category.glossary.name,
  //     value: category.glossary._id
  //   })
  // })

  // const optTypes: Options[] = [];
  // //const optTypes: Options[] = [];
  // catalogs[0].types.map((type) => {
  //   optTypes.push({
  //     label: type.glossary.name,
  //     value: type.glossary._id
  //   })
  // })

  // const optConditions: Options[] = [];
  // //const optConditions: Options[] = [];
  // catalogs[0].condition.map((condition) => {
  //   optConditions.push({
  //     label: condition.glossary.name,
  //     value: condition.glossary._id
  //   })
  // })

  let optCategories: Options[] = [];
  try {
    optCategories = await getCatalogsByNameAndCategory(token, 'cost');
    if(typeof(optCategories)==='string') return <h1 className="text-red-500 text-center text-lg">{optCategories}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }  

  let optTypes: Options[] = [];
  try {
    optTypes = await getCatalogsByNameAndType(token, 'cost');
    if(typeof(optTypes)==='string') return <h1 className="text-red-500 text-center text-lg">{optTypes}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }
  
  // let optConditions: Options[] = [];
  // try {
  //   optConditions = await getCatalogsByNameAndCondition(token, 'cost');
  //   if(typeof(optConditions)==='string') return <h1 className="text-red-500 text-center text-lg">{optConditions}</h1>
  // } catch (error) {
  //   return <h1>Error al consultar catalogos!!</h1>
  // }

  //console.log('cost min => ', cost);
  const subTotal = CurrencyFormatter({
    currency: "MXN",
    value: cost.cost?.subtotal || 0
  });

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        {/* <Header title={subTotal} previousPage="/expenses">
          <Selectize options={options} routePage="expenses" subpath="/profile" />
        </Header> */}
        <HeaderProfileExpense options={options} subTotal={subTotal} />
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
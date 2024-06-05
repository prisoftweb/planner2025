import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import { getCostCenters } from "../api/routeCostCenter";
import { CostCenter } from "@/interfaces/CostCenter";
import { Options } from "@/interfaces/Common";
import ButtonNew from "@/components/expenses/ButtonNew";
import { getProviders } from "../api/routeProviders";
import { Provider } from "@/interfaces/Providers";
import { getUsers } from "../api/routeUser";
import { getGlossaries } from "../api/routeGlossary";
import { Glossary } from "@/interfaces/Glossary";
import { getProjects } from "../api/routeProjects";
import { Project } from "@/interfaces/Projects";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
import TableExpenses from "@/components/expenses/TableExpenses";
import { GetCosts } from "../api/routeCost";
import Header from "@/components/Header";
import { CurrencyFormatter } from "../functions/Globals";
import { getCatalogsByName } from "../api/routeCatalogs";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { GetReports } from "../api/routeReports";
import { Report } from "@/interfaces/Reports";

export default async function Page() {
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  
  let expenses: Expense[] = [];
  try {
    expenses = await GetCosts(token);
    if(typeof(expenses)=== 'string')
      return <h1 className="text-lg text-red-500 text-center">{expenses}</h1>
  } catch (error) {
    return <h1 className="text-lg text-red-500 text-center">Error al obtener costos!!</h1>
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
  const optCostCenterDeductible:Options[] = [];
  costcenters.map((costcenter) => {
    //console.log(costcenter);
    if(costcenter.isnormal){
      costcenter.categorys.map((category) => {
        optCostCenterDeductible.push({
          label: category.name + ' ( ' + costcenter.name + ' ) ',
          value: category._id
        });
      })
    }
    costcenter.categorys.map((category) => {
      optCostCenter.push({
        label: category.name + ' ( ' + costcenter.name + ' ) ',
        value: category._id
      });
    })
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

  let glossaries: Glossary[];
  try {
    glossaries = await getGlossaries(token);
    if(typeof(glossaries)==='string'){
      return <h1 className="text-center text-lg text-red-500">{glossaries}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los catalogos!!</h1>
  }

  const optGlossaries:Options[]= [];
  glossaries.map((glossary) => {
    optGlossaries.push({
      label: glossary.name,
      value: glossary._id
    });
  });

  let reports: Report[];
  try {
    reports = await GetReports(token);
    if(typeof(reports)==='string'){
      return <h1 className="text-center text-lg text-red-500">{reports}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los reportes!!</h1>
  }

  const optReports:Options[]= [];
  const optReportsFilter:Options[] = [{
    label: 'TODOS',
    value: 'all'
  }]
  reports.map((rep) => {
    const r = {
      label: rep.name,
      value: rep._id
    }
    optReports.push(r);
    optReportsFilter.push(r);
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
  const optProjectFilter: Options[] = [{
    label: 'TODOS',
    value: 'all'
  }]
  projects.map((project) => {
    const p = {
      label: project.title,
      value: project._id
    }
    optProjects.push(p);
    optProjectFilter.push(p);
  });

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'cost');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }

  const optCategories: Options[] = [];
  const optCategoriesFilter: Options[] = [{
    label: 'TODOS',
    value: 'all'
  }];
  //const optCategories: Options[] = [];
  let labour:string = '';
  let ticket:string = '';
  catalogs[0].categorys.map((category) => {
    if(category.glossary.name.toLowerCase().includes('mano de obra')){
      labour = category.glossary._id;
    }
    if(category.glossary.name.toLowerCase().includes('ticket')){
      ticket = category.glossary._id;
    }
    const c = {
      label: category.glossary.name,
      value: category.glossary._id
    }
    optCategories.push(c);
    optCategoriesFilter.push(c);
  })

  const optTypes: Options[] = [];
  const optTypeFilter: Options[] = [{
    label: 'TODOS',
    value: 'all'
  }];
  //const optTypes: Options[] = [];
  catalogs[0].types.map((type) => {
    const t = {
      label: type.glossary.name,
      value: type.glossary._id
    };
    optTypes.push(t);
    optTypeFilter.push(t);
  })

  const optConditions: Options[] = [];
  const optConditionsFilter: Options[] = [{
    label: 'TODOS',
    value: 'all'
  }];
  //const optConditions: Options[] = [];
  catalogs[0].condition.map((condition) => {
    const c:Options = {
      label: condition.glossary.name,
      value: condition.glossary._id
    }
    optConditions.push(c);
    optConditionsFilter.push(c);
  })

  // console.log('catalogs => ', catalogs);
  // console.log('types => ', optTypes);
  // console.log('conditions => ', optConditions);
  // console.log('categories => ', optCategories);

  if(!expenses || expenses.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/costs/gastos.svg" subtitle="Gastos"
            text="Agrega el costo de mano de obra,
                  caja chica o proveedor desde esta
                  seccion a un determinado proyecto"
            title="Gastos">
              <ButtonNew token={token} user={user._id} optCostCenter={optCostCenter} 
                  optProviders={optProviders} optResponsibles={optResponsibles}
                  optGlossaries={optGlossaries} optProjects={optProjects} 
                  optCategories={optCategories} optConditions={optConditions}
                  optTypes={optTypes} projects={projects} reports={reports}
                  optReports={optReports} idLabour={labour} idTicket={ticket}
                  optCostCenterDeductible={optCostCenterDeductible}
              />
          </WithOut>
        </div>
      </>
    )
  }

  const table: ExpensesTable[] = [];

  expenses.map((expense) => {
    const dollar = CurrencyFormatter({
          currency: "MXN",
          value: expense.subtotal
        })
    table.push({
      id: expense._id,
      Descripcion: expense.description,
      Estatus: 'condition',
      Fecha: expense.date,
      Importe: dollar,
      Informe: expense.report?.name || 'sin reporte',
      Proveedor: expense.provider? expense.provider.name: 'sin proveedor',
      Proyecto: expense.project?.title || 'sin proyecto',
      Responsable: {
        responsible: expense.user.name,
        photo: expense.user.photo
      },
      condition: expense.condition.length > 0 ? expense.condition[expense.condition.length -1].glossary?.name: 'sin status'
    })
  })

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title="Gastos" >
        <ButtonNew token={token} user={user._id} optCostCenter={optCostCenter} 
                    optProviders={optProviders} optResponsibles={optResponsibles}
                    optGlossaries={optGlossaries} optProjects={optProjects} 
                    optCategories={optCategories} optConditions={optConditions}
                    optTypes={optTypes} projects={projects} reports={reports}
                    optReports={optReports} idLabour={labour} idTicket={ticket}
                    optCostCenterDeductible={optCostCenterDeductible}
        />
        </Header>
        <TableExpenses data={table} token={token} 
          optCategories={optCategoriesFilter} optConditions={optConditionsFilter}
          optTypes={optTypeFilter} expenses={expenses} optProjects={optProjectFilter}
          optReports={optReportsFilter}
        />
      </div>
    </>
  )
}
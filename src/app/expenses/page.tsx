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
import { getProjectsLV } from "../api/routeProjects";
//import { Project } from "@/interfaces/Projects";
import { ExpensesTable, Expense } from "@/interfaces/Expenses";
//import TableExpenses from "@/components/expenses/TableExpenses";
import { GetCosts, GetVatsLV, GetCostsGroupByProject, GetCostsGroupByType } from "../api/routeCost";
//import Header from "@/components/Header";
import { CurrencyFormatter } from "../functions/Globals";
import { getCatalogsByName } from "../api/routeCatalogs";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { GetReportsMin, GetReportsByUserMin } from "../api/routeReports";
import { ReportParse } from "@/interfaces/Reports";
import ContainerClient from "@/components/expenses/ContainerClient";
import { getTypeFiles } from "../functions/CostsFunctions";
import { ReportByProject, CostGroupByType } from "@/interfaces/ReportsOfCosts";

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
    console.log('page expanses ', error);
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
  const optCostCenterFilter:Options[]= [{
    label: 'TODOS',
    value: 'all'
  }];
  costcenters.map((costcenter) => {
    if(costcenter.isnormal){
      costcenter.categorys.map((category) => {
        optCostCenterDeductible.push({
          label: category.name + ' ( ' + costcenter.name + ' ) ',
          value: category._id
        });
      })
    }
    costcenter.categorys.map((category) => {
      const cat = {
        label: category.name + ' ( ' + costcenter.name + ' ) ',
        value: category._id
      }
      optCostCenter.push(cat);
      optCostCenterFilter.push(cat);
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

  //agregar glosaries lv
  // let glossaries: Glossary[];
  // try {
  //   glossaries = await getGlossaries(token);
  //   if(typeof(glossaries)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{glossaries}</h1>
  //   }    
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los catalogos!!</h1>
  // }

  // const optGlossaries:Options[]= [];
  // glossaries.map((glossary) => {
  //   optGlossaries.push({
  //     label: glossary.name,
  //     value: glossary._id
  //   });
  // });

  let reports: ReportParse[];
  try {
    if(user.rol && (user.rol?.name.toLowerCase().includes('admin') || user.rol?.name.toLowerCase().includes('superadmin'))){
      reports = await GetReportsMin(token);
    }else{
      reports = await GetReportsByUserMin(token, user._id);
    }
    
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

  // let projects: Project[];
  // try {
  //   projects = await getProjects(token);
  //   if(typeof(projects)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{projects}</h1>
  //   }    
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
  // }

  //let projects: Options[];
  let optProjects:Options[];
  let optProjectFilter: Options[] = [{
      label: 'TODOS',
      value: 'all'
    }]
  try {
    optProjects = await getProjectsLV(token);
    if(typeof(optProjects)==='string'){
      return <h1 className="text-center text-lg text-red-500">{optProjects}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los proyectos!!</h1>
  }

  optProjectFilter = optProjectFilter.concat(optProjects);

  // const optProjects:Options[]= [];
  // const optProjectFilter: Options[] = [{
  //   label: 'TODOS',
  //   value: 'all'
  // }]
  // projects.map((project) => {
  //   const p = {
  //     label: project.title,
  //     value: project._id
  //   }
  //   optProjects.push(p);
  //   optProjectFilter.push(p);
  // });

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

  // let vats: Vat[];
  // try {
  //   vats = await GetVats(token);
  //   if(typeof(vats)==='string'){
  //     return <h1 className="text-center text-lg text-red-500">{vats}</h1>
  //   }    
  // } catch (error) {
  //   return <h1 className="text-center text-lg text-red-500">Error al consultar los ivas!!</h1>
  // }

  let optVats: Options[];
  try {
    optVats = await GetVatsLV(token);
    if(typeof(optVats)==='string'){
      return <h1 className="text-center text-lg text-red-500">{optVats}</h1>
    }    
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Error al consultar los ivas!!</h1>
  }

  // const optVats:Options[]= [];
  // vats.map((vat) => {
  //   optVats.push({
  //     label: vat.value.toString(),
  //     value: vat._id
  //   });
  // });

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
                  optProjects={optProjects} optConditions={optConditions}
                  optCategories={optCategories} optTypes={optTypes} reports={reports}
                  optReports={optReports} idLabour={labour} idTicket={ticket}
                  optCostCenterDeductible={optCostCenterDeductible} optVats={optVats}
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
          value: expense.cost?.subtotal || 0
        })
    const discount = CurrencyFormatter({
      currency: "MXN",
      value: expense.cost?.discount || 0
    })
    const vat = CurrencyFormatter({
      currency: "MXN",
      value: expense.cost?.iva || 0
    })
    const total = CurrencyFormatter({
      currency: "MXN",
      value: (expense.cost?.subtotal + expense.cost?.iva - expense.cost?.discount) || 0
    })
    const elements: string[] = [];
    if(expense.category?.name.toLowerCase().includes('xml') && expense.category?.name.toLowerCase().includes('pdf')){
      const typeFiles = getTypeFiles(expense);
      if(typeFiles.includes('xml')){
        elements.push('xml');
      }else{
        elements.push('none');
      }

      if(typeFiles.includes('pdf')){
        elements.push('pdf');
      }else{
        elements.push('none');
      }
    }else{
      if(expense.category?.name.toLowerCase().includes('xml')){
        const typeFiles = getTypeFiles(expense);
        if(typeFiles.includes('xml')){
          elements.push('xml');
        }else{
          elements.push('none');
        }
      }else{
        if(expense.category?.name.toLowerCase().includes('pdf')){
          const typeFiles = getTypeFiles(expense);
          if(typeFiles.includes('pdf')){
            elements.push('pdf');
          }else{
            elements.push('none');
          }
        }else{
          //sin archivos
          elements.push('none');
        }
      }
    }
    
    table.push({
      id: expense._id,
      Descripcion: expense.description,
      Estatus: 'condition',
      Fecha: expense.date,
      costcenter: typeof(expense.costcenter)=== 'string'? expense.costcenter: expense.costcenter?.name,
      Importe: dollar,
      Informe: expense.report?.name || 'sin reporte',
      Proveedor: expense.provider? expense.provider.name: 'sin proveedor',
      Proyecto: expense.project?.title || 'sin proyecto',
      Responsable: {
        responsible: expense.user?.name,
        photo: expense.user?.photo
      },
      condition: expense.condition?.length > 0 ? expense.condition[expense.condition?.length -1]?.glossary?.name: 'sin status',
      archivos: elements,
      vat,
      discount,
      total,
    });
  });

  let reportsProject: ReportByProject[];
  try {
    reportsProject = await GetCostsGroupByProject(token);
    //console.log('reports projects page => ', reportsProject);
    if(typeof(reportsProject)==='string'){
      return <h1>Error al consultar costos por proyecto!!</h1>
    }
  } catch (error) {
    return <h1>Error al consultar costos por proyecto!!</h1>
  }

  let costTypes: CostGroupByType[];
  try {
    costTypes = await GetCostsGroupByType(token);
    //console.log('reports projects page => ', costTypes);
    if(typeof(costTypes)==='string'){
      return <h1>Error al consultar costos por tipo!!</h1>
    }
  } catch (error) {
    return <h1>Error al consultar costos por tipo!!</h1>
  }

  return(
    <>
      <Navigation user={user} />
      <ContainerClient data={table} expenses={expenses} idLabour={labour} idTicket={ticket}
        optCategories={optCategories} optCategoriesFilter={optCategoriesFilter} optConditions={optConditions}
        optConditionsFilter={optConditionsFilter} optCostCenter={optCostCenter} 
        optCostCenterDeductible={optCostCenterDeductible} optCostCenterFilter={optCostCenterFilter}
        optProjectFilter={optProjectFilter} optProjects={optProjects} optProviders={optProviders}
        optReports={optReports} optReportsFilter={optReportsFilter} optResponsibles={optResponsibles}
        optTypeFilter={optTypeFilter} optTypes={optTypes} reports={reports} optVats={optVats} 
        token={token} user={user._id} reportProjects={reportsProject} costsTypes={costTypes}
        />
    </>
  )
}
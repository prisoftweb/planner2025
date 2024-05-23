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
  costcenters.map((costcenter) => {
    optCostCenter.push({
      label: costcenter.name,
      value: costcenter._id
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

  if(!expenses || expenses.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/projects.jpg" subtitle="Gastos"
            text="Agrega el costo de mano de obra,
                  caja chica o proveedor desde esta
                  seccion a un determinado proyecto"
            title="Gastos">
              <ButtonNew token={token} user={user._id} optCostCenter={optCostCenter} 
                  optProviders={optProviders} optResponsibles={optResponsibles}
                  optGlossaries={optGlossaries} optProjects={optProjects} />
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
      Informe: expense.folio,
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
                    optGlossaries={optGlossaries} optProjects={optProjects} />
        </Header>
        <TableExpenses data={table} token={token} />
      </div>
    </>
  )
}
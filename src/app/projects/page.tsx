import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
//import Header from "@/components/Header";
//import Header from "@/components/HeaderPage";
//import Header from "@/components/Header";
import ButtonNew from "@/components/projects/ButtonNew";
import { getClients } from "../api/routeClients";
import { Options } from "@/interfaces/Common";
import { ClientBack } from "@/interfaces/Clients";
import { GlossaryCatalog } from "@/interfaces/Glossary";
import { getCatalogsByName } from "../api/routeCatalogs";
import { getCompaniesLV } from "../api/routeCompany";
//import { Company } from "@/interfaces/Companies";
import { getProjectsMin } from "../api/routeProjects";
import { ProjectsTable, ProjectMin } from "@/interfaces/Projects";
//import TableProjects from "@/components/projects/TableProjects";
//import { CurrencyFormatter } from "../functions/Globals";
import { ProjectDataToTableDataMin } from "../functions/SaveProject";
import ContainerClient from "@/components/projects/ContainerClient";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let projects: ProjectMin[];
  try {
    projects = await getProjectsMin(token);
    if(typeof(projects)==='string') return <h1 className="text-red-500 text-center text-lg">{projects}</h1>
  } catch (error) {
    return <h1>Error al consultar los proyectos!!</h1>
  }

  let clients: ClientBack[];
  try {
    clients = await getClients(token);
    if(typeof(clients)==='string') return <h1 className="text-red-500 text-center text-lg">{clients}</h1>
  } catch (error) {
    return <h1>Error al consultar clientes!!</h1>
  }

  const optClients: Options[] = [];
  clients.map((client) => {
    optClients.push({
      label: client.name,
      value: client._id
    })
  })

  let catalogs: GlossaryCatalog[];
  try {
    catalogs = await getCatalogsByName(token, 'projects');
    if(typeof(catalogs)==='string') return <h1 className="text-red-500 text-center text-lg">{catalogs}</h1>
  } catch (error) {
    return <h1>Error al consultar catalogos!!</h1>
  }
  
  let optCompanies: Options[] = [];
  try {
    optCompanies = await getCompaniesLV(token);
    if(typeof(optCompanies)==='string') return <h1 className="text-red-500 text-center text-lg">{optCompanies}</h1>
  } catch (error) {
    return <h1 className="text-red-500 text-center text-lg">Error al consultar compañias!!</h1>
  }

  // if(companies.length <= 0){
  //   <h1 className="text-red-500 text-center text-lg">Error no hay compañias!!</h1>
  // }

  // const optCompanies: Options[] = [];
  // companies.map((company) => {
  //   optCompanies.push({
  //     label: company.name,
  //     value: company._id
  //   })
  // })

  const optCategories: Options[] = [{
    label: 'Todas',
    value: 'all'
  }];
  const optsCategories: Options[] = [];
  catalogs[0].categorys.map((category) => {
    optsCategories.push({
      label: category.glossary.name,
      value: category.glossary._id
    })
    optCategories.push({
      label: category.glossary.name,
      value: category.glossary._id
    })
  })

  const optTypes: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  const optsTypes: Options[] = [];
  catalogs[0].types.map((type) => {
    optsTypes.push({
      label: type.glossary.name,
      value: type.glossary._id
    })
    optTypes.push({
      label: type.glossary.name,
      value: type.glossary._id
    })
  })

  const optConditions: Options[] = [{
    label: 'Todos',
    value: 'all'
  }];
  const optsConditions: Options[] = [];
  catalogs[0].condition.map((condition) => {
    optsConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
    optConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
  })

  if(!projects || projects.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/projects.jpg" subtitle="Proyectos"
            text="Aqui puedes agregar nuevos proyectos
                    para la gestion desde Planner"
            title="Proyectos">
              <ButtonNew token={token} optClients={optClients} 
                      optCategories={optCategories} optTypes={optTypes}
                      user={user._id} optCompanies={optCompanies} />
          </WithOut>
        </div>
      </>
    )
  }

  const table: ProjectsTable[] = ProjectDataToTableDataMin(projects);
  
  return(
    <>
      <Navigation user={user} />
      <ContainerClient data={table} optCategories={optsCategories} optCategoriesFilter={optCategories}
        optClients={optClients} optCompanies={optCompanies} optConditionsFilter={optConditions} 
        optTypes={optsTypes} optTypesFilter={optTypes} projects={projects} token={token} user={user._id}  />
    </>
  )
}
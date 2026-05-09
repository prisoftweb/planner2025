import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getClients } from "../api/routeClients";
import { Options } from "@/interfaces/Common";
import { getCatalogsByName } from "../api/routeCatalogs";
import { getCompaniesLV } from "../api/routeCompany";
import { getActiveProjectsMin, GetCollectionsAccumByProjectMin, 
  GetCostsAccumByProjectMin, getProjectsMinFinishedUser, getProjectsMinInEjecucionUser, 
  getAllTOTALPaymentsAndCostsByProjectMINCOSTBENEFIT, getAllTOTALACUMULATEDPaymentsAndCostsByProjectMINCOSTBENEFIT } from "../api/routeProjects";
import { ProjectsTable } from "@/interfaces/Projects";
import { ProjectDataToTableDataWithUtilitiesMin } from "../functions/SaveProject";
import ContainerClient from "@/components/projects/ContainerClient";
import { getDate } from "@/libs/dates";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let role = user.rol?.name || '';

  const now=getDate(new Date());
  const first=new Date(new Date().getFullYear(), 0, 1);
  const firstString=getDate(first);

  const [projects, finished, clients, costs, collections, catalogs, optCompanies, prjsCB, totalCB, prjsCBtrue, totalCBtrue] = await Promise.all([
    role.toLowerCase().includes('residente') ? getProjectsMinInEjecucionUser(token, user._id) : getActiveProjectsMin(token),
    getProjectsMinFinishedUser(token, user._id),
    getClients(token), 
    GetCostsAccumByProjectMin(token),
    GetCollectionsAccumByProjectMin(token),
    getCatalogsByName(token, 'projects'),
    getCompaniesLV(token),
    getAllTOTALPaymentsAndCostsByProjectMINCOSTBENEFIT(token, "false", firstString, now),
    getAllTOTALACUMULATEDPaymentsAndCostsByProjectMINCOSTBENEFIT(token, "false", firstString, now), //agregar parametro /?full=false para imprimir 
                                                                        //global o por proyecto
    getAllTOTALPaymentsAndCostsByProjectMINCOSTBENEFIT(token, "true", firstString, now),
    getAllTOTALACUMULATEDPaymentsAndCostsByProjectMINCOSTBENEFIT(token, "true", firstString, now)
  ]);
  
  if(typeof(projects)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <div className="p-10">
          <h1 className="text-red-500 text-center text-lg">{projects}projects</h1>
        </div>
      </>
    )
  }
  
  if(typeof(clients)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <h1 className="text-red-500 text-center text-lg">{clients}clients</h1>
      </>
    )
  }

  if(typeof(costs)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <h1 className="text-red-500 text-center text-lg">{costs}costs</h1>
      </>
    )
  }

  if(typeof(collections)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <h1 className="text-red-500 text-center text-lg">{collections}collections</h1>
      </>
    )
  }

  const optClients: Options[] = [];
  clients.map((client: any) => {
    optClients.push({
      label: client.name,
      value: client._id
    })
  })

  if(typeof(catalogs)==='string'){
    return <h1 className="text-red-500 text-center text-lg">{catalogs}catalogs</h1>
  }

  const condition = catalogs[0].condition[0].glossary._id;
  
  if(typeof(optCompanies)==='string'){
    return(
      <>
        <Navigation user={user} token={token} />
        <h1 className="text-red-500 text-center text-lg">{optCompanies}comapies</h1>
      </>
    )
  }

  const optCategories: Options[] = [{
    label: 'Todas',
    value: 'all'
  }];
  const optsCategories: Options[] = [];
  catalogs[0].categorys.map((category: any) => {
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
  catalogs[0].types.map((type: any) => {
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
  catalogs[0].condition.map((condition: any) => {
    optsConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
    optConditions.push({
      label: condition.glossary.name,
      value: condition.glossary._id
    })
  });

  const allPrjs = (role.toLowerCase().includes('residente')? [...projects, ...finished]: projects);
  
  const table: ProjectsTable[] = ProjectDataToTableDataWithUtilitiesMin(allPrjs, collections, costs);

  return(
    <>
      <Navigation user={user} token={token} />
      <ContainerClient data={table} optCategories={optsCategories} optCategoriesFilter={optCategories}
          optClients={optClients} optCompanies={optCompanies} optConditionsFilter={optConditions} 
          optTypes={optsTypes} optTypesFilter={optTypes} projects={allPrjs} token={token} user={user} 
          condition={condition} prjsCBparam={prjsCB} benTotparam={totalCB[0]} cosBenparam={totalCB[2]} costTotparam={totalCB[1]}
          benTottrueparam={totalCBtrue[0]} cosBentrueparam={totalCBtrue[2]} costTottrueparam={totalCBtrue[1]} 
          prjsCBtrueparam={prjsCBtrue} />
    </>
  )
}
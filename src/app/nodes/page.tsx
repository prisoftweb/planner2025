import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import Header from "@/components/Header";
import { getNodes } from "../api/routeNodes";
import { Options } from "@/interfaces/Common";
import { getGlossaries } from "../api/routeGlossary";
import { getDepartmentsLV } from "../api/routeDepartments";
import { getWorkFlows } from "../api/routeWorkflows";
import { Glossary } from "@/interfaces/Glossary";
import { Workflow } from "@/interfaces/Workflows";
import ButtonNewNode from "@/components/nodes/ButtonNewNode";
import { Node } from "@/interfaces/Nodes";
import TableNode from "@/components/nodes/TableNode";
import { NodeTable } from "@/interfaces/Nodes";
import { getRelations } from "../api/routeRelations";
import { Relation } from "@/interfaces/Relation";

export default async function page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let nodes: Node[] = [];
  try {
    nodes = await getNodes(token);
    if(typeof(nodes) ==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-xl text-center">{nodes}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar nodos!!</h1>
      </>
    )
  }

  let optDepartments: Options[] = [];
  try {
    optDepartments = await getDepartmentsLV(token);
    if(typeof(optDepartments) ==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-xl text-center">{optDepartments}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar departamentos!!</h1>
      </>
    )
  }

  let glossaries: Glossary[] = [];
  try {
    glossaries = await getGlossaries(token);
    if(typeof(glossaries) ==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-xl text-center">{glossaries}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar glosarios!!</h1>
      </>
    )
  }

  let workflows: Workflow[] = [];
  try {
    workflows = await getWorkFlows(token);
    if(typeof(workflows) ==='string'){
      return(
        <>
          <Navigation user={user} />
          <h1 className="text-red-500 text-xl text-center">{workflows}</h1>
        </>
      )
    }
  } catch (error) {
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar workflows!!</h1>
      </>
    )
  }

  const optGlossaries: Options[] = [];
  const optDescGlossaries: Options[] = [];
  glossaries.map(glossary => {
    optGlossaries.push({
      label: glossary.name,
      value: glossary._id
    });
    optDescGlossaries.push({
      label: glossary.description,
      value: glossary._id
    });
  });

  const optWorkFlows: Options[] = [];
  workflows.map(workflow => {
    optWorkFlows.push({
      label: workflow.title,
      value: workflow._id
    });
  });

  const tableData: NodeTable[] = [];
  nodes.map((node) => {
    
    let walk = '';
    node.relations.map((rel) => {
      walk += rel.relation?.glossary.name + ", "
    });

    tableData.push({
      caminos: walk, 
      department: node.department.name,
      id: node._id,
      workflow: node.workflow?.title || node.workflow?.description || 'sin workflow',
      condition: node.glossary.name
    })
  });

  const optRelations: Options[] = [];
  const optDescriptions: Options[] = [];
  try {
    const res: Relation[] = await getRelations(token);
    if(typeof(res)==='string'){
      return(
        <>
          <h1 className="text-red-500 text-xl text-center">{res}</h1>
        </>
      )
    }else{
      res.map((rel) => {
        optRelations.push({
          label: rel.glossary.name,
          value: rel._id,
        });
        optDescriptions.push({
          label: rel.description,
          value: rel._id,
        });
      });
    }
  } catch (error) {
    return(
      <>
        <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar relaciones!!</h1>
      </>
    )
  }

  if(!nodes || nodes.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/costs/costs.svg" subtitle="Nodos"
            text="Agrega nodo, para el control del workflow"
            title="Nodos">
              <ButtonNewNode token={token} user={user._id} 
                departments={optDepartments} glossaries={optGlossaries} 
                workFlows={optWorkFlows} descGlossaries={optDescGlossaries} />
          </WithOut>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title="Nodos" placeHolder="Buscar nodo.." >
        <ButtonNewNode token={token} user={user._id} 
                departments={optDepartments} glossaries={optGlossaries} 
                workFlows={optWorkFlows} descGlossaries={optDescGlossaries} />
        </Header>
        <div className="mt-5">
          <TableNode data={tableData} token={token} departments={optDepartments} 
            glossaries={optGlossaries} workflows={optWorkFlows} 
            optDesc={optDescriptions} optRels={optRelations}  />
          {/* <TableReports data={table} optConditions={optConditionsFilter} 
              reports={reports} token={token} optCompanies={optCompaniesFilter} 
              optProjects={optProjectsFilter} /> */}
        </div>
      </div>
    </>
  )
}


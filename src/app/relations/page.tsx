import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import Header from "@/components/Header";
import { Options } from "@/interfaces/Common";
import { getGlossaries } from "../api/routeGlossary";
import { Glossary } from "@/interfaces/Glossary";
import { getRelations } from "../api/routeRelations";
import ButtonNewRelation from "@/components/relations/ButtonNewRelation";
import { getNodes } from "../api/routeNodes";
import { Node } from "@/interfaces/Nodes";
import TableRelations from "@/components/relations/TableRelation";
import { RelationTable, Relation } from "@/interfaces/Relation";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let rels: Relation[] = await getRelations(token);
  // let gloss: Glossary[] = await getGlossaries(token);
  // let nods: Node[] = await getNodes(token);

  const [relations, glossaries, nodes] = await Promise.all([
    getRelations(token), 
    getGlossaries(token), 
    getNodes(token)
  ]);
  
  if(typeof(relations) ==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-xl text-center">{relations}</h1>
        </div>
      </>
    )
  }

  if(typeof(glossaries) ==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-xl text-center">{glossaries}</h1>
        </div>
      </>
    )
  }

  if(typeof(nodes) ==='string'){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-xl text-center">{nodes}</h1>
        </div>
      </>
    )
  }

  const optGlossaries: Options[] = [];
  const optDescGlossaries: Options[] = [];
  glossaries.map((glossary:any) => {
    optGlossaries.push({
      label: glossary.name,
      value: glossary._id
    });
    optDescGlossaries.push({
      label: glossary.description,
      value: glossary._id
    });
  });

  const optNodes: Options[] = [];
  nodes.map((node:any) => {
    optNodes.push({
      label: node.department.name,
      value: node._id
    });
  });

  if(!relations || relations.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/costs/costs.svg" subtitle="Relaciones"
            text="Agrega relacion, para el control del flujo de los nodos"
            title="Relaciones">
              <ButtonNewRelation glossaries={optGlossaries} 
                  nodes={optNodes} token={token} user={user._id}
                  descGlossaries={optDescGlossaries} />
          </WithOut>
        </div>
      </>
    )
  }

  const dataTable: RelationTable[] = [];
  relations.map((relation:any) => {
    dataTable.push({
      condition: relation.glossary.name,
      description: relation.description,
      id: relation._id,
      nextNode: typeof(relation.nextnodo)=== 'string'? relation.nextnodo : relation.nextnodo.department.name,
    });
  });

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title="Nodos" placeHolder="Buscar nodo.." >
        <ButtonNewRelation glossaries={optGlossaries} nodes={optNodes} 
            token={token} user={user._id} descGlossaries={optDescGlossaries} />
        </Header>
        <div className="mt-5">
          <TableRelations data={dataTable} token={token} />
        </div>
      </div>
    </>
  )
}
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

  let relations: Relation[] = [];
  try {
    relations = await getRelations(token);
    if(typeof(relations) ==='string'){
      return <h1 className="text-red-500 text-xl text-center">{relations}</h1>
    }
  } catch (error) {
    return <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar relaciones!!</h1>
  }

  let glossaries: Glossary[] = [];
  try {
    glossaries = await getGlossaries(token);
    if(typeof(glossaries) ==='string'){
      return <h1 className="text-red-500 text-xl text-center">{glossaries}</h1>
    }
  } catch (error) {
    return <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar glosarios!!</h1>
  }

  const optGlossaries: Options[] = [];
  glossaries.map(glossary => {
    optGlossaries.push({
      label: glossary.name,
      value: glossary._id
    });
  });

  let nodes: Node[] = [];
  try {
    nodes = await getNodes(token);
    if(typeof(nodes) ==='string'){
      return <h1 className="text-red-500 text-xl text-center">{nodes}</h1>
    }
  } catch (error) {
    return <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar nodos!!</h1>
  }

  const optNodes: Options[] = [];
  nodes.map(node => {
    optNodes.push({
      label: node.glossary.name,
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
                  nodes={optNodes} token={token} user={user._id} />
          </WithOut>
        </div>
      </>
    )
  }

  const dataTable: RelationTable[] = [];
  relations.map((relation) => {
    dataTable.push({
      condition: relation.glossary.name,
      description: relation.description,
      id: relation._id,
      nextNode: relation.nextnodo
    })
  });

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title="Nodos" placeHolder="Buscar nodo.." >
        <ButtonNewRelation glossaries={optGlossaries} nodes={optNodes} 
            token={token} user={user._id} />
        </Header>
        <div className="mt-5">
          <TableRelations data={dataTable} token={token} />
        </div>
      </div>
    </>
  )
}
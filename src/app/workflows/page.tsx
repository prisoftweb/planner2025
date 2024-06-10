import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import { Workflow } from "@/interfaces/Workflows";
import ButtonNew from "@/components/workflows/ButtonNew";
import Header from "@/components/Header";
import { getWorkFlows } from "../api/routeWorkflows";
import { WorkflowTable } from "@/interfaces/Workflows";
import TableWorkflows from "@/components/workflows/TableWorkflows";

export default async function page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let workflows: Workflow[] = [];
  try {
    workflows = await getWorkFlows(token);
    if(typeof(workflows) ==='string'){
      return <h1 className="text-red-500 text-xl text-center">{workflows}</h1>
    }
  } catch (error) {
    return <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar workflows!!</h1>
  }

  if(!workflows || workflows.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/costs/costs.svg" subtitle="Workflow"
            text="Agrega workflow, para el control de los diferentes procedimientos"
            title="Workflow">
              <ButtonNew token={token} user={user._id}
              />
          </WithOut>
        </div>
      </>
    )
  }

  const table: WorkflowTable[] = [];
  workflows.map((wf) => {
    table.push({
      description: wf.description,
      id: wf._id,
      title: wf.title
    });
  });

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title="Workflows" placeHolder="Buscar workflow.." >
          <ButtonNew token={token} user={user._id}
          />
        </Header>
        <div className="mt-5">
          <TableWorkflows data={table} token={token} />
        </div>
      </div>
    </>
  )
}
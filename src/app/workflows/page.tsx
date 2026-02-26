import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import WithOut from "@/components/WithOut";
import { Workflow } from "@/interfaces/Workflows";
// import ButtonNew from "@/components/workflows/ButtonNew";
// import Header from "@/components/Header";
import { getWorkFlows } from "../api/routeWorkflows";
import { WorkflowTable } from "@/interfaces/Workflows";
// import TableWorkflows from "@/components/workflows/TableWorkflows";
import ContainerWorkFlows, {ContainerButtonWorkFlow} from "@/components/workflows/ContainerWorkFlows";

export default async function page() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let workflows: Workflow[] = [];
  try {
    workflows = await getWorkFlows(token);
    if(typeof(workflows) ==='string'){
      return (
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-red-500 text-xl text-center">{workflows}</h1>
        </div>
      )
    }
  } catch (error) {
    return(
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <h1 className="text-red-500 text-xl text-center">Ocurrio un error al consultar workflows!!</h1>
      </div>
    )
  }

  if(!workflows || workflows.length <= 0){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <WithOut img="/img/costs/costs.svg" subtitle="Workflow"
            text="Agrega workflow, para el control de los diferentes procedimientos"
            title="Workflow">
              {/* <ButtonNew token={token} /> */}
              <ContainerButtonWorkFlow token={token} />
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
      <ContainerWorkFlows data={table} token={token} user={user} />
    </>
  )
}
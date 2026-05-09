import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { ResponsiveHeader } from "@/components/Header";
import ContainerConceptscomponent from "@/components/expenses/concepts/ContainerConceptscomponent";
import { getAllConceptsLV } from "@/app/api/routeCostCenter";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const concepts = await getAllConceptsLV(token);

  if(typeof(concepts) === 'string'){
    return (
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <p>{concepts}</p>
        </div>
      </>
    )
  }

  return (
      <>
        <Navigation user={user} token={token} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <ResponsiveHeader placeHolder="Buscar gasto" title="Gastos por concepto" hideChildren={true} >
            <></>
          </ResponsiveHeader>
          {/* <TableInvoicesComponent token={token} user={user._id} /> */}
          <ContainerConceptscomponent conceptsOptions={concepts} token={token} />
        </div>
      </>
    )
}
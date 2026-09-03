import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { ResponsiveHeader } from "@/components/Header";
import ContainerConceptscomponent from "@/components/expenses/concepts/ContainerConceptscomponent";
import { getAllConceptsLV } from "@/app/api/routeCostCenter";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // const concepts = await getAllConceptsLV(token);

  const [concepts, resresource, rescomponents] = await Promise.all([
    getAllConceptsLV(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'expenses', 'concepts'),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/catalogs`} message={rescomponents} />
      </>
    )
  }

  if(typeof(concepts) === 'string'){
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <p>{concepts}</p>
        </div> */}
        <ComponentError page="/expenses/concepts" message={concepts} />
      </>
    )
  }

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
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
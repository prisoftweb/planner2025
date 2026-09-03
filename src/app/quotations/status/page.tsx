import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { IQuotationMin } from "@/interfaces/Quotations";
import { getQuotationsMin } from "@/app/api/routeQuotations";
import DragAndDropQuotations from "@/components/quotations/DragAndDropQuatations";
import Header from "@/components/HeaderPage";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [quotations, resresource, rescomponents] = await Promise.all([
    getQuotationsMin(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'quotations', 'status'),
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
        <ComponentError page={`/projects/history`} message={rescomponents} />
      </>
    )
  }
  
  if(typeof(quotations) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{quotations}</h1> */}
        <ComponentError page="/quotations/status" message={quotations} />
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
        <Header previousPage="/" title="Cotizaciones">
          <></>
        </Header>
        <div className="mt-3">
          <DragAndDropQuotations quotationsParam={quotations} token={token} user={user._id} />
        </div>
      </div>
    </>
  )
}
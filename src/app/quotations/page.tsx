import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getQuotationsMin } from "../api/routeQuotations";
import { IQuotationMin } from "@/interfaces/Quotations";
import ContainerQuotations from "@/components/quotations/ContainerQuotations";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [quotations, resresource] = await Promise.all([
    getQuotationsMin(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  // let quotations: IQuotationMin[];
  // try {
  //   quotations = await getQuotationsMin(token);
  //   if(typeof(quotations) === "string")
  //     return(
  //       <>
  //         <Navigation user={user} token={token} resources={resresource} />
  //         {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
  //           <h1 className="text-center text-red-500">{quotations}</h1>
  //         </div> */}
  //         <ComponentError page="/quotations" message={quotations} />
  //       </>
  //     )
  // } catch (error) {
  //   return(
  //     <>
  //       <Navigation user={user} token={token} resources={resresource} />
  //       {/* <h1 className="text-center text-red-500">Ocurrio un error al obtener cotizaciones!!</h1> */}
  //       <ComponentError page="/quotations" message="Ocurrio un error al obtener cotizaciones!!" />
  //     </>
  //   )
  // }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerQuotations quotations={quotations} token={token} user={user} company={user.profile} />
      </div>
    </>
  )
}
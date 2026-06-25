import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getQuotationsByUserMin } from "@/app/api/routeQuotations";
import { IQuotationMin } from "@/interfaces/Quotations";
import ContainerQuotations from "@/components/quotations/ContainerQuotations";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let quotations: IQuotationMin[] = await getQuotationsByUserMin(token, user._id);

  const [quotations, resresource] = await Promise.all([
    getQuotationsByUserMin(token, user._id),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
        return (
          <>
            <ComponentError page="/" message={resresource} />
          </>
        )
      }
  
  if(typeof(quotations) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{quotations}</h1>
        </div> */}
        <ComponentError page="/quotations/byuser" message={quotations} />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerQuotations quotations={quotations} token={token} user={user} 
          isByUser={true} company={user.profile} />
      </div>
    </>
  )
}
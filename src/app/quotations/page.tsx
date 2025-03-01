import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getQuotationsMin } from "../api/routeQuotations";
import { IQuotationMin } from "@/interfaces/Quotations";
import ContainerQuotations from "@/components/quotations/ContainerQuotations";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let quotations: IQuotationMin[];
  try {
    quotations = await getQuotationsMin(token);
    if(typeof(quotations) === "string")
      return <h1 className="text-center text-red-500">{quotations}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener cotizaciones!!</h1>  
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerQuotations quotations={quotations} token={token} user={user} />
      </div>
    </>
  )
}
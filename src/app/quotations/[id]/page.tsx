import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { IOneQuotationMin } from "@/interfaces/Quotations";
import { getQuotationMin, getQuotationsLV } from "@/app/api/routeQuotations";
import Selectize from "@/components/Selectize";
import Header from "@/components/HeaderPage";
import ContainerQuatationProfile from "@/components/quotations/ContainerQuatationProfile";
import { Options } from "@/interfaces/Common";

export default async function Page({params}: {params:{id:string}}){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let quotation: IOneQuotationMin;
  try {
    quotation = await getQuotationMin(token, params.id);
    if(typeof(quotation) === "string")
      return <h1 className="text-center text-red-500">{quotation}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener cotizacion!!</h1>  
  }

  let quotations: Options[];
  try {
    quotations = await getQuotationsLV(token);
    if(typeof(quotations) === "string")
      return <h1 className="text-center text-red-500">{quotations}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener cotizacion!!</h1>  
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <Header title={quotation.title} previousPage="/quotations">
          <Selectize options={quotations} routePage="quotations" subpath="" />
        </Header>
        <ContainerQuatationProfile quatation={quotation} token={token} usr={user._id} />
      </div>
    </>
  )
}
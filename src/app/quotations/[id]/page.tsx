import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getQuotationMin, getQuotationsLV } from "@/app/api/routeQuotations";
import Selectize from "@/components/Selectize";
import Header from "@/components/HeaderPage";
import ContainerQuatationProfile from "@/components/quotations/ContainerQuatationProfile";
import ComponentError from "@/components/ComponentError";

export default async function Page({params}: {params:{id:string}}){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [quotation, quotations] = await Promise.all([
    getQuotationMin(token, params.id), 
    getQuotationsLV(token)
  ]);

  if(typeof(quotation) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div>
          <h1 className="text-center text-red-500">{quotation}</h1>
        </div> */}
        <ComponentError page={`/quotations/${params.id}`} message={quotation} />
      </>
    )
  }

  if(typeof(quotations) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <div>
          <h1 className="text-center text-red-500">{quotations}</h1>
        </div> */}
        <ComponentError page={`/quotations/${params.id}`} message={quotations} />
      </>
    )
  }

  const role = user.rol?.name?.toLowerCase().includes('residente');

  return (
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <Header title={quotation.title} previousPage={role? "/quotations/byuser": "/quotations"}>
          <>
            <div className="hidden md:flex w-full max-w-md">
              <Selectize options={quotations} routePage="quotations" subpath="" />
            </div>
          </>
        </Header>
        <div className="md:hidden mt-3">
          <Selectize options={quotations} routePage="quotations" subpath="" />
        </div>
        <ContainerQuatationProfile quatation={quotation} token={token} usr={user._id} company={user.profile} />
      </div>
    </>
  )
}
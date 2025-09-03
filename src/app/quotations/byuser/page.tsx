import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getQuotationsByUserMin } from "@/app/api/routeQuotations";
import { IQuotationMin } from "@/interfaces/Quotations";
import ContainerQuotations from "@/components/quotations/ContainerQuotations";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let quotations: IQuotationMin[] = await getQuotationsByUserMin(token, user._id);
  
  if(typeof(quotations) === "string"){
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{quotations}</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <ContainerQuotations quotations={quotations} token={token} user={user} isByUser={true} />
      </div>
    </>
  )
}
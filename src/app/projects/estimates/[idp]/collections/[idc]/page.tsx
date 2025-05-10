import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers"
import { UsrBack } from "@/interfaces/User";
import { IOneCollectionMin, IInvoicesByCollection } from "@/interfaces/Collections";
import { getCollectionMin, getInvoicesByCollectionMin } from "@/app/api/routeCollections";
import ContainerCollectionProfile from "@/components/projects/estimates/collections/ContainerCollectionProfile";
import Selectize from "@/components/Selectize";
import Header from "@/components/HeaderPage";

export default async function page({ params, searchParams }: 
  { params: { idp: string, idc:string }, searchParams: { page: string }}) {

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let collection:IOneCollectionMin = await getCollectionMin(token, params.idc);
  let invoices:IInvoicesByCollection[] = await getInvoicesByCollectionMin(token, params.idc);
  
  if(typeof(collection)==='string'){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">{collection}</h1>
        </div>
      </>
    )
  }
  
  if(typeof(invoices)==='string'){
    return (
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">{invoices}</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <Header title={collection.reference} previousPage={searchParams.page=='projects'? `/projects/estimates/${params.idp}/collections?page=projects` : 
                  (searchParams.page=='collections'? '/collections': `/projects/estimates/${params.idp}/collections`)}>
          <Selectize options={[]} routePage={searchParams.page? `projects/estimates/${params.idp}/collections?page=projects` : 
                        `projects/estimates/${params.idp}/collections`} subpath="" />
        </Header>
        <ContainerCollectionProfile collection={collection} token={token} usr={user._id} invoices={invoices} />
      </div>
    </>
  )
}

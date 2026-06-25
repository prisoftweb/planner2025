import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers"
import { UsrBack } from "@/interfaces/User";
import { getCollectionMin, getInvoicesByCollectionMin } from "@/app/api/routeCollections";
import ContainerCollectionProfile from "@/components/projects/estimates/collections/ContainerCollectionProfile";
import Header from "@/components/HeaderPage";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function page({ params, searchParams }: 
  { params: { idp: string, idc:string }, searchParams: { page: string }}) {

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [collection, invoices, resresource] = await Promise.all([
    getCollectionMin(token, params.idc),
    getInvoicesByCollectionMin(token, params.idc),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }
  
  if(typeof(collection)==='string'){
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">{collection}</h1>
        </div> */}
        <ComponentError page={`/projects/estimates/${params.idp}/collections/${params.idc}`} message={collection} />
      </>
    )
  }
  
  if(typeof(invoices)==='string'){
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
          <h1 className="text-center text-red-500">{invoices}</h1>
        </div> */}
        <ComponentError page={`/projects/estimates/${params.idp}/collections/${params.idc}`} message={invoices} />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <Header title={collection.reference} previousPage={searchParams.page=='projects'? `/projects/estimates/${params.idp}/collections?page=projects` : 
                  (searchParams.page=='collections'? '/collections': (searchParams.page=='collectionsHistory'? `/collections/history` : `/projects/estimates/${params.idp}/collections`))}>
          <></>
        </Header>
        <ContainerCollectionProfile collection={collection} token={token} usr={user._id} invoices={invoices} />
      </div>
    </>
  )
}

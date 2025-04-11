import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers"
import { UsrBack } from "@/interfaces/User";
import { IOneCollectionMin, IInvoicesByCollection } from "@/interfaces/Collections";
import { getCollectionMin, getInvoicesByCollectionMin } from "@/app/api/routeCollections";
import ContainerCollectionProfile from "@/components/projects/estimates/collections/ContainerCollectionProfile";
import Selectize from "@/components/Selectize";
import Header from "@/components/HeaderPage";

export default async function page({ params }: { params: { idp: string, idc:string }}) {

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let collection:IOneCollectionMin;
  try {
    collection = await getCollectionMin(token, params.idc);
    if(typeof(collection)==='string'){
      return (
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{collection}</h1>
        </>
      )
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener cobro!!</h1>
  }

  let invoices:IInvoicesByCollection[];
  try {
    invoices = await getInvoicesByCollectionMin(token, params.idc);
    if(typeof(invoices)==='string'){
      return (
        <>
          <Navigation user={user} />
          <h1 className="text-center text-red-500">{invoices}</h1>
        </>
      )
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener facturas!!</h1>
  }

  if(!collection){
    <>
      <Navigation user={user} />
      <h1 className="text-center text-red-500">Ocurrio un error al obtener cobro!!</h1>
    </>
  }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <Header title={collection.reference} previousPage={`/projects/estimates/${params.idp}/collections`}>
          <Selectize options={[]} routePage={`projects/estimates/${params.idp}/collections`} subpath="" />
        </Header>
        <ContainerCollectionProfile collection={collection} token={token} usr={user._id} invoices={invoices} />
      </div>
    </>
  )
}

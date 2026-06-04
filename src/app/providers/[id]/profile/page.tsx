import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
import IconText from "@/components/providers/IconText";
import ProviderClient from "@/components/providers/ProviderClient";
import { getProvider, getProviders, getCostTOTALPendingPAYGroupByPROVIDER } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import ArrowReturn from "@/components/ArrowReturn";
import { Options } from "@/interfaces/Common";
import ComponentError from "@/components/ComponentError";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [provider, providers, costPayment] = await Promise.all([
    getProvider(params.id, token),
    getProviders(token),
    getCostTOTALPendingPAYGroupByPROVIDER(params.id, token),
  ]);
  
  if(typeof(provider) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-center text-red-500">{provider}</h1> */}
        <ComponentError page={`/providers/${params.id}/profile`} message={provider} />
      </>
    )
  }

  if(typeof(providers) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-center text-red-500">{providers}</h1> */}
        <ComponentError page={`/providers/${params.id}/profile`} message={providers} />
      </>
    )
  }

  if(typeof(costPayment) === "string"){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-center text-red-500">{costPayment}</h1> */}
        <ComponentError page={`/providers/${params.id}/profile`} message={costPayment} />
      </>
    )
  }

  let options: Options[] = [];

  if(providers.length <= 0){
    return(
      <>
        <Navigation user={user} token={token} />
        {/* <h1 className="text-center text-red-500">Error al obtener proveedores...</h1> */}
        <ComponentError page={`/providers/${params.id}/profile`} message="Error al obtener proveedores..." />
      </>
    )
  }

  providers.map((prov: any) => {
    options.push({
      value: prov._id,
      label: prov.name,
    })
  })

  return(
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/providers" />
            <IconText text={provider.tradename} size="w-8 h-8" sizeText="" />
            <p className="text-xl ml-4 font-medium">{provider.name}</p>
          </div>
          <Selectize options={options} routePage="providers" subpath="/profile" />
        </div>
        <NavTab idProv={params.id} tab='1' />
        <ProviderClient provider={provider} token={token} user={user._id} id={params.id} costPayment={costPayment}
          company={user.profile} />
      </div>
    </>
  )
}
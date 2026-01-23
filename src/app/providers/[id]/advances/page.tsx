import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
import IconText from "@/components/providers/IconText";
import { getProvider, getProviders, getAllCostsAdvancesByProviderMIN } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import ArrowReturn from "@/components/ArrowReturn";
import { Options } from "@/interfaces/Common";
import ContainerAdvances from "@/components/providers/advances/containerAdvances";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [provider, providers, advances] = await Promise.all([
    getProvider(params.id, token),
    getProviders(token),
    getAllCostsAdvancesByProviderMIN(token, params.id)
  ]);
  
  if(typeof(provider) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{provider}</h1>
      </>
    )
  }

  if(typeof(providers) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{providers}</h1>
      </>
    )
  }

  if(typeof(advances) === "string"){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">{advances}</h1>
      </>
    )
  }

  let options: Options[] = [];

  if(providers.length <= 0){
    return(
      <>
        <Navigation user={user} />
        <h1 className="text-center text-red-500">Error al obtener proveedores...</h1>
      </>
    )
  }

  providers.map((prov: any) => {
    options.push({
      value: prov._id,
      label: prov.name,
    })
  });
  
  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/providers" />
            <IconText text={provider.tradename} size="w-8 h-8" sizeText="" />
            <p className="text-slate-500 mx-3">{provider.name}</p>
          </div>
          <Selectize options={options} routePage="providers" subpath="/advances" />
        </div>
        <NavTab idProv={params.id} tab='4' />

        <ContainerAdvances data={advances} expenses={advances} provider={provider} token={token} user={user._id}/>
        
      </div>
    </>
  )
}
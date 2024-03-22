import NavTab from "@/components/providers/NavTab";
import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
import IconText from "@/components/providers/IconText";
import ProviderClient from "@/components/providers/ProviderClient";
import { getProvider, getProviders } from "@/app/api/routeProviders";
import { UsrBack } from "@/interfaces/User";
import { Provider } from "@/interfaces/Providers";
import ArrowReturn from "@/components/ArrowReturn";
import { Options } from "@/interfaces/Common";

export default async function Page({ params }: { params: { id: string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let provider: any;
  try {
    provider = await getProvider(params.id, token);
    if(typeof(provider) === "string")
      return <h1 className="text-center text-red-500">{provider}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos del proveedor!!</h1>  
  }

  let providers: Provider[];
  try {
    providers = await getProviders(token);
    if(typeof(providers) === "string")
      return <h1 className="text-center text-red-500">{providers}</h1>
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un error al obtener datos de los proveedores!!</h1>  
  }

  let options: Options[] = [];

  if(providers.length <= 0){
    return <h1 className="text-center text-red-500">Error al obtener proveedores...</h1>
  }

  providers.map((prov: any) => {
    options.push({
      value: prov._id,
      label: prov.name,
    })
  })

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
          <Selectize options={options} routePage="providers" subpath="/profile" />
        </div>
        <NavTab idProv={params.id} tab='1' />
        <ProviderClient provider={provider} token={token} id={params.id} />
      </div>
    </>
  )
}
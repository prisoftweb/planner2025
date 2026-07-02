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
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page({ params }: { params: { id: string }}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const perm=((user.rol?._id?? '') + ('/providers/id%2Fadvances'));
  
  console.log('per => ', perm);

  const [provider, providers, advances, resresource, rescomponents] = await Promise.all([
    getProvider(params.id, token),
    getProviders(token),
    getAllCostsAdvancesByProviderMIN(token, params.id),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, perm),
  ]);

  if(typeof(resresource)==='string'){
      return (
        <>
          <ComponentError page="/" message={resresource} />
        </>
      )
    }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/projects/history/${params.id}`} message={rescomponents} />
      </>
    )
  }
  
  if(typeof(provider) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{provider}</h1> */}
        <ComponentError page={`/providers/${params.id}/advances`} message={provider} />
      </>
    )
  }

  if(typeof(providers) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{providers}</h1> */}
        <ComponentError page={`/providers/${params.id}/advances`} message={providers} />
      </>
    )
  }

  if(typeof(advances) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">{advances}</h1> */}
        <ComponentError page={`/providers/${params.id}/advances`} message={advances} />
      </>
    )
  }

  let options: Options[] = [];

  if(providers.length <= 0){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <h1 className="text-center text-red-500">Error al obtener proveedores...</h1> */}
        <ComponentError page={`/providers/${params.id}/advances`} message="Error al obtener proveedores..." />
      </>
    )
  }

  providers.map((prov: any) => {
    options.push({
      value: prov._id,
      label: prov.name,
    })
  });

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };
  
  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2 gap-x-2">
            <ArrowReturn link="/providers" />
            <IconText text={provider.tradename} size="w-8 h-8" sizeText="" />
            <p className="text-slate-500 mx-3">{provider.name}</p>
          </div>
          {result.components.includes('findall') && (
            <Selectize options={options} routePage="providers" subpath="/advances" />
          )}
        </div>
        <NavTab idProv={params.id} tab='4' />

        <ContainerAdvances data={advances} expenses={advances} provider={provider} token={token} user={user._id} permissions={result}/>
        
      </div>
    </>
  )
}
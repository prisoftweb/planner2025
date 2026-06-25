import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import { getAdvance } from "@/app/api/routeCost";
import { getProviderMin } from "@/app/api/routeProviders";
import ArrowReturn from "@/components/ArrowReturn";
import IconText from "@/components/providers/IconText";
import AdvanceClient from "@/components/providers/advances/AdvanceClient";
import { IProviderMin } from "@/interfaces/Providers";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page({ params }: { params: { id: string, ida:string }}){
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [prov, cost, resresource] = await Promise.all([
    getProviderMin(params.id, token),
    getAdvance(token, params.ida ),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  if(typeof(cost) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{cost}</h1>
        </div> */}
        <ComponentError page={`/providers/${params.id}/advances/${params.ida}`} message={cost} />
      </>
    )

  let provider: IProviderMin;

  if(typeof(prov) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{prov}</h1>
        </div> */}
        <ComponentError page={`/providers/${params.id}/advances/${params.ida}`} message={prov} />
      </>
    )
  else{
    provider = prov[0]
  }

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2 gap-x-2">
            <ArrowReturn link={`/providers/${provider._id}/advances`} />
            <IconText text={provider.tradename} size="w-8 h-8" sizeText="" />
            <p className="text-slate-500 mx-3">{provider.name}</p>
          </div>
          {/* <Selectize options={options} routePage="providers" subpath="/advances" /> */}
        </div>
        {/* <NavTabAdvance tab="1" idProv={params.id} /> */}
        <AdvanceClient id={params.id} token={token} user={user._id} provider={provider}
          advance={cost} company={user.profile} />
      </div>
    </>
  )
}
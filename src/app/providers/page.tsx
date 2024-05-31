import WithOutProvider from "@/components/providers/WithoutProvider"
import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers"
import TableProviders from "@/components/providers/TableProviders";
import {getProviders} from "../api/routeProviders";
import { Provider, TableProvider } from "@/interfaces/Providers";
import { UsrBack } from "@/interfaces/User";
import Header from "@/components/HeaderPage";
import ButtonNewProvider from "@/components/providers/ButtonNewProvider";
import { CurrencyFormatter } from "../functions/Globals";

export default async function Providers(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  let id = cookieStore.get('id')?.value || '';
  
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let providers:Provider[]=[];
  try {
    providers = await getProviders(token);
  } catch (error) {
    console.log(typeof(error));
    console.log(error);
    return <h1 className="text-5xl text-center text-red-500 font-semibold">Error al consultar proveedores!!</h1>
  }  

  if(providers.length === 0 || !providers){
    return (
      <div>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10" style={{backgroundColor:'#F8FAFC'}}>
          <WithOutProvider id={id} token={token} />
        </div>
      </div>
    )      
  }

  let data:TableProvider[] = [];
  providers.map((prov:Provider) => {
    
    let nc = 0;
    if(prov.contact) nc = prov.contact.length;
    
    const dollar = CurrencyFormatter({
      currency: "MXN",
      value: prov.tradeline.currentbalance || 0
    })

    data.push({
      'id': prov._id,
      'name': prov.tradename || prov.name,
      rfc: prov.rfc,
      //currentbalance: prov.tradeline.currentbalance,
      currentbalance: dollar,
      account: prov.account,
      suppliercredit: prov.suppliercredit,
      'contacts': nc
    })
  })
  
  return(
    <>
      <Navigation user={user} />
      
      <div className="p-2 sm:p-3 md:p-5 lg:p-10" style={{backgroundColor:'#F8FAFC'}}>
        {/* <HeaderProvider id={id} token={token} /> */}
        <Header previousPage="/" title="Proveedores">
          <ButtonNewProvider id={id} token={token} />    
        </Header>
        {/* <WithOutProvider /> */}
        <div className="mt-5">
          <TableProviders data={data} token={token} />
        </div>
      </div>
    </>
  )
}
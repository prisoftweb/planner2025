import WithOutProvider from "@/components/providers/WithoutProvider"
import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers"
import TableProviders from "@/components/providers/TableProviders";
//import HeaderProvider from "./HeaderProvider";
import HeaderProvider from "@/components/providers/HeaderProvider";
import {getProviders} from "../api/routeProviders";
import { Provider, TableProvider } from "@/interfaces/Providers";
import { Config } from "@/interfaces/Common";

export default async function Providers(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  let id = cookieStore.get('id')?.value || '';
  
  let config = cookieStore.get('config')?.value || '';
  let numRows = 3;
  let objectConfig: Config;
  if(config) {
    objectConfig = JSON.parse(config);
    numRows = parseInt(objectConfig.numRows);
  }

  let providers:Provider[]=[];
  try {
    providers = await getProviders(token);
  } catch (error) {
    console.log(typeof(error));
    console.log(error);
    return <h1 className="text-5xl text-center text-red-500 font-semibold">Error al consultar proveedores!!</h1>
  }  

  if(providers.length === 0){
    return <WithOutProvider />
  }

  let data:TableProvider[] = [];
  providers.map((prov:Provider) => {
    data.push({
      'id': prov._id,
      'name': prov.name,
      rfc: prov.rfc,
      currentbalance: prov.tradeline.currentbalance,
      account: prov.account,
      suppliercredit: prov.suppliercredit,   
    })
  })
  
  return(
    <>
      <Navigation />
      
      <div className="p-10" style={{backgroundColor:'#F8FAFC'}}>
        <HeaderProvider id={id} token={token} />
        {/* <WithOutProvider /> */}
        <div className="mt-10">
          <TableProviders data={data} token={token} numRows={numRows} />
        </div>
      </div>
    </>
  )
}
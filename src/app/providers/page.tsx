import WithOutProvider from "@/components/providers/WithoutProvider"
import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers"
import TableProviders from "@/components/providers/TableProviders";
//import HeaderProvider from "./HeaderProvider";
import HeaderProvider from "@/components/providers/HeaderProvider";
import getProviders from "../api/routeProviders";
import { Provider, TableProvider } from "@/interfaces/Providers";

export default async function Providers(){
  //agregar condicion para mostrar el sin provedores o la tabla 

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  let providers:Provider[]=[];
  try {
    providers = await getProviders(token);  
  } catch (error) {
    console.log(typeof(error));
    console.log(error);
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

  console.log(data);
  
  // const data = [{
  //   id: '1111111',
  //   name: 'martin perez',
  //   credit: '879878798',
  //   RFC: '9798788',
  //   account: '88779790',
  //   currentmount: '233446',
  //   status: true,
  // },
  // {
  //   id: '1111112',
  //   name: 'juan perez',
  //   credit: '879878792',
  //   RFC: '9798782',
  //   account: '88779792',
  //   currentmount: '233442',
  //   status: true,
  // },
  // {
  //   id: '1111113',
  //   name: 'pedro perez',
  //   credit: '879878793',
  //   RFC: '9798783',
  //   account: '88779793',
  //   currentmount: '233443',
  //   status: false,
  // },
  // {
  //   id: '1111114',
  //   name: 'marce torrez',
  //   credit: '879878794',
  //   RFC: '9798784',
  //   account: '88779794',
  //   currentmount: '233444',
  //   status: true,
  // },
  // {
  //   id: '1111115',
  //   name: 'martin perez',
  //   credit: '879878795',
  //   RFC: '9798785',
  //   account: '88779795',
  //   currentmount: '233445',
  //   status: false,
  // }]
  
  return(
    <>
      <Navigation />
      
      <div className="p-10" style={{backgroundColor:'#F8FAFC'}}>
        <HeaderProvider />
        {/* <WithOutProvider /> */}
        <div className="mt-10">
          <TableProviders data={data} token={token} />
        </div>
      </div>
    </>
  )
}
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import TableSatInvoicesComponent from "@/components/invoices/sat/TableSatInvoicesComponent";
import { Options } from "@/interfaces/Common";
import { IMethodPayment } from "@/components/invoices/sat/SatInvoicesConditionsStepper";
import { getSatMotivosCancelacion } from "../api/routeSatInvoices";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // const res=await getSatMotivosCancelacion();

  const [res, resresource] = await Promise.all([
    getSatMotivosCancelacion(),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  let options:Options[]=[];

  if(typeof(res)!=='string'){
    options=res.map( (m: IMethodPayment) => ({
              value: m.id,
              label: m.description,
            }));
  }else{
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/satinvoices" message={res} />
      </>
    )
  }

  if(!token || token===''){
    return (
      <>
        <Navigation user={user} token={''} resources={resresource} />
        <ComponentError page="/guarantee" message="No estas logueado" />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableSatInvoicesComponent token={token} user={user._id} company={user.profile} optionsCancel={options} />
      </div>
    </>
  )
}
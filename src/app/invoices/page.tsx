import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import TableInvoicesComponent from "@/components/invoices/TableInvoicesComponent";
import { getSatMotivosCancelacion } from "../api/routeSatInvoices";
import { Options } from "@/interfaces/Common";
import { IMethodPayment } from "@/components/invoices/sat/SatInvoicesConditionsStepper";
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
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{res}</h1>
        </div> */}
        <ComponentError page="/invoices" message={res} />
      </>
    )
  }

  if(!token || token===''){
    return (
      <>
        <Navigation user={user} token={''} />
        <ComponentError page="/guarantee" message="No estas logueado" />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableInvoicesComponent token={token} user={user._id} company={user.profile} optionsCancel={options} />
      </div>
    </>
  )
}
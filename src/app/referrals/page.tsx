import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import { getSatMotivosCancelacion } from "../api/routeSatInvoices";
import { Options } from "@/interfaces/Common";
import { IMethodPayment } from "@/components/invoices/sat/SatInvoicesConditionsStepper";
import TableReferralsInvoicesComponent from "../../components/invoices/referrals/TableReferralsInvoicesComponent";
import ComponentError from "@/components/ComponentError";

export default async function Page(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const res=await getSatMotivosCancelacion();
  let options:Options[]=[];

  if(typeof(res)!=='string'){
    options=res.map( (m: IMethodPayment) => ({
              value: m.id,
              label: m.description,
            }));
  }else{
    return(
      <>
        <Navigation user={user} token={token} />
        <ComponentError page="/referrals" message={res} />
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
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableReferralsInvoicesComponent token={token} user={user._id} company={user.profile} optionsCancel={options} />
      </div>
    </>
  )
}
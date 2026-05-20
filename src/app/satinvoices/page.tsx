import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import TableSatInvoicesComponent from "@/components/invoices/sat/TableSatInvoicesComponent";
import { Options } from "@/interfaces/Common";
import { IMethodPayment } from "@/components/invoices/sat/SatInvoicesConditionsStepper";
import { getSatMotivosCancelacion } from "../api/routeSatInvoices";

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
  }

  return (
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableSatInvoicesComponent token={token} user={user._id} company={user.profile} optionsCancel={options} />
      </div>
    </>
  )
}
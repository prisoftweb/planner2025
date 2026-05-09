import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import TableSatInvoicesComponent from "@/components/invoices/sat/TableSatInvoicesComponent";

export default async function Page(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  return (
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableSatInvoicesComponent token={token} user={user._id} company={user.profile} />
      </div>
    </>
  )
}
import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers"
import { UsrBack } from "@/interfaces/User";
import ContainerQuatationProfile from "@/components/quotations/ContainerQuatationProfile";
export default function page({ params }: { params: { idp: string, idc:string }}) {

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        {/* <ContainerCollectionsProject project={project} collections={collections} token={token} user={user._id} 
          totalInvoiceProject={totalInvoicesProject} resumenInvoice={totalInvoicesResumen} /> */}
      </div>
    </>
  )
}

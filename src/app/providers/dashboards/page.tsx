import Navigation from "@/components/navigation/Navigation";
import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import DashboardContainer from "@/components/providers/dashboard/DashboardContainer";

export default function page() {

  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <DashboardContainer />
      </div>
    </>
  )
}

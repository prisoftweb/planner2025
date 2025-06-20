import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import TableCollectionsComponent from "@/components/collections/TableCollectionsComponent";
import NewTableCollections from "@/components/collections/NewTableCollections";

export default async function Page(){

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableCollectionsComponent token={token} user={user._id} />
        {/* <NewTableCollections token={token} user={user._id} /> */}
      </div>
    </>
  )
}
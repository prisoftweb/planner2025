import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import TableCollectionsComponent from "@/components/collections/TableCollectionsComponent";
import { getCollectionsMin, getAllTotalAmountRecoveredCollection } from "../api/routeCollections";
import { getDate } from "@/libs/dates";

export default async function Page(){

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const data={
    condition: [],
    conditionCharged:['678ed05cc5f08e8a0f36d5e1', '67d20e2959865f640af92682'],
    conditionAccountsReceivable:['67d20cb359865f640af92638'],
  }

  const [res, rest] = await Promise.all([
    getCollectionsMin(token), 
    getAllTotalAmountRecoveredCollection(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()), data)
  ]);

  if(typeof(res) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{res}</h1>
        </div>
      </>
    )

  if(typeof(rest) === "string")
    return(
      <>
        <Navigation user={user} />
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{rest}</h1>
        </div>
      </>
    )

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableCollectionsComponent token={token} user={user._id} collectionsParam={res} totalParam={rest} />
      </div>
    </>
  )
}
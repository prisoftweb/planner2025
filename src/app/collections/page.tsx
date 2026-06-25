import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import TableCollectionsComponent from "@/components/collections/TableCollectionsComponent";
import { getAllTotalAmountRecoveredCollection, 
  getAllTOTAmountRecoveredByDateAndCondition, getAllCollectionsMINByDateAndCondition } from "../api/routeCollections";
import { getDate } from "@/libs/dates";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page(){

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const data={
    condition: [],
    conditionCharged:['678ed05cc5f08e8a0f36d5e1', '67d20e2959865f640af92682'],
    conditionAccountsReceivable:['67d20cb359865f640af92638'],
  }

  const [res, rest, restt, resresource] = await Promise.all([
    getAllCollectionsMINByDateAndCondition(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()),{
          "condition": [
              "67e31aa81945c0b1e4c9bc76", "67e318171945c0b1e4c9bc72", "67e318601945c0b1e4c9bc74"
          ]
      }), 
    getAllTotalAmountRecoveredCollection(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()), data),
    getAllTOTAmountRecoveredByDateAndCondition(token, getDate(new Date(new Date().getFullYear(), 0, 1)), getDate(new Date()), []),
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(res) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{res}</h1>
        </div> */}
        <ComponentError page="/collections" message={res} />
      </>
    )

  if(typeof(rest) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{rest}</h1>
        </div> */}
        <ComponentError page="/collections" message={rest} />
      </>
    )

  if(typeof(restt) === "string")
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        {/* <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <h1 className="text-center text-red-500">{restt}</h1>
        </div> */}
        <ComponentError page="/collections" message={restt} />
      </>
    )

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableCollectionsComponent token={token} user={user._id} collectionsParam={res} totalParam={rest} 
          totalRecoveredP={restt[0]} company={user.profile} />
      </div>
    </>
  )
}
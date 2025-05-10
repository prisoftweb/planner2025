import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
// import Header from "@/components/HeaderPage";
// import SearchInTable from "@/components/SearchInTable";
import TableCollectionsComponent from "@/components/collections/TableCollectionsComponent";

export default async function Page(){

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  // let collections: ICollectionMin[]=[];
  // try {
  //   collections = await getCollectionsByProjectMin(token, project._id);
  //   if(typeof(collections) === "string")
  //     return(
  //       <>
  //         <Navigation user={user} />
  //         <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
  //           <h1 className="text-center text-red-500">collections{collections}</h1>
  //         </div>
  //       </>
  //     )
  // } catch (error) {
  //   return(
  //     <>
  //       <Navigation user={user} />
  //       <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
  //         <h1 className="text-center text-red-500">Ocurrio un error al obtener los cobros del proyecto!!</h1>
  //       </div>
  //     </>
  //   ) 
  // }

  return (
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableCollectionsComponent token={token} user={user._id} />
      </div>
    </>
  )
}
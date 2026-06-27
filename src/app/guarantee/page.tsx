import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import TableGuaranteeComponent from "@/components/guarantee/TableGuaranteeComponent";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "@/app/api/routeRoles";

export default async function Page(){

  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [resresource] = await Promise.all([
    getAllResourcesByROL(token, user.rol?._id?? ''),
  ]);

  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(!token || token===''){
    return (
      <>
        <Navigation user={user} token={''} resources={resresource} />
        <ComponentError page="/guarantee" message="No estas logueado" />
      </>
    )
  }

  return (
    <>
      <Navigation user={user} token={token} resources={resresource} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10 w-full">
        <TableGuaranteeComponent token={token} user={user._id} />
      </div>
    </>
  )
}
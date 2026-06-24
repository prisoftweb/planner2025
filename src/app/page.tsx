import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ContainerNewCode from "@/components/codes/ContainerNewCode";
import { getCompany } from "@/app/api/routeCompany";
import { Company } from "@/interfaces/Companies"
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL } from "./api/routeRoles";

export default async function Home() {
  const cookieStore = cookies();
  
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');
  const token: string = cookieStore.get('token')?.value || '';

  const depto = typeof(user.department)==='string'? user.department:  user.department.name;
  const role = user.rol?.name || '';
  const idRole=user.rol?._id ?? '';

  // const rescomp: string|Company = await getCompany(token, user.profile);
  // const rescomp='Error al consultar logo de la compañia';

  const [rescomp, resresource]=await Promise.all([
    getCompany(token, user.profile),
    getAllResourcesByROL(token, idRole)
  ])

  if(typeof(resresource)==='string'){
    return (
      <>
        {/* {role.toLowerCase().includes('invitado')? <></>: (
          <Navigation user={user} token={token} />
        )} */}
        <ComponentError page="/" message={resresource} />
      </>
    )
  }
  
  if(typeof(rescomp)==='string'){
    return (
      <>
        {role.toLowerCase().includes('invitado')? <></>: (
          <Navigation user={user} token={token} />
        )}
        <ComponentError page="/" message={rescomp} />
      </>
    )
  }

  return (
    <>
      <div className="bg-white">
        {/* {role.toLowerCase().includes('invitado')? <></>: (
          <Navigation user={user} token={token} />
        )} */}
        <Navigation user={user} token={token} resources={resresource} />
        <div className="p-2 sm:p-3 md:p-5 flex justify-center">
          {depto.toLowerCase().includes('direccion') || role.toLowerCase().includes('invitado') || 
              role.toLowerCase().includes('residente') || 
              user._id === '679ac44767135227cd14d1e9' || user._id==='666243bfef1d807b24ed9a28'
              || user._id === '65d3836974045152c0c4378c' ? (
            <ContainerNewCode token={token} user={user._id} company={user.profile} />
          ): (
            typeof(rescomp)==='string'? <h1>Error al consultar logo de la compañia</h1>: <img src={rescomp.logo} alt="logo" 
            className="w-auto h-96" 
          />
          )}
        </div>
      </div>
    </>
  );
  // <img src="/img/Palaciosconstrucciones horizontal.svg" alt="logo" 
  //           className="w-auto h-96" 
  //         />
}
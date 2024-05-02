import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ButtonNewRole from "@/components/roles/ButtonNew";
import RolesClient from "@/components/roles/RolesClient";

export default async function Page(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  return(
    <>
      <Navigation user={user} />
      <RolesClient token={token} option={1}>
        <>Esta pagina no va</>
      </RolesClient>
      {/* <div className="flex">
        <div className="p-2 sm:p-3 md-p-5 lg:p-10">
          <WithOut img="/img/clientes.svg" subtitle="Roles" 
            text="Aqui puedes gestionar tus roles para usuarios que usen el sistema"
            title="Roles"><ButtonNewRole token={token} /></WithOut>  
        </div>
      </div> */}
    </>
  )
}
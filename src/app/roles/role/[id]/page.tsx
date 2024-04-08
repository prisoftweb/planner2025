import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import ArrowReturn from "@/components/ArrowReturn";
import Selectize from "@/components/Selectize";
import { Options } from "@/interfaces/Common";
import RoleProfile from "@/components/roles/RoleProfile";
import { getRole, getRoles, getTree } from "@/app/api/routeRoles";
import { Resource2, RoleUser } from "@/interfaces/Roles";
import { Tree } from "@/interfaces/Roles";
import PermissionResource from "@/components/roles/PermissionResource";

export default async function Page({ params, searchParams }: 
              { params: { id: string }, searchParams: { rs: string}}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let rol:RoleUser;
  try {
    rol = await getRole(token, params.id);
    if(typeof(rol) === 'string'){
      <h1 className="text-center text-lg text-red-500">{rol}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Ocurrio un error al obtener rol!!</h1>
  }

  let roles:RoleUser[];
  try {
    roles = await getRoles(token);
    if(typeof(roles) === 'string'){
      <h1 className="text-center text-lg text-red-500">{roles}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-lg text-red-500">Ocurrio un error al obtener roles!!</h1>
  }

  const options: Options[] = [];
  roles.map((role) => {
    options.push({
      label: role.name,
      value: role._id
    })
  });

  //660af0683b237344454ad085
  let tree: Tree;
  try {
    tree = await getTree(token, rol.tree? rol.tree: '660af0683b237344454ad085');
    if(typeof(tree)=== 'string') return <h1 className="text-ccenter text-lg text-red-500">{tree}</h1>
  } catch (error) {
    return <h1 className="text-ccenter text-lg text-red-500">Ocurrio un error al obter arbol!!</h1>
  }

  return(
    <>
      <Navigation user={user} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/roles/role" />
            <img src={'/img/default.jpg'} alt="logo cliente" className="w-12 h-12" />
            <p className="text-slate-500 mx-3">{rol.name}</p>
          </div>
          <Selectize options={options} routePage="roles/role" subpath="" />
        </div>
        <div className="flex gap-x-5 mt-5 w-full max-w-5xl px-2 flex-wrap bg-slate-200">
          <div className="w-full max-w-sm">
            <RoleProfile role={rol} resources={tree.resources} idRole={params.id} />
          </div>
          <div className="w-full max-w-md mt-3 pl-2 px-3">
            <PermissionResource rs={searchParams.rs} tree={tree} token={token} />
          </div>
        </div>
      </div>
    </>
  )
}
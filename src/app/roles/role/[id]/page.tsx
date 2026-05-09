import { cookies } from "next/headers";
import { UsrBack } from "@/interfaces/User";
import Navigation from "@/components/navigation/Navigation";
import ArrowReturn from "@/components/ArrowReturn";
import Selectize from "@/components/Selectize";
import RoleProfile from "@/components/roles/RoleProfile";
import { getRole, getRolesLV, getTree } from "@/app/api/routeRoles";
import { Tree } from "@/interfaces/Roles";
import PermissionResource from "@/components/roles/PermissionResource";

export default async function Page({ params, searchParams }: 
              { params: { id: string }, searchParams: { rs: string}}){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [rol, options] = await Promise.all([
    getRole(token, params.id),
    getRolesLV(token)
  ]);
  
  if(typeof(rol) === 'string'){
    <h1 className="text-center text-lg text-red-500">{rol}</h1>
  }
  
  if(typeof(options) === 'string'){
    <h1 className="text-center text-lg text-red-500">{options}</h1>
  }

  //660af0683b237344454ad085
  let tree: Tree;
  tree = await getTree(token, rol.tree? rol.tree: '660af0683b237344454ad085');
  if(typeof(tree)=== 'string') return <h1 className="text-ccenter text-lg text-red-500">{tree}</h1>

  return(
    <>
      <Navigation user={user} token={token} />
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex items-center my-2">
            <ArrowReturn link="/roles/role" />
            <img src={'/img/role.svg'} alt="logo" className="w-12 h-12" />
            <p className="text-slate-500 mx-3">{rol.name}</p>
          </div>
          <Selectize options={options} routePage="roles/role" subpath="" />
        </div>
        <div className="flex gap-x-5 mt-5 w-full max-w-5xl md:px-2 flex-wrap" 
          style={{'backgroundColor': '#F8FAFC'}}>
          <div className="w-full sm:max-w-sm">
            <RoleProfile role={rol} resources={tree.resources} idRole={params.id} />
          </div>
          <div className="w-full sm:max-w-md mt-3 md:pl-2 md:px-3">
            <PermissionResource rs={searchParams.rs} tree={tree} token={token} />
          </div>
        </div>
      </div>
    </>
  )
}
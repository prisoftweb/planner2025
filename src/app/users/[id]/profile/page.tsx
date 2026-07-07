import Navigation from "@/components/navigation/Navigation";
import { getUser, getUsers } from "@/app/api/routeUser";
import { cookies } from "next/headers";
import Selectize from "@/components/Selectize";
import { Options } from "@/interfaces/Common";
import HeaderImage from "@/components/HeaderImage";
import ContainerProfileUser from "@/components/users/ContainerProfileUser";
import { UsrBack } from "@/interfaces/User";
import ComponentError from "@/components/ComponentError";
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles";
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles";

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { opt: string } }){
  
  const cookieStore = cookies();
  const token: string = cookieStore.get('token')?.value || '';

  const currentUser: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  const [user, users]=await Promise.all([
    getUser(params.id, token),
    getUsers(token),
  ]);
  
  if(typeof(user) === "string"){
    return(
      <>
        {/* <Navigation user={user} token={token} resources={resresource} /> */}
        {/* <h1 className="text-center text-red-500">{user}</h1> */}
        <ComponentError page={`/users/${params.id}`} message={user} refresh={true} />
      </>
    )
  }

  if(typeof(users) === "string"){
    return(
      <>
        {/* <Navigation user={user} token={token} resources={resresource} /> */}
        {/* <h1 className="text-center text-red-500">{users}</h1> */}
        <ComponentError page={`/users/${params.id}`} message={users} />
      </>
    )
  }

  const [resresource, rescomponents] = await Promise.all([
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (currentUser.rol?._id?? ''), 'users', 'id/profile'),
  ]);
  
  if(typeof(resresource)==='string'){
    return (
      <>
        <ComponentError page="/" message={resresource} />
      </>
    )
  }

  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/users/${params.id}/profile`} message={rescomponents} />
      </>
    )
  }

  const photo=user.photo
  const name=user.name
  
  let options: Options[] = [];
  
  users.map((usr: any) => {
    options.push({
      value: usr._id,
      label: usr.name,
    })
  })

  // let opt = 1;
  // if(searchParams.opt==='2') opt = 2;
  // else if(searchParams.opt==='3') opt = 3;
  //   else if(searchParams.opt==='4') opt = 4;

  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };

  return(
    <>
      <Navigation user={user} token={token} resources={resresource} />
      {/* <Navigation user={currentUser} token={token} /> */}
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <HeaderImage image={photo? photo: '/img/default.jpg'} previousPage="/users" title={name} >
          <>
            <div className="hidden md:block w-full max-w-80 lg:max-w-md">
              {result.components.includes('findall') && (
                <Selectize options={options} routePage="users" subpath="/profile?opt=1" />
              )}
            </div>
          </>
        </HeaderImage>
        <div className=" md:hidden mt-2">
          {result.components.includes('findall') && (
            <Selectize options={options} routePage="users" subpath="/profile?opt=1" />
          )}
        </div>
        {/* <div className="mt-3">
          <NavTab idUser={params.id} tab={'1'} />
        </div> */}
        {/* <TabUser user={user} opt={opt} /> */}
        <ContainerProfileUser token={token} user={user} permissions={result} />
      </div>
    </>
  )
}
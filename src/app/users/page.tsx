import { getUsers } from "../api/routeUser"; //routerUser contiene las llamadas a los endpoints de usuarios
import { cookies } from "next/headers"; // Leer cookies del lado del servidor, propiedad de next
import { UsrBack } from "@/interfaces/User"; // En el archivo User en la interfaces estan las estructuras que se usan en usuarios para tipar el codigo
import { getDepartmentsLV } from "../api/routeDepartments"; //En la carpeta api se ponen todas las llamadas de los endpoints, se le agrega nombre para identificarlos
import Navigation from "@/components/navigation/Navigation"; //Componente para mostrar el menu
import WithOut from "@/components/WithOut"; //Componente que se muestra cuando no hay registros, muestra imagen y mensaje sobre la pagina
import ButtonNewUser from "@/components/users/ButtonNewUser"; //Componente que muestra boton para crear usuario y manda a llamar al archivo del formulario
import { getRolesLV } from "../api/routeRoles"; // endpoints de roles
import UsersConstext from "@/components/users/UsersContext"; // Componente que encapsula la tabla de usuarios
import ComponentError from "@/components/ComponentError"; //Componente que se muestra cuando falla la llamada a algun endpoint
import { getAllResourcesByROL, getAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/app/api/routeRoles"; // llamadas a los endpoints para traer los menu del del rol y los componentes y permisos del rol
import { IAllComponentsByROUTESAndRESOURCESAndROLFULL } from "@/interfaces/Roles"; // interface para tipar los permisos y componentes con la estructura que se recibe del backend

export default async function Users() {  

  const cookieStore = cookies(); //Obtenemos el objeto que contiene las cookies
  const token = cookieStore.get('token')?.value || ''; // consultamos el valor de la cookie token, como el valor puede o no existir se agrega que sino existe mande una cadena vacia que no romperia la peticion 

  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||''); // obtenemos la informacion guardada del usuario
  
  // se hacen los llamados a los endpoints de forma paralela, end los route donde se encuentran los llamados se valida con try catch si funciona o no
  //en caso de error regresa una cadena con el error, por eso las validaciones que se hacen aqui se comparan si es una cadena o no
  const [users, optionsRoles, departments, resresource, rescomponents] = await Promise.all([
    getUsers(token),
    getRolesLV(token),
    getDepartmentsLV(token),
    getAllResourcesByROL(token, user.rol?._id?? ''),
    getAllComponentsByROUTESAndRESOURCESAndROLFULL(token, (user.rol?._id?? ''), 'users', ''),
  ]);

  //si la variable es de tipo cadena significa que la peticion fallo y se muestra el error con con el mensaje que regresa
  //en esta validacion no se agrega el componente de menu porque la peticion que fallo es la que tiene los recursos que se pueden mostrar
  if(typeof(resresource)==='string'){
        return (
          <>
            <ComponentError page="/" message={resresource} />
          </>
        )
      }

  // todas las validaciones son iguales solo se busca que sea cadena, porque es lo que indica que fallo
  if(typeof(rescomponents) === "string"){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page={`/projects/history`} message={rescomponents} />
      </>
    )
  }

  if(typeof(users)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/users" message={users} />
      </>
    )
  }

  if(typeof(optionsRoles)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/users" message={optionsRoles} />
      </>
    )
  }

  if(typeof(departments)==='string'){
    return(
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <ComponentError page="/users" message={departments} />
      </>
    )
  }

  //se valida si el arreglo viene vacio para mostrar el componente de que no hay datos
  if(!users || users.length === 0 ){
    return (
      <>
        <Navigation user={user} token={token} resources={resresource} />
        <WithOut img="/img/user.svg" subtitle="Usuarios" 
            text="Aqui puedes gestionar tus usuarios con toda su informacion" title="Usuarios"
          ><ButtonNewUser optionsDepartments={departments} token={token} 
              roles={optionsRoles} />
        </WithOut>
      </>
    )
  }

  //se procesan los datos que manda el backend en componentes y permisos, para agrupar los componentes en un arreglo de cadenas y un solo objeto de permisos y que sea mas facil su implementacion
  const result = {
    permission: rescomponents[0]?.permission ?? {},
    components: rescomponents.map((item: IAllComponentsByROUTESAndRESOURCESAndROLFULL) => item.component)
  };
  
  return (
    <>
      {/* se llama al componente del menu, se le pasa el usuario actual, su token, y los recursos a los que tiene permiso */}
      <Navigation user={user} token={token} resources={resresource} />
      {/* se agrega un div con el margen que se le pone al contenido */}
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <UsersConstext departments={departments} optionsRoles={optionsRoles} token={token} users={users} />
      </div>
    </>
  );
}

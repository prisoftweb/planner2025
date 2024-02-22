import HeaderForm from "../HeaderForm"
import CardConfig from "./CardConfig"
import { updateUser } from "@/app/api/routeUser"
import { showToastMessage, showToastMessageError } from "../Alert"
import { useRouter } from "next/navigation"
//import DeleteUser from "./DeleteUser"
import ButtonDeleteUser from "./ButtonDeleteUser"

export default function ConfigUser({token, user, status}:{token:string, user:any, status:boolean}){ 
  
  const router = useRouter();

  const changeStatus = async (value:boolean, id:string, token:string) => {
    try{
      const res = await updateUser({status:value}, token, id);
      if(res===200) {
        status? showToastMessage('El usuario ha sido habilitado!!') : 
                showToastMessage('El usuario ha sido deshabilitado');
        router.refresh();
      }else{
        showToastMessageError(res);
      }
    }catch(e){
      showToastMessageError('Ocurrio un problema al cambiar el estado del usuario!!');
    }
  }
  
  // const deleteUser = (id:string, token:string) => {
  // }

  return(
    <>
      <HeaderForm img="/nuevoIcono.jpg" subtitle="Acceso al sistema" 
        title="Configuracion"
      />
      <div>
        {status? (
          <CardConfig 
            //buttonText="DESHABILITAR USUARIO"
            text="AL DAR CLICK, NO ELIMINARÁ AL USUARIO DE NUESTROS REGISTROS Y SE PODRÁ 
              HABILITAR DE NUEVO. EL USUARIO NO TENDRA ACCESO AL SISTEMA"
            title="Deshabilitar usuario"
            //styleButton="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
            //onclick={() => changeStatus(false, id, token)}
          >
            <button onClick={() => changeStatus(false, user._id, token)}
              className="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
            >DESHABILITAR USUARIO</button>
          </CardConfig>
        ): (
          <CardConfig 
            //buttonText="HABILITAR USUARIO"
            text="AL DAR CLICK, PODRÁ HABILITAR DE NUEVO AL USUARIO. 
              EL USUARIO TENDRA ACCESO AL SISTEMA"
            title="Habilitar usuario"
            //styleButton="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
          >
            <button onClick={() => changeStatus(false, user._id, token)}
              className="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
            >DESHABILITAR USUARIO</button>
          </CardConfig>
        )}
        <CardConfig 
          //buttonText="ELIMINAR USUARIO"
          text="ELIMINARÁS DEFINITIVAMENTE AL USUARIO SIN LA POSIBILIDAD
            DE RECUPERAR LA INFORMACIÓN, TENDRAS QUE SOLICITAR NUEVA CUENTA."
          title="Eliminar usuario"
          //styleButton="bg-red-600 rounded-full text-white w-full py-2 hover:bg-red-400"
          //onclick={() => deleteUser(id, token)}
        >
          <ButtonDeleteUser token={token} user={user} />
        </CardConfig>
      </div>
    </>
  )
}
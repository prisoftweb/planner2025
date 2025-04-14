import HeaderForm from "../HeaderForm"
import CardConfig from "./CardConfig"
import { updateUser } from "@/app/api/routeUser"
import { showToastMessage, showToastMessageError } from "../Alert"
import ButtonDeleteUser from "./ButtonDeleteUser"

export default function ConfigUser({token, user, status}:{token:string, user:any, status:boolean}){ 
  
  const changeStatus = async (value:boolean, id:string, token:string) => {
    try{
      const res = await updateUser({status:value}, token, id);
      if(res===200) {
        value? showToastMessage('El usuario ha sido habilitado!!') : 
                showToastMessage('El usuario ha sido deshabilitado');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else{
        showToastMessageError(res);
      }
    }catch(e){
      showToastMessageError('Ocurrio un problema al cambiar el estado del usuario!!');
    }
  }

  return(
    <>
      <HeaderForm img="/img/user.svg" subtitle="Acceso al sistema" 
        title="Configuracion"
      />
      <div className="mt-4 border border-gray-200 rounded-lg shadow p-4 space-y-5">  
        {status? (
          <CardConfig 
            text="AL DAR CLICK, NO ELIMINARÁ AL USUARIO DE NUESTROS REGISTROS Y SE PODRÁ 
              HABILITAR DE NUEVO. EL USUARIO NO TENDRA ACCESO AL SISTEMA"
            title="Deshabilitar usuario"
          >
            <button onClick={() => changeStatus(false, user._id, token)}
              className="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
            >DESHABILITAR USUARIO</button>
          </CardConfig>
        ): (
          <CardConfig 
            text="AL DAR CLICK, PODRÁ HABILITAR DE NUEVO AL USUARIO. 
              EL USUARIO TENDRA ACCESO AL SISTEMA"
            title="Habilitar usuario"
          >
            <button onClick={() => changeStatus(true, user._id, token)}
              className="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
            >HABILITAR USUARIO</button>
          </CardConfig>
        )}
        <CardConfig 
          text="ELIMINARÁS DEFINITIVAMENTE AL USUARIO SIN LA POSIBILIDAD
            DE RECUPERAR LA INFORMACIÓN, TENDRAS QUE SOLICITAR NUEVA CUENTA."
          title="Eliminar usuario"
        >
          <ButtonDeleteUser token={token} user={user} />
        </CardConfig>
      </div>
    </>
  )
}
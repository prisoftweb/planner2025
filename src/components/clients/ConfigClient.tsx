import HeaderForm from "../HeaderForm"
import { showToastMessage, showToastMessageError } from "../Alert"
import CardConfig from "../users/CardConfig"
import ButtonDeleteClient from "./ButtonDeleteClient"
import { updateClient } from "@/app/api/routeClients"
import { ClientBack } from "@/interfaces/Clients"

export default function ConfigClient({token, client, status}:{token:string, client:ClientBack, status:boolean}){ 
  
  const changeStatus = async (value:boolean, id:string, token:string) => {
    try{
      const res = await updateClient(id, token, {status:value});
      if(typeof(res)==='string') {
        showToastMessageError(res);
      }else{
        value? showToastMessage('El cliente ha sido habilitado!!') : 
                showToastMessage('El cliente ha sido deshabilitado');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }catch(e){
      showToastMessageError('Ocurrio un problema al cambiar el estado del cliente!!');
    }
  }

  return(
    <>
      <HeaderForm img="/img/clientes.svg" subtitle="Acceso al sistema" 
        title="Configuracion"
      />
      <div className="mt-4 border border-gray-200 rounded-lg shadow p-4 space-y-5">  
        {status? (
          <CardConfig 
            text="AL DAR CLICK, NO ELIMINARÁ AL CLIENTE DE NUESTROS REGISTROS Y SE PODRÁ 
              HABILITAR DE NUEVO. SE PUEDE VISUALIZAR EL HISTORIAL DEL CLIENTE"
            title="Deshabilitar cliente"
          >
            <button onClick={() => changeStatus(false, client._id, token)}
              className="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
            >DESHABILITAR CLIENTE</button>
          </CardConfig>
        ): (
          <CardConfig 
            text="AL DAR CLICK, PODRÁ HABILITAR DE NUEVO AL CLIENTE."
            title="Habilitar cliente"
          >
            <button onClick={() => changeStatus(true, client._id, token)}
              className="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
            >HABILITAR CLIENTE</button>
          </CardConfig>
        )}
        <CardConfig 
          text="ELIMINARÁS DEFINITIVAMENTE AL CLIENTE SIN LA POSIBILIDAD
            DE RECUPERAR LA INFORMACIÓN, TENDRAS QUE AGREGAR SUS DATOS SI LO OCUPAS NUEVAMENTE."
          title="Eliminar cliente"
        >
          <ButtonDeleteClient token={token} client={client} />
        </CardConfig>
      </div>
    </>
  )
}
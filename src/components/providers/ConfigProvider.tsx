import HeaderForm from "../HeaderForm"
import { showToastMessage, showToastMessageError } from "../Alert"
import CardConfig from "../users/CardConfig"
import { Provider } from "@/interfaces/Providers"
import { updateProvider } from "@/app/api/routeProviders"
import ButtonDeleteProvider from "./ButtonDeleteProvider"

export default function ConfigProvider({token, provider, status}:{token:string, provider:Provider, status:boolean}){ 
  
  const changeStatus = async (value:boolean, id:string, token:string) => {
    try{
      const res = await updateProvider(id, token, {status:value});
      if(typeof(res)==='string') {
        showToastMessageError(res);
      }else{
        value? showToastMessage('El proveedor ha sido habilitado!!') : 
                showToastMessage('El proveedor ha sido deshabilitado');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }catch(e){
      showToastMessageError('Ocurrio un problema al cambiar el estado del proveedor!!');
    }
  }

  return(
    <>
      <HeaderForm img="/img/provider.svg" subtitle="Acceso al sistema" title="Configuracion" />
      <div className="mt-4 border border-gray-200 rounded-lg shadow p-4 space-y-5">  
        {status? (
          <CardConfig 
            text="AL DAR CLICK, NO ELIMINARÁ AL PROVEEDOR DE NUESTROS REGISTROS Y SE PODRÁ 
              HABILITAR DE NUEVO. SE PUEDE VISUALIZAR EL HISTORIAL DEL PROVEEDOR"
            title="Deshabilitar proveedor"
          >
            <button onClick={() => changeStatus(false, provider._id, token)}
              className="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
            >DESHABILITAR PROVEEDOR</button>
          </CardConfig>
        ): (
          <CardConfig 
            text="AL DAR CLICK, PODRÁ HABILITAR DE NUEVO AL PROVEEDOR."
            title="Habilitar proveedor"
          >
            <button onClick={() => changeStatus(true, provider._id, token)}
              className="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
            >HABILITAR PROVEEDOR</button>
          </CardConfig>
        )}
        <CardConfig 
          text="ELIMINARÁS DEFINITIVAMENTE AL PROVEEDOR SIN LA POSIBILIDAD
            DE RECUPERAR LA INFORMACIÓN, TENDRAS QUE AGREGAR SUS DATOS SI LO OCUPAS NUEVAMENTE."
          title="Eliminar proveedor"
        >
          <ButtonDeleteProvider token={token} provider={provider} />
        </CardConfig>
      </div>
    </>
  )
}
import HeaderForm from "../HeaderForm"
import CardConfig from "./CardConfig"

export default function ConfigUser(){
  return(
    <>
      <HeaderForm img="/nuevoIcono.jpg" subtitle="Acceso al sistema" 
        title="Configuracion"
      />
      <div>
        <CardConfig 
          buttonText="DESHABILITAR USUARIO"
          text="AL DAR CLICK, NO ELIMINARÁ AL USUARIO DE NUESTROS REGISTROS Y SE PODRÁ 
            HABILITAR DE NUEVO. EL USUARIO NO TENDRA ACCESO AL SISTEMA"
          title="Deshabilitar usuario"
          styleButton="bg-black rounded-full text-white w-full py-2 hover:bg-slate-700"
        />
        <CardConfig 
          buttonText="ELIMINAR USUARIO"
          text="ELIMINARÁS DEFINITIVAMENTE AL USUARIO SIN LA POSIBILIDAD
            DE RECUPERAR LA INFORMACIÓN, TENDRAS QUE SOLICITAR NUEVA CUENTA."
          title="Eliminar usuario"
          styleButton="bg-red-600 rounded-full text-white w-full py-2 hover:bg-red-400"
        />
      </div>
    </>
  )
}
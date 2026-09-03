import { useState, useRef } from "react";
import HeaderForm from "@/components/HeaderForm";
import { IWorkSpaceMin } from "@/interfaces/WorkSpaces";

type ConfigDataProps = {
  id:string, 
  token:string,
  workspace: IWorkSpaceMin
}

export default function ConfigData({ id, token, workspace}: ConfigDataProps){
  // const refRequest = useRef(true);

  const [emailVerified, setEmailVerified]=useState<boolean>(workspace.isverificatedEmail?? false);
  const [phoneVerified, setPhoneVerified]=useState<boolean>(workspace.isverificatedPhone?? false);
  const [accountVerified, setAccountVerified]=useState<boolean>(false);
  const [additionalDataVerified, setAdditionalDataVerified]=useState<boolean>(false);

  return(
    <>
      <HeaderForm title="Modificar datos de cuenta" img="/img/projects/default.jpg" subtitle="Modificar tu perfil o cuenta" />
      <form id="basicdata" className="mt-4 w-full">        
        <div className="mt-5 bg-white rounded-lg shadow-md p-2">
          <div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Tiempo de contratación</p>
                <p className="text-blue-700 text-xl">Servicios Saas</p>
              </div>
              <div></div>
            </div>
            <div className="pl-5">
              <CardComponent name="Valida desde" desc="Fecha de inicio de contratación" value={workspace.validFrom?.substring(0,10)?? ''} />
              <CardComponent name="Valida hasta" desc="Fecha de termino de contratación" value={workspace.validTo?.substring(0, 10)?? ''} />
            </div>
          </div>
        </div>

        <div className="mt-5 bg-white rounded-lg shadow-md p-2">
          <div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Configuración actual del espacio de trabajo</p>
                <p className="text-blue-700 text-xl">Verificación</p>
              </div>
              <div></div>
            </div>
            <div className="pl-5">
              <ToogleComponent name="Teléfono verificado" desc="Teléfono fue verificado con codigo" value={phoneVerified} />
              <ToogleComponent name="Correo verificado" desc="Correo fue verificado con codigo" value={emailVerified} />
              <ToogleComponent name="Cuenta verificada" desc="Cuenta fue verificada con codigo" value={accountVerified} />
              <ToogleComponent name="Datos adicionales" desc="Captura los datos adicionales de un cliente" value={additionalDataVerified} />
            </div>
          </div>
        </div>
        
      </form>
    </>
  )
}

export const ToogleComponent = ({desc, name, value}: {name:string, desc:string, value:boolean}) => {

  const [status, setStatus]=useState<boolean>(value);

  return(
    <>
      <div className="flex justify-between mt-1">
        <div>
          <p>{name}</p>
          <p className="text-blue-500 text-sm">{desc}</p>
        </div>
        <div>
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={status} 
              onClick={() => {
                setStatus(!status);
              }} 
              id={`${name}`} 
              type="checkbox"
              disabled={true}
              onChange={() => console.log('')}
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                peer-checked:border-green-500 peer-checked:before:bg-green-500
                border border-slate-300" />
            <label htmlFor={`${name}`}
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export const CardComponent = ({desc, name, value}: {name:string, desc:string, value:string}) => {

  return(
    <>
      <div className="flex justify-between mt-1">
        <div>
          <p>{name}</p>
          <p className="text-blue-500 text-sm">{desc}</p>
        </div>
        <div>
          <p className="text-slate-700">{value}</p>
        </div>
      </div>
    </>
  )
}
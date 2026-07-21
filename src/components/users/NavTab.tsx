'use client'
import { UserIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import { IPermissionsAndComponents } from "@/interfaces/Roles"

export default function NavTab({tab, handleTab, permissions}: {tab:number, handleTab: (numTab: number) => void, permissions:IPermissionsAndComponents}){

  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
    return () => window.removeEventListener('scroll', handleResize);
  }, [])
  
  let tabUser: JSX.Element = <></>;

  if(width < 710){
    // diseno responsivo del tab para cambiar de pestana en el perfil del usuario
    // se valida con los componentes si tiene permiso para verlo o sino no se muestra la opcion
    tabUser=<div className="grid grid-cols-5 mt-3 border-t pt-2 gap-y-2">
              {permissions.components.includes("personaldata") && (
                <div onClick={() => handleTab(1) } className="flex flex-col items-center" >
                  <UserIcon
                    className={`w-6 h-6 cursor-pointer ${tab===1 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                  <span className="text-xs">Perfil</span>
                </div >
              )}

              {permissions.components.includes("updatephoto") && (
                <div  onClick={() => handleTab(2) } className="flex flex-col items-center">
                  <MdOutlinePhotoLibrary
                    className={`w-6 h-6 cursor-pointer ${tab===2 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                  <span className="text-xs">Cambiar foto</span>
                </div >
              )}

              {permissions.components.includes("updatepassword") && (
                <div onClick={() => handleTab(3) } className="flex flex-col items-center">
                  <TbPasswordUser
                    className={`w-6 h-6 cursor-pointer ${tab===3 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                  <span className="text-xs text-center">Cambiar contraseña</span>
                </div >
              )}

              <div onClick={() => handleTab(4) } className="flex flex-col items-center">
                <QuestionMarkCircleIcon
                  className={`w-6 h-6 cursor-pointer ${tab===4 ? 'text-green-500' : 'text-slate-500'}`}
                />
                <span className="text-xs">Logs</span>
              </div >

              {permissions.components.includes("deleteuser") && (
                <div onClick={() => handleTab(5) } className="flex flex-col items-center">
                  <FaUserCog
                    className={`w-6 h-6 cursor-pointer ${tab===5 ? 'text-green-500' : 'text-slate-500'}`}
                  />
                  <span className="text-xs">Configuracion</span>
                </div >
              )}

            </div>
  }else{
    // mismo componente pero en opcion de pantalla mas grande
    tabUser=(
      <div className="flex mt-5 py-1 border-b border-blue-300">
        {permissions.components.includes("personaldata") && (
          <div className={`w-50 px-5 cursor-pointer ${tab===1? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600" onClick={() => handleTab(1)}>Perfil</p>
          </div>
        )}
        {permissions.components.includes("updatephoto") && (
          <div className={`w-50 px-5 cursor-pointer ${tab===2? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600" onClick={() => handleTab(2)}>Cambiar foto</p>
          </div>
        )}
        {permissions.components.includes("updatepassword") && (
          <div className={`w-50 px-5 cursor-pointer ${tab===3? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600" onClick={() => handleTab(3)}>Cambiar contraseña</p>
          </div>
        )}
        <div className={`w-50 px-5 cursor-pointer ${tab===4? 'border-b-4 border-blue-600':''}`}>
          <p className="text-blue-600" onClick={() => handleTab(4)}>Logs</p>
        </div>
        {permissions.components.includes("deleteuser") && (
          <div className={`w-50 px-5 cursor-pointer ${tab===5? 'border-b-4 border-blue-600':''}`}>
            <p className="text-blue-600" onClick={() => handleTab(5)}>Configuracion</p>
          </div>
        )}
      </div>
    )
  }

  return(
    <>
      {tabUser}
    </>
  )
}
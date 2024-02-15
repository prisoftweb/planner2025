'use client'

import { Bars3Icon, UserIcon, Cog6ToothIcon, PhotoIcon, StarIcon, ArrowRightStartOnRectangleIcon } 
  from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
//import RemoveCookies from "../RemoveCookies"
import NavItem from "./NavItem"

export default function Navigation(){
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  }

  const toggleProfile = () => {
    setIsOpenP(!isOpenP);
  }
  
  let name='NOAutorizado', photo='/img/default.jpg', role='', ok=false, id='1234567890'; 
  // let name = user.name;
  // let photo = user.photo;
  // let role = user.role;
  // let id = user._id;
  
  const router = useRouter();
  
  function logOut(){
    //RemoveCookies();
    router.push('/login');
  }
  
  return(
    <>
      <nav className="bg-black top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between">
        <Bars3Icon width={40} height={40} className="md:hidden cursor-pointer ml-2 rounded-md p-1 bg-slate-500 text-white" onClick={toggleNavBar} />
        <Image src={'/nuevoIcono.jpg'} alt="logo" width={50} height={50} priority />
        <div className="w-1/12 md:w-9/12 flex justify-end">
          <div className="hidden w-full text-white md:flex justify-between ">
            <NavItems role={role} /> 
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex justify-around items-center w-20 text-white">
            {/* <p className="invisible md:visible text-2xl"> | </p> */}
            {/* <Link href={'/'}><ChartBarIcon width={30} height={30} /></Link> */}
            {/* <Link href={'/issues'}><Cog8ToothIcon width={30} height={30} /></Link> */}
          </div>
          <Image src={photo} alt="profile" width={50} height={50} 
                  onClick={toggleProfile} className="cursor-pointer"
          />
        </div>
      </nav>
      {isOpen && (
          <div className="flex text-gray-200 bg-blue-950 md:hidden flex-col items-start pl-2  basis-full">
            <NavItems role={role} />
          </div>
        )}
      {isOpenP && (
        <div className="flex justify-end">
          <div className="flex flex-col w-44 absolute z-50 text-xs bg-white border-2 border-slate-300">
            <Link href={``} className="py-1 hover:text-gray-900 hover:bg-gray-200">
              <div className="flex p-2 items-center">
                <UserIcon className="w-4 h-4 mr-2 text-slate-500" />
                Editar Perfil
              </div>
            </Link>
            <Link href={``} className="py-1 hover:text-gray-900 hover:bg-gray-200">
              <div className="flex p-2 items-center">
                <Cog6ToothIcon className="w-4 h-4 mr-2 text-slate-500" />
                Configuracion
              </div>
            </Link>
            <Link href={``} className="py-1 hover:text-gray-900 hover:bg-gray-200">
              <div className="flex p-2 items-center">
                <PhotoIcon className="w-4 h-4 mr-2 text-slate-500" />
                Cambiar foto
              </div>
            </Link>
            <Link href={``} className="py-1 hover:text-gray-900 hover:bg-gray-200">
              <div className="flex p-2 items-center">
                <StarIcon className="w-2 h-2 text-slate-500" />
                <StarIcon className="w-2 h-2 mr-2 text-slate-500" />
                Cambiar Contrasena
              </div>
            </Link>
            <div className="flex p-2 items-center hover:text-gray-900 hover:bg-gray-200 cursor-pointer">
                <ArrowRightStartOnRectangleIcon className="w-4 h-4 mr-2 text-slate-500" />
              <p className="py-1" onClick={logOut}>Salir</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const NavItems = ({role}: {role:string}) => {
  return(
    <>
      <NavItem name="Gastos" items={[
          {
            name: 'Costos',
            link: 'link1'
          },
          {
            name: 'Mano de obra',
            link: 'link2'
          },
          {
            name: 'Centro de costos',
            link: 'link3'
          }
        ]} 
      />
      <NavItem name="Proyectos" items={[]}/>
      <NavItem name="Catalogos" items={[]}/>
      <NavItem name="Informes" items={[]}/>
      <NavItem name="Dashboard" items={[]}/>
    </>
  )
};
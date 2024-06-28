'use client'

import { Bars3Icon, UserIcon, Cog6ToothIcon, PhotoIcon, StarIcon, ArrowRightStartOnRectangleIcon } 
  from "@heroicons/react/24/solid"
import { MdPassword } from "react-icons/md";
  import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import RemoveCookies from "@/app/functions/RemoveCookies"
import NavItem from "./NavItem"
import { UsrBack } from "@/interfaces/User"
import { useOutsideClick } from "@/app/functions/useOutsideClick";

export default function Navigation({user}: {user:UsrBack}){
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  }

  const toggleProfile = () => {
    setIsOpenP(!isOpenP);
  }

  let photo='/img/default.jpg', role='', id='';
  
  if(user.photo){
    photo = user.photo;
  }

  if(user){
    id = user._id;
  }

  role = user.rol?.name || '';
  console.log('role ', role);
  console.log('user role ', user.rol);

  const ref = useOutsideClick(() => {
    //console.log('Clicked outside of MyComponent');
    if(isOpenP){
      setIsOpenP(false);
    }
  });

  const router = useRouter();
  
  function logOut(){
    console.log('logout ');
    RemoveCookies();
    router.push('/login');
  }
  
  return(
    <>
      <nav className="bg-black h-16 fixed top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between p-2">
        <Bars3Icon width={40} height={40} className="md:hidden cursor-pointer ml-2 rounded-md p-1 bg-slate-500 text-white" onClick={toggleNavBar} />
        <Image src={'/nuevoIcono.jpg'} alt="logo" width={50} height={50} className="rounded-md" priority />
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
                  onClick={toggleProfile} className="cursor-pointer rounded-full"
          />
        </div>
      </nav>
      {isOpen && (
          <div className="flex text-gray-200 bg-blue-950 md:hidden flex-col items-start pl-2  basis-full">
            <NavItems role={role} />
          </div>
        )}
      {isOpenP && (
        <div className="flex justify-end" ref={ref}>
          <div className="flex flex-col w-44 absolute z-50 text-xs bg-white border-2 border-slate-300">
            {role.toLowerCase().includes('residente')? (
              <div className="flex p-2 items-center hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
                onClick={() => logOut()}
              >
                  <ArrowRightStartOnRectangleIcon className="w-4 h-4 mr-2 text-slate-500" />
                <p className="py-1" >Salir</p>
              </div>
            ): (
              <>
                <Link href={`/users/${id}?tab=1&&opt=1`} className="py-1 hover:text-gray-900 hover:bg-gray-200">
                  <div className="flex p-2 items-center">
                    <UserIcon className="w-4 h-4 mr-2 text-slate-500" />
                    Editar Perfil
                  </div>
                </Link>
                <Link href={`/users/${id}?tab=1&&opt=4`} className="py-1 hover:text-gray-900 hover:bg-gray-200">
                  <div className="flex p-2 items-center">
                    <Cog6ToothIcon className="w-4 h-4 mr-2 text-slate-500" />
                    Configuracion
                  </div>
                </Link>
                <Link href={`/users/${id}?tab=1&&opt=2`} className="py-1 hover:text-gray-900 hover:bg-gray-200">
                  <div className="flex p-2 items-center">
                    <PhotoIcon className="w-4 h-4 mr-2 text-slate-500" />
                    Cambiar foto
                  </div>
                </Link>
                <Link href={`/users/${id}?tab=1&&opt=3`} className="py-1 hover:text-gray-900 hover:bg-gray-200">
                  <div className="flex p-2 items-center">
                    <MdPassword className="w-2 h-2 text-slate-500" />
                    <MdPassword className="w-2 h-2 mr-2 text-slate-500" />
                    Cambiar Contrasena
                  </div>
                </Link>
                <div className="flex p-2 items-center hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
                  onClick={() => logOut()}
                >
                    <ArrowRightStartOnRectangleIcon className="w-4 h-4 mr-2 text-slate-500" />
                  <p className="py-1" >Salir</p>
                </div>
              </>  
            )}
            
          </div>
        </div>
      )}
    </>
  )
}

const NavItems = ({role}: {role:string}) => {
  if(role.toLowerCase().includes('residente')){
    return(
      <>
        <NavItem name="Costos" link="" items={[
            {
              name: 'Gastos',
              link: '/expenses'
            },
            {
              name: 'Informes',
              link: '/reports'
            },
          ]} 
        />
      </>
    )
  }
  
  return(
    <>
      <NavItem name="Usuarios" link="" items={[
        {
          name: 'Usuarios',
          link: '/users'
        },
        {
          name: 'Roles',
          link: '/roles/role'
        },
        {
          name: 'Recursos',
          link: '/roles/resources'
        },
        {
          name: 'Rutas',
          link: '/roles/sub-path'
        },
        {
          name: 'Componentes',
          link: '/roles/components'
        },
        {
          name: 'Arboles',
          link: '/roles/trees'
        }
      ]}/>
      <NavItem name="Proveedores" link="/providers" items={[]}/>
      <NavItem name="Clientes" link="/clients" items={[]}/>
      {/* <NavItem name="Roles" link="/roles/role" items={[]}/> */}
      <NavItem name="Proyectos" link="/projects" items={[]}/>
      <NavItem name="Costos" link="" items={[
          {
            name: 'Centro de costos',
            link: '/costcenter'
          },
          {
            name: 'Gastos',
            link: '/expenses'
          },
          {
            name: 'Informes',
            link: '/reports'
          },
        ]} 
      />
      <NavItem name="Catalogos" link="" items={[
          {
            name: 'Listas',
            link: '/catalogs'
          },
          {
            name: 'Compañias',
            link: '/companies'
          },
          {
            name: 'Departamentos',
            link: '/departments'
          },
          {
            name: 'Glosarios',
            link: '/glossary'
          },
          {
            name: 'Catalogos',
            link: '/status'
          },
          // {
          //   name: 'Centro de costos',
          //   link: '/costcenter'
          // },
          // {
          //   name: 'Gastos',
          //   link: '/expenses'
          // },
        ]} 
      />
      <NavItem name="Workflow" link="" items={[
          {
            name: 'Workflow',
            link: '/workflows'
          },
          {
            name: 'Nodos',
            link: '/nodes'
          },
          {
            name: 'Relaciones',
            link: '/relations'
          },
        ]} 
      />
    </>
  )
};
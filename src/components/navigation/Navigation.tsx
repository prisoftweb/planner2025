'use client'

import { Bars3Icon, UserIcon, Cog6ToothIcon, PhotoIcon, ArrowRightStartOnRectangleIcon, Cog8ToothIcon } 
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
  
  const ref = useOutsideClick(() => {
    if(isOpenP){
      setIsOpenP(false);
    }
  });

  const router = useRouter();
  
  function logOut(){
    RemoveCookies();
    router.push('/login');
  }

  const firstName = user.name.substring(0, user.name.indexOf(' '));
  
  return(
    <>
      <nav className="bg-black h-16 fixed top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between p-2 print:hidden">
        <Bars3Icon width={40} height={40} className="md:hidden cursor-pointer ml-2 rounded-md p-1 bg-slate-500 text-white print:hidden" onClick={toggleNavBar} />
        <Link href={'/'}>
          <Image src={'/nuevoIcono.jpg'} alt="logo" width={50} height={50} className="rounded-md" priority />
        </Link>
        <div className="w-1/12 md:w-9/12 flex justify-end print:hidden">
          <div className="hidden w-full text-white md:flex justify-between print:hidden ">
            <NavItems role={role} user={user} /> 
          </div>
        </div>
        
        <div className="flex items-center print:hidden">
          <div className="flex justify-around items-center w-24 text-white print:hidden">
            <p className="p-2 hover:bg-slate-700 text-center font-semibold print:hidden">{firstName}</p>
          </div>
          {role.toLowerCase().includes('super') && (
            <Cog8ToothIcon className="text-slate-100 w-7 h-7" onClick={() => window.location.replace('/workspace')} />
          )}
          <Image src={photo} alt="profile" width={50} height={50} 
                  onClick={toggleProfile} className="cursor-pointer rounded-full print:hidden"
          />
        </div>
      </nav>
      {isOpen && (
          <div className="flex text-gray-200 bg-blue-950 md:hidden flex-col items-start pl-2  basis-full print:hidden">
            <NavItems role={role} user={user} />
          </div>
        )}
      {isOpenP && (
        <div className="flex justify-end print:hidden" ref={ref}>
          <div className="flex flex-col w-44 absolute z-50 text-xs bg-white border-2 border-slate-300 print:hidden">
            {role.toLowerCase().includes('residente')? (
              <div className="flex p-2 items-center hover:text-gray-900 hover:bg-gray-200 cursor-pointer print:hidden"
                onClick={() => logOut()}
              >
                  <ArrowRightStartOnRectangleIcon className="w-4 h-4 mr-2 text-slate-500 print:hidden" />
                <p className="py-1" >Salir</p>
              </div>
            ): (
              <>
                <Link href={`/users/${id}?tab=1&&opt=1`} className="py-1 hover:text-gray-900 hover:bg-gray-200 print:hidden">
                  <div className="flex p-2 items-center print:hidden">
                    <UserIcon className="w-4 h-4 mr-2 text-slate-500 print:hidden" />
                    Editar Perfil
                  </div>
                </Link>
                <Link href={`/users/${id}?tab=1&&opt=4`} className="py-1 hover:text-gray-900 hover:bg-gray-200">
                  <div className="flex p-2 items-center print:hidden">
                    <Cog6ToothIcon className="w-4 h-4 mr-2 text-slate-500 print:hidden" />
                    Configuracion
                  </div>
                </Link>
                <Link href={`/users/${id}?tab=1&&opt=2`} className="py-1 hover:text-gray-900 hover:bg-gray-200">
                  <div className="flex p-2 items-center print:hidden">
                    <PhotoIcon className="w-4 h-4 mr-2 text-slate-500 print:hidden" />
                    Cambiar foto
                  </div>
                </Link>
                <Link href={`/users/${id}?tab=1&&opt=3`} className="py-1 hover:text-gray-900 hover:bg-gray-200">
                  <div className="flex p-2 items-center print:hidden">
                    <MdPassword className="w-2 h-2 text-slate-500 print:hidden" />
                    <MdPassword className="w-2 h-2 mr-2 text-slate-500 print:hidden" />
                    Cambiar Contrasena
                  </div>
                </Link>
                <div className="flex p-2 items-center hover:text-gray-900 hover:bg-gray-200 cursor-pointer print:hidden"
                  onClick={() => logOut()}
                >
                    <ArrowRightStartOnRectangleIcon className="w-4 h-4 mr-2 text-slate-500 print:hidden" />
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

const NavItems = ({role, user}: {role:string, user:UsrBack}) => {
  if(role.toLowerCase().includes('residente')){
    return(
      <>
        <NavItem name="Clientes" link="/clients" items={[]}/>
        <NavItem name="Proyectos" link="/projects" items={[]}/>
        <NavItem name="Costos" link="" items={[
            {
              name: 'Gastos',
              link: '/expenses'
            },
            {
              name: 'En proceso',
              link: '/expenses/pending'
            },
            {
              name: 'Historial',
              link: '/expenses/history'
            },
          ]}
        />
        <NavItem name="Cotizaciones" link="/quotations/byuser" items={[]} />
        <NavItem name="Estimaciones" link="/projects/estimates" items={[]} />
        <NavItem name="Informes" link="" items={[
            {
              name: 'Informes',
              link: '/reports'
            },
            {
              name: 'Historial',
              link: '/reports/history'
            },
          ]} 
        />
        {user._id === '679ac44767135227cd14d1e9' && (
          <NavItem name="Codigos" link="/codes" items={[]} />
        )}
      </>
    )
  }

  if(role.toLowerCase().includes('invitado')){
    return(
      <>
        <NavItem name="Clientes" link="/clients" items={[]}/>
        <NavItem name="Proyectos" link="/projects" items={[]}/>
        <NavItem name="Costos" link="" items={[
            {
              name: 'Gastos',
              link: '/expenses'
            },
            {
              name: 'En proceso',
              link: '/expenses/pending'
            },
            {
              name: 'Historial',
              link: '/expenses/history'
            },
          ]}
        />
        <NavItem name="Cotizaciones" link="/quotations/byuser" items={[]} />
        <NavItem name="Estimaciones" link="/projects/estimates" items={[]} />
        <NavItem name="Informes" link="" items={[
            {
              name: 'Informes',
              link: '/reports'
            },
            {
              name: 'Historial',
              link: '/reports/history'
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
      <NavItem name="Proveedores" link="" items={[
        {
          name: 'Proveedores',
          link: '/providers'
        },
        {
          name: 'Dashboards',
          link: '/providers/dashboards'
        },
      ]}/>
      <NavItem name="Clientes" link="/clients" items={[]}/>
      <NavItem name="Proyectos" link="" items={[
        {
          name: 'Proyectos',
          link: '/projects'
        },
        {
          name: 'Presupuesto',
          link: '/projects/budget'
        },
        {
          name: 'Historial',
          link: '/projects/history'
        },
        {
          name: 'Dashboard',
          link: '/projects/dashboard'
        },
        {
          name: 'Finanzas',
          link: '/projects/dashboardfinance'
        },
        {
          name: 'Tablero',
          link: '/projects/board'
        },
      ]}/>
      <NavItem name="Cotizaciones" link="" items={[
        {
            name: 'Cotizaciones',
            link: '/quotations'
          },
          {
            name: 'Tablero',
            link: '/quotations/status'
          }
      ]}/>
      <NavItem name="Estimaciones" link="" items={[
          {
            name: 'Por proyecto',
            link: '/projects/estimates'
          },
          {
            name: 'activas',
            link: '/projects/estimates/withoutinvoice'
          },
          {
            name: 'Historial',
            link: '/projects/estimates/history'
          },
        ]}
      />
      <NavItem name="Facturacion" link="" items={[
          {
            name: 'Facturas',
            link: '/invoices'
          },
        ]}
      />
      <NavItem name="Cobranza" link="" items={[
          {
            name: 'Historial',
            link: '/collections/history'
          },
          {
            name: 'Cuentas por cobrar',
            link: '/collections'
          },
          {
            name: 'Dashboards',
            link: '/collections/dashboard'
          },
          {
            name: 'Fondos de Garantia',
            link: '/guarantee'
          },
        ]}
      />
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
            name: 'En proceso',
            link: '/expenses/pending'
          },
          {
            name: 'Historial',
            link: '/expenses/history'
          },
          {
            name: 'Reportes',
            link: '/expenses/reports'
          },
          {
            name: 'Dashboards',
            link: '/expenses/dashboard'
          },
        ]}
      />
      <NavItem name="Informes" link="" items={[
          {
            name: 'Informes',
            link: '/reports'
          },
          {
            name: 'Historial',
            link: '/reports/history'
          },
        ]} 
      />
      <NavItem name="Catalogos" link="" items={[
          {
            name: 'Listas',
            link: '/catalogs'
          },
          // {
          //   name: 'Compañias',
          //   link: '/companies'
          // },
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
          {
            name: 'Codigos',
            link: '/codes'
          },
          {
            name: 'Asignar Codigos',
            link: '/codes/assignedCode'
          },
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
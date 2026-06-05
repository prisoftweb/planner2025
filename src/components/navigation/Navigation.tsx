'use client'

import { Bars3Icon, UserIcon, Cog6ToothIcon, PhotoIcon, ArrowRightStartOnRectangleIcon, Cog8ToothIcon } 
  from "@heroicons/react/24/solid"
import { MdPassword } from "react-icons/md";
  import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import RemoveCookies from "@/app/functions/RemoveCookies"
import NavItem from "./NavItem"
import { UsrBack } from "@/interfaces/User"
import { useOutsideClick } from "@/app/functions/useOutsideClick";
import { ICompanyProfileInWorkSpace } from "@/interfaces/WorkSpaces";
import { getCompanysProfilesByWorkspaceMIN } from "@/app/api/routeWorkspace";
import { updateUser } from "@/app/api/routeUser";
import { showToastMessage, showToastMessageError } from "../Alert";
import { setCookie } from "cookies-next";

export default function Navigation({user, token}: {user:UsrBack, token:string}){
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);

  const [isProfileSideOpen, setIsProfileSideOpen] = useState(false);
  const [companyProfiles, setCompanyProfiles] = useState<ICompanyProfileInWorkSpace[]>([]);

  useEffect(() => {
    const fetchCompanyProfiles = async () => {
      const profiles = await getCompanysProfilesByWorkspaceMIN(token, '6924db0701ab482e68044270');
      if(typeof(profiles) === 'string'){
        // console.error('Error fetching company profiles:', profiles);
        showToastMessageError(profiles);
      } else {
        setCompanyProfiles(profiles);
      }
    }
    fetchCompanyProfiles();
  }, []);

  const handleCompanyChange = async (companyId: string) => {
    try {
      const updatedUser = await updateUser({profile: companyId}, token, user._id);
      if(typeof(updatedUser) === 'string'){
        showToastMessageError(updatedUser);
      } else {
        showToastMessage('Cambiando de compañia...');
        setCookie('user', updatedUser);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // console.log('Company changed successfully:', updatedUser);
        // Optionally, you can update the user state here if needed
      }
    } catch (error) {
      showToastMessageError('Error changing company');
    }
  }

  const toggleProfileSide = () => {
    setIsProfileSideOpen(!isProfileSideOpen)
  }

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  }

  const toggleProfile = () => {
    setIsOpenP(!isOpenP);
  }

  const profile= companyProfiles.find(profile => profile._id === user.profile);

  let photo='/img/default.jpg', role='', id='';
  if(user.photo){
    photo = user.photo;
  }

  // console.log('Company Profiles:', companyProfiles);
  let logo='/img/default.jpg';
  if(Array.isArray(companyProfiles) && companyProfiles.length > 0){
    const index = companyProfiles.findIndex(profile => profile._id === user.profile);
    if(index !== -1){
      logo = companyProfiles[index].isologo || logo;
    }
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

  // const firstName = user.name.substring(0, user.name.indexOf(' '));
  
  return(
    <>
      <nav className="bg-black h-16 fixed top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between p-2 print:hidden">
        <Bars3Icon width={40} height={40} className="md:hidden cursor-pointer ml-2 rounded-md p-1 bg-slate-500 text-white print:hidden" onClick={toggleNavBar} />
        <Link href={'/'}>
          <Image src={logo} alt="logo" width={50} height={50} className="rounded-md" priority />
        </Link>
        <div className="w-1/12 md:w-9/12 flex justify-end print:hidden">
          <div className="hidden w-full text-white md:flex justify-between print:hidden ">
            <NavItems role={role} user={user} /> 
          </div>
        </div>
        
        <div className="flex items-center print:hidden">
          <button
            onClick={toggleProfileSide}
            className="
              text-white
              font-semibold
              px-3
              py-2
              rounded-md
              hover:bg-slate-700
            "
          >
            {profile ? profile.name.split(' ')[0] : 'Sin perfil'}
          </button>
          {/* <div className="flex justify-around items-center w-24 text-white print:hidden">
            <p className="p-2 hover:bg-slate-700 text-center font-semibold print:hidden">{firstName}</p>
          </div> */}
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
                <Link href={`/users/${id}/profile?opt=1`} className="py-1 hover:text-gray-900 hover:bg-gray-200 print:hidden">
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
      {isProfileSideOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={toggleProfileSide}
          />

          {/* SIDENAV */}
          <div
            className="
              fixed
              top-0
              right-0
              h-full
              w-80
              bg-white
              shadow-2xl
              z-50
              flex
              flex-col
              transition-transform
              duration-300
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">
                Selecciona tu compañia
              </h2>

              <button
                onClick={toggleProfileSide}
                className="text-2xl text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {companyProfiles.map(company => (
              <CardProfile key={company._id} company={company} handleCompanyChange={handleCompanyChange} />
            ))}

            {/* Contenido */}
            {/* <div className="p-4 flex flex-col items-center">
              <Image
                src={photo}
                alt="profile"
                width={90}
                height={90}
                className="rounded-full"
              />

              <h3 className="mt-4 text-lg font-bold">
                {firstName}
              </h3>

              <p className="text-gray-500">
                {role}
              </p>
            </div> */}

            {/* Opciones */}
            {/* <div className="flex flex-col mt-4">

              <Link
                href={`/users/${id}?tab=1&&opt=1`}
                className="hover:bg-gray-100 p-4"
              >
                Editar Perfil
              </Link>

              <Link
                href={`/users/${id}?tab=1&&opt=4`}
                className="hover:bg-gray-100 p-4"
              >
                Configuración
              </Link>

              <button
                onClick={logOut}
                className="hover:bg-red-100 text-red-600 text-left p-4"
              >
                Salir
              </button>
            </div> */}
          </div>
        </>
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
              name: 'Conceptos',
              link: '/expenses/concepts'
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
            name: 'Remisiones',
            link: '/referrals'
          },
          {
            name: 'Subir facturas',
            link: '/invoices'
          },
          {
            name: 'Facturas SAT',
            link: '/satinvoices'
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
            name: 'Conceptos',
            link: '/expenses/concepts'
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

const CardProfile = ({company, handleCompanyChange}: 
  {company:ICompanyProfileInWorkSpace, handleCompanyChange: (companyId: string) => Promise<void>}) => {
  
  return(
    <div role="button"
      key={company._id}
      className={`flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg 
        outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 
        focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
        active:bg-opacity-80 active:text-blue-gray-900 border-b border-slate-300 
        bg-white`}
      onClick={() => handleCompanyChange(company._id)}
    >
      <div className="flex items-center w-full ">
        <div className="grid mr-4 place-items-center">
          <img alt="responsable" src={ company.isologo ?? '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
        </div>
        <div className="w-full">
          <div className="flex gap-x-3 w-full justify-between items-center p-3">
            <div>
              <h6
                className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-600 ">
                {company.tradename}
              </h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {company.name}
              </p>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-600">
                {company.email}
              </p>
            </div>
            {/* <div className="text-right">
              <p className="block font-sans text-2xl antialiased font-normal leading-normal text-blue-600">
              </p>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-600">
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
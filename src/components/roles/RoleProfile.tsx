'use client'
import { RoleUser } from "@/interfaces/Roles"
import HeaderForm from "../HeaderForm"
import Select from 'react-select'
import { Options } from "@/interfaces/Common"
import IconText from "../providers/IconText"
import { Resource2 } from "@/interfaces/Roles"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RoleProfile({role, resources, idRole}: 
                                {role:RoleUser, resources:Resource2[], idRole:string}){
 
  const options:Options[] = [];

  resources.map((resource) => {
    options.push({
      label: resource.resource?.name,
      value: resource.resource?._id
    })
  })

  const router = useRouter();

  const onChange = (value:string) => {
    router.push(`/roles/role/${idRole}?rs=${value}`)
  }  

  return(
    <>
      <div className="flex gap-x-1 mt-3 bg-white rounded-lg shadow-md p-2">
        <div className="w-14">
          <img src={'/img/default.jpg'} alt="logo role" className="w-12 h-12" />
        </div>
        <div>
          <p className="text-blue-500">{role.name}</p>
          <p>{role.description}</p>
        </div>
      </div>
      <div className="mt-5 bg-white rounded-lg shadow-md p-2">
        <p>Usuarios con este perfil</p>
        <p>10 Usuarios</p>
        <div className="flex gap-x-1">
          <img src={'/img/default.jpg'} alt="1" className="w-12 h-12" />
          <img src={'/img/default.jpg'} alt="2" className="w-12 h-12" />
          <img src={'/img/default.jpg'} alt="3" className="w-12 h-12" />
        </div>
      </div>
      <div className="mt-5 bg-white rounded-lg shadow-md p-2">
        <HeaderForm img="/img/default.jpg" subtitle="Recursos disponibles" title={`Recursos al perfil de ${role.name}`} />

        <Select options={options} className="mt-2" onChange={(value:any) => onChange(value.value)} />
        
        {resources.map((resource, index:number) => (
          <Link href={`/roles/role/${idRole}?rs=${resource.resource?._id}`} key={index}>
            <div className="flex items-center gap-x-2">
              <IconText size="w-12 h-12" sizeText="" text={resource.resource?.name || 'NA'} />
              <div className="">
                <p>{resource.resource?.name}</p>
                <p>{resource.resource?.description}</p>
              </div>
              <div className="">
                <p>Comp</p>
                <div className="bg-blue-500 text-white text-center rounded-full p-2">
                  5
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
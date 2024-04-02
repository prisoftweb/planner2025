'use client'
import IconText from "../providers/IconText"
import { Resource2, Tree } from "@/interfaces/Roles"
import { useState, useEffect } from "react"
import CardPermission from "./CardPermission"

export default function PermissionResource({tree, rs}:
                               {tree:Tree, rs:string}){
  


  const [permission, setPermission] = useState<JSX.Element>(<></>);
  const [resource, setResource] = useState<Resource2>();

  //let resource: JSX.Element = <></>;  

  const [create, setCreate] = useState<boolean>(false);
  const [delet, setDelet] = useState<boolean>(false);
  const [expor, setExpor] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
  const [print, setPrint] = useState<boolean>(false);
  const [read, setRead] = useState<boolean>(false);
  const [readFull, setReadFull] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [searchFull, setSearchFull] = useState<boolean>(false);
  const [select, setSelect] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if(!rs || rs===''){
      console.log('iffff');
      setResource(tree.resources[0])
    }else{
      console.log('elseee');
      tree.resources.map((res) => {
        if(res.resource.id === rs){
          setResource(res);
        }
      })
    }
  }, []);
  
  useEffect(() => {
    if(resource){
      setCreate(resource.permission.create);
      setDelet(resource.permission.delete);
      setExpor(resource.permission.export);
      setFilter(resource.permission.filter);
      setPrint(resource.permission.print);
      setRead(resource.permission.read);
      setReadFull(resource.permission.readfull);
      setSearch(resource.permission.search);
      setSearchFull(resource.permission.searchfull);
      setSelect(resource.permission.select);
      setUpdate(resource.permission.update);
    }
  }, [resource])

  return(
    <>
      <div className="flex">
        <IconText size="w-12 h-12" sizeText="" text={resource?.resource.name || ''} />
        <p className="text-lg text-blue-500">{resource?.resource.name}</p>
      </div>
      <div>
        <p>Permisos asignados a ruta</p>
        <p>ruta {resource?.resource.name}</p>
        <div className="flex gap-x-2 gap-y-2 flex-wrap mt-5">
          <CardPermission setValue={setCreate} text="Agregar" value={create} />
          <CardPermission setValue={setDelet} text="Eliminar" value={delet} />
          <CardPermission setValue={setExpor} text="Exportar" value={expor} />
          <CardPermission setValue={setFilter} text="Filtrar" value={filter} />
          <CardPermission setValue={setPrint} text="Imprimir" value={print} />
          <CardPermission setValue={setRead} text="Consultar" value={read} />
          <CardPermission setValue={setReadFull} text="Consultar todos" value={readFull} />
          <CardPermission setValue={setSearch} text="Buscar" value={search} />
          <CardPermission setValue={setSearchFull} text="Buscar todo" value={searchFull} />
          <CardPermission setValue={setSelect} text="Seleccionar" value={select} />
          <CardPermission setValue={setUpdate} text="Actualizar" value={update} />
        </div>
      </div>
    </>
  )
}
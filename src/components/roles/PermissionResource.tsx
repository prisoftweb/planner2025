'use client'
import IconText from "../providers/IconText"
import { Resource2, Tree } from "@/interfaces/Roles"
import { useState, useEffect } from "react"
import CardPermission from "./CardPermission"
import ComponentsResource from "./ComponentsResource"
import { updatePermissionResourceTree } from "@/app/api/routeRoles"

export default function PermissionResource({tree, rs, token}:
  {tree:Tree, rs:string, token:string}){
  const [bandChangePermission, setBandChangePermission] = useState<boolean>(false);
  const [resource, setResource] = useState<Resource2>();

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

  const [showPermissionComponents, setShowPermissionComponents] = useState<JSX.Element>(<></>);
  
  const [arrConts, setArrConts] = useState<number[]>([]);
  const [bandInc, setBandInc] = useState<boolean>(false);
  const [bandDec, setBandDec] = useState<boolean>(false);
  const [indexArr, setIndexArr] = useState<number>(-1);

  const increment = (indexCont:number) => {
    setBandInc(true);
    setIndexArr(indexCont);
  }

  const decrement = (indexCont:number) => {
    setBandDec(true);
    setIndexArr(indexCont);
  }

  useEffect(() => {
    if(indexArr !== -1 && bandDec){
      const arr = arrConts.map((count, index:number) => {
        if(indexArr === index){
          return count - 1;
        }else{
          return count
        }
      })
      setIndexArr(-1);
      setBandDec(false);
      setArrConts(arr);
    }
  }, [bandDec])

  useEffect(() => {
    if(indexArr !== -1 && bandInc){
      const arr = arrConts.map((count, index:number) => {
        if(indexArr === index){
          return count + 1;
        }else{
          return count
        }
      })
      setIndexArr(-1);
      setBandInc(false);
      setArrConts(arr);
    }
  }, [bandInc])

  useEffect(() => {
    if(!rs || rs===''){
      setResource(tree.resources[0])
    }else{
      tree.resources.map((res) => {
        if(res.resource){
          if(res.resource.id === rs){
            setResource(res);
          }
        }
      })
    }
  }, [, rs]);

  useEffect(() => {    
    setShowPermissionComponents(<></>);
    let arrAux: number[] = [];
    resource?.routes.map((route) => {
      let contAux = 0;
      route.components.map((comp) => {
        if(comp.status) contAux++;
      })
      arrAux.push(contAux);
    })
    setArrConts(arrAux);
    setTimeout(() => {
      setShowPermissionComponents(<div className="mt-5">
                                  {resource?.routes.map((route, index:number) => (
                                    <div className="mt-5 bg-white rounded-lg shadow-md p-2" key={index}>
                                      <ComponentsResource resource={resource?.resource.name || ''} 
                                        route={route} idRes={resource._id} token={token} 
                                        idTree={tree._id} decrement={decrement} increment={increment} 
                                        indexComp={index} 
                                        countPermissions={arrConts[index]} 
                                        stateComponents={(arrAux[index]>0)? true: false}  />
                                    </div>
                                  ))}
                                </div>)
    }, 1000);
  },[resource]);

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

  useEffect(() => {
    if(bandChangePermission && resource){
      setBandChangePermission(false);
      const changePermissions = async() => {
        
        const data = {
          "permission": {
            "create": create,
            "read": read,
            "update": update,
            "delete": delet,
            "export": expor,
            "print": print,
            "select": select,
            "filter": filter,
            "searchfull": searchFull,
            "readfull": readFull,
            "search": search
          }
        }
        
        const res = await updatePermissionResourceTree(token, tree._id, resource._id, data);
      }
      changePermissions();
    }
  }, [create, delet, expor, filter, print, read, readFull, search, searchFull, select, update])

  return(
    <>
      <div className="flex bg-white p-2 items-center rounded-lg shadow-md space-x-2">
        <IconText size="w-12 h-12" sizeText="font" text={resource?.resource.name || ''} />
        <p className="text-lg uppercase text-blue-500 ">{resource?.resource.name}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-2 mt-2">
        <p>Permisos asignados a ruta</p>
        <p>ruta {resource?.resource.name}</p>
        <div className="flex gap-x-6 gap-y-4 flex-wrap mt-5">
          <CardPermission setValue={setCreate} updatePermission={setBandChangePermission} text="Agregar" value={create} />
          <CardPermission setValue={setDelet} updatePermission={setBandChangePermission} text="Eliminar" value={delet} />
          <CardPermission setValue={setExpor} updatePermission={setBandChangePermission} text="Exportar" value={expor} />
          <CardPermission setValue={setFilter} updatePermission={setBandChangePermission} text="Filtrar" value={filter} />
          <CardPermission setValue={setPrint} updatePermission={setBandChangePermission} text="Imprimir" value={print} />
          <CardPermission setValue={setRead} updatePermission={setBandChangePermission} text="Consultar" value={read} />
          <CardPermission setValue={setReadFull} updatePermission={setBandChangePermission} text="Consultar todos" value={readFull} />
          <CardPermission setValue={setSearch} updatePermission={setBandChangePermission} text="Buscar" value={search} />
          <CardPermission setValue={setSearchFull} updatePermission={setBandChangePermission} text="Buscar todo" value={searchFull} />
          <CardPermission setValue={setSelect} updatePermission={setBandChangePermission} text="Seleccionar" value={select} />
          <CardPermission setValue={setUpdate} updatePermission={setBandChangePermission} text="Actualizar" value={update} />
        </div>
      </div>

      {showPermissionComponents}
    </>
  )
}
'use client'
import IconText from "../providers/IconText"
import { Resource2, Tree } from "@/interfaces/Roles"
import { useState, useEffect } from "react"
import CardPermission from "./CardPermission"
import ComponentsResource from "./ComponentsResource"
import { updatePermissionResourceTree } from "@/app/api/routeRoles"

export default function PermissionResource({tree, rs, token}:
                               {tree:Tree, rs:string, token:string}){
  //const [permission, setPermission] = useState<JSX.Element>(<></>);
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

  const [bandTimer, setBandTimer] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(arrConts);
      setBandTimer(!bandTimer);
    }, 500);

    //timer;
    return () => clearTimeout(timer);
  }, [bandTimer])

  const increment = (indexCont:number) => {
    console.log('increment ', arrConts);
    
    // const arr = arrConts.map((count, index:number) => {
    //   if(indexCont === index){
    //     console.log('count if ', count);
    //     return count + 1;
    //   }else{
    //     return count
    //   }
    // })
    // setArrConts(arr);
  }

  const decrement = (indexCont:number) => {
    console.log('decrement ', arrConts);
    // const arr = arrConts.map((count, index:number) => {
    //   if(indexCont === index){
    //     console.log('coutn if ', count);
    //     return count - 1;
    //   }else{
    //     return count
    //   }
    // })
    // setArrConts(arr);
  }

  const updateArrConts = (value:number, indexRoute:number) => {
    console.log('update, value ', value);
    console.log('indes', indexRoute);

    console.log(arrConts);

    const aux: number[] = [];
    for(let i =0; i <= indexRoute; i++){
      if(arrConts[i]){
        aux.push(arrConts[i]);
      }else{
        if(i < indexRoute){
          aux.push(0);
        }else{
          aux.push(value);
        }
      }
    }
    console.log('aux ', aux);
    setArrConts(aux);
    // if(arrConts.length > 0){
    //   const arr = arrConts.map((count, index:number) => {
    //     console.log('mapp');
    //     if(indexRoute === index){
    //       console.log('aquiii');
    //       return value;
    //     }else{
    //       console.log('elsee');
    //       return count
    //     }
    //   })
    //   console.log('arr ', arr);
    //   setArrConts(arr);
    // }else{

    // }
  }

  useEffect(() => {
    console.log('arr conts ', arrConts);
  }, [arrConts])

  useEffect(() => {
    //console.log('aquii');
    console.log(rs);
    if(!rs || rs===''){
      setResource(tree.resources[0])
    }else{
      tree.resources.map((res) => {
        if(res.resource){
          console.log(res.resource.id);
          if(res.resource.id === rs){
            setResource(res);
          }
        }
      })
    }
  }, [, rs]);

  useEffect(() => {    
    setShowPermissionComponents(<></>);
    resource?.routes.map(() => {
      setArrConts((oldArray) => [...oldArray, 0]);
    })

    setTimeout(() => {
      console.log('settime ', arrConts);
      setShowPermissionComponents(<div className="mt-5 bg-white p-2">
                                  {resource?.routes.map((route, index:number) => (
                                    <div className="mt-5" key={index}>
                                      <ComponentsResource resource={resource?.resource.name || ''} 
                                        route={route} idRes={resource._id} token={token} 
                                        idTree={tree._id} decrement={decrement} increment={increment} 
                                        indexComp={index} updateArrConts={updateArrConts} />
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
        console.log('change permission ', res);
      }
      changePermissions();
    }
  }, [create, delet, expor, filter, print, read, readFull, search, searchFull, select, update])

  return(
    <>
      <div className="flex">
        <IconText size="w-12 h-12" sizeText="" text={resource?.resource.name || ''} />
        <p className="text-lg text-blue-500">{resource?.resource.name}</p>
      </div>
      <div className="bg-white p-2">
        <p>Permisos asignados a ruta</p>
        <p>ruta {resource?.resource.name}</p>
        <div className="flex gap-x-2 gap-y-2 flex-wrap mt-5">
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
      {/* <div className="mt-5 bg-white p-2">
        {resource?.routes.map((route) => (
          <div className="mt-5">
            <ComponentsResource resource={resource?.resource.name || ''} route={route} />
          </div>
        ))}
      </div> */}
    </>
  )
}
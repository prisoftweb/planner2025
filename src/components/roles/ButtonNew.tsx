'use client'
import { useState } from "react";
import Button from "../Button";
import NewRole from "./NewRole";
import NewRoute from "./NewRoute";
import NewSubPath from "./NewSubPath";
import NewComponent from "./NewComponent";
import NewRouteTree from "./NewRouteTree";
import { Options } from "@/interfaces/Common";
import NewCompoentTree from "./NewComponentTree";
import { Resource } from "@/interfaces/Roles";
import { CreateTree } from "@/app/api/routeRoles";
import { showToastMessage, showToastMessageError } from "../Alert";

export default function ButtonNew({token, opt, optResources, optRoutes, 
                                  descRoutes, descComponents,optComponents, 
                                  idTree, routesPerResource}: 
                        {token:string, opt:number, optResources:Options[], 
                          optRoutes:Options[], optComponents: Options[]
                          descRoutes: Options[], descComponents: Options[],
                          idTree:string, routesPerResource:Options[]}){
  const [newRole, setNewRole] = useState<boolean>(false);
  
  let showButton;

  const dataIni: Resource = {
    __v: 0,
    _id: '',
    description: '',
    id: '',
    name: '',
    title: ''
  }

  const onCreateTree = async () => {
    try {
      const res = await CreateTree(token);
      if(res === 201){
        showToastMessage('Arbol creado exitosamente!!!');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      showToastMessageError('Ocurrio un problema al crear arbol!!');
    }
  }

  switch(opt){
    case 1: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewRole showForm={setNewRole} token={token} />}
      </>
    break;
    case 2: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewRoute showForm={setNewRole} token={token} resource={dataIni} />}
      </>
    break;
    case 3: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewSubPath showForm={setNewRole} token={token} route={dataIni} />}
      </>
    break;
    case 4: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewComponent showForm={setNewRole} token={token} component={dataIni} />}
      </>
    break;
    case 5: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Asignar ruta</Button>
          {newRole && 
            <NewRouteTree showForm={setNewRole} token={token} 
                    optResources={optResources} optRoutes={optRoutes}
                    descRoutes={descRoutes} idTree={idTree} />}
      </>
    break;
    case 6: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Asignar componente</Button>
          {newRole && 
            <NewCompoentTree showForm={setNewRole} token={token} 
                    optResources={optResources} optRoutes={optRoutes}
                    descComponents={descComponents} optComponents={optComponents} 
                    idTree={idTree} routesPerResource={routesPerResource} />}
      </>
    break;
    case 7: 
      showButton = <>
        <Button type="button" onClick={onCreateTree}>Crear Arbol</Button>
      </>
    break;
  }

  return(
    <>
      {showButton}
    </>
  )
}
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

export default function ButtonNew({token, opt, optResources, optRoutes, 
                                  descRoutes, descComponents,optComponents}: 
                        {token:string, opt:number, optResources:Options[], 
                          optRoutes:Options[], optComponents: Options[]
                          descRoutes: Options[], descComponents: Options[]}){
  const [newRole, setNewRole] = useState<boolean>(false);
  
  let showButton;

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
          {newRole && <NewRoute showForm={setNewRole} token={token} />}
      </>
    break;
    case 3: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewSubPath showForm={setNewRole} token={token} />}
      </>
    break;
    case 4: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Nuevo</Button>
          {newRole && <NewComponent showForm={setNewRole} token={token} />}
      </>
    break;
    case 5: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Asignar ruta</Button>
          {newRole && 
            <NewRouteTree showForm={setNewRole} token={token} 
                    optResources={optResources} optRoutes={optRoutes}
                    descRoutes={descRoutes} />}
      </>
    break;
    case 6: 
      showButton = <>
        <Button type="button" onClick={() => setNewRole(true)}>Asignar componente</Button>
          {newRole && 
            <NewCompoentTree showForm={setNewRole} token={token} 
                    optResources={optResources} optRoutes={optRoutes}
                    descComponents={descComponents} optComponents={optComponents} />}
      </>
    break;
  }

  return(
    <>
      {showButton}
    </>
  )
}
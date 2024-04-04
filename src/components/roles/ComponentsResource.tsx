import { Route } from "@/interfaces/Roles"
import { useState, useEffect } from "react"
import StatusComponent from "./StatusComponent";
import { updateAllComponentsRouteTree } from "@/app/api/routeRoles";

export default function ComponentsResource({route, resource, token, idRes, idTree, 
                        increment, decrement, indexComp, updateArrConts}: 
                      {route:Route, resource:string, increment:Function, decrement:Function
                        token:string, idRes:string, idTree:string, indexComp:number,
                        updateArrConts:Function}){
  
  const [showComponents, setShowComponents] = useState<JSX.Element[]>([]);
  const [stateAllComp, setStateAllComp] = useState<boolean>(false);

  //const [cont, setCont] = useState<number>(0);
  const [stateComp, setStateComp] = useState<boolean>(false);
  
  const inc = (index: number) => {
    console.log('inc', index);
    increment(index);
  }

  const dec = (index: number) => {
    console.log('dec', index);
    decrement(index);
  }

  useEffect(() => {
    let contStat = 0;
    
    route.components.map((component) => {
      if(component.component){
        //console.log(component);
        if(component.status){
          contStat++;
        }
        setShowComponents((oldArray) => [...oldArray, <StatusComponent component={component} 
                                        decrement={dec} increment={inc} indexComp={indexComp}
                                        value={component.status} idRes={idRes} idRou={route._id} 
                                        idT={idTree} token={token} />] )
      }
    })
    //setCont(contStat);
    updateArrConts(contStat, indexComp);
  }, [])

  useEffect(() => {
    if(stateAllComp){
      const request = async() => {
        try {
          const res = await updateAllComponentsRouteTree(token, idTree, idRes, route._id, {status: stateComp});
          if(res===200){
            setShowComponents([]);

            setTimeout(() => {
              route.components.map((component) => {
                if(component.component){
                  if(component.status){
                    //setCont(cont + 1);
                  }
                  setShowComponents((oldArray) => [...oldArray, <StatusComponent indexComp={indexComp} component={component} 
                                                  decrement={dec} increment={inc}
                                                  value={stateComp} idRes={idRes} idRou={route._id} 
                                                  idT={idTree} token={token} />] )
                }
              })
            }, 500);
          }
        } catch (error) {
          
        }
      }
      request();
      setStateAllComp(false);
    }
  }, [stateComp])

  // useEffect(() => {
  //   console.log('usefect cont ', cont);
  //   if(cont <= 0){
  //     setStateComp(false);
  //   }else{
  //     setStateComp(true);
  //   }
  // }, [cont])

  return(
    <>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-500">Componentes asignados al recurso de {resource}</p>
            <p className="text-blue-700 text-xl">{route.route.name}</p>
          </div>
          <div>
            <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
              <input checked={stateComp} 
                onClick={() => {
                  //changeCounter(value? -1: 1);
                  setStateAllComp(true);
                  setStateComp(!stateComp);
                  //changePermission(!permission);
                }} id={`${route.route.name}`} type="checkbox"
                onChange={() => console.log('')}
                className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                  appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                  peer-checked:border-green-500 peer-checked:before:bg-green-500
                  border border-slate-300" />
              <label htmlFor={`${route.route.name}`}
                className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                  data-ripple-dark="true"></div>
              </label>
            </div>
          </div>
        </div>
        <div className="pl-5">
          {showComponents.map((comp, index:number) => (
            <div key={index} className="mt-3">
              {comp}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
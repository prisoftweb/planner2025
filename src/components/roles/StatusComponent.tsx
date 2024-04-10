import { Component } from "@/interfaces/Roles"
import { useEffect, useState } from "react"
import { updateStatusComponentTree } from "@/app/api/routeRoles"

export default function StatusComponent({component, value, token, idRes, idRou, idT, decrement, 
                              increment, indexComp, idC}: 
                            {component: Component, value:boolean, token:string, indexComp:number 
                              idT:string, idRes:string, idRou:string, increment:Function, 
                              decrement:Function, idC:number}){
  
  const [status, setStatus] = useState<boolean>(value);
  const [bandStart, setBandStart] =useState<boolean>(true);
  let name = component.component.name + indexComp + idC;
  useEffect(() => {
    setStatus(value);
  }, [])

  useEffect(() => {
    if(!bandStart){
      const request = async() => {
        try {
          const res = await updateStatusComponentTree(token, idT, idRes, idRou, component._id, {status});
          //updateValue(status);
          //console.log(res);
          if(res===200){
            console.log('update value', status);
            //updateValue(status? (1) : -1);
            (status)? increment(indexComp) : decrement(indexComp);
          }else{
            setStatus(!status);
          }
        } catch (error) {
          
        }
      }
      request();
    }else{
      setBandStart(false);
    }

  }, [status]);

  return(
    <>
      <div className="flex justify-between">
        <div>
          <p>{component.component.name || ''}</p>
          <p className="text-blue-500 text-sm">{component.component.description || ''}</p>
        </div>
        <div>
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={status} 
              onClick={() => {
                setStatus(!status);
              }} 
              id={`${name}`} 
              type="checkbox"
              onChange={() => console.log('')}
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                peer-checked:border-green-500 peer-checked:before:bg-green-500
                border border-slate-300" />
            <label htmlFor={`${name}`}
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
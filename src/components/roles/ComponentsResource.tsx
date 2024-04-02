import { Route } from "@/interfaces/Roles"

export default function ComponentsResource({route, resource}: {route:Route, resource:string}){
  
  return(
    <>
      <div>
        <p>Componentes asignados al recurso de {resource}</p>
        <p>{route.route.name}</p>
      </div>
    </>
  )
}
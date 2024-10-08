import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { OneProjectMin } from "@/interfaces/Projects";

export default function DataBasicHistory({project}: {project:OneProjectMin}){
  
  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.svg" subtitle="Datos del proyecto" 
        title="Informacion del proyecto"
      />
      <form className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input type="text" name="name" 
            value={project.title}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="keyProject"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Clave</p></Label>
          <Input type="text" name="keyProject" 
            value={project.code}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="condition"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condicion</p></Label>
          <Input 
            value={project.category.name}
            disabled
            name="condition"
          />
        </div>
        {/* {showConditions} */}
        <div>
          <Label htmlFor="description"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <textarea name="description"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
            focus:border-slate-700 outline-0 overflow-hidden resize-none"
            rows={4} 
            value={project.description}
            disabled
          />
        </div>
      </form>  
    </div>
  )
}
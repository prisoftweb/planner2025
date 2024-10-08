import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { OneProjectMin } from "@/interfaces/Projects";

export default function AddressHistory({project}: {project:OneProjectMin}){

  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.jpg" subtitle="Direccion del proyecto" 
        title="Direccion del proyecto"
      />
      <form className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="stret"><p className="">Calle y numero</p></Label>
          <Input type="text" name="stret" disabled 
            value={project.location?.stret}
          />
        </div>
        <div>
          <Label htmlFor="community"><p className="">Colonia</p></Label>
          <Input type="text" name="community" disabled
            value={project.location?.community}
          />
        </div>
        <div>
          <Label htmlFor="cp"><p className="">CP</p></Label>
          <Input type="text" name="cp" disabled 
            value={project.location?.cp?.toString()}
          />
        </div>
        <div>
          <Label htmlFor="municipy"><p className="">Municipio</p></Label>
          <Input type="text" name="municipy" disabled
            value={project.location?.municipy}
          />
        </div>
        <div>
          <Label htmlFor="stateA"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Estado</p></Label>
          <Input type="text" name="stateA" disabled 
            value={project.location?.state}
          />
        </div>
        <div>
          <Label htmlFor="country"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Pais</p></Label>
          <Input type="text" name="country" disabled 
            value={project.location?.country}
          />
        </div>
      </form>  
    </div>
  )
}
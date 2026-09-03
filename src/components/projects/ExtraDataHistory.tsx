import Label from "../Label"
import HeaderForm from "../HeaderForm";
import { OneProjectMin } from "@/interfaces/Projects";
import CurrencyInput from 'react-currency-input-field';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Input from "../Input";

export default function ExtraDataHistory({project}: { project:OneProjectMin}){

  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.jpg" subtitle="Datos del proyecto" 
        title="Datos del proyecto"
      />
      <form className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="category"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Categoria</p></Label>
          <Input name="category" disabled
            value={project.category.name}
          />
        </div>
        <div>
          <Label htmlFor="client"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cliente</p></Label>
          <Input name="client" disabled 
            value={project.client.name}
          />
        </div>        
        <div>
          <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto</p></Label>
          <CurrencyInput
            id="amount"
            name="amount"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            defaultValue={project.guaranteefund?.amount || 0}
            decimalsLimit={2}
            prefix="$"
            disabled
          />
        </div>
        <div>
          <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
          <Input name="type" disabled
            value={project.type.name}
          />
        </div>
        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <DatePicker
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
            focus:border-slate-700 outline-0 outline-none" 
            selected={new Date(project.date)} 
            onChange={(date:Date) => {}}
            disabled 
          />
        </div>
      </form>
    </div>
  )
}
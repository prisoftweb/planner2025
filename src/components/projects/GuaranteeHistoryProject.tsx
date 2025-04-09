import HeaderForm from "../HeaderForm"
import Label from "../Label"
import { OneProjectMin } from "@/interfaces/Projects";
import CurrencyInput from 'react-currency-input-field';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GuaranteeHistoryProject({project}: {project:OneProjectMin}){

  return(
    <div className="w-full">
      <HeaderForm img="/img/projects.jpg" subtitle="Garantia del proyecto" 
        title="Garantia del proyecto"
      />
      <form className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="percentage"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Porcentaje</p></Label>
          <CurrencyInput
            id="percentage"
            name="percentage"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            defaultValue={project.guaranteefund?.porcentage}
            decimalsLimit={2}
            suffix="%"
          />
        </div>
        <div>
          <Label htmlFor="amount"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Monto de fondo</p></Label>
          <CurrencyInput
            id="amount"
            name="amount"
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0"
            defaultValue={project.guaranteefund?.amount || 0}
            decimalsLimit={2}
            prefix="$"
          />
        </div>
        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <DatePicker
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-slate-100 
              focus:border-slate-700 outline-0" 
            selected={new Date(project.guaranteefund?.date.substring(0,10))} onChange={(date:Date) => {}} 
          />
        </div>
      </form>  
    </div>
  )
}
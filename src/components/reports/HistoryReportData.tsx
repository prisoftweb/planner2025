'use client'
import Input from "../Input"
import Label from "../Label"
import { Report } from "@/interfaces/Reports"

export default function HistoryReportData({report}:{report:Report}) {
  
  return (
    <form className="bg-white space-y-5 p-3 right-0 h-full">
      <div className="flex justify-end px-5">
        <div className="inline-flex items-center">
          {/* <p className="mr-3">Linea de credito</p> */}
          <Label>Es Fondo fijo? </Label>
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={report.ispettycash} 
              //onClick={() => setSuppliercredit(!suppliercredit)} id="switch-3" type="checkbox"
              id="switch-3" type="checkbox"
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                peer-checked:border-green-500 peer-checked:before:bg-green-500
                border border-slate-300" />
            <label htmlFor="switch-3"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input type="text" name="name"
            value={report.name}
            autoFocus
            disabled
          />
        </div>

        <div>
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <Input 
            type="date"
            value={report.date.substring(0, 10)}
            disabled
          />
        </div>

        <div>
          <Label htmlFor="company"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Empresa</p></Label>
          <Input type="text" name="company"
            value={report.company.name}
            autoFocus
            disabled
          />
        </div>

        <div>
          <Label htmlFor="department"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Departamento</p></Label>
          <Input type="text" name="department"
            value={report.department.name}
            autoFocus
            disabled
          />
        </div>

        <div>
          <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Empresa</p></Label>
          <Input type="text" name="project"
            value={report.project.title}
            autoFocus
            disabled
          />
        </div>
      </div>
      <div>
        <Label htmlFor="comment"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Comentarios</p></Label>
        <textarea name="comment" 
          className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
          focus:border-slate-700 outline-0"
          value={report.comment} disabled
        />
      </div>
    </form>
  )
}

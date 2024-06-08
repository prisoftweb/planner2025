import Chip from "../providers/Chip";
import { Report } from "@/interfaces/Reports";
import Button from "../Button";

export default function ProfileReport({report, send}: 
                        {report:Report, send:Function}){
// console.log('report ', report);
  return(
    <>
      <div className="w-full h-full mt-3">
        <div className="flex gap-x-2 bg-white p-3 rounded-lg shadow-md">
          <div>
            {/* <p>{report.project.photo? report.project.photo: '/img/projects/default.svg'}</p> */}
            <img src={ report.project.photo? report.project.photo: '/img/projects/default.svg'} alt="logo" 
              className="w-28 h-auto" />
          </div>
          <div>
            <p className="text-blue-500">{report.project.title}</p>
            <p className="text-slate-500">{report.project.code}</p>
            <p className="text-slate-500">{report.project.types.name}</p>
            <p className="text-slate-500">{report.project.account}</p>
          </div>
        </div>
        
        <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="flex gap-x-2 justify-between">
            <div>
              <img src={report.company.logo} alt="logo" className="w-16 h-auto" />
            </div>
            <div>
              <Chip label={report.moves[report.moves.length -1]?.condition?.name || 'sin status'} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-2 my-2">
            <div className="">
              <p className="text-slate-500">Total</p>
              <p className="text-green-600 font-semibold">{'$8,934.22'}</p>
            </div>
            <div className="">
              <p className="text-slate-500">Nº gastos</p>
              <p className="text-red-500 font-semibold">{'22'}</p>
            </div>
          </div>
        </div>
        
        <div className="my-2 mt-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="border-r-1 border-gray-700">
              <p className="text-slate-500">Fecha</p>
              <p className="text-blue-600">{report.date.substring(0, 10)}</p>
            </div>
            <div>
              <p className="text-slate-500">Comentarios</p>
              <p className="text-blue-600">{report.comment}
              </p>
            </div>
          </div>
        </div>

        <div className="my-2 mt-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="border-r-1 border-gray-700">
              <p className="text-slate-500">Enviar informe</p>
              <Button type="button" onClick={() => send(true)}>Enviar</Button>
            </div>
            <div>
              <p className="text-slate-500">Descargar</p>
              <p className="text-blue-600">{"PDF"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
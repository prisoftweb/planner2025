import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import { Report } from "@/interfaces/Reports";
import Chip from "../providers/Chip";
import Label from "../Label";
import TextArea from "../TextArea";
import Button from "../Button";

export default function SendReport({send, report}: 
          {send:Function, report:Report }){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [notes, setNotes] = useState<string>();
  const [isSend, setIsSend] = useState<boolean>(true);

  const handleResize = () => {
    //setHeightPage(window.outerHeight);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }, []);

  const sendReport = () => {
    if(notes && notes !== ''){
      //alert('helpmeee');
    }else{
      //alert('false');
      setIsSend(false);
      setTimeout(() => {
        setIsSend(true);
      }, (1000));
    }
  }
  
  return(
    <>
      <div className="z-10 w-full sm:max-w-3xl absolute top-16 bg-white p-3 right-0"
        style={{height: `${heightPage}px`}}
      >
        <div className="h-full p-1 sm:p-3">
          <div className="flex justify-end">
            <XMarkIcon className="w-6 h-6 text-slate-500 
                hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => send(false)} />
          </div>
          <div className="grid grid-cols-3 gap-x-3">
            <div className="col-span-2 mt-2 p-3">
              <p className=" text-3xl text-slate-500">{report.name}</p>
              <div className="bg-slate-500 p-4">
                <p className="text-4xl text-white">{'$9,341.22'}</ p>
                <p className="text-xs">Importe adeudado al empleado</p>
              </div>
            </div>
            <div className="mt-2 p-3 flex flex-col items-center">
              <p className="text-xs">Enviar informe a:</p>
              <p className="text-xs">ADMINISTRACION</p>
              <img src="/img/users/default.jpg" className="w-12 h-auto rounded-full" alt="responsable" />
              <p className="text-xs text-center">Diana Camacho</p>
              <Chip label={report.moves[report.moves.length-1].condition.name} />
            </div>
          </div>

          <div className="border-t border-slate-700">
            <p className=" ml-10">Cantidad de gastos del informe</p>
            <p className=" ml-10">22</p>

            <div className=" mt-5">
              {report.moves.map((mov, index:number) => (
                <div key={index} className="flex gap-x-4 justify-between mt-5">
                  <div className="flex gap-x-4">
                    <img src={mov.user.photo || '/img/users/default.jpg'} 
                        className="w-12 h-auto rounded-2xl" alt="responsable" />
                    <div>
                      <p>{'fecha mov ? '}</p>
                      <Chip label={mov.condition.name} />
                      <p className="text-blue-600">{mov.notes}</p>
                    </div>
                  </div>
                  <div>
                    <p>{mov.department.name}</p>
                    <img src={mov.department.company.logo || '/img/users/default.jpg'} 
                        className="w-12 h-auto rounded-md" alt="departamento" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <Label htmlFor="notes"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Comentarios</p></Label>
              <TextArea placeholder="comentarios.." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              {!isSend && <p className="text-red-500">*Los comentarios son obligatorios!!</p>}
            </div>

            <div className="mt-3 flex justify-center">
              <Button type="button" onClick={sendReport}>Enviar</Button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
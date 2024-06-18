import { XMarkIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import { Report } from "@/interfaces/Reports";
import Chip from "../providers/Chip";
import Label from "../Label";
import TextArea from "../TextArea";
import Button from "../Button";
import { Node, Relation } from "@/interfaces/Nodes";
import { insertMovementsInReport } from "@/app/api/routeReports";
import { showToastMessage, showToastMessageError } from "../Alert";
import { CurrencyFormatter } from "@/app/functions/Globals";
import ButtonColor from "../ButtonColor";
import { getNode } from "@/app/api/routeNodes";

export default function SendReport({send, report, node, 
              user, token}: 
          {send:Function, report:Report, node:Node, 
            user:string, token:string }){
  
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

  const sendReport = async (relation:Relation) => {
    console.log(relation);
    if(notes && notes !== ''){
      if(typeof(relation.relation.nextnodo)==='string'){
        try {
          const res: Node = await getNode(token, relation.relation.nextnodo);
          if(typeof(res)=== 'string'){
            showToastMessageError(res);
          }else{
            const data = {
              moves: [{
                  condition:res.glossary._id,
                  notes,
                  user,
                  department: res.department._id
              }]
            };
    
            try {
              const res = await insertMovementsInReport(token, report._id, data);
              if(res === 200){
                showToastMessage('Movimiento hecho correctamente!!');
              }else{
                showToastMessageError(res);
              }
            } catch (error) {
              showToastMessageError("Ocurrio un problema al consultar siguiente departamento!!");
            }
          }
        } catch (error) {
          showToastMessageError("Ocurrio un problema al consultar siguiente departamento!!");
        }
      }
    //   if(typeof(relation.relation.nextnodo)!=='string'){
    //     console.log('relation ', relation);
    //     console.log('mov ', {
    //       condition:relation.relation.nextnodo.glossary._id,
    //       notes,
    //       user,
    //       department: relation.relation.nextnodo.department._id
    //   })
    //     const data = {
    //       moves: [{
    //           condition:relation.relation.nextnodo.glossary._id,
    //           notes,
    //           user,
    //           department: relation.relation.nextnodo.department._id
    //       }]
    //     };

    //     try {
    //       const res = await insertMovementsInReport(token, report._id, data);
    //       if(res === 200){
    //         showToastMessage('Movimiento hecho correctamente!!');
    //       }else{
    //         showToastMessageError(res);
    //       }
    //     } catch (error) {
          
    //     }
    //   }else{
    //     showToastMessageError('Ocurrio un problema al enviar reporte a su siguiente destino!!');
    //     setIsSend(false);
    //     setTimeout(() => {
    //       setIsSend(true);
    //     }, (1000));
    //   }
      
    //   //   "moves": [
    // //     {
    // //         "condition":"66577d59f7e6e81cfa148471",
    // //         "notes":"Informe del mes de Junio",
    // //         "user":"65d3836974045152c0c4378c",
    // //         "department":"664ff820a957fe1fdd07f25e"
    // //     }
    // // ]
    }else{
      //alert('false');
      setIsSend(false);
      setTimeout(() => {
        setIsSend(true);
      }, (1000));
    }
  }

  const total = CurrencyFormatter({
    currency: 'MXN',
    value: report.total
  });
  
  return(
    <>
      <div className="z-10 w-full sm:max-w-lg absolute top-16 bg-white p-3 right-0"
        style={{height: `${heightPage}px`}}
      >
        <div className="h-full p-1 sm:p-3">
          <div className="flex justify-end">
            <XMarkIcon className="w-6 h-6 text-slate-500 
                hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => send(false)} />
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="col-span-1 mt-2 p-3">
              <p className=" text-3xl text-slate-500">{report.name}</p>
              <div className="bg-slate-500 p-4">
                <p className="text-4xl text-white">{total}</ p>
                <p className="text-xs">Importe adeudado al empleado</p>
              </div>
            </div>
            <div>
              {node.relations.map((rel) => (
                <Card relation={rel.relation} key={rel._id} _id={rel._id} id={rel.id} />
              ))}
            </div>
            {/* <div className="mt-2 p-3 flex flex-col items-center">
              <p className="text-xs">Enviar informe a:</p>
              <p className="text-xs">{typeof(node.relations)=== 'string'? '': 'administracion'}</p>
              <img src="/img/users/default.jpg" className="w-12 h-auto rounded-full" alt="responsable" />
              <p className="text-xs text-center">Diana Camacho</p>
              <Chip label={report.moves[report.moves.length-1].condition.name} />
            </div> */}
          </div>

          <div className="border-t border-slate-700">
            <p className=" ml-10">Cantidad de gastos del informe</p>
            <p className=" ml-10">{report.quantity}</p>

            <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
              <nav className="flex w-full flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                {report.moves.map((mov) => (
                  <div role="button"
                    key={mov._id}
                    className="flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                    <div className="flex items-center">
                      <div className="grid mr-4 place-items-center">
                        <img alt="responsable" src={mov.user.photo || '/img/users/default.jpg'}
                          className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                      </div>
                      <div>
                        <h6
                          className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                          {mov.condition.name}
                        </h6>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                          {mov.notes}
                        </p>
                      </div>
                    </div>
                    <div className="grid place-items-center justify-center w-28">
                      <p className="block font-sans text-sm antialiased font-normal 
                          leading-normal text-gray-700">{mov.department.name}</p>
                      <img alt="responsable" src={mov.department.company.logo || '/img/users/default.jpg'}
                        className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
                    </div>
                  </div>
                ))}

              </nav>
            </div>

            {/* <div className=" mt-5">
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
            </div> */}

            <div className="mt-3">
              <Label htmlFor="notes"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Comentarios</p></Label>
              <TextArea placeholder="comentarios.." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              {!isSend && <p className="text-red-500">*Los comentarios son obligatorios!!</p>}
            </div>

            <div className="mt-3 flex justify-center gap-x-3">
              {/* <Button type="button" onClick={sendReport}>Enviar</Button> */}
              {node.relations.map((rel) => (
                <ButtonColor 
                  // className="bg-red-600 text-white font-normal text-sm rounded-xl w-36 h-9 py-2 hover:bg-red-400" 
                  className="text-white font-normal text-sm rounded-xl w-36 h-9 py-2" 
                  type="button" key={rel._id} 
                  style={{backgroundColor: rel.relation.glossary.color}}
                  onClick={() => sendReport(rel)}>{rel.relation.glossary.name}</ButtonColor>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

function Card(relation: Relation){
  console.log('relation card ', relation);
  return(
    <div className="mt-2 p-3 flex flex-col items-center">
      <p className="text-xs">Enviar informe a:</p>
      <p className="text-xs">{typeof(relation.relation.nextnodo)=== 'string'? '': relation.relation.nextnodo?.department.name || 'Depto'}</p>
      <img src={typeof(relation.relation.nextnodo)==='string'? "/img/users/default.jpg": relation.relation.nextnodo?.department.company.logo || "/img/users/default.jpg"}
       className="w-12 h-auto rounded-full" alt="responsable" />
      <p className="text-xs text-center">Diana Camacho</p>
      <Chip label={relation.relation.glossary.name} />
      {/* <Chip label={report.moves[report.moves.length-1].condition.name} /> */}
    </div>
  )
}
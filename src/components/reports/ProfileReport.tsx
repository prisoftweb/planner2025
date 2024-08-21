import Chip from "../providers/Chip";
import { Report, CostReport, DateReport } from "@/interfaces/Reports";
import Button from "../Button";
import { CurrencyFormatter } from "@/app/functions/Globals";
import {PDFDownloadLink} from '@react-pdf/renderer'
import ReportPDF from "../ReportPDF";
import { BsFileEarmarkPdf } from "react-icons/bs";
//import { Expense } from "@/interfaces/Expenses";
import AttachedPDF from "../AttachedPDF";
import { UsrBack } from "@/interfaces/User";
import {Tooltip} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getCostByReportMin } from "@/app/api/routeReports";

export default function ProfileReport({report, send, token, user, id, dates}: 
                        {report:Report, send:Function, id:string, 
                          token: string, user:UsrBack, dates: DateReport[]}){
// console.log('report ', report);
  const total = CurrencyFormatter({
    currency: "MXN",
    value: report.total
  });

  const [costsReport, setCostReport] = useState<CostReport[]>([]);

  useEffect(() => {
    const fetchCosts = async () => {
      let costsRep:CostReport[] = [];
      try {
        costsRep = await getCostByReportMin(id, token);
        if(typeof(costsRep)==='string')
          return <h1 className="text-center text-lg text-red-500">{costsRep}</h1>
      } catch (error) {
        return <h1 className="text-center text-lg text-red-500">Error al consultar los costos del reporte!</h1>
      }
      console.log('costs rep => ', costsRep);
      setCostReport(costsRep);
    }
    fetchCosts();
  }, []);

  let props = {
    variants: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.1,
          ease: "easeIn",
        }
      },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        }
      },
    },
  }

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
            {/* <p className="text-slate-500">{report.project.types.name}</p>
            <p className="text-slate-500">{report.project.account}</p> */}
            <div className="mt-3 border-t border-slate-500 pt-2">
              <p className="text-blue-500">{report.name}</p>
              <p className="text-slate-500">{report.account}</p>
            </div>
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
              <p className="text-green-600 font-semibold">{total}</p>
            </div>
            <div className="">
              <p className="text-slate-500">Nº gastos</p>
              <p className="text-red-500 font-semibold">{report.quantity}</p>
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
            <div>
              <div className="border-r-1 border-gray-700">
                <p className="text-slate-500">Enviar informe</p>
                <Button type="button" onClick={() => send(true, false)}>Enviar</Button>
              </div>
              <div className="border-r-1 border-gray-700 mt-3">
                <p className="text-slate-500">Cerrar informe</p>
                <Button type="button" onClick={() => send(true, true)}>Cerrar</Button>
              </div>
            </div>
            <div>
              <p className="text-slate-500">Descargar</p>
              {/* <p className="text-blue-600">{"PDF"}</p> */}
              <div className="flex justify-center gap-x-5 mt-2">
                {costsReport.length > 0 && (
                  <PDFDownloadLink document={<ReportPDF report={report} costs={costsReport} />} fileName={report.name} >
                  {/* <PDFDownloadLink document={<AttachedPDF report={report} />} fileName={`FF-ANEXO-1-${report.name}`} > */}
                    {({loading, url, error, blob}) => 
                      loading? (
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informe' 
                            placement="right" className="text-blue-500 bg-white">
                          <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                          {/* // <button type="button">Loading document...</button> */}
                        </Tooltip>
                      ) : (
                        <Tooltip closeDelay={0} delay={100} motionProps={props} content='Informe' 
                            placement="right" className="text-blue-500 bg-white">
                          <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                        </Tooltip>
                        // <button type="button">Download now!</button>
                      ) }
                  </PDFDownloadLink>
                )}
                {typeof(user.department)!== 'string' && (user.department.name.toLowerCase().includes('soporte') || 
                    user.department.name.toLowerCase().includes('direccion')) && (
                  <Tooltip closeDelay={0} delay={100} motionProps={props} content='Anexo' 
                      placement="top" className="text-blue-500 bg-white">
                    <PDFDownloadLink document={<AttachedPDF report={report} dates={dates} />} 
                          fileName={`FF-ANEXO-1-${report.name}`} >
                      {({loading, url, error, blob}) => 
                        loading? (
                          <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                          // <button type="button">Loading document...</button>
                        ) : (
                          <BsFileEarmarkPdf className="w-8 h-8 text-blue-500" />
                          // <button type="button">Download now!</button>
                        ) }
                    </PDFDownloadLink>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
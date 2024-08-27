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
import { useOneReportStore } from "@/app/store/reportsStore";

export default function ProfileReport({report, send, token, user, id, dates}: 
                        {report:Report, send:Function, id:string, 
                          token: string, user:UsrBack, dates: DateReport[]}){
// console.log('report ', report);
  const [costsReport, setCostReport] = useState<CostReport[]>([]);
  const {oneReport} = useOneReportStore();

  const total = CurrencyFormatter({
    currency: "MXN",
    value: oneReport?.total || 0
  });

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
            <img src={ oneReport?.project.photo? oneReport.project.photo: '/img/projects/default.svg'} alt="logo" 
              className="w-28 h-auto" />
          </div>
          <div>
            <p className="text-blue-500">{oneReport?.project.title}</p>
            <p className="text-slate-500">{oneReport?.project.code}</p>
            {/* <p className="text-slate-500">{report.project.types.name}</p>
            <p className="text-slate-500">{report.project.account}</p> */}
            <div className="mt-3 border-t border-slate-500 pt-2">
              <p className="text-blue-500">{oneReport?.name}</p>
              <p className="text-slate-500">{oneReport?.account}</p>
            </div>
          </div>
        </div>
        
        <div className="my-2 bg-white p-3 rounded-lg shadow-md py-2">
          <div className="flex gap-x-2 justify-between">
            <div>
              <img src={oneReport?.company.logo} alt="logo" className="w-16 h-auto" />
            </div>
            <div>
              <Chip label={oneReport?.moves[oneReport?.moves.length -1]?.condition?.name || 'sin status'} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-2 my-2">
            <div className="">
              <p className="text-slate-500">Total</p>
              <p className="text-green-600 font-semibold">{total}</p>
            </div>
            <div className="">
              <p className="text-slate-500">Nº gastos</p>
              <p className="text-red-500 font-semibold">{oneReport?.quantity}</p>
            </div>
          </div>
        </div>
        
        <div className="my-2 mt-2 bg-white p-3 rounded-lg 
            shadow-md py-2">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="border-r-1 border-gray-700">
              <p className="text-slate-500">Fecha</p>
              <p className="text-blue-600">{oneReport?.date.substring(0, 10)}</p>
            </div>
            <div>
              <p className="text-slate-500">Comentarios</p>
              <p className="text-blue-600">{oneReport?.comment}
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
              {oneReport?.ispettycash? 
                  new Date(oneReport?.date) > new Date() && (
                    <div className="border-r-1 border-gray-700 mt-3">
                      <p className="text-slate-500">Cerrar informe</p>
                      <Button type="button" onClick={() => send(true, true)}>Cerrar</Button>
                    </div>
                  ): (
                <div className="border-r-1 border-gray-700 mt-3">
                  <p className="text-slate-500">Cerrar informe</p>
                  <Button type="button" onClick={() => send(true, true)}>Cerrar</Button>
                </div>
              )}
            </div>
            <div>
              <p className="text-slate-500">Descargar</p>
              {/* <p className="text-blue-600">{"PDF"}</p> */}
              <div className="flex justify-center gap-x-5 mt-2">
                {costsReport.length > 0 && oneReport && (
                  <PDFDownloadLink document={<ReportPDF report={oneReport} costs={costsReport} />} fileName={oneReport.name} >
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
                    user.department.name.toLowerCase().includes('direccion')) && oneReport && (
                  <Tooltip closeDelay={0} delay={100} motionProps={props} content='Anexo' 
                      placement="top" className="text-blue-500 bg-white">
                    <PDFDownloadLink document={<AttachedPDF report={oneReport} dates={dates} />} 
                          fileName={`FF-ANEXO-1-${oneReport.name}`} >
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
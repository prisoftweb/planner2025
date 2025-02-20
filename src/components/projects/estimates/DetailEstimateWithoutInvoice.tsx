import { useState, useEffect } from "react"
import { OneProjectMin } from "@/interfaces/Projects"
import { CurrencyFormatter } from "@/app/functions/Globals"
import Chip from "@/components/providers/Chip"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { getEstimate, getResumenEstimateProject, getResumenEstimateByProjectAndEstimate } from "@/app/api/routeEstimates"
import { IEstimate, ResumenEstimateProject } from "@/interfaces/Estimate"
import DetailEstimatePDF from "./DetailEstimatePDF"
import {PDFDownloadLink} from '@react-pdf/renderer'
import { BsFileEarmarkPdf } from "react-icons/bs";
import { GetProjectMin, getProjectsMin } from "@/app/api/routeProjects"
import { showToastMessageError } from "@/components/Alert"

export default function DetailEstimateWithoutInvoice({prj, numEstimate, nomEstimate, showForm, 
    token}: 
  {prj:string, numEstimate:number, nomEstimate:string, showForm:Function, token:string}) {

  const [heightPage, setHeightPage] = useState<number>(900);
  const [estimate, setEstimate] = useState<IEstimate>();
  const [resumenEstimateProject, setResumenEstimateProject]=useState<ResumenEstimateProject>();
	const [project, setProject] = useState<OneProjectMin>();

  useEffect(() => {
    const fetchData = async() => {
      const res = await getEstimate(token, nomEstimate);
      if(typeof(res) !=='string'){
        setEstimate(res);
      }

			const pr = await GetProjectMin(token, prj);
			if(typeof(pr)=='string'){
				// return <h1 className="text-center text-red-500">{pr}</h1>
				showToastMessageError(pr);
			}else{
				setProject(pr);
			}
      console.log(pr);
      // let resumenEstimateProject: ResumenEstimateProject;
      try {
        // const result = await getResumenEstimateProject(token, project._id);
        const result = await getResumenEstimateByProjectAndEstimate(token, prj, nomEstimate);
        // console.log('estimates min => ', estimates);
        if(typeof(result) === "string"){
          return <h1 className="text-center text-red-500">{result}</h1>
        }else{
          setResumenEstimateProject(result);
        }
      } catch (error) {
        return <h1 className="text-center text-red-500">Ocurrio un error al obtener el resumen de las estimaciones del proyecto!!</h1>  
      }
    }
    fetchData();
  }, []);
  
  const handleResize = () => {
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
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  console.log('estimacion => ', estimate);
  if(!estimate || !resumenEstimateProject || !project){
    return(
      <p className="text-red-500 text-lg">Obteniendo estimacion...</p>
    )
  }

  console.log('proyect ddff ', project);

  return (
    <div className="z-10 top-16 absolute w-full bg-gray-50 space-y-5 p-1 md:p-3 lg:p-7 right-0" style={{height: heightPage}}>
      <div className="flex justify-end">
        <XMarkIcon className="w-9 h-9 text-slate-500
          hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5">
        <div className="bg-white p-3">
          <img src={project?.client?.logo || '/img/clients/default.jpg'} 
            alt={project.client.name} className="h-24 w-auto" />
          {/* <img src={project.client.logo} alt={project.client.name} /> */}
          <div className="flex items-center gap-x-2">
            <img src={project.photo} alt={project.title} className="rounded-full w-14 h-14" />
            <div className="w-full">
              <p className="text-blue-500">{project.title}</p>
              <p className="text-blue-300">{CurrencyFormatter({
                currency: 'MXN',
                value: project.amount
              })}</p>
              <div className="w-full max-w-36">
                <Chip label={project.category.name} color={project.category.color} />
              </div>
            </div>
              {resumenEstimateProject && estimate && (
                <PDFDownloadLink document={<DetailEstimatePDF project={project} resumenEstimate={resumenEstimateProject}
                    estimate={estimate} numEstimate={numEstimate} />} fileName={project.title} >
                  {({loading, url, error, blob}) => 
                    loading? (
                      <BsFileEarmarkPdf className="w-8 h-8 text-slate-500" />
                    ) : (
                      <BsFileEarmarkPdf className="w-8 h-8 text-green-500" />
                    ) }
              </PDFDownloadLink>
              )}
          </div>
        </div>

        <div className="bg-white p-3 flex flex-col items-center">
          <img src="/Logotipo_principal.png" alt="logo" className="h-32 w-auto" />
          <p className="text-blue-500">Samuel Palacios Hernandez</p>
        </div>

        <div className="bg-white p-3">
          <div className=" border border-gray-700">
            <div className="flex items-center border border-gray-700">
              <p className="bg-green-600 text-white p-2 w-40 text-center">{numEstimate}</p>
              <p className="w-full text-blue-500 text-right p-2">{estimate?.name}</p>
            </div>
            <div className="text-center border border-slate-700 p-2">
              <p className="text-slate-600 text-center">{CurrencyFormatter({
                currency: 'MXN',
                value: estimate?.amount || 0
              })}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-slate-500">Fecha</p>
            <p className="text-slate-700">{estimate?.date?.substring(0, 10)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">Orden de compra</p>
            <p className="text-slate-700">{estimate?.purschaseOrder}</p>
          </div>
        </div>

      </div>

      <p className="text-blue-500 text-cente mb-0r">CONTRATO</p>
      <div className="bg-white shadow-md shadow-slate-500 p-2 mt-0">
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Monto de contrato</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: project.amount
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Estimado anterior</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.totalPrevious?.estimatedTotal || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-blue-400 w-72">Esta estimacion</p>
          <p className="text-lg text-green-600 w-48 text-right">{CurrencyFormatter({
              currency: 'MXN',
              value: estimate?.amount || 0
            })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Acumulado estimado</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.totalAccumulated?.amountPayable || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Saldo pendiente por estimar</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN", 
            value: 0
          })}</p>
        </div>
      </div>

      <p className="text-blue-500 text-center">ANTICIPO</p>
      <div className="bg-white shadow-md shadow-slate-500 p-2">
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Anticipo recibido</p>
          <p className="text-lg text-slate-600 w-48 text-right">$0</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Amortizado anterior</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.totalPrevious?.amountChargeOff || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-blue-400 w-72">Esta estimacion</p>
          <p className="text-lg text-green-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.totalActual?.amountChargeOff || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Acumulado amortizado</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.totalAccumulated?.amountChargeOff || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Saldo pendiente por amortizar</p>
          <p className="text-lg text-slate-600 w-48 text-right">$0</p>
        </div>
      </div>

      <p className="text-blue-500 text-center">FONDO DE GARANTIA {project.guaranteefund.porcentage}%</p>
      <div className="bg-white shadow-md shadow-slate-500 p-2">
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Retenido anterior</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: 'MXN',
            value: resumenEstimateProject?.totalPrevious?.amountGuaranteeFund || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-blue-400 w-72">Esta estimacion</p>
          <p className="text-lg text-green-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN", 
            value: resumenEstimateProject?.totalActual?.amountGuaranteeFund || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Total retenido</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.totalAccumulated?.amountGuaranteeFund || 0
          })}</p>
        </div>
      </div>

      <p className="text-blue-500 text-center">ESTA ESTIMACION</p>
      <div className="bg-white shadow-md shadow-slate-500 p-2">
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Importe esta estimacion</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.estimateResume?.amount || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Amortizacion de anticipo</p>
          <p className="text-lg text-green-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.estimateResume?.amountChargeOff || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-blue-400 w-72">Fondo de garantia</p>
          <p className="text-lg text-green-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.estimateResume?.amountGuaranteeFund || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Acumulado Total sin impuestos</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.estimateResume?.amount || 0
          })}</p>
        </div>
        <div className="flex justify-around flex-wrap">
          <p className="text-slate-400 w-72">Acumulado Total con impuestos</p>
          <p className="text-lg text-slate-600 w-48 text-right">{CurrencyFormatter({
            currency: "MXN",
            value: resumenEstimateProject?.estimateResume?.estimatedTotalVAT || 0
          })}</p>
        </div>
      </div>
    </div>
  )
}
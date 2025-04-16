'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import HeaderForm from "@/components/HeaderForm"
import Chip from "@/components/providers/Chip"
import { OneProjectMin } from "@/interfaces/Projects"
import { ProgressBarComponent } from "../dashboard/ProgressBarComponent"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import NavStepperConceptEstimate from "./NavStepperConceptEstimate"
import ConceptStepperComponent from "./ConceptStepperComponent"
import PriceUnityStepper from "./PriceUnityStepper"
import DataStepperComponent from "./DataStepperComponent"
import { getConceptsMin, } from "@/app/api/routeEstimates"
import { IConceptEstimateMin, IConceptEstimate, PriceConcept, IEstimate } from "@/interfaces/Estimate"
import { showToastMessageError } from "@/components/Alert"
import DonutChartComponent from "../dashboard/DonutChartComponent"

interface OptionsDashboard {
  label: string,
  costo: number
}

export default function AddNewConceptEstimate({showForm, project, updateConcepts, user, token, 
    idEstimate, conceptsDataChart}: 
  {showForm:Function, project: OneProjectMin, updateConcepts:Function, user:string, token:string, 
    idEstimate:IEstimate, conceptsDataChart:IConceptEstimate[]}) {
  // const refRequest = useRef(true);

  const [conceptSel, setConcepSel] = useState<IConceptEstimateMin>();
  const [idPrice, setIdPrice] = useState<PriceConcept>();
  
  const [concepts, setConcepts] = useState<IConceptEstimateMin[]>([]);

  const [heightPage, setHeightPage] = useState<number>(900);
  const [indexStepper, setIndexStepper] = useState<number>(0);

  const handleIndexStepper = (value:number) => {
    setIndexStepper(value);
  }

  useEffect(() => {
    const fetchCocnepts = async () => {
      let con: IConceptEstimateMin[];
      try {
        con = await getConceptsMin(token);
        if(typeof(con) === "string"){
          showToastMessageError(con);
          return <h1 className="text-center text-red-500">{con}</h1>
        }else{
          setConcepts(con);
          setConcepSel(con[0]);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al obtener los conceptos');
        return <h1 className="text-center text-red-500">Ocurrio un error al obtener los conceptos!!</h1>  
      }
    }
    fetchCocnepts();
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

  const colorsRandom = ['#E4D831', '#71B2F2', '#617178', '#FFA145', '#8579F0', '#ff5252', '#69f0ae', '#7D9F2D', '#289399', '#f08080']
  

  const handleConceptID = (value: string) => {
    const c = concepts.find((c) => c._id === value);
    if(c){
      setConcepSel(c);
    }
  }

  const handlePriceId = (value: PriceConcept) => {
    setIdPrice(value);
  }

  const handleAddNewConcept = async () => {
    let cons: IConceptEstimateMin[];
    try {
      cons = await getConceptsMin(token);
      console.log('res concepts => ', cons);
      if(typeof(cons) === "string")
        showToastMessageError(cons);
      else{
        setConcepts(cons);
        const contsLV: Options[] = [];
        cons.map((c) => {
          contsLV.push({
            label: c.name,
            value: c._id
          });
        });
      }
    } catch (error) {
      showToastMessageError('Ocurrio un error al obtener los conceptos de la estimacion!!');  
    }
  }

  const handleAddNewPrice = () => {

  }

  const priceComp = conceptSel? <PriceUnityStepper handlePriceId={handlePriceId} nextStep={handleIndexStepper} 
                      token={token} handleAddNewPrice={handleAddNewPrice} conceptSelected={conceptSel} 
                      user={user} /> : <></>;

  const dataComp = conceptSel? <DataStepperComponent conceptSelected={conceptSel} token={token} 
                previousStep={handleIndexStepper} price={idPrice} user={user} idEstimate={idEstimate._id}
                updateConcepts={updateConcepts} showForm={showForm} /> : <></>;

  let viewComponent = indexStepper===1? 
        priceComp:
        (indexStepper===2?  dataComp: 
          <ConceptStepperComponent handleConceptID={handleConceptID} nextStep={handleIndexStepper}
            token={token} handleAddNewConcept={handleAddNewConcept} concepts={concepts} />);

  const categoriesConcepts: string[] = [];
  const dataConceptsDashboard: OptionsDashboard[] = [];  

  conceptsDataChart.map((e) => {
    if(e.conceptEstimate?.priceConcepEstimate?.cost){
      dataConceptsDashboard.push({
        costo: ((e.conceptEstimate?.amount? e.conceptEstimate.amount: 0) / idEstimate.amount) * 100,
        label: e.conceptEstimate.name
      });
      categoriesConcepts.push(e.conceptEstimate.name);
    }
  });

  const colors = ['blue', 'red', 'green', 'orange', 'cyan', 'indigo', 'amber', 'violet', 'lime', 'fuchsia', 'blue', 'red', 'cyan', 'green', 'orange', 'indigo', 'amber', 'violet', 'lime', 'fuchsia'];
  
  return(
    <>
      <form className="z-10 absolute top-16 w-full max-w-xl bg-white space-y-5 p-3 right-0"
          style={{height: `${heightPage}px`}}>
        <div className="flex justify-between">
          <HeaderForm img="/img/estimates/concepts.svg" subtitle="Modifica y agrega mas conceptos a una estimacion existente" 
            title="Agregar conceptos a estimacion"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => showForm(false)} />
        </div>

        <div className="bg-white p-3">
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <div className="flex items-center justify-between gap-x-2">
                <div className="flex gap-x-1">
                  <div className="flex items-end">
                    <div className={`w-3 h-3 ${project.status? 'bg-green-500': 'bg-red-500'}`}></div>
                    <img src={project.photo} alt={project.title} className="rounded-full w-14 h-14" />
                  </div>
                  <div>
                    <p className="text-blue-500">{project.title}</p>
                    <p className="text-slate-600">{project.account}</p>
                  </div>
                </div>
                <div>
                  <Chip label={project.category.name} color={project.category.color} />
                </div>
              </div>
              <div>
                <p className=" text-sm">Estimacion total</p>
                <ProgressBarComponent label={''} progress={79} 
                  widthBar="w-full"
                  color={colorsRandom[1]} hei="h-5" /> 
              </div>
            </div>
            <div>
              <DonutChartComponent data={dataConceptsDashboard} colors={colors} category="costo"
                                      categories={categoriesConcepts} flexWrap="" size="w-28 h-28"  
                                      showLegend={false} />
            </div>
          </div>
        </div>

        <NavStepperConceptEstimate changeTab={handleIndexStepper} index={indexStepper} />
        {viewComponent}  
      </form>
    </>
  )
}
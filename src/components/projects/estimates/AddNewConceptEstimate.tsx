'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
// import Button from "@/components/Button"
// import Input from "@/components/Input"
// import Label from "@/components/Label"
// import TextArea from "@/components/TextArea"
import HeaderForm from "@/components/HeaderForm"
import Chip from "@/components/providers/Chip"
import { OneProjectMin } from "@/interfaces/Projects"
// import { CurrencyFormatter } from "@/app/functions/Globals"
import { ProgressBarComponent } from "../dashboard/ProgressBarComponent"
import { useState, useEffect } from "react"
// import CurrencyInput from "react-currency-input-field"
// import { createConceptEstimate } from "@/app/api/routeEstimates"
// import { showToastMessage, showToastMessageError } from "@/components/Alert"
import { Options } from "@/interfaces/Common"
// import SelectReact from "@/components/SelectReact"
// import {PlusCircleIcon} from "@heroicons/react/24/solid"
// import FormNewConcept from "./FormNewConcept"
import NavStepperConceptEstimate from "./NavStepperConceptEstimate"
import ConceptStepperComponent from "./ConceptStepperComponent"
import PriceUnityStepper from "./PriceUnityStepper"
import DataStepperComponent from "./DataStepperComponent"
import { getConeptsEstimate, getAllConceptsDetailsByEstimateMin } from "@/app/api/routeEstimates"
import { IConceptEstimate, PriceConcept } from "@/interfaces/Estimate"
import { showToastMessageError } from "@/components/Alert"

export default function AddNewConceptEstimate({showForm, project, updateConcepts, user, token, 
    conceptSLV, idEstimate, conceptsEstimate}: 
  {showForm:Function, project: OneProjectMin, updateConcepts:Function, user:string, token:string, 
    conceptSLV:Options[], idEstimate:string, conceptsEstimate:IConceptEstimate[]}) {
  // const refRequest = useRef(true);

  // const [idConcept, setIdConcept] = useState<string>(conceptSLV[0].value);
  const [conceptSel, setConcepSel] = useState<IConceptEstimate>(conceptsEstimate[0]);
  const [idPrice, setIdPrice] = useState<PriceConcept>();
  
  const [code, setCode] = useState<string>('');
  const [date, setDate] = useState<string>('');
  
  const [description, setDescription] = useState<string>('');
  const [unity, setUnity] = useState<string>('');
  const [conceptsLV, setConceptLV] = useState<Options[]>(conceptSLV);

  const [concepts, setConcepts] = useState<IConceptEstimate[]>(conceptsEstimate);

  const [heightPage, setHeightPage] = useState<number>(900);
  // const refRequest = useRef(true);
  const [indexStepper, setIndexStepper] = useState<number>(0);

  const handleIndexStepper = (value:number) => {
    setIndexStepper(value);
  }

  // const handleArea = (value:string) => {
  //   setArea(value);
  // }

  // const handleSection = (value:string) => {
  //   setSection(value);
  // }

  // const handleQuantity = (value:string) => {
  //   setQuantity(value);
  // }

  // const handlePU = (value:string) => {
  //   setPu(value);
  // }

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
  const getRandomArbi = (min: any, max: any) => {
    const res = parseInt(Math.random() * (max - min) + min);   
    return res;
  }

  const c1 = getRandomArbi(0, 9);

  const handleConceptID = (value: string) => {
    // setIdConcept(value);
    const c = concepts.find((c) => c.conceptEstimate._id === value);
    if(c){
      setConcepSel(c);
    }
  }

  const handlePriceId = (value: PriceConcept) => {
    setIdPrice(value);
  }

  const handleAddNewConcept = async () => {
    console.log('agregar nuevo concepto');
    let cons: IConceptEstimate[];
    try {
      cons = await getAllConceptsDetailsByEstimateMin(token, idEstimate);
      console.log('res concepts => ', cons);
      if(typeof(cons) === "string")
        // return <h1 className="text-center text-red-500">{cons}</h1>
        showToastMessageError(cons);
      else{
        setConcepts(cons);
        const contsLV: Options[] = [];
        cons.map((c) => {
          contsLV.push({
            label: c.conceptEstimate.name,
            value: c.conceptEstimate._id
          });
        });
        // console.log('nuevos conceptos => ', contsLV);
        setConceptLV(contsLV);
      }
    } catch (error) {
      console.log('catch error => ', error);
      // return <h1 className="text-center text-red-500"></h1>
      showToastMessageError('Ocurrio un error al obtener los conceptos de la estimacion!!');  
    }
  }

  const handleAddNewPrice = () => {

  }


  let viewComponent = indexStepper===1? 
        <PriceUnityStepper handlePriceId={handlePriceId} nextStep={handleIndexStepper} 
          token={token} handleAddNewPrice={handleAddNewPrice} conceptSelected={conceptSel} 
          user={user} />:
        (indexStepper===2? <DataStepperComponent conceptSelected={conceptSel} token={token} 
            previousStep={handleIndexStepper} price={idPrice} user={user} idEstimate={idEstimate} /> : 
          <ConceptStepperComponent handleConceptID={handleConceptID} nextStep={handleIndexStepper}
            token={token} handleAddNewConcept={handleAddNewConcept} concepts={concepts} />);
  
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
                  {/* color={colorsRandom[c1]} hei="h-5" /> */}
              </div>
            </div>
            <div>
              agregar grafico
            </div>
          </div>
        </div>

        <NavStepperConceptEstimate changeTab={handleIndexStepper} index={indexStepper} />
        {viewComponent}
        
        {/* <div className="flex justify-center mt-2">
          <Button type="button" onClick={saveEstimate}>Guardar</Button>
        </div> */}
      </form>
    </>
  )
}
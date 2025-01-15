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
import { getConeptsEstimate } from "@/app/api/routeEstimates"
import { IConceptEstimate } from "@/interfaces/Estimate"

export default function AddNewConceptEstimate({showForm, project, updateConcepts, user, token, 
    conceptSLV, idEstimate, conceptsEstimate}: 
  {showForm:Function, project: OneProjectMin, updateConcepts:Function, user:string, token:string, 
    conceptSLV:Options[], idEstimate:string, conceptsEstimate:IConceptEstimate[]}) {
  // const refRequest = useRef(true);

  // const [idConcept, setIdConcept] = useState<string>(conceptSLV[0].value);
  const [conceptSel, setConcepSel] = useState<IConceptEstimate>(conceptsEstimate[0]);
  const [idPrice, setIdPrice] = useState<string>(conceptSLV[0].value);
  const [area, setArea] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('0');
  const [pu, setPu] = useState<string>('0');
  const [code, setCode] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
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

  const handleArea = (value:string) => {
    setArea(value);
  }

  const handleSection = (value:string) => {
    setSection(value);
  }

  const handleQuantity = (value:string) => {
    setQuantity(value);
  }

  const handlePU = (value:string) => {
    setPu(value);
  }

  const handleCode = (value:string) => {
    setCode(value);
  }

  const handleDate = (value:string) => {
    setDate(value);
  }

  const handleAmount = (value:string) => {
    setAmount(value);
  }

  const handleDescription = (value:string) => {
    setDescription(value);
  }

  const handleUnity = (value:string) => {
    console.log('unity value => ', value);
    setUnity(value);
  }

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

  // const updateValues = (val: number) => {
  //   const amor = (val * 30) / 100;
  //   const guaran = (val * Number(project.guaranteefund?.porcentage || '0')) / 100;
  //   const total = val - amor - guaran;

  //   setAmortization(amor);
  //   setGuarantee(guaran);
  //   setAmountPay(total);
  // }

  // const validationData = () =>{
  //   let validation = true;
  //   if(!code || code===''){
  //     setBandCode(true);
  //     validation = false;
  //   }else{
  //     setBandCode(false);
  //   }
  //   if(!area || area===''){
  //     setBandArea(true);
  //     validation = false;
  //   }else{
  //     setBandArea(false);
  //   }
  //   if(!section || section===''){
  //     setBandSection(true);
  //     validation = false;
  //   }else{
  //     setBandSection(false);
  //   }
  //   if(!quantity || quantity<=0){
  //     setBandQuantity(true);
  //     validation = false;
  //   }else{
  //     setBandQuantity(false);
  //   }
  //   if(!pu || pu<=0){
  //     setBandPu(true);
  //     validation = false;
  //   }else{
  //     setBandPu(false);
  //   }
  //   if(!amount || amount<=0){
  //     setBandAmount(true);
  //     validation = false;
  //   }else{
  //     setBandAmount(false);
  //   }
  //   if(!description || description===''){
  //     setBandDescription(true);
  //     validation = false;
  //   }else{
  //     setBandDescription(false);
  //   }
  //   return validation;
  // }

  // const saveEstimate = async () => {
  //   const val = validationData();

  //   if(val){
  //     const data = {
  //       // name,
  //       description,
  //       company: "65d3813c74045152c0c4377e",
  //       project: project._id,
  //       user
  //     }

  //     // const res = await createConceptEstimate(token, data);
  //     // if(typeof(res)==='string'){
  //     //   showToastMessageError(res);
  //     // }else{
  //     //   updateEstimates();
  //     //   showForm(false);
  //     // }
  //   }
  // }

  const handleConceptID = (value: string) => {
    // setIdConcept(value);
    const c = concepts.find((c) => c._id === value);
    if(c){
      setConcepSel(c);
    }
  }

  const handlePriceId = (value: string) => {
    setIdPrice(value);
  }

  const handleAddNewConcept = async () => {
    console.log('agregar nuevo concepto');
    let cons: IConceptEstimate[];
    try {
      cons = await getConeptsEstimate(token, idEstimate);
      // console.log('res concepts => ', cons);
      if(typeof(cons) === "string")
        return <h1 className="text-center text-red-500">{cons}</h1>
    } catch (error) {
      console.log('catch error => ', error);
      return <h1 className="text-center text-red-500">Ocurrio un error al obtener los conceptos de la estimacion!!</h1>  
    }
  
    setConcepts(cons);
    const contsLV: Options[] = [];
    cons.map((c) => {
      contsLV.push({
        label: c.name,
        value: c._id
      });
    });
    // console.log('nuevos conceptos => ', contsLV);
    setConceptLV(contsLV);
  }

  const handleAddNewPrice = () => {

  }


  let viewComponent = indexStepper===1? 
        <PriceUnityStepper amount={amount} code={code} conceptID={conceptSel._id} conceptsLV={conceptsLV} 
          date={date} description={description} handlePriceId={handlePriceId} nextStep={handleIndexStepper} 
          setAmount={handleAmount} setDate={handleDate} setUnity={handleUnity} token={token} unity={unity}
          handleAddNewPrice={handleAddNewPrice} conceptSelected={conceptSel} />:
        (indexStepper===2? <DataStepperComponent amount={amount} area={area} code={code} conceptID={conceptSel._id} 
            conceptsLV={conceptsLV} date={date} description={description} handlePriceId={handlePriceId} pu={pu}
            quantity={quantity} section={section} setArea={handleArea} setPU={handlePU} setQuantity={handleQuantity} 
            setSection={handleSection} token={token} unity={unity} previousStep={handleIndexStepper} /> : 
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
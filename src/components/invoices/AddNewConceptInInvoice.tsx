'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import HeaderForm from "@/components/HeaderForm"
import { useState, useEffect } from "react"
import { Options } from "@/interfaces/Common"
import NavStepperConceptEstimate from "../projects/estimates/NavStepperConceptEstimate"
import ConceptStepperComponent from "../projects/estimates/ConceptStepperComponent"
import PriceUnityStepper from "../projects/estimates/PriceUnityStepper"
import { getConceptsMin, } from "@/app/api/routeEstimates"
import { IConceptEstimateMin, PriceConcept } from "@/interfaces/Estimate"
import { showToastMessageError } from "@/components/Alert"
import DataConceptStepperComponent from "./DataConceptStepper"

export default function AddNewConceptInInvoice({showForm, updateConcepts, user, token, company}: 
  {showForm:Function, updateConcepts:Function, user:string, token:string, company:string}) {

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

  const dataComp = conceptSel? <DataConceptStepperComponent conceptSelected={conceptSel} 
                previousStep={handleIndexStepper} price={idPrice} user={user}
                updateConcepts={updateConcepts} showForm={showForm} /> : <></>;

  let viewComponent = indexStepper===1? 
        priceComp:
        (indexStepper===2?  dataComp: 
          <ConceptStepperComponent handleConceptID={handleConceptID} nextStep={handleIndexStepper}
            token={token} handleAddNewConcept={handleAddNewConcept} concepts={concepts}
            company={company} user={user} />);

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

        <NavStepperConceptEstimate changeTab={handleIndexStepper} index={indexStepper} />
        {viewComponent}  
      </form>
    </>
  )
}
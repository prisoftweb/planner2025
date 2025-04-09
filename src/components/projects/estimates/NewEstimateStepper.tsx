import HeaderForm from "@/components/HeaderForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { ProjectMin } from "@/interfaces/Projects";
import NavEstimateStepper from "./NavEstimateStepper";
import SelectEstimateProject from "./SelectEstimateProject";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import { createEstimate } from "@/app/api/routeEstimates";
import FormNewEstimate from "./FormNewEstimate";
import { TotalEstimatedByProject } from "@/interfaces/Estimate";
import { getProjectsWithOutEstimateMin } from "@/app/api/routeProjects";

export default function NewEstimateStepper({token, showForm, user, updateProjects}: 
  {token:string, showForm:Function, user:string, updateProjects: () => Promise<void> }){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  const [indexStepper, setIndexStepper]=useState<number>(0);
  const [project, setProject]=useState<ProjectMin>();

  const [advance, setAdvance]= useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [order, setOrder] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
  const [amortization, setAmortization] = useState<string>('0');
  const [guarantee, setGuarantee] = useState<string>('0');
  const [amountPay, setAmountPay] = useState<string>('0');
  const [description, setDescription] = useState<string>('');
  const [amountPayableVAT, setAmountPayableVAT] = useState<string>('');

  const [bandName, setBandName] = useState<boolean>(false);
  const [bandOrder, setBandOrder] = useState<boolean>(false);
  const [bandAmount, setBandAmount] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  const [bandDescription, setBandDescription] = useState<boolean>(false);
  const [typeEstimate, setTypeEstimate]=useState<string>('');
  const [projects, setProjects]=useState<ProjectMin[]>([]);

  const [totalEstimatedProject, setTotalEstimatedProject]=useState<TotalEstimatedByProject[]>();

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

  useEffect(() => {
    const fetch = async() => {
      const res = await getProjectsWithOutEstimateMin(token);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setProjects(res);
      }
    }
    fetch();
  }, []);

  const closeForm = () => {
    showForm(false);
  }

  const handleINdexStepper = (value:number) => {
    setIndexStepper(value);
  }

  const handleProyect = (value:ProjectMin) => {
    setProject(value);
    setIndexStepper(1);
  }

  const handleName = (value:string) => {
    setName(value);
  }

  const handleStartDate = (value:string) => {
    setStartDate(value);
  }

  const handleOrder = (value:string) => {
    setOrder(value);
  }

  const handleAmount = (value:string) => {
    setAmount(value);
  }

  const handleAmortization = (value:string) => {
    setAmortization(value);
  }

  const handleGuarantee = (value:string) => {
    setGuarantee(value);
  }

  const handleAmountPay = (value:string) => {
    setAmountPay(value);
  }

  const handleDescription = (value:string) => {
    setDescription(value);
  }

  const handleAmountPayableVat = (value:string) => {
    setAmountPayableVAT(value);
  }

  const handleTypeEstimate = (value:string) => {
    setTypeEstimate(value);
  }

  const handleAdvance = (value:boolean) => {
    setAdvance(value);
  }

  const handleTotalEstimatedProject = (value:TotalEstimatedByProject[]) => {
    setTotalEstimatedProject(value);
  }

  const validationData = () =>{
    let validation = true;
    if(!name || name===''){
      setBandName(true);
      validation = false;
    }else{
      setBandName(false);
    }
    if(!startDate || startDate===''){
      setBandDate(true);
      validation = false;
    }else{
      setBandDate(false);
    }
    if(!order || order.trim()===''){
      setBandOrder(true);
      validation = false;
    }else{
      if(order.length < 3){
        setBandOrder(true);
        validation = false;
      }else{
        setBandOrder(false);
      }
    }
    if(!amount || amount==='0'){
      setBandAmount(true);
      validation = false;
    }else{
      setBandAmount(false);
    }
    if(!description || description===''){
      setBandDescription(true);
      validation = false;
    }else{
      setBandDescription(false);
    }
    return validation;
  }

  const saveEstimate = async () => {
    const val = validationData();
    
    if(val){
      const data = {
        name,
        description,
        purschaseOrder:order,
        amount,
        amountGuaranteeFund:guarantee,
        amountChargeOff: amortization,
        amountPayable: amountPay,
        amountPayableVAT,
        date: startDate,
        ismoneyadvance: advance,
        condition: [
          {
            glossary: "676359f2a4077026b9c37660",
            user
          }
        ],
        company: "65d3813c74045152c0c4377e",
        project: project?._id,
        user,
        type:typeEstimate
      }
      const res = await createEstimate(token, data);
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        updateProjects();
        showToastMessage('Estimacion creada satisfactoriamente!!!');
        showForm(false);
      }
    }
  }

  const component = 
    indexStepper === 0? <SelectEstimateProject projects={projects} token={token} updateProject={handleProyect} />: 
    indexStepper === 1 && project? <FormNewEstimate amortization={amortization} amount={amount} amountPay={amountPay} 
            amountPayableVAT={amountPayableVAT} bandAmount={bandAmount} bandDate={bandDate} 
            bandDescription={bandDescription} bandName={bandName} bandOrder={bandOrder} 
            description={description} guarantee={guarantee} name={name} advance={advance} overflow={false}
            order={order} project={project} startDate={startDate} token={token} setAdvance={handleAdvance}
            saveEstimate={saveEstimate} setAmortization={handleAmortization} setAmount={handleAmount} 
            setAmountPay={handleAmountPay} setAmountPayableVAT={handleAmountPayableVat} 
            setDescription={handleDescription} setGuarantee={handleGuarantee} setName={handleName}
            setOrder={handleOrder} setStartDate={handleStartDate} setTypeEstimate={handleTypeEstimate}
            setTotalEstimatesProject={handleTotalEstimatedProject} totalEstimatedProject={totalEstimatedProject} />:
      <></>;

  return(
    <div className="z-10 w-full sm:max-w-4xl absolute top-16 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}}
    >
      <div className="h-full">
        <div className="flex justify-between">
          <HeaderForm img="/img/projects.jpg" subtitle="Selecciona projecto y agrega estimacion" 
            title="Nueva estimacion"
          />
          <XMarkIcon className="w-6 h-6 text-slate-500
            hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={closeForm} />
        </div>
        <NavEstimateStepper indexStepper={indexStepper} setIndexStepper={handleINdexStepper} />
        {component}
      </div>
    </div>
  )
}
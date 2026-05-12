import SelectReact from "@/components/SelectReact"
import { useState, useEffect, useMemo } from "react"
import Label from "@/components/Label";
import { showToastMessageError } from "@/components/Alert";
import { getClientsLV, getAllClientsTaxProfileLV } from "@/app/api/routeClients";
import { Options } from "@/interfaces/Common";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { getAllProjectsWithClientAndConditionLV } from "@/app/api/routeProjects";

type DataBasicProps={
  token:string,
  client:string,
  date:string,
  setDate:Function,
  setClient:Function,
  bandDate:boolean,
  folio:string,
  // setFolio:Function
  // bandFolio:boolean,
  // taxFolio:string,
  // setTaxFolio:Function
  // bandTaxFolio:boolean
  nextStep:Function
  // setBandFolio:Function,
  // setBandTaxFolio:Function
  setBandDate:Function,
  project:string,
  setProject:Function
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function DataBasicSatInvoiceStepper({token, client, date, setDate, setClient, bandDate, 
  nextStep, setBandDate, project, setProject, folio }: DataBasicProps) {

  const [optClients, setOptClients]=useState<Options[]>([]);
  const [optProjects, setOptProjects]=useState<Options[]>([]);

  const { minDate, maxDate } = useMemo(() => {
    const today = new Date();
    const threeDaysAgo = new Date();

    threeDaysAgo.setDate(today.getDate() - 3);

    return {
      minDate: formatDate(threeDaysAgo),
      maxDate: formatDate(today),
    };
  }, []);
  
  useEffect(() => {
    const fetch = async () => {
      // const clients = await getClientsLV(token);
      // if(typeof(clients)==='string'){
      //   showToastMessageError(clients);
      // }else{
      //   setOptClients(clients);
      //   if(!client || client ===''){
      //     setClient(clients[0].value);
      //   }
      // }

      const [clients] = await Promise.all([
        getAllClientsTaxProfileLV(token),
        // getAllProjectsWithConditionLV(token)
        // getAllProjectsWithClientAndConditionLV(token, )
      ]);

      if(typeof(clients)==='string'){
        showToastMessageError(clients);
      }else{
        setOptClients(clients);
        console.log("clients: ", clients);
        if(!client || client ===''){
          setClient(clients[0].value);
        }
        if(client || clients.length > 0)
        {
          handleChangeClient(!client || client ===''? clients[0].value: client);
        }
        // const projs = await getAllProjectsWithClientAndConditionLV(token, clients[0].value);
        // if(typeof(projs)==='string'){
        //   showToastMessageError(projs);
        // }else{
        //   setOptProjects(projs);
        //   setProject(projs[0].value);
        // }
      }
    }
    fetch();
  }, []);

  const handleChangeClient = async (value:string) => {
    console.log("change client: ", value);
    setClient(value);
    const projs = await getAllProjectsWithClientAndConditionLV(token, value);
    if(typeof(projs)==='string'){
      showToastMessageError(projs);
    }else{
      setOptProjects(projs);
      setProject(projs[0].value);
    }
  }

  let indexCLi = 0;
  if(optClients.length > 0){
    indexCLi=optClients.findIndex((c) => c.value===client);
  }
  if(indexCLi<0) indexCLi=0;

  const validationData = () => {
    let validation = true;
    // if(!folio || folio===''){
    //   setBandFolio(true);
    //   validation = false;
    //   return false;
    // }else{
    //   setBandFolio(false);
    // }
    // if(!taxFolio || taxFolio==='' || taxFolio.length < 30 || taxFolio.length > 40){
    //   setBandTaxFolio(true);
    //   validation = false;
    //   return false;
    // }else{
    //   setBandTaxFolio(false);
    // }
    if(!date || date===''){
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    if(validation){
      nextStep(1);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2">
        {optClients.length > 0 && (
          <div className="">
            <Label htmlFor="client"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cliente</p></Label>
            <SelectReact index={indexCLi} opts={optClients} setValue={handleChangeClient} />
          </div>
        )}

        {optProjects.length > 0 && (
          <div className="">
            <div className="flex items-center gap-x-3">
              <div className="w-14">
                <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
              </div>
            </div>
            <SelectReact index={0} opts={optProjects} setValue={setProject} />
          </div>
        )}

        <div className="">
          <Label htmlFor="folio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio</p></Label>
          <Input type="text" disabled value={folio} />
          {/* {bandFolio && (
            <p className="text-red-700">Ingrese un folio valido!!!!</p>
          )} */}
        </div>

        {/* <div className="sm:col-span-2">
          <Label htmlFor="taxfolio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio fiscal</p></Label>
          <Input type="text" value={taxFolio} onChange={(e) => setTaxFolio(e.target.value)} />
          {bandTaxFolio && (
            <p className="text-red-700">Ingrese un folio fiscal valido!!!!</p>
          )}
        </div> */}
        
        <div className="">
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <Input type="date" value={date} min={minDate} max={maxDate} 
            autoFocus onChange={(e) => setDate(e.target.value)} />
          {bandDate && (
            <p className="text-red-700">Ingrese una fecha valida!!!!</p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="button" onClick={() => validationData()}>Siguiente</Button>
      </div>
    </div>
  )
}

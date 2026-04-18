import SelectReact from "@/components/SelectReact"
import { useState, useEffect } from "react"
import Label from "@/components/Label";
import { showToastMessageError } from "@/components/Alert";
import { getClientsLV } from "@/app/api/routeClients";
import { Options } from "@/interfaces/Common";
import Input from "@/components/Input";
import Button from "@/components/Button";

type DataBasicProps={
  token:string,
  client:string,
  date:string,
  setDate:Function,
  setClient:Function,
  bandDate:boolean,
  folio:string,
  setFolio:Function
  bandFolio:boolean,
  taxFolio:string,
  setTaxFolio:Function
  bandTaxFolio:boolean
  nextStep:Function
  setBandFolio:Function,
  setBandTaxFolio:Function
  setBandDate:Function,
}

export default function DataBasicSatInvoiceStepper({token, client, date, setDate, setClient, bandDate, 
  bandFolio, bandTaxFolio, folio, setFolio, setTaxFolio, taxFolio, nextStep, setBandDate, setBandFolio, 
  setBandTaxFolio}: DataBasicProps) {

  const [optClients, setOptClients]=useState<Options[]>([]);
  
  useEffect(() => {
    const fetch = async () => {
      const clients = await getClientsLV(token);
      if(typeof(clients)==='string'){
        showToastMessageError(clients);
      }else{
        setOptClients(clients);
        if(!client || client ===''){
          setClient(clients[0].value);
        }
      }
    }
    fetch();
  }, []);

  let indexCLi = 0;
  if(optClients.length > 0){
    indexCLi=optClients.findIndex((c) => c.value===client);
  }
  if(indexCLi<0) indexCLi=0;

  const validationData = () => {
    let validation = true;
    if(!folio || folio===''){
      setBandFolio(true);
      validation = false;
      return false;
    }else{
      setBandFolio(false);
    }
    if(!taxFolio || taxFolio==='' || taxFolio.length < 30 || taxFolio.length > 40){
      setBandTaxFolio(true);
      validation = false;
      return false;
    }else{
      setBandTaxFolio(false);
    }
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
            <SelectReact index={indexCLi} opts={optClients} setValue={setClient} />
          </div>
        )}

        <div className="">
          <Label htmlFor="folio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio</p></Label>
          <Input type="text" value={folio} onChange={(e) => setFolio(e.target.value)} autoFocus />
          {bandFolio && (
            <p className="text-red-700">Ingrese un folio valido!!!!</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="taxfolio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio fiscal</p></Label>
          <Input type="text" value={taxFolio} onChange={(e) => setTaxFolio(e.target.value)} />
          {bandTaxFolio && (
            <p className="text-red-700">Ingrese un folio fiscal valido!!!!</p>
          )}
        </div>
        
        <div className="">
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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

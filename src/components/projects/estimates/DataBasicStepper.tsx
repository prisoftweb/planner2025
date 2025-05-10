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

export default function DataBasicStepper({token, client, date, setDate, setClient, bandDate, 
  bandFolio, bandTaxFolio, folio, setFolio, setTaxFolio, taxFolio, nextStep, setBandDate, setBandFolio, 
  setBandTaxFolio}: DataBasicProps) {

  const [editClient, setEditClient]=useState<boolean>(false);
  const [optClients, setOptClients]=useState<Options[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const clients = await getClientsLV(token);
      if(typeof(clients)==='string'){
        showToastMessageError(clients);
      }else{
        setOptClients(clients);
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
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {optClients.length > 0 && (
          <div className="">
            <div className="flex items-center gap-x-2 justify-between">
              <Label htmlFor="client"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cliente</p></Label>
              <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input checked={editClient} 
                  onClick={() => setEditClient(!editClient)} id="editClient" type="checkbox"
                  className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                    appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                    peer-checked:border-green-500 peer-checked:before:bg-green-500
                    border border-slate-300" />
                <label htmlFor="editClient"
                  className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                  <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"></div>
                </label>
              </div>
            </div>
            <SelectReact index={indexCLi} opts={optClients} setValue={setClient} disabled={!editClient} />
          </div>
        )}

        <div className="">
          <Label htmlFor="folio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio</p></Label>
          <Input type="text" value={folio} onChange={(e) => setFolio(e.target.value)} autoFocus />
          {bandFolio && (
            <p className="text-red-700">Ingrese un folio valido!!!!</p>
          )}
        </div>

        <div className=" col-span-2">
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

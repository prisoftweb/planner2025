import HeaderForm from "../HeaderForm"
import { useState, useEffect } from "react"
import { showToastMessage, showToastMessageError } from "../Alert"
import { getAllCostsByProviderNEConditionLV } from "@/app/api/routeCost";
import { Options } from "@/interfaces/Common";
import SelectReact from "../SelectReact";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { UpdateCost } from "@/app/api/routeCost";

export default function AddCFDIRelations({cost, token, idProv}: {token:string, cost:string, idProv:string}) {

  const [optionsInvoices, setOptionsInvoices] = useState<Options[]>([]);
  const [optInvoice, setOptInvoice]=useState<Options>();
  const [CFDISrelation, setCFDISrelations] = useState<string>();
  
  useEffect(() => {
    const fetchInvoices = async() => {
      const res = await getAllCostsByProviderNEConditionLV(token, idProv);
      if(typeof(res)!=='string'){
        setOptionsInvoices(res);
        setOptInvoice(res.length>0? res[0]: undefined);
        setCFDISrelations(res.length>0? res[0].value : undefined);
      }else{
        showToastMessageError(res);
      }
    }

    fetchInvoices();
  }, []);

  const handleOption = (value:string) => {
    setCFDISrelations(value);
  }

  const addRelation = async () => {
    // showToastMessageError("add => "+CFDISrelation);
    const data = {
      cfdisRelations: {                
        relatedUUIDs: [CFDISrelation],                        
        typeUUID: "07 CFDI por aplicacion de anticipo",                                     
      }
    }

    const res = await UpdateCost(token, cost, data);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      showToastMessage('CFDI relacionado  exitosamente!!!!');
    }

  }

  return (
    <>
      <HeaderForm img="/img/projects.svg" subtitle="Lista de CFDI's relacionados" 
        title="CFDI' Relacionados"
      />
      {optionsInvoices.length > 0 && (
        <div className="flex items-center gap-x-3 mt-5">
          <SelectReact index={0} opts={optionsInvoices} setValue={handleOption} />
          <PlusCircleIcon className="text-green-500 cursor-pointer hover:text-green-300 w-6 h-6" onClick={addRelation} />
        </div>
      )}
    </>
  )
}

import Label from "@/components/Label";
import SelectReact from "@/components/SelectReact";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TextArea from "@/components/TextArea";
import Input from "@/components/Input";
import { useState } from "react";
import { Options } from "@/interfaces/Common";
import FormNewConcept from "./FormNewConcept";
import Button from "@/components/Button";
import { showToastMessage, showToastMessageError } from "@/components/Alert";

export default function ConceptStepperComponent({conceptsLV, handleConceptID, token, code, description, setCode, 
    setDescription, nextStep, handleAddNewConcept}: 
  {conceptsLV:Options[], handleConceptID:Function, token:string, code:string, setCode:Function, 
    description:string, setDescription:Function, nextStep:Function, handleAddNewConcept:Function}) {

  const [showNewConcept, setShowNewConcept] = useState<boolean>(false);
  const [bandDescription, setBandDescription] = useState<boolean>(false);
  const [bandCode, setBandCode] = useState<boolean>(false);
  
  const handleShowNewConcept = (value:boolean) => {
    setShowNewConcept(value);
  }

  const validationData = () =>{
    let validation = true;
    if(!code || code===''){
      setBandCode(true);
      validation = false;
    }else{
      setBandCode(false);
    }
    if(!description || description===''){
      setBandDescription(true);
      validation = false;
    }else{
      setBandDescription(false);
    }
    // return validation;
    if(validation){
      showToastMessage('Aqui pero no avanza!!!');
      nextStep(1)
    }else{
      showToastMessageError('Fallo la validacion!!');
    }
  }
  
  return (
    <>
      <div className="p-2">
        <div className="grid grid-cols-3 gap-x-1">
          <div className="col-span-2">
            <Label htmlFor="concept"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Concepto</p></Label>
            <div className="flex gap-x-2 items-center">
              <SelectReact opts={conceptsLV} index={0} setValue={handleConceptID} />
              <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
                onClick={() => setShowNewConcept(true)} />
            </div>
          </div>
          <div className="">
            <Label htmlFor="clave"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Clave</p></Label>
            <Input type="text" name="clave" autoFocus 
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {bandCode && (
              <p className="text-red-500">La clave es obligatoria!!!</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="descripcion"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)}></TextArea>
          {bandDescription && (
            <p className="text-red-500">La descripcion es obligatoria!!!</p>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <Button type="button" onClick={validationData}>Siguiente</Button>
      </div>
      {showNewConcept && <FormNewConcept addConcept={handleAddNewConcept} setShowForm={handleShowNewConcept} 
                              token={token} />}
    </>
  )
}

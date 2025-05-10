import HeaderForm from "@/components/HeaderForm";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { useState, useEffect } from "react";
import { useOutsideClick } from "@/app/functions/useOutsideClick";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createConceptEstimate } from "@/app/api/routeEstimates";
import { showToastMessage, showToastMessageError } from "@/components/Alert";
import { getCatalogsByNameAndType } from "@/app/api/routeCatalogs";
import SelectReact from "@/components/SelectReact";
import { Options } from "@/interfaces/Common";

export default function FormNewConcept({token, setShowForm, addConcept}: {token:string, setShowForm:Function, addConcept:Function}){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  
  const [code, setCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [bandDescription, setBandDescription] = useState<boolean>(false);
  const [bandCode, setBandCode] = useState<boolean>(false);
  const [bandName, setBandName] = useState<boolean>(false);
  
  const [unit, setUnit] = useState<string>();
  const [optionsUnit, setOptionsUnit] = useState<Options[]>([]);

  const handleUnit = (value: string) => {
    setUnit(value);
  }

  useEffect(() => {
    const fetchUnits = async () => {
      const res = await getCatalogsByNameAndType(token, 'conceptestimate');
      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        setOptionsUnit(res);
        setUnit(res[0]);
      }
    }
    fetchUnits();
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

  const ref = useOutsideClick(() => {
    setShowForm(false);
  });

  const validationData = () =>{
    let validation = true;
    if(!code || code===''){
      setBandCode(true);
      validation = false;
    }else{
      setBandCode(false);
    }
    if(!name || name===''){
      setBandName(true);
      validation = false;
    }else{
      setBandName(false);
    }
    if(!description || description===''){
      setBandDescription(true);
      validation = false;
    }else{
      setBandDescription(false);
    }
    return validation;
  }

  const saveData = async () => {
    const val = validationData();

    if(val){
      const data = {
        code,
        description,
        name,
        unit
      }
      try {
        const res = await createConceptEstimate(token, data);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          addConcept();
          showToastMessage('Concepto creado satisfactoriamente!!!');
          setShowForm(false);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al crear concepto!!');
      }
    }
  }

  return(
    <div className="w-full z-50 max-w-xl absolute -top-1 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}} 
      ref={ref}
    >
      <div className="flex justify-between">
        <HeaderForm img="/img/estimates/prices.svg" subtitle="Agrega un nuevo concepto para estimacion" 
          title="Nuevo concepto"
        />
        <XMarkIcon className="w-6 h-6 text-slate-500
          hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => setShowForm(false)} />
      </div>
      <form className="mt-4 w-full rounded-lg space-y-5">
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
        <div className="">
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input type="text" name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {bandName && (
            <p className="text-red-500">El nombre es obligatorio!!!</p>
          )}
        </div>
        {
          optionsUnit.length > 0 && (
            <div className="">
              <Label htmlFor="unit"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Unidad</p></Label>
              <SelectReact index={0} opts={optionsUnit} setValue={handleUnit} />
            </div>
          )
        }
        <div>
          <Label htmlFor="descripcion"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)}></TextArea>
          {bandDescription && (
            <p className="text-red-500">La descripcion es obligatoria!!!</p>
          )}
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="button" onClick={saveData}>Guardar</Button>
        </div>
      </form>  
    </div>
  )
}
import HeaderForm from "@/components/HeaderForm";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { useState, useEffect } from "react";
import { useOutsideClick } from "@/app/functions/useOutsideClick";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CurrencyInput from "react-currency-input-field";
import { createConceptEstimate } from "@/app/api/routeEstimates";
import { showToastMessage, showToastMessageError } from "@/components/Alert";

export default function FormNewConcept({token, setShowForm, addConcept}:
          {token:string, setShowForm:Function, addConcept:Function}){
  
  //const [suppliercredit, setSuppliercredit] = useState<boolean>(false);
  const [heightPage, setHeightPage] = useState<number>(900);
  // const refRequest = useRef(true);

  const [code, setCode] = useState<string>('');
  // const [startDate, setStartDate] = useState<string>('');
  // const [order, setOrder] = useState<string>('');
  // const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [unity, setUnity] = useState<string>('');

  // const [bandName, setBandName] = useState<boolean>(false);
  // const [bandAmount, setBandAmount] = useState<boolean>(false);
  const [bandDescription, setBandDescription] = useState<boolean>(false);
  const [bandCode, setBandCode] = useState<boolean>(false);
  const [bandName, setBandName] = useState<boolean>(false);
  const [bandUnity, setBandUnity] = useState<boolean>(false);
  const [bandCost, setBandCost] = useState<boolean>(false);

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
    if(!unity || unity===''){
      setBandUnity(true);
      validation = false;
    }else{
      setBandUnity(false);
    }
    if(!cost || cost<=0){
      setBandCost(true);
      validation = false;
    }else{
      setBandCost(false);
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
        cost,
        unity
      }
      try {
        const res = await createConceptEstimate(token, data);
        if(typeof(res)==='string'){
          showToastMessageError(res);
        }else{
          showToastMessage('Concepto creado satisfactoriamente!!!');
          setShowForm(false);
        }
      } catch (error) {
        showToastMessageError('Ocurrio un error al crear concepto!!');
      }
    }
  }

  return(
    <div className="w-full z-50 max-w-xl absolute top-0 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}} 
      ref={ref}
    >
      <div className="flex justify-between">
        <HeaderForm img="/img/projects/default.svg" subtitle="Agrega un nuevo concepto para estimacion" 
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
        <div className="grid grid-cols-2 gap-x-2">
          <div className="">
            <Label htmlFor="unity"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Unidad</p></Label>
            <Input type="text" name="unity" 
              value={unity}
              onChange={(e) => setUnity(e.target.value)}
            />
            {bandUnity && (
              <p className="text-red-500">La unidad es obligatoria!!!</p>
            )}
          </div>
          <div>
            <Label htmlFor="cost"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Costo</p></Label>
            <CurrencyInput
              id="cost"
              name="cost"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              value={cost}
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => {try {
                setCost(Number(value?.replace(/[$,]/g, "") || '0'));
                // updateValues(Number(value?.replace(/[$,]/g, "") || '0'))
              } catch (error) {
                setCost(0);
                // updateValues(0);
              }}}
            />
            {bandCost && (
              <p className="text-red-500">El precio unitario es obligatorio!!!</p>
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
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="button" onClick={saveData}>Guardar</Button>
        </div>
      </form>  
    </div>
  )
}
  

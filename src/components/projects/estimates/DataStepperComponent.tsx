import Label from "@/components/Label";
import TextArea from "@/components/TextArea";
import Input from "@/components/Input";
import CurrencyInput from "react-currency-input-field";
import { Options } from "@/interfaces/Common";
import Button from "@/components/Button";
import { useState } from "react";
import { showToastMessageError, showToastMessage } from "@/components/Alert";

export default function DataStepperComponent({conceptsLV, conceptID, token, code, description, 
    handlePriceId, amount, unity, date, area, section, setArea, setSection, pu, quantity, setPU, 
    setQuantity, previousStep}: 
  {conceptsLV:Options[], conceptID:string, token:string, code:string, description:string, 
    handlePriceId:Function, amount:string, unity:string, 
    date:string, area:string, setArea:Function, section:string, setSection:Function, quantity:string, 
  setQuantity:Function, pu:string, setPU:Function, previousStep: Function}) {

  const [bandArea, setBandArea] = useState<boolean>(false);
  const [bandSection, setBandSection] = useState<boolean>(false);
  const [bandQuantity, setBandQuantity] = useState<boolean>(false);
  const [bandPU, setBandPU] = useState<boolean>(false);

  const valueConcept = conceptsLV.find((e) => e.value===conceptID)?.label || '';

  const validationData = () => {
    let validation = true;
    if(!area || area===''){
      setBandArea(true);
      validation = false;
    }else{
      setBandArea(false);
    }
    if(!section || section===''){
      setBandSection(true);
      validation = false;
    }else{
      setBandSection(false);
    }
    if(!quantity || quantity===''){
      setBandQuantity(true);
      validation = false;
    }else{
      setBandQuantity(false);
    }
    if(!pu || pu===''){
      setBandPU(true);
      validation = false;
    }else{
      setBandPU(false);
    }

    if(!code || code===''){
      showToastMessageError('Falta el codigo del concepto!!!');
      validation = false;
    }
    if(!description || description===''){
      validation = false;
      showToastMessageError('Falta la descripcion del concepto!!!');
    }

    if(!amount || amount===''){
      showToastMessageError('Falta el precio!!!');
      validation = false;
    }
    if(!unity || unity===''){
      showToastMessageError('Falta la unidad!!!');
      validation = false;
    }
    if(!date || date===''){
      showToastMessageError('Falta la fecha!!!');
      validation = false;
    }

    // return validation;
    if(validation){
      // nextStep(1)
    }
  }

  return (
    <>
      <div className="p-2">
        <div className="grid grid-cols-3 gap-x-1">
          <div className=" col-span-2">
            <Label htmlFor="concept"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Concepto</p></Label>
            <Input type="text" name="concept" autoFocus 
                value={valueConcept} disabled />
          </div>
          <div className="">
            <div className="">
              <Label htmlFor="clave"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Clave</p></Label>
              <Input type="text" name="clave" autoFocus 
                value={code} disabled />
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="descripcion"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Descripcion</p></Label>
          <TextArea value={description} disabled ></TextArea>
        </div>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-3 gap-x-1">
          <div>
            <Label htmlFor="price"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Precio</p></Label>
            <CurrencyInput
              id="price"
              name="price"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              value={amount}
              decimalsLimit={2}
              prefix="$"
              disabled
            />
          </div>
          <div className="">
            <Label htmlFor="unidad"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Unidad</p></Label>
            <Input type="text" name="unidad" 
              value={unity} disabled
            />
          </div>
          <div className="">
            <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
            <Input type="date" name="date" 
              value={date} disabled
            />
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-2 gap-x-1">
          <div className="">
            <Label htmlFor="area"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Area</p></Label>
            <Input type="text" name="area" 
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            {bandArea && (
              <p className="text-red-500">El area es obligatoria!!!</p>
            )}
          </div>
          <div className="">
            <Label htmlFor="section"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Seccion</p></Label>
            <Input type="text" name="section" 
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
            {bandSection && (
              <p className="text-red-500">La seccion es obligatoria!!!</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-3 gap-x-1">
          <div className="">
            <Label htmlFor="quantity"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cantidad</p></Label>
            <Input type="text" name="quantity" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {bandQuantity && (
              <p className="text-red-500">La cantidad es obligatoria!!!</p>
            )}
          </div>
          <div>
            <Label htmlFor="pu"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">P. U.</p></Label>
            <CurrencyInput
              id="pu"
              name="pu"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              value={pu}
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => {try {
                setPU(value?.replace(/[$,]/g, "") || '0');
              } catch (error) {
                setPU(0);
              }}}
            />
            {bandPU && (
              <p className="text-red-500">El precio unitario es obligatorio!!!</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <button className="text-black font-normal text-sm bg-white 
          rounded-xl w-36 h-9 py-2 hover:bg-slate-200 border-black"
          onClick={() => previousStep(1)}>Atras</button>
        <Button type="button" onClick={validationData}>Guardar</Button>
      </div>
    </>
  )
}

import Label from "@/components/Label";
import SelectReact from "@/components/SelectReact";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TextArea from "@/components/TextArea";
import Input from "@/components/Input";
import { useState } from "react";
import { Options } from "@/interfaces/Common";
// import FormNewConcept from "./FormNewConcept";
import FormNewPrice from "./FormNewPrice";
import Button from "@/components/Button";
import CurrencyInput from "react-currency-input-field";
import { IConceptEstimate } from "@/interfaces/Estimate";

export default function PriceUnityStepper({conceptsLV, conceptID, token, code, description, 
    nextStep, handlePriceId, amount, setAmount, setUnity, unity, date, setDate, handleAddNewPrice, 
    conceptSelected }: 
  {conceptsLV:Options[], conceptID:string, token:string, code:string, description:string, 
    nextStep:Function, handlePriceId:Function, amount:string, setAmount:Function, unity:string, 
    setUnity:Function, date:string, setDate:Function, handleAddNewPrice:Function, conceptSelected: IConceptEstimate }) {

  const [showNewPrice, setShowNewPrice] = useState<boolean>(false);

  const [bandPrice, setBandPrice] = useState<boolean>(false);
  const [bandUnity, setBandUnity] = useState<boolean>(false);
  const [bandDate, setBandDate] = useState<boolean>(false);
  
  const handleShowNewPrice = (value:boolean) => {
    setShowNewPrice(value);
  }

  // const validationData = () =>{
  //   let validation = true;
  //   if(!amount || amount===''){
  //     setBandPrice(true);
  //     validation = false;
  //   }else{
  //     setBandPrice(false);
  //   }
  //   // console.log('validation unity => ', unity);
  //   if(!unity || unity===''){
  //     setBandUnity(true);
  //     validation = false;
  //   }else{
  //     setBandUnity(false);
  //   }
  //   if(!date || date===''){
  //     setBandDate(true);
  //     validation = false;
  //   }else{
  //     setBandDate(false);
  //   }
  //   // return validation;
  //   if(validation){
  //     nextStep(2)
  //   }
  // }

  const valueConcept = conceptsLV.find((e) => e.value===conceptID)?.label || '';

  return (
      <>
        {/* <div className="p-2">
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
        </div> */}

        <div>
          <div className="flex justify-between items-end p-2 bg-slate-100 border border-slate-500 rounded-t-lg">
            <p className="text-slate-700">{conceptSelected.name}</p>
            <p className="text-slate-700">{conceptSelected.code}</p>
          </div>
          <div className="border border-slate-500 p-2 text-xs text-slate-500">
            <p>{conceptSelected.description}</p>
          </div>
        </div>

        <div className="px-2">
          <div className="grid grid-cols-3 gap-x-1">
            <div className=" col-span-2">
              <Label htmlFor="concept"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Precio</p></Label>
              <div className="flex gap-x-2 items-center">
                <SelectReact opts={conceptsLV} index={0} setValue={handlePriceId} />
                <PlusCircleIcon className="w-8 h-8 text-green-500 cursor-pointer hover:text-green-400" 
                  onClick={() => setShowNewPrice(true)} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-1 mt-2">
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
                onValueChange={(value) => {try {
                  setAmount(value?.replace(/[$,]/g, "") || '0');
                } catch (error) {
                  setAmount('0');
                }}}
              />
              {bandPrice && (
                <p className="text-red-500">El precio unitario es obligatorio!!!</p>
              )}
            </div>
            <div className="">
              <Label htmlFor="unidad"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Unidad</p></Label>
              <Input type="text" name="unidad" 
                value={unity}
                onChange={(e) => setUnity(e.target.value)}
              />
              {bandUnity && (
                <p className="text-red-500">La unidad es obligatoria!!!</p>
              )}
            </div>
            <div className="">
              <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
              <Input type="date" name="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {bandDate && (
                <p className="text-red-500">La fecha es obligatoria!!!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-x-2 justify-center mt-2">
          <button className="text-black font-normal text-sm bg-white 
            rounded-xl w-36 h-9 py-2 hover:bg-slate-200 border border-black"
            onClick={() => nextStep(0)}>Atras</button>
          {/* <Button type="button" onClick={validationData}>Siguiente</Button> */}
        </div>
        {showNewPrice && <FormNewPrice addPrice={handleAddNewPrice} setShowForm={handleShowNewPrice} 
                                token={token} valueConcept={valueConcept} code={code} 
                                description={description} />}
      </>
    )
}

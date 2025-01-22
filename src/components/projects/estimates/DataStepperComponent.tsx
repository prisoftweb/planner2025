import Label from "@/components/Label";
// import TextArea from "@/components/TextArea";
import Input from "@/components/Input";
import CurrencyInput from "react-currency-input-field";
// import { Options } from "@/interfaces/Common";
import Button from "@/components/Button";
import { useState } from "react";
import { showToastMessageError, showToastMessage } from "@/components/Alert";
import { PriceConcept, IConceptEstimate } from "@/interfaces/Estimate";
import { CurrencyFormatter } from "@/app/functions/Globals";
import { insertConceptInEstimate } from "@/app/api/routeEstimates";

export default function DataStepperComponent({token, previousStep, price, conceptSelected, 
    user, idEstimate}: 
  { token:string, conceptSelected: IConceptEstimate, previousStep: Function, 
    price: PriceConcept| undefined, user:string, idEstimate:string}) {

  const [area, setArea] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('0');
  // const [amount, setAmount] = useState<string>('0');
  const [pu, setPu] = useState<string>('0');
  
  const [bandArea, setBandArea] = useState<boolean>(false);
  const [bandSection, setBandSection] = useState<boolean>(false);
  const [bandQuantity, setBandQuantity] = useState<boolean>(false);
  const [bandPU, setBandPU] = useState<boolean>(false);

  // const valueConcept = conceptsLV.find((e) => e.value===conceptID)?.label || '';

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
    
    if(validation){
      // nextStep(1)
      saveData();
    }
  }

  const saveData = async () => {
    const data = {
      concepts: [
        {
          conceptEstimate: conceptSelected.conceptEstimate._id,
          priceConcepEstimate: {                 
              cost: price?.cost,
              date: price?.date,            
              user: price?.user._id
          },
          area,
          section,
          quantity: Number(quantity),
          amount: Number(pu.replace(/[$,]/g, "")),
          date: new Date(),
          user: user
        }
      ]
    }
    const res = await insertConceptInEstimate(token, data, idEstimate);
    if(typeof(res)==='string'){
      showToastMessageError(res);
    }else{
      showToastMessage('El concepto fue agregado exitosamente!!!');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  const calculatedPU = (valueQuantity:string) => {
    const res = (price?.cost || 0) * Number(valueQuantity.replace(/[$,]/g, ""));
    setPu(res.toString());
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-end p-2 bg-slate-100 border border-slate-500 rounded-t-lg">
          <p className="text-slate-700">{conceptSelected.conceptEstimate.name}</p>
          <p className="text-slate-700">{conceptSelected.conceptEstimate.code}</p>
        </div>
        <div className="border border-slate-500 p-2 text-xs text-slate-500">
          <p>{conceptSelected.conceptEstimate.description}</p>
        </div>
      </div>

      <div className="border border-slate-500 rounded-lg grid grid-cols-2">
        <div className="flex items-center justify-around gap-x-2">
          <img alt="responsable" src={ '/img/users/default.jpg'}
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
          <p className="text-slate-600">Nombre</p>
        </div>
        <div className="border border-slate-500 justify-center items-center">
          {CurrencyFormatter({
            currency: 'MXN',
            value: price?.cost || 0
          })}
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

          <div className="">
            <Label htmlFor="quantity"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cantidad</p></Label>
            <Input type="text" name="quantity" 
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                calculatedPU(e.target.value);
              }}
            />
            {bandQuantity && (
              <p className="text-red-500">La cantidad es obligatoria!!!</p>
            )}
          </div>
          <div>
            <Label htmlFor="pu"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Importe</p></Label>
            <CurrencyInput
              id="pu"
              name="pu"
              className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white
                focus:border-slate-700 outline-0"
              value={pu}
              decimalsLimit={2}
              prefix="$"
              disabled
              // onValueChange={(value) => {try {
              //   setPu(value?.replace(/[$,]/g, "") || '0');
              // } catch (error) {
              //   setPu('0');
              // }}}
            />
            {bandPU && (
              <p className="text-red-500">El importe es obligatorio!!!</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-2 gap-x-2">
        <button className="text-black font-normal text-sm bg-white 
          rounded-xl w-36 h-9 py-2 hover:bg-slate-200 border border-black"
          onClick={() => previousStep(1)}>Atras</button>
        <Button type="button" onClick={validationData}>Guardar</Button>
      </div>
    </>
  )
}

import Label from "@/components/Label";
import Input from "@/components/Input";
import Button from "@/components/Button";
import CurrencyInput from "react-currency-input-field";
import TextArea from "@/components/TextArea";

type DataBasicProps={
  token:string,
  date:string,
  setDate:Function,
  bandDate:boolean,
  reference:string,
  setReference:Function,
  bandReference:boolean
  nextStep:Function
  setBandReference:Function
  setBandDate:Function,
  bandCollection: boolean
  textConcept:string,
  bandTextConcept:boolean,
  setTextConcept:Function,
  amount: string,
  setAmount:Function
  saveCollection:Function
  setBandCollection:Function
  setBandConcept: Function
  disperse:boolean,
  setDisperse:Function
}

export default function DataCollectionStepper({token, date, setDate, bandDate, bandCollection, 
  bandReference, reference, setReference, nextStep, setBandDate, setBandReference, setBandConcept, 
  bandTextConcept, setTextConcept, textConcept, amount, setAmount, saveCollection, setBandCollection, 
  disperse, setDisperse}: DataBasicProps) {

  const validationData = () => {
    let validation = true;
    if(!reference || reference===''){
      setBandReference(true);
      validation = false;
      return false;
    }else{
      setBandReference(false);
    }
    if(!date || date===''){
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    if(!amount || amount==='0'){
      setBandCollection(true);
      validation = false;
      return false;
    }else{
      setBandCollection(false);
    }
    if(!textConcept || textConcept===''){
      setBandConcept(true);
      validation = false;
      return false;
    }else{
      setBandConcept(false);
    }
    return validation;
  }

  const next = () => {
    const val=validationData();
    if(val){
      nextStep(1);
    }
  }

  const createCollection = () => {
    const val = validationData();
    if(val){
      saveCollection();
    }
  }

  console.log('amount => ', amount);

  return (
    <div>
      <div className="flex gap-x-5 justify-end my-5 pr-3">
        <div className="inline-flex items-center justify-end gap-x-2">
          <Label>Dispersar cobro</Label>
          <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
            <input checked={disperse} 
              onClick={() => setDisperse(!disperse)} id="disperse" type="checkbox"
              className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                peer-checked:border-green-500 peer-checked:before:bg-green-500
                border border-slate-300" />
            <label htmlFor="disperse"
              className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
              <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                data-ripple-dark="true"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-2">

        <div className="">
          <Label htmlFor="reference"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Referencia</p></Label>
          <Input type="text" value={reference} onChange={(e) => setReference(e.target.value)} autoFocus />
          {bandReference && (
            <p className="text-red-700">Ingrese una referencia valida!!!!</p>
          )}
        </div>

        <div className="">
          <Label htmlFor="collection"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Por cobrar</p></Label>
          <CurrencyInput
            prefix="$"
            // value={amount.replace(/[$,]/g, "")}
            value={amount}
            className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
                      focus:border-slate-700 outline-0"
            // onChange={(e) => setAmount(e.target.value.replace(/[$,]/g, "") || '0')}
            onChange={(value) => {try {
              console.log('value => ', value.target.value.replace(/[$,]/g, ""));
              setAmount(value.target.value.replace(/[$,]/g, "") || '0');
            } catch (error) {
              setAmount('0');
            }}}
          />
          {bandCollection && (
            <p className="text-red-700">Ingrese una cantidad valida!!!!</p>
          )}
        </div>
        
        <div className="">
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          {bandDate && (
            <p className="text-red-700">Ingrese una fecha valida!!!!</p>
          )}
        </div>
        <div className="col-span-3">
          <Label htmlFor="concept"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Concepto</p></Label>
          <TextArea value={textConcept} onChange={(v) => setTextConcept(v.target.value)}></TextArea>
          {bandTextConcept && (
            <p className="text-red-700">Ingrese un concepto!!!!</p>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-x-3">
      <button type="button"
        onClick={createCollection}
        className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 
          border-slate-900 rounded-xl hover:bg-slate-200"
      >
        Guardar
      </button>
        <Button type="button" onClick={next}>Siguiente</Button>
      </div>
    </div>
  )
}

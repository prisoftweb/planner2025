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
import { Options } from "@/interfaces/Common";
import SelectReact from "@/components/SelectReact";
import { getUsersLV } from "@/app/api/routeUser";

export default function FormNewPrice({token, setShowForm, addPrice, valueConcept, 
    code, description}:
  {token:string, setShowForm:Function, addPrice:Function, valueConcept:string, 
    code:string, description:string}){
  
  //const [suppliercredit, setSuppliercredit] = useState<boolean>(false);
  const [heightPage, setHeightPage] = useState<number>(900);
  // const refRequest = useRef(true);

  const [startDate, setStartDate] = useState<string>('');
  // const [order, setOrder] = useState<string>('');
  // const [amount, setAmount] = useState<number>(0);
  // const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<string>('0');
  // const [unity, setUnity] = useState<string>('');

  // const [bandName, setBandName] = useState<boolean>(false);
  // const [bandAmount, setBandAmount] = useState<boolean>(false);
  // const [bandName, setBandName] = useState<boolean>(false);
  // const [bandUnity, setBandUnity] = useState<boolean>(false);
  const [bandCost, setBandCost] = useState<boolean>(false);

  const [users, setUsers] = useState<Options[]>();
  const [user, setUser] = useState<Options>();

  const handleResize = () => {
    setHeightPage(Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    ));
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const usrs: Options[] = await getUsersLV(token);
      if(typeof(usrs) !== 'string'){
        setUsers(usrs);
        setUser(usrs[0]);
      }
    }
    fetchUsers();
  }, []);

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
    
    // if(!name || name===''){
    //   setBandName(true);
    //   validation = false;
    // }else{
    //   setBandName(false);
    // }
    // if(!unity || unity===''){
    //   setBandUnity(true);
    //   validation = false;
    // }else{
    //   setBandUnity(false);
    // }
    // if(!cost || cost<=0){
    //   setBandCost(true);
    //   validation = false;
    // }else{
    //   setBandCost(false);
    // }
    return validation;
  }

  const saveData = async () => {
    const val = validationData();

    if(val){
      const data = {
        code,
        description,
        // name,
        // cost,
        // unity
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

  const handleUser = (value: Options) => {
    setUser(value);
  }

  return(
    <div className="w-full z-50 max-w-xl absolute top-0 bg-white p-3 right-0"
      style={{height: `${heightPage}px`}} 
      ref={ref}
    >
      <div className="flex justify-between">
        <HeaderForm img="/img/estimates/prices.svg" subtitle="Agrega un nuevo precio unitario para el concepto" 
          title="Nuevo precio"
        />
        <XMarkIcon className="w-6 h-6 text-slate-500
          hover:bg-red-500 rounded-full hover:text-white cursor-pointer" onClick={() => setShowForm(false)} />
      </div>
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

        <div className="mt-2 grid grid-cols-2 gap-2">
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
                setCost(value?.replace(/[$,]/g, "") || '0');
              } catch (error) {
                setCost('0');
              }}}
            />
            {bandCost && (
              <p className="text-red-500">El costo es obligatorio!!!</p>
            )}
          </div>
          <div>
            <Label htmlFor="unity"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Unidad</p></Label>
            <Input value={''} ></Input>
          </div>
          <div>
            <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} ></Input>
          </div>
          <div>
            <Label htmlFor="user"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Realizo</p></Label>
            {users && (
              <SelectReact index={0} opts={users} setValue={handleUser} />
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={saveData}>Guardar</Button>
        </div>  
      </div>  
    </div>
  )
}
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
import { getSatUnitMeasurements, getSatProductCodes } from "@/app/api/routeSatInvoices";
import { ISatCatalog } from "@/interfaces/SatInvoice";

export default function FormNewConcept({token, setShowForm, addConcept, company, user}: 
  {token:string, setShowForm:Function, addConcept:Function, user:string, company:string}){
  
  const [heightPage, setHeightPage] = useState<number>(900);
  
  const [code, setCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [bandDescription, setBandDescription] = useState<boolean>(false);
  const [bandCode, setBandCode] = useState<boolean>(false);
  const [bandName, setBandName] = useState<boolean>(false);

  const [productsSat, setProductsSat] = useState<Options[]>([]);
  const [productSat, setProductSat] = useState<Options>();
  
  const [unit, setUnit] = useState<string>();
  const [optionsUnit, setOptionsUnit] = useState<Options[]>([]);
  const [optsUnit, setOptsUnit] = useState<Options[]>([]);
  const [unitlocal, setUnitlocal] = useState<string>('');

  const handleUnit = (value: string) => {
    setUnit(value);
  }

  const handleProductSat = (value: string) => {
    // console.log('value select:', value);
    const p=productsSat.find((item) => item.value===value);
    // console.log('product select:', p);
    setProductSat(p);
  }

  const handleUnitLocal = (value: string) => {
    setUnitlocal(value);
  }

  useEffect(() => {
    const fetchUnits = async () => {
      // const res = await getCatalogsByNameAndType(token, 'conceptestimate');
      // if(typeof(res)==='string'){
      //   showToastMessageError(res);
      // }else{
      //   setOptionsUnit(res);
      //   setUnit(res[0]);
      // }
      // const res: ISatCatalog[]|string = await getSatUnitMeasurements();
      const [res, resproduct, resunit]= await Promise.all([
        getSatUnitMeasurements(),
        getSatProductCodes(),
        getCatalogsByNameAndType(token, 'conceptestimate')
      ]);

      if(typeof(res)==='string'){
        showToastMessageError(res);
      }else{
        const options = res.map((item: ISatCatalog) => ({
          value: item.id,
          label: item.description
        }));
        setOptionsUnit(options);
        setUnit(options[0].value);
      }

      // console.log("Products SAT:", resproduct);
      if(typeof(resproduct)==='string'){
        showToastMessageError(resproduct);
      }else{
        const options = resproduct.map((item: ISatCatalog) => ({
          value: item.id,
          label: item.description
        }));
        setProductsSat(options);
        setProductSat(options[0]);
      }

      if(typeof(resunit)==='string'){
        showToastMessageError(resunit);
      }else{
        setOptsUnit(resunit);
        setUnitlocal(resunit[0].value);
      }
      // setOptionsUnit([]);
      // setUnit('');
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
      const u=optionsUnit.find((item) => item.value===unit);
      // console.log('prosucto SAT:', productSat);
      // const data={
      //   code,
      //   description,
      //   name,
      //   clavesat: productSat?.value,
      //   descriptionsat: productSat?.label,
      //   // unit
      //   unitsat:{
      //     id: u?.value,
      //     unit: u?.label,
      //     real: u?.label
      //   }
      // }
      const data={
        code,
        name,
        description,
        company,
        user,
        unitsat:{
          id:u?.value,
          unit:u?.label,
          real:u?.label
        },
        codesat: productSat?.value,
        descriptionsat: productSat?.label,
        unit: unitlocal
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
          optsUnit.length > 0 && (
            <div className="">
              <Label htmlFor="unit"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Unidad</p></Label>
              <SelectReact index={0} opts={optsUnit} setValue={handleUnitLocal} />
            </div>
          )
        }
        {
          productsSat.length > 0 && (
            <div className="">
              <Label htmlFor="product"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Producto</p></Label>
              <SelectReact index={0} opts={productsSat} setValue={handleProductSat} />
            </div>
          )
        }
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
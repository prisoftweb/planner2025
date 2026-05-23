import SelectReact from "@/components/SelectReact"
import { useState, useEffect } from "react"
import Label from "@/components/Label";
import { showToastMessageError } from "@/components/Alert";
import { getClientsLV } from "@/app/api/routeClients";
import { Options } from "@/interfaces/Common";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { getAllProjectsWithConditionLV, getAllProjectsWithClientAndConditionLV } from "@/app/api/routeProjects";
import { getCatalogsByNameAndCategory } from "@/app/api/routeCatalogs";
import { getAllClientsTaxProfileLV } from "@/app/api/routeClients";

const catalogFormPayment: Options[] = [
  {
    label: 'EFECTIVO',
    value: 'EFECTIVO 01'
  },
  {
    label: 'CHEQUE_NOMINATIVO',
    value: 'CHEQUE_NOMINATIVO 02'
  },
  {
    label: 'TRANSFERENCIA_ELECTRONICA',
    value: 'TRANSFERENCIA_ELECTRONICA 03'
  },
  {
    label: 'TARJETA_DE_CREDITO',
    value: 'TARJETA_DE_CREDITO 04'
  },
  {
    label: 'MONEDERO_ELECTRONICO',
    value: 'MONEDERO_ELECTRONICO 05'
  },
  {
    label: 'DINERO_ELECTRONICO',
    value: 'DINERO_ELECTRONICO 06'
  },
  {
    label: 'VALES_DE_DESPENSA',
    value: 'VALES_DE_DESPENSA 08'
  },
  {
    label: 'DACION_EN_PAGO',
    value: 'DACION_EN_PAGO 12'
  },
  {
    label: 'SUBROGACION',
    value: 'SUBROGACION 13'
  },
  {
    label: 'CONSIGNACION',
    value: 'CONSIGNACION 14'
  },
  {
    label: 'CONDONACION',
    value: 'CONDONACION 15'
  },
  {
    label: 'COMPENSACION',
    value: 'COMPENSACION 17'
  },
  {
    label: 'NOVACION',
    value: 'NOVACION 23'
  },
  {
    label: 'CONFUSION',
    value: 'CONFUSION 24'
  },
  {
    label: 'REMISION_DE_DEUDA',
    value: 'REMISION_DE_DEUDA 25'
  },
  {
    label: 'PRESCRIPCION_O_CADUCIDAD',
    value: 'PRESCRIPCION_O_CADUCIDAD 26'
  },
  {
    label: 'A_SATISFACCION_DEL_ACREEDOR',
    value: 'A_SATISFACCION_DEL_ACREEDOR 27'
  },
  {
    label: 'TARJETA_DE_DEBITO',
    value: 'TARJETA_DE_DEBITO 28'
  },
  {
    label: 'TARJETA_DE_SERVICIOS',
    value: 'TARJETA_DE_SERVICIOS 29'
  },
  {
    label: 'POR_DEFINIR',
    value: 'POR_DEFINIR 99'
  },
];

type DataBasicProps={
  token:string,
  client:string,
  date:string,
  setDate:Function,
  setClient:Function,
  bandDate:boolean,
  folio:string,
  setFolio:Function
  bandFolio:boolean,
  nextStep:Function
  setBandFolio:Function,
  setBandDate:Function,
  project:string,
  setProject:Function,
  handleConditionPayment:Function,
  handleFormPaid:Function,
  odc:string,
  setOdc:Function,
  bandOdc:boolean
}

export default function DataBasicReferralStepper({token, client, date, setDate, setClient, bandDate, 
  bandFolio, folio, setFolio, nextStep, setBandDate, setBandFolio, project, setProject, 
  handleConditionPayment, handleFormPaid, bandOdc, odc, setOdc}: DataBasicProps) {

  const [editClient, setEditClient]=useState<boolean>(false);
  const [optClients, setOptClients]=useState<Options[]>([]);
  const [optProjects, setOptProjects]=useState<Options[]>([]);

  const [optConditionsPayment, setoptConditionsPayment]=useState<Options[]>([]);
  

  useEffect(() => {
    const fetch = async () => {
      const conditions:Options[] = await getCatalogsByNameAndCategory(token, 'invoices');
      if(typeof(conditions)==='string'){
        showToastMessageError(conditions);
      }else{
        setoptConditionsPayment(conditions);
        handleConditionPayment(conditions[0].value)
      }
    }
    fetch();
  }, []);

  const handleUpdateCondition=(value:string)=> {
    const r = optConditionsPayment.find((v) => v.value==value);
    if(r){
      handleConditionPayment(r.value, r.label);
    }
  }

  useEffect(() => {
    const fetch = async () => {
      // const clients = await getClientsLV(token);

      const [clients] = await Promise.all([
        getAllClientsTaxProfileLV(token),
      ]);
      
      if(typeof(clients)==='string'){
        showToastMessageError(clients);
      }else{
        setOptClients(clients);
        if(!client || client ===''){
          setClient(clients[0].value);
        }

        if(client || clients.length > 0)
        {
          handleChangeClient(!client || client ===''? clients[0].value: client);
        }
      }

      // const projs = await getAllProjectsWithConditionLV(token);
      // if(typeof(projs)==='string'){
      //   showToastMessageError(projs);
      // }else{
      //   setOptProjects(projs);
      //   setProject(projs[0].value);
      // }
    }
    fetch();
  }, []);

  const handleChangeClient = async (value:string) => {
    console.log("change client: ", value);
    setClient(value);
    const projs = await getAllProjectsWithClientAndConditionLV(token, value);
    if(typeof(projs)==='string'){
      showToastMessageError(projs);
    }else{
      setOptProjects(projs);
      setProject(projs[0].value);
    }
  }

  let indexCLi = 0;
  if(optClients.length > 0){
    indexCLi=optClients.findIndex((c) => c.value===client);
  }
  if(indexCLi<0) indexCLi=0;

  const validationData = () => {
    let validation = true;
    if(!folio || folio===''){
      setBandFolio(true);
      validation = false;
      return false;
    }else{
      setBandFolio(false);
    }
    
    if(!date || date===''){
      setBandDate(true);
      validation = false;
      return false;
    }else{
      setBandDate(false);
    }
    if(validation){
      nextStep(1);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2">
        {optClients.length > 0 && (
          <div className="">
            <div className="flex items-center gap-x-3">
              <div className="w-14">
                <Label htmlFor="client"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cliente</p></Label>
              </div>
              <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input checked={editClient} 
                  onClick={() => setEditClient(!editClient)} id="editClient" type="checkbox"
                  className="absolute w-8 h-4 transition-colors duration-300 rounded-full 
                    appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-green-500 
                    peer-checked:border-green-500 peer-checked:before:bg-green-500
                    border border-slate-300" />
                <label htmlFor="editClient"
                  className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-green-500 peer-checked:before:bg-green-500">
                  <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"></div>
                </label>
              </div>
            </div>
            <SelectReact index={indexCLi} opts={optClients} setValue={setClient} disabled={!editClient} />
          </div>
        )}

        {optProjects.length > 0 && (
          <div className="">
            <div className="flex items-center gap-x-3">
              <div className="w-14">
                <Label htmlFor="project"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Proyecto</p></Label>
              </div>
            </div>
            <SelectReact index={0} opts={optProjects} setValue={setProject} />
          </div>
        )}

        <div className="">
          <Label htmlFor="folio"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Folio</p></Label>
          <Input type="text" value={folio} onChange={(e) => setFolio(e.target.value)} autoFocus />
          {bandFolio && (
            <p className="text-red-700">Ingrese un folio valido!!!!</p>
          )}
        </div>
        
        <div className="">
          <Label htmlFor="date"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Fecha</p></Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          {bandDate && (
            <p className="text-red-700">Ingrese una fecha valida!!!!</p>
          )}
        </div>

        {optConditionsPayment.length > 0 && (
          <div className=" ">
            <Label htmlFor="conditionsPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condiciones de pago</p></Label>
            {/* <SelectReact index={0} opts={optConditionsPayment} setValue={handleConditionPayment} /> */}
            <SelectReact index={0} opts={optConditionsPayment} setValue={handleUpdateCondition} />
          </div>
        )}

        {catalogFormPayment && (
          <div className=" ">
            <Label htmlFor="formPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Forma de pago</p></Label>
            <SelectReact index={0} opts={catalogFormPayment} setValue={handleFormPaid} />
          </div>
        )}

        <div className="">
          <Label htmlFor="odc"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Orden de compra</p></Label>
          <Input type="text" value={odc} onChange={(e) => setOdc(e.target.value)} />
          {bandOdc && (
            <p className="text-red-700">Ingrese una orden de compra valida!!!!</p>
          )}
        </div>

      </div>
      <div className="flex justify-center">
        <Button type="button" onClick={() => validationData()}>Siguiente</Button>
      </div>
    </div>
  )
}

import SelectReact from "@/components/SelectReact"
import { useState, useEffect } from "react"
import Label from "@/components/Label";
import { showToastMessageError } from "@/components/Alert";
import { Options } from "@/interfaces/Common";
import Button from "@/components/Button";
import { getCatalogsByNameAndCategory } from "@/app/api/routeCatalogs";
import Input from "@/components/Input";
import { getSatPaymentMethods, getSatCfdiUses, getSatInvoiceTypes, getSatPaymentForms } from "@/app/api/routeSatInvoices";

export interface IMethodPayment {
  id: string
  description: string
  createdAt: string
  updatedAt: any
}

type DataBasicProps={
  token:string,
  handleType:Function,
  handleFormPaid:Function,
  handleMethodPaid:Function,
  nextStep:Function,
  conditionPayment:string,
  handleConditionPayment:Function,
  odc:string,
  setOdc:Function,
  bandOdc:boolean
  setBandOdc:Function
}

// const catalogCFDI: Options[] = [
//   {
//     label: 'ADQUISICION_MERCANCIAS',
//     value: 'ADQUISICION_MERCANCIAS G01'
//   },
//   {
//     label: 'DEVOLUCIONES_DESCUENTOS_BONIFICACIONES',
//     value: 'DEVOLUCIONES_DESCUENTOS_BONIFICACIONES G02'
//   },
//   {
//     label: 'GASTOS_EN_GENERAL',
//     value: 'GASTOS_EN_GENERAL G03'
//   },
//   {
//     label: 'CONSTRUCCIONES',
//     value: 'CONSTRUCCIONES I01'
//   },
//   {
//     label: 'MOBILIARIO_Y_EQUIPO_DE_OFICINA',
//     value: 'MOBILIARIO_Y_EQUIPO_DE_OFICINA I02'
//   },
//   {
//     label: 'EQUIPO_DE_TRANSPORTE',
//     value: 'EQUIPO_DE_TRANSPORTE I03'
//   },
//   {
//     label: 'EQUIPO_DE_COMPUTO',
//     value: 'EQUIPO_DE_COMPUTO I04'
//   },
//   {
//     label: 'DADOS_TROQUELES_HERRAMENTAL',
//     value: 'DADOS_TROQUELES_HERRAMENTAL I05'
//   },
//   {
//     label: 'COMUNICACIONES_TELEFONICAS',
//     value: 'COMUNICACIONES_TELEFONICAS I06'
//   },
//   {
//     label: 'COMUNICACIONES_SATELITALES',
//     value: 'COMUNICACIONES_SATELITALES I07'
//   },
//   {
//     label: 'OTRA_MAQUINARIA',
//     value: 'OTRA_MAQUINARIA I08'
//   },
//   {
//     label: 'HONORARIOS_MEDICOS',
//     value: 'HONORARIOS_MEDICOS D01'
//   },
//   {
//     label: 'GASTOS_MEDICOS_POR_INCAPACIDAD',
//     value: 'GASTOS_MEDICOS_POR_INCAPACIDAD D02'
//   },
//   {
//     label: 'GASTOS_FUNERALES',
//     value: 'GASTOS_FUNERALES D03'
//   },
//   {
//     label: 'DONATIVOS',
//     value: 'DONATIVOS D04'
//   },
//   {
//     label: 'INTERESES_POR_CREDITOS_HIPOTECARIOS',
//     value: 'INTERESES_POR_CREDITOS_HIPOTECARIOS D05'
//   },
//   {
//     label: 'APORTACIONES_VOLUNTARIAS_SAR',
//     value: 'APORTACIONES_VOLUNTARIAS_SAR D06'
//   },
//   {
//     label: 'PRIMA_SEGUROS_GASTOS_MEDICOS',
//     value: 'PRIMA_SEGUROS_GASTOS_MEDICOS D07'
//   },
//   {
//     label: 'GASTOS_TRANSPORTACION_ESCOLAR',
//     value: 'GASTOS_TRANSPORTACION_ESCOLAR D08'
//   },
//   {
//     label: 'CUENTAS_AHORRO_PENSIONES',
//     value: 'CUENTAS_AHORRO_PENSIONES D09'
//   },
//   {
//     label: 'SERVICIOS_EDUCATIVOS',
//     value: 'SERVICIOS_EDUCATIVOS D10'
//   },
//   {
//     label: 'POR_DEFINIR',
//     value: 'POR_DEFINIR P01'
//   },
//   {
//     label: 'SIN_EFECTOS_FISCALES',
//     value: 'SIN_EFECTOS_FISCALES S01'
//   },
//   {
//     label: 'PAGOS',
//     value: 'PAGOS CP01'
//   },
//   {
//     label: 'NOMINA',
//     value: 'NOMINA CN01'
//   }
// ];

// const catalogPaymentMethod: Options[] = [
//   {
//     label: 'PAGO_EN_UNA_EXHIBICION',
//     value: 'PAGO_EN_UNA_EXHIBICION PUE'
//   },
//   {
//     label: 'PAGO_EN_PARCIALIDADES_DIFERIDO',
//     value: 'PAGO_EN_PARCIALIDADES_DIFERIDO PPD'
//   },
// ];

// const catalogFormPayment: Options[] = [
//   {
//     label: 'EFECTIVO',
//     value: 'EFECTIVO 01'
//   },
//   {
//     label: 'CHEQUE_NOMINATIVO',
//     value: 'CHEQUE_NOMINATIVO 02'
//   },
//   {
//     label: 'TRANSFERENCIA_ELECTRONICA',
//     value: 'TRANSFERENCIA_ELECTRONICA 03'
//   },
//   {
//     label: 'TARJETA_DE_CREDITO',
//     value: 'TARJETA_DE_CREDITO 04'
//   },
//   {
//     label: 'MONEDERO_ELECTRONICO',
//     value: 'MONEDERO_ELECTRONICO 05'
//   },
//   {
//     label: 'DINERO_ELECTRONICO',
//     value: 'DINERO_ELECTRONICO 06'
//   },
//   {
//     label: 'VALES_DE_DESPENSA',
//     value: 'VALES_DE_DESPENSA 08'
//   },
//   {
//     label: 'DACION_EN_PAGO',
//     value: 'DACION_EN_PAGO 12'
//   },
//   {
//     label: 'SUBROGACION',
//     value: 'SUBROGACION 13'
//   },
//   {
//     label: 'CONSIGNACION',
//     value: 'CONSIGNACION 14'
//   },
//   {
//     label: 'CONDONACION',
//     value: 'CONDONACION 15'
//   },
//   {
//     label: 'COMPENSACION',
//     value: 'COMPENSACION 17'
//   },
//   {
//     label: 'NOVACION',
//     value: 'NOVACION 23'
//   },
//   {
//     label: 'CONFUSION',
//     value: 'CONFUSION 24'
//   },
//   {
//     label: 'REMISION_DE_DEUDA',
//     value: 'REMISION_DE_DEUDA 25'
//   },
//   {
//     label: 'PRESCRIPCION_O_CADUCIDAD',
//     value: 'PRESCRIPCION_O_CADUCIDAD 26'
//   },
//   {
//     label: 'A_SATISFACCION_DEL_ACREEDOR',
//     value: 'A_SATISFACCION_DEL_ACREEDOR 27'
//   },
//   {
//     label: 'TARJETA_DE_DEBITO',
//     value: 'TARJETA_DE_DEBITO 28'
//   },
//   {
//     label: 'TARJETA_DE_SERVICIOS',
//     value: 'TARJETA_DE_SERVICIOS 29'
//   },
//   {
//     label: 'POR_DEFINIR',
//     value: 'POR_DEFINIR 99'
//   },
// ];

export default function InvoicesConditionsStepper({token, nextStep, handleFormPaid, 
  handleMethodPaid, handleType, conditionPayment, handleConditionPayment, odc, 
  setOdc, bandOdc, setBandOdc}: DataBasicProps) {

  const [optConditionsPayment, setoptConditionsPayment]=useState<Options[]>([]);

  const [catalogPaymentMethod, setCatalogPaymentMethod]=useState<Options[]>([]);
  // const [satMethodPayment, setSatMethodPayment]=useState<IMethodPayment[]>([]);
  // const [catalogCFDI, setCatalogCFDI]=useState<Options[]>([]);
  const [catalogFormPayment, setCatalogFormPayment]=useState<Options[]>([]);
  const [optCondicionesPayment, setoptCondicionesPayment]=useState<Options[]>([]);

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

  useEffect(() => {
      const fetch = async () => {
        const [conditions, fiscalMetPay, satTypes, satPayForm, condicionesP] = await Promise.all([
          getSatCfdiUses(),
          getSatPaymentMethods(),
          getSatInvoiceTypes(),
          getSatPaymentForms(),
          getCatalogsByNameAndCategory(token, 'invoices'),
        ]);
  
        if(typeof(conditions)==='string'){
          showToastMessageError(conditions);
        }else{
          const auxCond:Options[]=conditions.map( (m: IMethodPayment) => ({
            value: m.id,
            label: m.description,
          }));
          // setoptConditionsPayment(auxCond);
          // handleConditionPayment(auxCond[0].value);
          setoptCondicionesPayment(auxCond);
          handleType(auxCond[0].value);
          // handleLabelConditionPayment(condicionesP[0].label);
        }
  
        if(typeof(fiscalMetPay)=='string'){
          showToastMessageError(fiscalMetPay);
        }else{
          // setSatMethodPayment(fiscalMetPay);
          console.log('fiscal met pay:', fiscalMetPay);
          const auxMet:Options[]=fiscalMetPay.map( (m: IMethodPayment) => ({
            value: m.id,
            label: m.description,
          }));
  
          console.log('aux met:', auxMet);
  
          setCatalogPaymentMethod(auxMet);
          handleMethodPaid(auxMet[0].value);
          // handleLabelMethodPaid(auxMet[0].label);
        }
  
        // if(typeof(satTypes)==='string'){
        //   showToastMessageError(satTypes);
        // }else{
        //   const auxTypes:Options[]=satTypes.filter((m: IMethodPayment) => m.description !== 'Todos').map( (m: IMethodPayment) => ({
        //     value: m.id,
        //     label: m.description,
        //   }));
        //   setCatalogCFDI(auxTypes);
        //   console.log('sat types:', auxTypes);
        //   let indexT=auxTypes.findIndex((c) => c.label==="Ingreso");
        //   indexT=indexT<0?0:indexT;
        //   console.log('indexT => ', indexT);
        //   console.log('sat types:', auxTypes[indexT].value);
        //   handleType(auxTypes[indexT?? 0].value);
        //   // handleLabelType(auxTypes[0].label);
        //   // handleConditionPayment(auxTypes[0].value)
        // }
  
        console.log('sat pay form => ', satPayForm);
        if(typeof(satPayForm)==='string'){
          showToastMessageError(satPayForm);
        }else{
          const auxPayForm:Options[]=satPayForm.map( (m: IMethodPayment) => ({
            value: m.id,
            label: m.description,
          }));
          setCatalogFormPayment(auxPayForm);
          handleFormPaid(auxPayForm[0].value);
          // handleLabelFormPaid(auxPayForm[0].label);
          // handleConditionPayment(auxTypes[0].value)
        }
  
        console.log('condicionesP => ', condicionesP);
        if(typeof(condicionesP)==='string'){
          showToastMessageError(condicionesP);
        }else{
          // setoptCondicionesPayment(condicionesP);
          // handleCondicionTPayment(condicionesP[0].value);
          // handleLabelCondicionPayment(condicionesP[0].label);
          // handleConditionPayment(condicionesP[0].value)
        }
      }
      fetch();
    }, []);

  let indexCon = 0;
  if(optConditionsPayment.length > 0){
    indexCon=optConditionsPayment.findIndex((c) => c.value===conditionPayment);
  }
  if(indexCon<0) indexCon=0;

  const validationData = () => {
    nextStep(2);
  }

  return (
    <div>
      <div className="sm:grid sm:grid-cols-2 gap-x-2 gap-y-2">
        {optConditionsPayment.length > 0 && (
          <div className=" ">
            <Label htmlFor="conditionsPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condiciones de pago</p></Label>
            <SelectReact index={0} opts={optConditionsPayment} setValue={handleConditionPayment} />
          </div>
        )}

        {catalogPaymentMethod && (
          <div className=" ">
            <Label htmlFor="methodPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Metodo de pago</p></Label>
            <SelectReact index={0} opts={catalogPaymentMethod} setValue={handleMethodPaid} />
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

        {optCondicionesPayment.length > 0 && (
          // <div className=" col-span-2">
          //   <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
          //   <SelectReact index={0} opts={catalogCFDI} setValue={handleType} />
          // </div>
          <div className=" col-span-2">
            <Label htmlFor="type"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Tipo</p></Label>
            <SelectReact index={0} opts={optCondicionesPayment} setValue={handleType} />
          </div>
        )}

      </div>
      <div className="flex justify-center gap-x-2 mt-3">
        <button
          className="text-black font-normal border border-black text-sm bg-white rounded-xl w-36 h-9 py-2 hover:bg-slate-200"
          onClick={() => nextStep(0)}
          type="button"
        >
          Atras
        </button>
        <Button type="button" onClick={() => validationData()}>Siguiente</Button>
      </div>
    </div>
  )
}

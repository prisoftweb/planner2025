import BasicBarStepper from "./BasicBarStepper";
import { getSatBanks } from "@/app/api/routeSatInvoices";
import { useState, useEffect, useRef } from "react";
import { Options } from "@/interfaces/Common";
import { showToastMessageError } from "../Alert";
import SelectReact from "../SelectReact";
import Label from "../Label";
import { useRegFormContext } from "./StepperProvider";
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";

export interface IMethodPayment {
  id: string
  description: string
  createdAt: string
  updatedAt: any
}

export default function BankDataStepper({company, token, id, user}:
  {token:string, id:string, user: string, company:string}) {

  const [optBanks, setoptBanks]=useState<Options[]>([]);
  const [bank, setBank]=useState<string>();

  const [state, dispatch] = useRegFormContext();
  const refRequest = useRef(true);

  let clabeI = '';
  let accountI = '';
  let numberCardI = '';
  let benefitI = false;

  if(state.bank){
    clabeI = state.databasic.clabe;
    accountI = state.databasic.account;
    numberCardI = state.databasic.numberCard;
    benefitI = state.databasic.benefit;
  }

  useEffect(() => {
    const fetch = async () => {
      const [banks] = await Promise.all([
        getSatBanks(),
      ]);

      if(typeof(banks)==='string'){
        showToastMessageError(banks);
      }else{
        const auxCond:Options[]=banks.map( (m: IMethodPayment) => ({
          value: m.id,
          label: m.description,
        }));
        setoptBanks(auxCond);
        setBank(auxCond[0].value);
      }
    }
    fetch();
  }, []);

  const formik = useFormik({
    initialValues: {
      clabe:clabeI,
      account: accountI,
      numberCard: numberCardI,
      benefit: benefitI
    }, 
    validationSchema: Yup.object({
      clabe: Yup.string()
                  .required('La clabe es obligatoria'),
      account: Yup.string()
                  .required('La cuenta es obligatoria'),
      numberCard: Yup.string()
                  .required('El numero de tarjeta no puede ir vacio'),
      benefit: Yup.string()
                  .required('El beneficiario es obligatorio')
    }),
    onSubmit: async (valores) => {            
      const {account, benefit, clabe, numberCard} = valores;
      const data= {
        account, benefit, clabe, numberCard
      }

      dispatch({ type: 'SET_BANK', data: data });
      dispatch({type: 'INDEX_STEPPER', data: 2})
    },       
  });

  const handleBank = (value:string) => {
    handleBank(value);
  }
 
  return (
    <div className="w-full">
      <div className="my-5">
        <BasicBarStepper index={3} />
      </div>
      {/* <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
          <Input type="text" name="name" autoFocus 
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.name}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre comercial</p></Label>
          <Input type="text" name="tradename" 
            value={formik.values.tradename}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.tradename && formik.errors.tradename ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.tradename}</p>
              </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">RFC</p></Label>
          <Input type="text" name="rfc" 
            value={formik.values.rfc}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.rfc && formik.errors.rfc ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.rfc}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label>Tipo</Label>
          {optBanks.length > 0 && (
            <div className=" ">
              <Label htmlFor="condicionesPaid"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Condiciones de pago</p></Label>
              <SelectReact index={0} opts={optBanks} setValue={handleBank} />
            </div>
          )}
        </div>
        <div className="flex justify-end mt-8 space-x-5">
          <Button onClick={onClickSave} type="button">Guardar</Button>
          <button type="submit"
            className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
            hover:bg-slate-200"
          >
            Siguiente
          </button>
        </div>
      </form> */} 
    </div>
  )
}

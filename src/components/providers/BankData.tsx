import BasicBarStepper from "./BasicBarStepper";
import { getSatBanks } from "@/app/api/routeSatInvoices";
import { useState, useEffect, useRef } from "react";
import { Options } from "@/interfaces/Common";
import { showToastMessage, showToastMessageError } from "../Alert";
import SelectReact from "../SelectReact";
import Label from "../Label";
import { useRegFormContext } from "./StepperProvider";
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import Input from "../Input";
import { Provider } from "@/interfaces/Providers";
import { updateProvider, createAccount, updateAccount } from "@/app/api/routeProviders";

export interface IMethodPayment {
  id: string
  description: string
  createdAt: string
  updatedAt: any
}

export default function BankData({token, id, provider, company, user}: 
  {token:string, id:string, provider:Provider, company:string, user:string}) {

  const [optBanks, setoptBanks]=useState<Options[]>([]);
  const [bank, setBank]=useState<string>();

  const refRequest = useRef(true);

  let clabeI = '';
  let accountI = '';
  let numberCardI = '';
  let benefitI = '';

  console.log('provider => ', provider);

  useEffect(() => {
    const fetch = async () => {
      const [banks] = await Promise.all([
        getSatBanks(),
      ]);

      if(typeof(banks)==='string'){
        showToastMessageError(banks);
      }else{
        const auxCond:Options[]=banks.map( (m: IMethodPayment) => ({
          value: m.description,
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
      // clabe: Yup.string()
      //             .required('La clabe es obligatoria'),
      // account: Yup.string()
      //             .required('La cuenta es obligatoria'),
      // numberCard: Yup.string()
      //             .required('El numero de tarjeta no puede ir vacio'),
      // benefit: Yup.string()
      //             .required('El beneficiario es obligatorio')
    }),
    onSubmit: async (valores) => {            
      const {account, benefit, clabe, numberCard} = valores;
      // const data= {
      //   account, benefit, clabe, numberCard
      // }
      const data={
        bank:bank,
        cardNumber:numberCard,
        interbankCode: clabe,
        bankAccount: account,
        recipient: provider.name,
        alias:provider.tradename,
        user,
        company,
        type:"Proveedor"
      }

      if(provider.bankdetails){
        const data={
          bank:bank,
          cardNumber:numberCard,
          interbankCode: clabe,
          bankAccount: account,
          // recipient: provider.name,
          // alias:provider.tradename,
          user,
          // company,
          // type:"Proveedor"
        }

        const resaccount=await updateAccount(provider.account, token, data);
        console.log('res update => ', resaccount);
        if(typeof(resaccount)==='string'){
          showToastMessageError(resaccount);
        }else{
          showToastMessage('Cuenta actualizada satisfactoriamente...');
        }
      }else{
        const res=await createAccount(data, token);
        const dataUpdate={
          bankdetails: true,
          account: res
        }

        console.log('update provider => ', dataUpdate);
        const resupdate=await updateProvider(provider._id, token, dataUpdate);
        console.log('res update => ', resupdate);
        if(typeof(resupdate)==='string'){
          showToastMessageError(resupdate);
        }else{
          showToastMessage('Proveedor actualizado satisfactoriamente...');
        }
      }

    },       
  });

  const handleBank = (value:string) => {
    handleBank(value);
  }
 
  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-sm rounded-lg space-y-5">
        <div>
          <Label htmlFor="clabe"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Clabe interbancaria</p></Label>
          <Input type="text" name="clabe" autoFocus 
            value={formik.values.clabe}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.clabe && formik.errors.clabe ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.clabe}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="account"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Cuenta bancaria</p></Label>
          <Input type="text" name="account" 
            value={formik.values.account}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.account && formik.errors.account ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.account}</p>
              </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="numberCard"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Numero de tarjeta</p></Label>
          <Input type="text" name="numberCard" 
            value={formik.values.numberCard}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.numberCard && formik.errors.numberCard ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.numberCard}</p>
            </div>
          ) : null}
        </div>
        <div>
          {optBanks.length > 0 && (
            <div className=" ">
              <Label htmlFor="bank"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Banco</p></Label>
              <SelectReact index={0} opts={optBanks} setValue={handleBank} />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="benefit"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Beneficiario</p></Label>
          <Input type="text" name="benefit" 
            value={formik.values.benefit}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.benefit && formik.errors.benefit ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.benefit}</p>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center mt-8 space-x-5">
          <Button type="submit">Guardar</Button>
        </div>
      </form>  
    </div>
  )
}

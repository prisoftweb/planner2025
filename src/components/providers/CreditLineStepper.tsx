import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useRegFormContext } from "./StepperProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import SaveProvider from "@/app/functions/SaveProvider";
import BasicBarStepper from "./BasicBarStepper";
import CurrencyInput from "react-currency-input-field";
import { useRef } from "react";
import { useProviderStore } from "@/app/store/providerStore";

export default function CreditLineStepper({token, id, user}:{token:string, id:string, user: string}){
  
  const [state, dispatch] = useRegFormContext();
  const refRequest = useRef(true);

  const {providerStore, updateProviderStore, updateHaveNewProvider} = useProviderStore();

  let creditlimitI= '', creditdaysI='', currentbalanceI='', percentoverduedebtI=''; 

  if(state.creditline){
    creditlimitI= state.creditline.creditlimit;
    creditdaysI= state.creditline.creditdays;
    currentbalanceI= state.creditline.currentbalance;
    percentoverduedebtI= state.creditline.percentoverduedebt;
  }

  const formik = useFormik({
    initialValues: {
      creditlimit: creditlimitI,
      creditdays: creditdaysI,
      currentbalance: currentbalanceI,
      percentoverduedebt: percentoverduedebtI
    },
    validationSchema: Yup.object({
      creditlimit: Yup.string()
                  .required('El limite de credito no puede ir vacio'),
      creditdays: Yup.string()
                  .required('El numero de dias es obligatorio'),
      currentbalance: Yup.string()
                  .required('El saldo actual es obligatorio'),
      percentoverduedebt: Yup.string()
                  .required('El porcentaje es obligatorio'),        
    }),
    onSubmit: async (valores) => {
      const {creditdays, creditlimit, currentbalance, percentoverduedebt} = valores;
      
      const tradeline = {
        creditdays: parseInt(creditdays? creditdays: '0'), 
        creditlimit: parseInt(creditlimit? creditlimit.replace(/[$,%,]/g, ""): '0'),
        currentbalance: parseInt(currentbalance? currentbalance.replace(/[$,%,]/g, ""): '0'),
        percentoverduedebt: parseInt(percentoverduedebt? percentoverduedebt.replace(/[$,%,]/g, ""): '0')
      }
      dispatch({ type: 'SET_CREDIT_DATA', data: tradeline });
      dispatch({type: 'INDEX_STEPPER', data: 2})
    },       
  });
  
  const onClickSave = async () => {
    if(refRequest.current){
      refRequest.current = false;
      const {creditdays, creditlimit, currentbalance, percentoverduedebt} = formik.values;
      const {name, rfc, suppliercredit, tradename} = state.databasic;
      
      let contact = [];
      if(state.contacts){
        contact = state.contacts;
      }
      let tradeline = {};

      if(suppliercredit){
        tradeline = {
          creditdays: parseInt(creditdays),
          creditlimit: parseInt(creditlimit.replace(/[$,%,]/g, "")),
          currentbalance: parseInt(currentbalance.replace(/[$,%,]/g, "")),
          percentoverduedebt: parseInt(percentoverduedebt.replace(/[$,%,]/g, ""))
        }
      }

      if(name && rfc && tradename){
        const data: any = {
          name,
          rfc,
          tradename,
          suppliercredit,
          tradeline,
          user: id,
          contact,
          condition: [{
            glossary: '663d2fe61d1c43ae98d77bc3',
            user
          }]
        }
        const res = await SaveProvider(data, token);
        if(res.status){
          refRequest.current = true;
          showToastMessage(res.message);
          updateProviderStore([...providerStore, res.prov]);
          updateHaveNewProvider(true);
        }else{
          refRequest.current = true;
          showToastMessageError(res.message);
        }
      }else{
        refRequest.current = true;
        showToastMessageError('Nombre y RFC son obligatorios');
      }
    }else{
      showToastMessageError('Ya hay una solicitud en proceso..!!!');
    }
  }

  return(
    <div className="flex flex-col w-full ">
      <div className="my-5">
        <BasicBarStepper index={1} />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-md space-y-5">
        <div>
          <Label htmlFor="creditlimit">Limite de credito</Label>
          <CurrencyInput
            id="creditlimit"
            name="creditlimit"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
              focus:border-slate-700 outline-0"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            defaultValue={creditlimitI || 0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              formik.values.creditlimit=parseFloat(value || '0').toString();
            } catch (error) {
              formik.values.creditlimit='0';
            }}}
          />
          {formik.touched.creditlimit && formik.errors.creditlimit ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.creditlimit}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="creditdays">Dias de credito</Label>
          <Input type="text" name="creditdays" 
            value={formik.values.creditdays}
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
          />
          {formik.touched.creditdays && formik.errors.creditdays ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.creditdays}</p>
              </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="currentmount">Saldo actual</Label>
          <CurrencyInput
            id="currentbalance"
            name="currentbalance"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
              focus:border-slate-700 outline-0"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            defaultValue={currentbalanceI || 0}
            decimalsLimit={2}
            prefix="$"
            onValueChange={(value) => {try {
              formik.values.currentbalance=parseFloat(value || '0').toString();
            } catch (error) {
              formik.values.currentbalance='0';
            }}}
          />
          {formik.touched.currentbalance && formik.errors.currentbalance ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.currentbalance}</p>
            </div>
          ) : null}
        </div>
        <div>
          <Label htmlFor="account">Comision por deuda vencida</Label>
          <CurrencyInput
            id="percentoverduedebt"
            name="percentoverduedebt"
            className="w-full border border-slate-300 rounded-md px-2 py-1 mt-2 bg-white 
              focus:border-slate-700 outline-0"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            defaultValue={percentoverduedebtI || 0}
            decimalsLimit={2}
            suffix="%"
            onValueChange={(value) => {try {
              formik.values.percentoverduedebt=parseFloat(value || '0').toString();
            } catch (error) {
              formik.values.percentoverduedebt='0';
            }}}
          />
          {formik.touched.percentoverduedebt && formik.errors.percentoverduedebt ? (
              <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                  <p>{formik.errors.percentoverduedebt}</p>
              </div>
          ) : null}
        </div>
        <div className="flex justify-end space-x-5 mt-8">
          <Button onClick={onClickSave} type="button">Guardar</Button>

          <button type="submit"
           className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
           hover:bg-slate-200">
            Siguiente
          </button>
        </div>
      </form>  
    </div>
  )
}
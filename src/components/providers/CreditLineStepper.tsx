import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useRegFormContext } from "./StepperProvider";
import { showToastMessage, showToastMessageError } from "../Alert";
import SaveProvider from "@/app/functions/SaveProvider";
import BasicBarStepper from "./BasicBarStepper";

export default function CreditLineStepper({token, id}:{token:string, id:string}){
  
  const [state, dispatch] = useRegFormContext();

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
      //const {creditdays, creditlimit, currentbalance, percentoverduedebt} = valores;
      
      // const tradeline = {
      //   creditdays: parseInt(creditdays? creditdays: '0'), 
      //   creditlimit: parseInt(creditlimit? creditlimit: '0'),
      //   currentbalance: parseInt(currentbalance? currentbalance: '0'),
      //   percentoverduedebt: parseInt(percentoverduedebt? percentoverduedebt: '0')
      // }
      dispatch({ type: 'SET_CREDIT_DATA', data: valores });
      dispatch({type: 'INDEX_STEPPER', data: 2})
    },       
  });
  
  const onClickSave = async () => {
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
        creditlimit: parseInt(creditlimit),
        currentbalance: parseInt(currentbalance),
        percentoverduedebt: parseInt(percentoverduedebt)
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
      }
      const res = await SaveProvider(data, token);
      if(res.status){
        showToastMessage(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }else{
        showToastMessageError(res.message);
      }
    }else{
      showToastMessageError('Nombre y RFC son obligatorios');
    }
  }

  return(
    <div className="flex flex-col w-full ">
      {/* <HeaderForm img="/nuevoIcono.jpg" subtitle="Linea de credito de proveedor" 
        title="Linea de credito"
      /> */}
      <div className="my-5">
        <BasicBarStepper index={1} />
      </div>
      {/* <button type="button" 
        onClick={onClickSave}
        className="border w-40 h-10 bg-black text-white border-slate-900 rounded-full 
            hover:bg-slate-600"
      >
        Guardar
      </button> */}
      <form onSubmit={formik.handleSubmit} className="mt-4 max-w-md md:max-w-sm">
        <Label htmlFor="creditlimit">Limite de credito</Label>
        <Input type="text" name="creditlimit" autoFocus 
          value={formik.values.creditlimit}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.creditlimit && formik.errors.creditlimit ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.creditlimit}</p>
          </div>
        ) : null}
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
        <Label htmlFor="currentmount">Saldo actual</Label>
        <Input type="text" name="currentbalance" 
          value={formik.values.currentbalance}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.currentbalance && formik.errors.currentbalance ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.currentbalance}</p>
          </div>
        ) : null}
        <Label htmlFor="account">Comision por deuda vencida</Label>
        <Input type="text" name="percentoverduedebt" 
          value={formik.values.percentoverduedebt}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.percentoverduedebt && formik.errors.percentoverduedebt ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.percentoverduedebt}</p>
            </div>
        ) : null}
<<<<<<< HEAD
        <div className="flex justify-end space-x-5 mt-8">
          <Button onClick={onClickSave}>Guardar</Button>
=======
        <div className="flex justify-around mt-8">
          <Button onClick={onClickSave} type="button">Guardar</Button>
>>>>>>> refs/remotes/origin/main
          <button type="submit"
           className="border w-36 h-9 bg-white font-normal text-sm text-slate-900 border-slate-900 rounded-xl
           hover:bg-slate-200">
            Siguiente
          </button>
        </div>
        {/* <div className="flex justify-center mt-4">
          <Button type="submit">Siguiente</Button>
        </div> */}
      </form>  
    </div>
  )
}
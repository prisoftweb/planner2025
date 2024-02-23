import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import { useRegFormContext } from "./StepperProvider";

export default function CreditLineStepper(){
  
  const [, dispatch] = useRegFormContext();

  const formik = useFormik({
    initialValues: {
      creditlimit:'',
      creditdays:'',
      currentbalance: '',
      percentoverduedebt: ''
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
        creditlimit: parseInt(creditlimit? creditlimit: '0'),
        currentbalance: parseInt(currentbalance? currentbalance: '0'),
        percentoverduedebt: parseInt(percentoverduedebt? percentoverduedebt: '0')
      }
      dispatch({ type: 'SET_CREDIT_DATA', data: valores });
      dispatch({type: 'INDEX_STEPPER', data: 2})
    },       
  });
  
  return(
    <div className="w-full">
      <HeaderForm img="/nuevoIcono.jpg" subtitle="Linea de credito de proveedor" 
        title="Linea de credito"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <Label htmlFor="creditlimit">Limite de credito</Label>
        <Input type="text" name="creditlimit" autoFocus 
          value={formik.values.creditlimit}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.creditlimit && formik.errors.creditlimit ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
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
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
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
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
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
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.percentoverduedebt}</p>
            </div>
        ) : null}
        <div className="flex justify-center mt-4">
          <Button type="submit">Siguiente</Button>
        </div>
      </form>  
    </div>
  )
}
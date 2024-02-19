import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";

export default function CreditLine(){
  const formik = useFormik({
    initialValues: {
      creditlimit:'',
      creditdays:'',
      currentmount: '',
      expireddept: ''
    },
    validationSchema: Yup.object({
      creditlimit: Yup.string()
                  .email('El email no es valido')
                  .required('El email no puede ir vacio'),
      creditdays: Yup.string()
                  .required('El nombre es obligatorio'),
      currentmount: Yup.string()
                  .required('El rfc no puede ir vacio'),
      expireddept: Yup.string()
                  .required('El numero de cuenta es obligatorio'),        
    }),
    onSubmit: async (valores) => {            
      const {creditdays, creditlimit, currentmount, expireddept} = valores;
      
    },       
  });
  
  return(
    <div className="w-full lg:w-3/4 xl:w-1/2">
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
        <Input type="text" name="currentmount" autoFocus 
          value={formik.values.currentmount}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.currentmount && formik.errors.currentmount ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{formik.errors.currentmount}</p>
          </div>
        ) : null}
        <Label htmlFor="account">Comision por deuda vencida</Label>
        <Input type="text" name="expireddept" 
          value={formik.values.expireddept}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.expireddept && formik.errors.expireddept ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.expireddept}</p>
            </div>
        ) : null}
        <div className="flex justify-center mt-4">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>  
    </div>
  )
}
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";

export default function DataBasic(){
  
  const formik = useFormik({
    initialValues: {
      email:'',
      name:'',
      rfc: '',
      account: ''
    }, 
    validationSchema: Yup.object({
      email: Yup.string()
                  .email('El email no es valido')
                  .required('El email no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string()
                  .required('El rfc no puede ir vacio'),
      account: Yup.string()
                  .required('El numero de cuenta es obligatorio'),        
    }),
    onSubmit: async (valores) => {            
      const {email, name} = valores;
      
    },       
  });
  
  return(
    <div className="w-full lg:w-3/4 xl:w-1/2">
      <HeaderForm img="/nuevoIcono.jpg" subtitle="Datos esenciales del proveedor" 
        title="Información basica"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <Label htmlFor="name">Nombre</Label>
        <Input type="text" name="name" autoFocus 
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{formik.errors.name}</p>
          </div>
        ) : null}
        <Label htmlFor="email">Usuario/Email</Label>
        <Input type="email" name="email" 
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.email}</p>
            </div>
        ) : null}
        <Label htmlFor="name">RFC</Label>
        <Input type="text" name="rfc" autoFocus 
          value={formik.values.rfc}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.rfc && formik.errors.rfc ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{formik.errors.rfc}</p>
          </div>
        ) : null}
        <Label htmlFor="account">Numero de cuenta</Label>
        <Input type="text" name="account" 
          value={formik.values.account}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.account && formik.errors.account ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.account}</p>
            </div>
        ) : null}
        <div className="flex justify-center mt-4">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>  
    </div>
  )
}
import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import PhoneContact from "./PhoneContact";
import { useState, useEffect } from "react";

export default function Contacts(){
  const formik = useFormik({
    initialValues: {
      email:'',
      name:'',
      emailCompany: '',
    }, 
    validationSchema: Yup.object({
      email: Yup.string()
                  .email('El email no es valido')
                  .required('El email no puede ir vacio'),
      emailCompany: Yup.string()
                  .email('El email no es valido')
                  .required('El email no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      console.log('aaaaaaaa')
      const {email, name, emailCompany} = valores;
      
      console.log('aquiii');
      const contact = {
        email,
        name,
        emailCompany,
        phones,
        typesPhone,
      }
      console.log(contact);
    },       
  });
  
  //este se usa cuando se va a modificar
  //actualizar valores
  // useEffect(() => {
  //   if(slider !== ''){
  //     slider.features.map((feature:string, index:number) => {
  //       let bandShow = true;
  //       if(index === 4) bandShow=false;
  //       setUpFeatures((oldArray) => [...oldArray, <SelectText pushText={pushFeature} index={index} 
  //         deleteFeature={deleteFeature} updateCount={updateCount} valueFeat={feature} key={index}
  //         bandPlus={index === slider.features.length-1 ? true: false} bandShow={bandShow} />])
  //     })
  //   }
  // },[])

  const [phones, setPhones] = useState<string[]>([])
  const [typesPhone, setTypesPhone] = useState<string[]>([]);
  const [countFiles, setCountFiles] = useState(0);
  const [upPhones, setUpPhones] = useState<any[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  //const [bandEdit, setBandEdit] = useState<boolean>(false);
  
  const pushPhone = (phone: string, typePhone:string) => {
    setPhones((oldPhone) => [...oldPhone, phone]);
    setTypesPhone((oldTypesPhone) => [...oldTypesPhone, typePhone]);
  }
  
  const deletePhone = (index:number) => {
    setIndexDelete(index);
  }

  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  useEffect(() => {
    
    if((!bandDelete)  || ((phones.length === upPhones.length))){
                
      setUpPhones((oldArray) => [...oldArray, <PhoneContact pushPhone={pushPhone} 
        deletePhone={deletePhone} valuePhone="" bandPlus={true} index={upPhones.length} 
        key={upPhones.length} updateCount={updateCount} />])
    }

    setBandDelete(false);
    //setBandEdit(true);
  }, [countFiles])

  return(
    <div className="w-full lg:w-3/4 xl:w-1/2">
      <HeaderForm img="/nuevoIcono.jpg" subtitle="Agrega 1 o mas contactos" 
        title="Contacto nuevo"
      />
      <form onSubmit={formik.handleSubmit} className="mt-4">
      {/* <form onSubmit={() => console.log('submitttt')} className="mt-4"> */}
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
        <Label htmlFor="email">Correo personal</Label>
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
        <Label htmlFor="emailCompany">Correo de empresa</Label>
        <Input type="email" name="emailCompany" 
          value={formik.values.emailCompany}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.emailCompany && formik.errors.emailCompany ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.emailCompany}</p>
            </div>
        ) : null}
        <Label htmlFor="phone">Telefono</Label>
        {upPhones.map((elements) => (
          elements
        ))}
        {/* <PhoneContact bandPlus={} deleteFeature={} index={} pushText={} updateCount={} valueFeat="" /> */}
        <div className="flex justify-center mt-4">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>  
    </div>
  )
}
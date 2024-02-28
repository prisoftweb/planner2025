import HeaderForm from "../HeaderForm"
import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import PhoneContact from "./PhoneContact";
import { useState, useEffect } from "react";
//import { useRegFormContext } from "./StepperProvider";
//import { useRouter } from "next/navigation";
//import SaveProvider from "@/app/functions/SaveProvider";
import { showToastMessageError } from "../Alert";
import { Phone, Contact } from "@/interfaces/Contacts";

export default function FormContact({addNewContact, save}: {addNewContact:Function, save:Function}){
  const formik = useFormik({
    initialValues: {
      emailContact:'',
      nameContact:'',
      emailCompany: '',
    }, 
    validationSchema: Yup.object({
      emailContact: Yup.string()
                  .email('El email no es valido'),
                  //.required('El email no puede ir vacio'),
      emailCompany: Yup.string()
                  .email('El email no es valido'),
                  //.required('El email no puede ir vacio'),
      nameContact: Yup.string()
                  //.required('El nombre es obligatorio'),
    }),
    onSubmit: async (valores) => {            
      //const {emailContact, nameContact, emailCompany} = valores;
      
      // const contact = {
      //   emailContact,
      //   nameContact,
      //   emailCompany,
      //   phones,
      //   typesPhone,
      // }

      //dispatch({ type: 'SET_CONTACTS', data: contact });
      //dispatch({type: 'INDEX_STEPPER', data: 3})

    },       
  });

  const [phones, setPhones] = useState<string[]>([])
  const [typesPhone, setTypesPhone] = useState<string[]>([]);
  const [countFiles, setCountFiles] = useState(0);
  const [upPhones, setUpPhones] = useState<JSX.Element[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(-1);
  const [bandDelete, setBandDelete] = useState<boolean>(false);
  
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
  }, [countFiles])

  const newContact = () =>{
    
    let phoneNumber: Phone[] = [];
    
    phones.map((phone:string, index:number) => {
      let phoneformat = phone.trim();
      phoneformat = phoneformat.replace(/\s+/g, '');
      phoneformat = phoneformat.replace('(+52)', '');
      phoneNumber.push({
        phone:phoneformat,
        type: typesPhone[index],
        phoneformat: phone
      })
    })
    


    const {emailCompany, emailContact, nameContact} = formik.values;
    if(!emailCompany || !emailContact || !nameContact){
      showToastMessageError('Debe llenar todos los campos antes de agregar un nuevo contacto!!');
      return
    }

    const newContact:Contact ={
      email: emailContact,
      name: nameContact,
      companyemail: emailCompany,
      phoneNumber,
    }
    addNewContact(newContact);
    
    formik.values.emailCompany = '';
    formik.values.emailContact = '';
    formik.values.nameContact = '';
    setPhones([]);
    setTypesPhone([]);
    setUpPhones([]);
    setTimeout(() => {
      setUpPhones((oldValues) => [...oldValues, <PhoneContact pushPhone={pushPhone} 
        deletePhone={deletePhone} valuePhone="" bandPlus={true} index={0} 
        key={0} updateCount={updateCount} />])
    }, 10);
  }

  return(
    <>
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <Label htmlFor="nameContact">Nombre</Label>
        <Input type="text" name="nameContact" autoFocus 
          value={formik.values.nameContact}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.nameContact && formik.errors.nameContact ? (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{formik.errors.nameContact}</p>
          </div>
        ) : null}
        <Label htmlFor="emailContact">Correo personal</Label>
        <Input type="email" name="emailContact" 
          value={formik.values.emailContact}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.emailContact && formik.errors.emailContact ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.emailContact}</p>
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
        {/* <div className="flex justify-center mt-4">
          <Button type="submit">Siguiente</Button>
        </div> */}
        <div className="flex justify-center mt-4">
          <Button onClick={newContact}>Guardar contacto</Button>
        </div>
      </form>
    </>
  )
}
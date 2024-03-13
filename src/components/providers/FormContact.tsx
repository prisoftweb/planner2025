import Label from "../Label"
import Input from "../Input"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from "../Button";
import PhoneContact from "./PhoneContact";
import { useState, useEffect } from "react";
import { showToastMessage, showToastMessageError } from "../Alert";
import { Phone, Contact } from "@/interfaces/Contacts";
import { createContact } from "@/app/api/routeContacts";
import { contactValidation } from "@/schemas/contact.schema";
import { insertPhoneContact } from "@/app/api/routeContacts";

export default function FormContact({addNewContact, token, contact, updateContact, children}: 
                  {addNewContact:Function, token:string, contact:(Contact | string), 
                  updateContact:Function, children:JSX.Element}){
  
  let emailContactI = '';
  let nameContactI = '';
  let emailCompanyI = '';

  if(typeof(contact)!=='string'){
    emailCompanyI = contact.companyemail || '';
    nameContactI = contact.name;
    emailContactI = contact.email || '';
  }

  const formik = useFormik({
    initialValues: {
      emailContact: emailContactI,
      nameContact:  nameContactI,
      emailCompany: emailCompanyI,
    }, 
    validationSchema: Yup.object({
      emailContact: Yup.string()
                  .email('El email no es valido'),
      emailCompany: Yup.string()
                  .email('El email no es valido'),
      nameContact: Yup.string()
                  .required('El nombre es obligatorio'),
    }),
    onSubmit: async (valores) => {            
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
      
      

      const newContact:Contact ={
        email: emailContact,
        name: nameContact,
        companyemail: emailCompany,
        phoneNumber,
      }
      
      if(newContact.email==='' || !newContact.email)
        delete newContact.email;
      if(newContact.companyemail==='' || !newContact.companyemail)
        delete newContact.companyemail;

      console.log('new contact')
      console.log(newContact);

      const validation = contactValidation.safeParse(newContact);
      if(validation.success){
        try {
          const res = await createContact(token, newContact);
          if(typeof(res)==='string'){
            showToastMessageError(res);
          }else{
            console.log('contacto creado');
            console.log(res);
            
            addNewContact(res._id);
            formik.values.emailCompany = '';
            formik.values.emailContact = '';
            formik.values.nameContact = '';
            setPhones([]);
            setTypesPhone([]);
            setUpPhones([]);
            setTimeout(() => {
              setUpPhones((oldValues) => [...oldValues, <PhoneContact pushPhone={pushPhone} 
                deletePhone={deletePhone} valuePhone="" bandPlus={true} index={0} valueType=""
                key={0} updateCount={updateCount} />])
            }, 10);
          }
        } catch (error) {
          showToastMessageError('Ocurrio un error, intente de nuevo por favor!!');
        } 
      }else{
        showToastMessageError(validation.error.issues[0].message);
      }
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

  useEffect(() => {
    if(indexDelete !== -1){
      if(upPhones.length > 1){
        const arrPhones = phones;
        arrPhones.splice(indexDelete, 1);
        setPhones(arrPhones);
        
        const arrTypes = typesPhone;
        arrTypes.splice(indexDelete, 1);
        setTypesPhone(arrTypes);

        setBandDelete(true);
        
        const arrElements = upPhones;
        arrElements.splice(indexDelete, 1);
        setUpPhones(arrElements);
      }else{
        showToastMessageError("No puedes eliminar telefono si solo hay uno!!");
        setIndexDelete(-1);
      }      
    }
  }, [indexDelete])

  const updateCount = () => {
    setCountFiles(countFiles + 1);
  }

  useEffect(() => {
    if((!bandDelete) || ((phones.length === upPhones.length))){
      setUpPhones((oldArray) => [...oldArray, <PhoneContact pushPhone={pushPhone} 
        deletePhone={deletePhone} valuePhone="" bandPlus={true} index={upPhones.length} 
        key={upPhones.length} updateCount={updateCount} valueType="" />])
    }
    setBandDelete(false);
  }, [countFiles])

  const onUpdateContact = async () => {
    let phoneNumber: Phone[] = [];
    
    const {emailCompany, emailContact, nameContact} = formik.values;
    if((emailCompanyI !== emailCompany || emailContact !== emailContactI 
      || nameContact !== nameContactI) && phones.length > 0){

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
      
      if(typeof(contact)!=='string'){
        try {
          phoneNumber.map(async(pNum, index) => {
            const res = await insertPhoneContact(contact._id || '', token, pNum);
            if(res===200){
              showToastMessage('Telefono agregado exitosamente!!');
              // if(index+1===phoneNumber.length){
              //   setTimeout(() => {
              //     window.location.reload();
              //   }, 500);
              // }
            }else{
              showToastMessageError(res);
            }
          })
        } catch (error) {
          showToastMessageError('Ocurrio un problema al guardar telefono!!!');
        }
      }

      type UpdateContact = {
        email? : string,
        companyemail? : string,
        name:string
      }

      const newContact:UpdateContact ={
        email: emailContact,
        name: nameContact,
        companyemail: emailCompany,
        //phoneNumber,
      }
      
      if(!newContact.companyemail || newContact.companyemail===''){
        delete newContact.companyemail;
      }

      if(!newContact.email || newContact.email){
        delete newContact.email;
      }

      if(typeof(contact)!=='string'){
        updateContact(newContact, contact._id);
      }
    }else{
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
      
      if(phoneNumber.length > 0){
        if(typeof(contact)!=='string'){
          try {
            phoneNumber.map(async(pNum, index:number) => {
              const res = await insertPhoneContact(contact._id || '', token, pNum);
              if(res===200){
                showToastMessage('Telefono agregado exitosamente!!');
                if(index+1===phoneNumber.length){
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }
              }else{
                showToastMessageError(res);
              }
            })
          } catch (error) {
            showToastMessageError('Ocurrio un problema al guardar telefono!!!');
          }
        }
      }else{
        const {emailCompany, emailContact, nameContact} = formik.values;
  
        type UpdateContact = {
          email? : string,
          companyemail? : string,
          name:string
        }
  
        const newContact:UpdateContact ={
          email: emailContact,
          name: nameContact,
          companyemail: emailCompany,
          //phoneNumber,
        }
        
        if(!newContact.companyemail || newContact.companyemail===''){
          delete newContact.companyemail;
        }
  
        if(!newContact.email || newContact.email){
          delete newContact.email;
        }
  
        if(typeof(contact)!=='string'){
          updateContact(newContact, contact._id);
        }
      }
    }
  }
  
  const validationUpdateContact = () => {
    //validar cuaando se eliminen  y se editen telefonos (despues de mostrar los telefonos en pantalla)
    const {emailCompany, emailContact, nameContact} = formik.values;
    if(emailCompanyI !== emailCompany || emailContact !== emailContactI 
          || nameContact !== nameContactI || phones.length > 0){
      onUpdateContact();
    }else{
      showToastMessageError('Realize un cambio primero!!!');
    }
  }

  let button = typeof(contact)==='string'? 
                      <Button type="submit">Guardar contacto</Button> : 
                      <Button type="button" onClick={() => validationUpdateContact()}>Actualizar contacto</Button>
                      // <Button type="button" onClick={() => onUpdateContact()}>Actualizar contacto</Button>
  return(
    <>
      <form onSubmit={formik.handleSubmit} className="mt-2 max-w-sm">
        <Label htmlFor="nameContact"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</p></Label>
        <Input type="text" name="nameContact" autoFocus 
          value={formik.values.nameContact}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
        />
        {formik.touched.nameContact && formik.errors.nameContact ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
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
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
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
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
                <p>{formik.errors.emailCompany}</p>
            </div>
        ) : null}
        <Label htmlFor="phone"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Telefono</p></Label>
        {upPhones.map((elements) => (
          elements
        ))}
        {/* <div className="flex justify-center mt-4">
          {button}
        </div> */}
        <div className="flex flex-wrap gap-y-2 justify-around mt-8">
          {button}
          {children}
        </div>
      </form>
    </>
  )
}
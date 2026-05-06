'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastMessageError } from '@/components/Alert';
import { useState, useEffect, useRef } from "react"
import HeaderForm from '@/components/HeaderForm';
import Button from '@/components/Button';
import Label from '@/components/Label';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { CreateCompany, CreateCompanyLogo } from '@/app/api/routeCompany';

// {handleIndex}: {handleIndex:(value: number) => void}
export default function AddressDataCompanyStepper({addressCompany, cpCompany, communityCompany,
    municipyCompany, stateCompany, countryCompany,
    notesCompany,
    handleAddressCompany, handleCpCompany, handleCommunityCompany,
    handleMunicipyCompany, handleStateCompany, handleCountryCompany,
    handleNotesCompany, saveCompany, handleIndex}:
  {addressCompany:string, cpCompany:string, communityCompany:string,
    municipyCompany:string, stateCompany:string, countryCompany:string,
    notesCompany:string,
    handleAddressCompany:(value:string) => void,
    handleCpCompany:(value:string) => void,
    handleCommunityCompany:(value:string) => void,
    handleMunicipyCompany:(value:string) => void,
    handleStateCompany:(value:string) => void,
    handleCountryCompany:(value:string) => void,
    handleNotesCompany:(value:string) => void,
    saveCompany: (data: Object) => Promise<void>,
    handleIndex:(value: number) => void
  }) {

  const refRequest = useRef(true);
  
  const formik = useFormik({
    initialValues: {
      street: addressCompany,
      cp: cpCompany,
      community: communityCompany,
      municipy: municipyCompany,
      state: stateCompany,
      country: countryCompany,
      notes: notesCompany,
    }, 
    validationSchema: Yup.object({
      street: Yup.string()
                  .required('La calle es obligatoria'),
      cp: Yup.string()
                  .required('El codigo postal es obligatorio'),
      community: Yup.string()
                  .required('La colonia es obligatoria'),
      municipy: Yup.string()
                  .required('El municipio es obligatorio'),
      state: Yup.string()
                  .required('El estado es obligatorio'),
      country: Yup.string()
                  .required('El pais es obligatorio'),
      notes: Yup.string()
                  .required('Las notas son obligatorias'),
    }),

    onSubmit: async valores => {
      await sendData();
    }
  });

  const sendData = async () => {
    if(refRequest.current){
      const {community, country, cp, municipy, state, street, notes} = formik.values;
      // const location= {
      //   stret:street,
      //   cp,
      //   community,
      //   municipy,
      //   state,
      //   country,
      //   addressref: notes
      // }

      handleAddressCompany(street);
      handleCpCompany(cp);
      handleCommunityCompany(community);
      handleMunicipyCompany(municipy);
      handleStateCompany(state);
      handleCountryCompany(country);
      handleNotesCompany(notes);

      // await saveCompany(location);
      handleIndex(3);
    }else{
      showToastMessageError('Ya hay una solicitud en proceso!!');
    }
  }

  return (
    <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <Label htmlFor="street"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Calle y numero</p></Label>
        <Input name="street" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.street}
          autoFocus
        />
        {formik.touched.street && formik.errors.street ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.street}</p>
          </div>
        ) : null}
      </div>

      <div className='grid grid-cols-2 gap-x-3'>
        <div>
          <Label htmlFor="community"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Colonia / Localidad</p></Label>
          <Input name="community" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.community}
          />
          {formik.touched.community && formik.errors.community ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.community}</p>
            </div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="cp"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Código Postal</p></Label>
          <Input name="cp" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.cp}
          />
          {formik.touched.cp && formik.errors.cp ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.cp}</p>
            </div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="municipy"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Municipio / Delegacion</p></Label>
          <Input name="municipy" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.municipy}
          />
          {formik.touched.municipy && formik.errors.municipy ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.municipy}</p>
            </div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="state"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Estado</p></Label>
          <Input name="state" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.state}
          />
          {formik.touched.state && formik.errors.state ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.state}</p>
            </div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="country"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Pais</p></Label>
          <Input name="country" 
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            value={formik.values.country}
          />
          {formik.touched.country && formik.errors.country ? (
            <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
              <p>{formik.errors.country}</p>
            </div>
          ) : null}
        </div>

      </div>

      <div>
        <Label htmlFor="notes"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Referencias / Notas</p></Label>
        <TextArea name="notes" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.notes}
        />
        {formik.touched.notes && formik.errors.notes ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.notes}</p>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center gap-x-3 mt-2">
        <button
          className="text-black font-normal text-sm bg-white rounded-xl w-36 h-9 py-2 hover:bg-slate-300 print:hidden"
          type="button"
        >
          Guardar
        </button>
        <Button type="submit">Siguiente</Button>
      </div>

    </form>
  )
}

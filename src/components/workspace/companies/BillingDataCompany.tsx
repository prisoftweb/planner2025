'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useRef, useEffect } from "react"
import { updateCompanyWithSAT } from '@/app/api/routeCompany';
import Button from '@/components/Button';
import Label from '@/components/Label';
import Input from '@/components/Input';
import { showToastMessage, showToastMessageError } from '@/components/Alert';
import { Company } from '@/interfaces/Companies';
import { ChangeEvent } from "react";
import SelectReact from '@/components/SelectReact';
import { getSatCfdiUses, getSatTaxRegimes } from '@/app/api/routeSatInvoices';
import { Options } from '@/interfaces/Common';

export default function BillingDataCompany({company, token, fetchCompany}: 
  { company:Company, token:string, fetchCompany: () => Promise<void>}) {

  const refRequest = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [filecer, setFilecer]=useState<File>();
  const [filekey, setFilekey]=useState<File>();

  const [satTaxRegimes, setSatTaxRegimes] = useState<Options[]>([]);
  const [satTaxRegime, setSatTaxRegime] = useState<string>();

  // console.log('company data => ', company);
  // console.log('company json data => ', JSON.stringify(company));

  const index = satTaxRegimes.findIndex((v) => v.value===company.tax.taxregime.id);
  
  useEffect(() => {
    const fetchSatData = async () => {
      const taxRegimes = await getSatTaxRegimes();
      if(typeof(taxRegimes) === 'string'){
        showToastMessageError(taxRegimes);
      }else{
        const aux:Options[] = taxRegimes.map((reg: any) => ({
          value: reg.id,
          label: reg.description
        }));
        setSatTaxRegimes(aux);
        setSatTaxRegime(aux[0].value);
      }
    }
    fetchSatData();
  }, []);
  
  // useEffect(() => {
  //   if (openSideNav && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [openSideNav]);
  
  const formik = useFormik({
    initialValues: {
      name: company.tax.name?? '',
      // taxregime: company.tax.taxregime?? '',
      capitalregime: company.tax.capitalregime?? '',
      rfc: company.tax.rfc?? '',
      password: company.password?? ''
    }, 
    validationSchema: Yup.object({
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string()
                  .required('El rfc es obligatorio'),
      // taxregime: Yup.string()
      //             .required('El regimen fiscal es obligatorio'),
      password: Yup.string()
                  .required('La contraseña es obligatoria'),
    }),

    onSubmit: async valores => {
      sendData();
     }
  });

  const sendData = async () => {
    if(refRequest.current){
      refRequest.current = false;

      const { name, capitalregime, rfc, password } = formik.values;

      if(filecer && filekey){
        const opt = satTaxRegimes.find((v) => v.value===satTaxRegime);
        const taxregime={
          id: opt?.value?? '',
          regime: opt?.label?? '',
        }
        
        const formdata=new FormData();
        formdata.append('name', name.trim());
        formdata.append('rfc', rfc.trim());
        // formdata.append('taxregime', taxregime.trim());
        formdata.append('taxregime', JSON.stringify(taxregime));
        formdata.append('capitalregime', capitalregime.trim());
        formdata.append('cp', company.location?.cp?? '');
        formdata.append('password', password.trim());
        formdata.append('files', filecer);
        formdata.append('types', '.cer');
        formdata.append('files', filekey);
        formdata.append('types', '.key');

        // console.log('files => ', formdata.getAll('files'));

        // const data={
        //   tax: {
        //     name: name.trim(),
        //     rfc: rfc.trim(),
        //     taxregime: taxregime.trim(),
        //     capitalregime: capitalregime.trim(),
        //     cp: company.location?.cp,
        //     password: password,  
        //   },
        // }

        // formdata.append('tax', JSON.stringify(data));
        // formdata.append('files', filecer);
        // formdata.append('types', '.cer');
        // formdata.append('files', filekey);
        // formdata.append('types', '.key');

        // const data={
        //   taxdata: {
        //     name: name.trim(),
        //     rfc: rfc.trim(),
        //     taxregime: taxregime.trim(),
        //     capitalregime: capitalregime.trim(),
        //     cp: company.location?.cp,
        //     password: password,
        //     files: 
        //     [{
        //       file: {
        //           type: String,
        //           default: '/img/projects/default.cer'
        //       },  
        //       types: {
        //           type: String,
        //           required: [false, 'Tipo de archivo obligatorio'],
        //           maxlength: [160, 'Nombre debe tener maximo 160 caracteres'],
        //           minlength: [0, 'Nombre debe tener minimo 0 caracteres'],            
        //       },                
        //     }],  
        //   },
        // }

        const res = await updateCompanyWithSAT(token, formdata, company._id);
        if(typeof(res) === 'string'){
          showToastMessageError(res);
          refRequest.current = true;
        }else{
          showToastMessage('Los datos se han actualizado correctamente.');
          refRequest.current = true;
          fetchCompany();
        }
      }else{
        showToastMessageError('Llene todos los campos por favor!!!');
      }
    }else{
      showToastMessageError('Ya hay una solicitud en proceso!!');
    }
  }

  const handleFileccer= (f:File) => {
    setFilecer(f);
  }

  const handleFileckey= (f:File) => {
    setFilekey(f);
  }

  const handleTaxRegimen = (value: string) => {
    setSatTaxRegime(value);
  }

  return (
    // <form className="z-10 w-full max-w-md h-full bg-white space-y-5 p-3 right-0"
    <form className="z-10 w-full h-full bg-white space-y-5 p-3 right-0"
      onSubmit={formik.handleSubmit}
    >

      <div >
        <Label htmlFor="name"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Razon social</p></Label>
        <input 
          className="w-full border border-slate-300 rounded-md px-2 py-1 my-2 bg-white 
            focus:border-slate-700 outline-0" 
          name="name" 
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.name}
          autoFocus
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.name}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="rfc"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">RFC</p></Label>
        <Input name="rfc" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.rfc}
        />
        {formik.touched.rfc && formik.errors.rfc ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.rfc}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="taxregime"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Regimen fiscal</p></Label>
        {satTaxRegimes.length > 0 && (
          <SelectReact index={index} opts={satTaxRegimes} setValue={handleTaxRegimen} />
        )}
        {/* <Input name="taxregime" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.taxregime}
        />
        {formik.touched.taxregime && formik.errors.taxregime ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.taxregime}</p>
          </div>
        ) : null} */}
      </div>

      <div>
        <Label htmlFor="capitalregime"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Regimen capital</p></Label>
        <Input name="capitalregime" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.capitalregime}
        />
        {formik.touched.capitalregime && formik.errors.capitalregime ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.capitalregime}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="password"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Contraseña</p></Label>
        <Input name="password" 
          onChange={formik.handleChange}
          onBlur={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="my-1 bg-red-100 border-l-4 font-light text-sm border-red-500 text-red-700 p-2">
            <p>{formik.errors.password}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Label htmlFor="cer"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Archivo cer</p></Label>
        <UploadFile setFile={handleFileccer} extension='.cer' nameParam={company.tax?.files[0]?.file?? ''} />
      </div>

      <div>
        <Label htmlFor="key"><p className="after:content-['*'] after:ml-0.5 after:text-red-500">Archivo key</p></Label>
        <UploadFile setFile={handleFileckey} extension='.key' nameParam={company.tax?.files[1]?.file?? ''} />
      </div>

      <div className="flex justify-center mt-2">
        <Button type="submit">Guardar</Button>
      </div>

    </form>
  )
}



export function UploadFile({setFile, extension, nameParam}: {setFile: Function, extension:string, nameParam?:string}) {
  
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    if(e.target.files && e.target.files.length > 0) {
      
      const file = e.target.files[0];
      
      // Validar extensión
      if (!file.name.endsWith(extension)) {
        showToastMessageError("El archivo debe ser un certificado ("+extension+")");
        e.target.value = ""; // reset input
        return;
      }else{
        setFileName(e.target.files[0].name);
        setFile(file);
      }

      // if(file.type.includes("image")) {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   // setFile(file);
      // } else {
      //   //showToastMessageError('Esta no es una imagen!, favor de agregar imagen');
      // }
    }
  }

  const [fileName, setFileName] = useState(nameParam?? '');

  return (
    <>
      <div className='border-2 border-dashed rounded-md border-gray-200 
        relative py-3 md:px-2 w-full cursor-pointer'>
        <input
          type="file" 
          id={"file"+extension} 
          name={"file"+extension}
          accept={extension}
          onChange={onFileChange}
          className="opacity-0 absolute inset-0 w-full cursor-pointer">                                            
        </input>
        {/* <p className='text-center cursor-pointer'>Subir Archivo</p> */}
        <p className="text-center cursor-pointer">
          {fileName ? fileName : "Subir Archivo"}
        </p>
      </div>
    </>
  )
}
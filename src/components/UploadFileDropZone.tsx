'use client'
import { useState, useEffect } from "react";
import { useCallback } from 'react';
import { useDropzone} from 'react-dropzone';
import Label from "./Label";
import { xml2js} from 'xml-js'
import { CurrencyFormatter } from "@/app/functions/Globals";
import { XMLCFDI, Element3 } from "@/interfaces/Expense";
import { CFDIValidation } from "@/interfaces/Expense";
import { getProviderByRFC } from "@/app/api/routeProviders";
import { showToastMessageError } from "./Alert";

export default function UploadFileDropZone({label, setFile, Validation, getData, fileParam=undefined, 
  isCFDIParam=false, token=""}: 
  {label:string, setFile:Function, Validation:Function, getData:Function, fileParam?: File | undefined, 
    isCFDIParam?:boolean, token?: string
  }) {
  
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;
    file.readAsDataURL(acceptedFiles[0])
  }, [])

  // console.log('fileParam', fileParam);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  // const [isCFDI, setIsCFDI] = useState<boolean>(false);
  const [isCFDI, setIsCFDI] = useState<boolean>(isCFDIParam);
  const [date, setDate] = useState<string>('');
  const [provider, setProvider] = useState<string>();
  const [total, setTotal] = useState<string>('');
  const [rfc, setRfc] = useState<string>('');
  const [folio, setFolio] = useState<string>('');
  const [amounts, setAmounts] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);

  useEffect(() => {
    if(isCFDIParam && fileParam){
      updateCFDIData(fileParam);
    }
  }, []);

  useEffect(() => {
    if ( typeof acceptedFiles[0] !== 'undefined' ){
      console.log(acceptedFiles[0]);
      updateCFDIData(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  const fetchProv = async (rfcParam:string) => {
    const prov = await getProviderByRFC(token, rfcParam);
    if(prov==='No se encontro el proveedor!!'){
      showToastMessageError(prov);
      return '';
    }else{
      return prov;
    }
  }

  const updateCFDIData = async (fileData: File) => {
    setAmounts([]);
    setDescriptions([]);
    setPrices([]);
    setQuantities([]);
    // console.log('pre validation');
    const res: (boolean | string) = await Validation(fileData);
    // console.log('post validation => ', res);
    if(typeof(res) === 'boolean'){
      setFile(fileData);
      setPre(fileData);
      if(fileData.type.includes('xml') || fileData.type.includes('XML')){
        const readXML = async () => {
          const t = await fileData.text();
          
          const res2: (XMLCFDI | any ) = xml2js(t);
          console.log('res 2 => ', res2);
          const uuid = res2.elements[0].elements.find((e: any) => e.name.toLowerCase().includes('complemento'));
          const taxes = res2.elements[0].elements.find((e: any) => e.name.toLowerCase().includes('impuestos'));
          const concepts = res2.elements[0].elements.find((e: any) => e.name.toLowerCase().includes('conceptos'));

          let CFDIObj:CFDIValidation = {
            amount: '',
            date: '',
            RFCProvider: '',
            taxFolio: '',
            folio: '',
            total: '',
            vat: '',
            concepts: '',
            proveedor: '',
            discount: '0'
          }

          try {
            const uuidXML = uuid.elements.find((elem: any) => {
              if(elem.attributes?.UUID) return elem.attributes?.UUID;
            });

            const folioXML = uuidXML?.attributes?.UUID || 'error al leer CFDI';
            setFolio(folioXML);

            let conAux='';
            concepts?.elements?.map((c:any) => {
              conAux += Number(c?.attributes?.Cantidad || 0).toFixed(2) + ' ' + c?.attributes?.Descripcion + ', ';
            });

            CFDIObj.date = res2.elements[0].attributes.Fecha;
            const emisor = res2.elements[0].elements.find((e: any) => e.name.toLowerCase().includes('emisor'));
            CFDIObj.RFCProvider = emisor?.attributes?.Rfc || 'sin rfc de proveedor';
            CFDIObj.amount = res2.elements[0].attributes.SubTotal;
            CFDIObj.total = res2.elements[0].attributes.Total;
            CFDIObj.folio = res2.elements[0].attributes.Folio;
            CFDIObj.discount = res2.elements[0].attributes?.Descuento ? res2.elements[0].attributes?.Descuento : '0' ;
            CFDIObj.taxFolio = folioXML;
            CFDIObj.vat = taxes.attributes?.TotalImpuestosTrasladados?.toString() || '0';
            CFDIObj.concepts=conAux;
            if(CFDIObj.RFCProvider !== 'sin rfc de proveedor'){
              const provAux = await fetchProv(CFDIObj.RFCProvider);
              CFDIObj.proveedor = provAux;
            }
          } catch (error) {
            console.log('error al leer cfdi => ', error);
          }

          getData(CFDIObj);
          setDate(res2.elements[0].attributes.Fecha);
          setRfc(CFDIObj.RFCProvider !== ''?  CFDIObj.RFCProvider: 'sin rfc');
          setProvider(res2.elements[0].elements[0].attributes?.Nombre);
          try {
            const dollar = CurrencyFormatter({
              currency: "MXN",
              value: Number(res2.elements[0].attributes.Total)
            })
            setTotal(dollar);
          } catch (error) {
            setTotal('$0');
          }
        
          try {
            res2.elements[0].elements[2].elements?.map((concept:Element3) => {
              setAmounts((oldValue) => [...oldValue, concept.attributes?.Importe || '']);
              setQuantities((oldValue) => [...oldValue, concept.attributes?.Cantidad || '']);
              setDescriptions((oldValue) => [...oldValue, concept.attributes?.Descripcion || '']);
              setPrices((oldValue) => [...oldValue, concept.attributes?.ValorUnitario || '']);
            })
          } catch (error) {
            setAmounts(['error al leer conceptos']);
            setQuantities(['error al leer conceptos']);
            setDescriptions(['error al leer conceptos']);
            setPrices(['error al leer conceptos']);
          }
          setIsCFDI(true);
        }
        readXML();
      }else{
        setIsCFDI(false);
      }
    }else{
      setFile(undefined);
      setPre(undefined);
    }
  }

  const [pre, setPre] = useState<(File | undefined)>(fileParam);
  return (
    <>
      <div className="mt-4">
        <Label>{label}</Label>
        <div {...getRootProps()} className="flex flex-col items-center justify-center w-full p-4 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <input {...getInputProps()} className="w-full h-8 p-6" />
          {
            isDragActive ?
              <p>Suelte su archivo aqui ...</p> :
              <p>Arrastra el archivo, o click para seleccionar archivo</p>
          }
        </div>
      </div>
      {pre && !isCFDI && <iframe className="w-full flex-grow overflow-auto mt-4" src={URL.createObjectURL(pre)} />}
      {isCFDI && (
        // <div className="h-full">
        <div className="w-full flex-grow overflow-auto">
          <div className="grid grid-cols-2 mt-5">
            <div className=" bg-gray-500 p-4">
              <p className="text-4xl text-white">{total}</p>
              <p className="text-slate-900 text-xs">Importe de factura</p>
            </div>
            <div className="flex flex-col justify-between items-end text-sm p-2">
              <p>FACTURA DE IMPUESTO DIGITAL (CFDi)</p>
              <div className=" text-right">
                <p>{provider}</p>
                <p>{rfc}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 py-4 px-10 border-t text-sm border-slate-900">
            <p>{folio}</p>
            <p>{date?.substring(0, 10)}</p>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-x-2">
            <p>Cantidad</p>
            <p>Valor unitario</p>
            <p>Concepto</p>
            <p>Ingreso</p>
          </div>
          {descriptions.map((desc, index:number) => (
            <div className="mt-3 grid grid-cols-4 gap-x-2" key={index}>
              <p>{quantities[index]}</p>
              <p>{prices[index]}</p>
              <p>{desc}</p>
              <p>{amounts[index]}</p>
            </div>  
          ))}
        </div>
      )}
    </>
  );
}

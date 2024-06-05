'use client'
import { useState, useEffect } from "react";
import { useCallback } from 'react';
import { useDropzone} from 'react-dropzone';
import Label from "./Label";
import {xml2json, xml2js} from 'xml-js'
import { CurrencyFormatter } from "@/app/functions/Globals";

export default function UploadFileDropZone({label, setFile, Validation}: 
            {label:string, setFile:Function, Validation:Function}) {
  
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;
    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  const [isCFDI, setIsCFDI] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [provider, setProvider] = useState<string>();
  //const [description, setDescription] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  const [rfc, setRfc] = useState<string>('');
  const [folio, setFolio] = useState<string>('');
  const [amounts, setAmounts] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);

  useEffect(() => {
    if ( typeof acceptedFiles[0] !== 'undefined' ){
      setAmounts([]);
      setDescriptions([]);
      setPrices([]);
      setQuantities([]);
      const res: (boolean | string) = Validation(acceptedFiles[0]);
      if(typeof(res) === 'boolean'){
        setFile(acceptedFiles[0]);
        setPre(acceptedFiles[0]);
        //console.log(acceptedFiles[0].type);
        if(acceptedFiles[0].type.includes('xml') || acceptedFiles[0].type.includes('XML')){
          const readXML = async () => {
            const t = await acceptedFiles[0].text();
            //console.log(t);
            
            // const res = xml2json(t, {compact: true, spaces: 4});
            // console.log(res);
            
            const res2: (XMLCFDI | any) = xml2js(t);
            console.log(res2);

            setDate(res2.elements[0].attributes.Fecha);
            //console.log('total', res2.elements[0].attributes.Total);
            //setTotal(res2.elements[0].attributes.Total);
            setRfc(res2.elements[0].elements[0].attributes?.Rfc || 'sin rfc');
            //console.log('proveedor ', res2.elements[0].elements[0].attributes?.Nombre );
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
              //setDescription(res2.elements[0]?.elements[2]?.elements[0].attributes?.Descripcion || 'sin concepto');
            } catch (error) {
              //setDescription('sin concepto');
              setAmounts(['error al leer conceptos']);
              setQuantities(['error al leer conceptos']);
              setDescriptions(['error al leer conceptos']);
              setPrices(['error al leer conceptos']);
            }
            
            try {
              setFolio(res2.elements[0].elements[4].elements[0].attributes?.UUID);
            } catch (error) {
              setFolio('No se pudo leer el folio');
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
  }, [acceptedFiles]);

  const [pre, setPre] = useState<(File | undefined)>();
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
      {/* {pre && <iframe className="w-full h-80 mt-4" src={URL.createObjectURL(pre)} />} */}
      {pre && !isCFDI && <iframe className="w-full h-80 mt-4" src={URL.createObjectURL(pre)} />}
      {isCFDI && (
        <>
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
            <p>{date.substring(0, 10)}</p>
            {/* <p>{description}</p> */}
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
        </>
      )}
      {/* {pre && <iframe className="w-full h-auto mt-4" src={URL.createObjectURL(pre)} />} */}
    </>
  );
}

export interface XMLCFDI {
  declaration: Declaration
  elements: Element[]
}

export interface Declaration {
  attributes: Attributes
}

export interface Attributes {
  version: string
  encoding: string
}

export interface Element {
  type: string
  name: string
  attributes: Attributes2
  elements: Element2[]
}

export interface Attributes2 {
  "xsi:schemaLocation": string
  Version: string
  Serie: string
  Folio: string
  Fecha: string
  FormaPago: string
  NoCertificado: string
  Certificado: string
  SubTotal: string
  Moneda: string
  Exportacion: string
  Total: string
  TipoDeComprobante: string
  MetodoPago: string
  LugarExpedicion: string
  "xmlns:xs": string
  "xmlns:cfdi": string
  "xmlns:xsi": string
  Sello: string
}

export interface Element2 {
  type: string
  name: string
  attributes?: Attributes3
  elements?: Element3[]
}

export interface Attributes3 {
  TotalImpuestosTrasladados?: string
  Rfc?: string
  Nombre?: string
  RegimenFiscal?: string
  DomicilioFiscalReceptor?: string
  RegimenFiscalReceptor?: string
  UsoCFDI?: string
}

export interface Element3 {
  type: string
  name: string
  attributes?: Attributes4
  elements?: Element4[]
}

export interface Attributes4 {
  SelloSAT?: string
  NoCertificadoSAT?: string
  SelloCFD?: string
  FechaTimbrado?: string
  UUID?: string
  Version?: string
  RfcProvCertif?: string
  "xsi:schemaLocation"?: string
  "xmlns:tfd"?: string
  "xmlns:xsi"?: string
  ObjetoImp?: string
  ClaveProdServ?: string
  Cantidad?: string
  ClaveUnidad?: string
  Unidad?: string
  Descripcion?: string
  ValorUnitario?: string
  Importe?: string
}

export interface Element4 {
  type: string
  name: string
  attributes?: Attributes5
  elements?: Element5[]
}

export interface Attributes5 {
  Base: string
  Impuesto: string
  TipoFactor: string
  TasaOCuota: string
  Importe: string
}

export interface Element5 {
  type: string
  name: string
  elements: Element6[]
}

export interface Element6 {
  type: string
  name: string
  attributes: Attributes6
}

export interface Attributes6 {
  Base: string
  Impuesto: string
  TipoFactor: string
  TasaOCuota: string
  Importe: string
}

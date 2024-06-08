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

export interface CFDIValidation{
  date:string,
  amount:string,
  taxFolio:string,
  RFCProvider:string
}
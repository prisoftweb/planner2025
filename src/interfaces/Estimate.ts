import { Glossary } from "./Glossary"

export interface TableEstimatesProject {
  id: string,
  No: number, 
  Nombre: string, 
  Estimacion: number, 
  Amortizacion: number, 
  Fondo: number, 
  MontoPay: number, 
  Condicion: Glossary, 
  Fecha: string, 
  Orden: string
}
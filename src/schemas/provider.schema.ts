import {z} from 'zod'

export const providerValidation = z.object({
  name: z.string({
    required_error: 'El nombre es requerido'
  }).min(3, {
    message: 'El nombre debe tener al menos 3 caracteres'
  }).max(60, {
    message: 'El nombre no debe de tener mas de 60 caracteres',
  }),
  tradename: z.string({
    required_error: 'El nombre comercial es requerido'
  }).min(3, {
    message: 'El nombre comercial debe tener al menos 3 caracteres'
  }).max(60, {
    message: 'El nombre comercial no debe de tener mas de 60 caracteres',
  }),
  rfc: z.string({
    required_error: 'El RFC es requerido'
  }).min(12, {
    message: 'El RFC debe tener al menos 12 caracteres'
  }).max(13, {
    message: 'El RFC no debe de tener mas de 13 caracteres',
  }),
  email: z.string().email({
    message: 'El email no es valido'
  }).min(5, {
    message: 'El email debe tener al menos 5 caracteres'
  }).max(60, {
    message: 'El RFC no debe de tener mas de 60 caracteres',
  }).optional(),
  suppliercredit: z.boolean({
    invalid_type_error: 'El credito debe de ser booleano',
    required_error: 'El credito es obligatorio',
  }),
  tradeline: z.object({
    creditdays: z.number({
      invalid_type_error: 'Los dias deben ser un numero entero'
    }).max(366, {
      message: 'El numero maximo de dias es de 366'
    }).optional(),
    creditlimit: z.number({
      invalid_type_error: 'El limite de credito debe de ser un numero valido'
    }).optional(),
    overduedebt: z.boolean({
      invalid_type_error: 'La deuda vencida es un booleano',
    }).optional(),
    percentoverduedebt: z.number({
      invalid_type_error: 'El porcentaje de deuda debe de ser un numero valido',
    }).optional(),
  }).optional(),
  contact: z.string({
    invalid_type_error: 'El contacto debe de ser un string id',
  }).array().optional(),
  user: z.string({
    invalid_type_error: 'El usuario debe de ser un string id',
  }).optional(),
})
import {z} from 'zod'

export const contactValidation = z.object({
  name: z.string({
    required_error: 'El nombre es requerido'
  }).min(3, {
    message: 'El nombre debe tener al menos 3 caracteres'
  }).max(60, {
    message: 'El nombre no debe de tener mas de 60 caracteres',
  }),
  email: z.string().optional(),
  companyemail: z.string().optional(),
  phoneNumber: z.object({
    phone: z.string({
      required_error: 'El contacto debe de tener al menos un telefono, validar telefono!!'
    }).min(10, {
      message: 'El telefono debe ser de 10 digitos!!!'
    }).max(10, {
      message: 'El telefono debe ser de 10 digitos!!!'
    }),
    type: z.string({
      required_error: 'El tipo de telefono es obligatorio!!',
    }),
    phoneformat: z.string({
      required_error: 'Error con el formato del telefono intente otra vez!!!',
    })
  }).array().min(1,{
    message: 'El contacto debe de tener al menos un telefono, validar telefono!!!'
  })
})

export const contactUpdateValidation = z.object({
  name: z.string({
    required_error: 'El nombre es requerido'
  }).min(3, {
    message: 'El nombre debe tener al menos 3 caracteres'
  }).max(60, {
    message: 'El nombre no debe de tener mas de 60 caracteres',
  }),
  email: z.string().optional(),
  companyemail: z.string().optional(),
})
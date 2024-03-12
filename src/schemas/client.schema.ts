import {z} from 'zod'

export const clientValidation = z.object({
  name: z.string({
    required_error : 'El nombre del cliente es obligatorio!!',
  }).min(2, {
    message: 'El nombre debe de tener un minimo de 2 caracteres!!',
  }).max(60, {
    message: 'El nombre no debe de tener mas de 60 caracteres!!',
  }),
  tradename: z.string({
    required_error: 'El nombre comercial es requerido!!',
  }).max(60, {
    message: 'Nombre comercial debe tener maximo 60 caracteres',
  }).min(3, {
    message: 'Nombre comercial  debe tener minimo 3 caracteres'
  }),
  rfc: z.string({
    required_error: 'El RFC es obligatorio!!',
  }).max(13, {
    message: 'RFC debe tener maximo 13 caracteres',
  }).min(12, {
    message: 'RFC debe tener minimo 12 caracteres'
  }),
  account: z.string().optional(),
  logo: z.string().optional(),
  link: z.string().max(80, {
    message: 'Link debe tener maximo 80 caracteres',
  }).min(5, {
    message: 'Link debe tener minimo 5 caracteres',
  }),
  client: z.string(),
  email: z.string().email({
    message: 'El email no es valido!!'
  }).max(60, {
    message: 'Email debe tener maximo 60 caracteres'
  }).min(5, {
    message: 'Email debe tener minimo 5 caracteres',
  }).optional(),
  phone: z.number({
    invalid_type_error: 'El telefono deben ser puros numeros',
  }).max(10, {
    message: 'Telefono debe tener maximo 10 caracteres',
  }).min(10, {
    message: 'Telefono debe tener minimo 10 caracteres',
  }).optional(),
  regime: z.string({
    required_error: 'El regimen es obligatorio!!',
  }).min(5, {
    message: 'Regimen debe tener minimo 5 caracteres',
  }).max(6, {
    message: 'Regimen debe tener maximo 6 caracteres'
  }),
  source: z.string().optional(),
  sourceimg: z.string().optional(),
  haslocation: z.boolean().optional(),
  location: z.object({
    type: z.string(),
    coordinates: z.number(),
    stret: z.string(),
    cp: z.number(),
    community: z.string(),
    municipy: z.string(),
    state : z.string(),
    country: z.string(),
    address: z.string(),
    description: z.string(),
    addressref: z.string(),
    homeref: z.string(),
  }),
  tags: z.string().max(35, {
    message: 'Etiqueta debe tener maximo 35 caracteres',
  }).min(3, {
    message: 'Etiqueta debe tener minimo 3 caracteres',
  }).array().optional(),
  condition: z.object({
    type: z.string().optional(),
    date: z.date(),
    user: z.string({
      required_error: 'El status del cliente debe tener un usuario',
    }).optional(),
  }),
  //contact: 
})
// const clientSchema = new mongoose.Schema(
//       contact:
// [
//           {
//               type:
// mongoose.Schema.ObjectId,
//               ref:
// 'Contact',
//               requiered:
// [false,
// 'Cliente tiene un contacto']
//           }
//       ],
//       user:
// {
//           type:
// mongoose.Schema.ObjectId,

//           ref:
// 'User',

//           requiered:
// [true,
// 'Cliente lo crea un
// usuario']

//       },

//       status:
// {

//           type:
// Boolean,

//           default:
// true,

//           select:
// true,

//       }

//   },

// });

//       source:
// {
//           type:
// String,
//           enum:
// ['landpage',
// 'facebook',
// 'instagram',
// 'whatsapp',
// 'llamada',
// 'recomendacion',
// 'sucursal',
// 'otro'],
//           default:
// 'recomendacion',
//       },
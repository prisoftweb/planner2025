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
  //account: z.string().optional(),
  logo: z.string().optional(),
  // link: z.string({required_error: 'EL link de la pagina es obligatorio!!'}).max(80, {
  link: z.string().max(80, {
    message: 'Link debe tener maximo 80 caracteres',
  }).min(5, {
    message: 'Link debe tener minimo 5 caracteres',
  }).optional(),
  //client: z.string(),
  email: z.string().email({
    message: 'El email no es valido!!'
  }).max(60, {
    message: 'Email debe tener maximo 60 caracteres'
  }).min(5, {
    message: 'Email debe tener minimo 5 caracteres',
  }).optional(),
  phone: z.number({
    invalid_type_error: 'Ingrese un numero valido!!',
  }).int().gte(1000000000, {message: 'Telefono debe tener minimo 10 digitos '})
  .lte(9999999999, {message: 'Telefono debe tener maximo 10 digitos',}).optional(),
  // phone: z.number({
  //   invalid_type_error: 'El telefono deben ser puros numeros',
  // }).max(10, {
  //   message: 'Telefono debe tener maximo 10 caracteres',
  // }).min(10, {
  //   message: 'Telefono debe tener minimo 10 caracteres',
  // }).optional(),
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
    //type: z.string({required_error:'El tipo de localizacion es obligatorio!!'}).optional(),
    type: z.string().optional(),
    coordinates: z.number().optional(),
    //coordinates: z.number({required_error: 'Las coordenadas son obligatorias!!'}).optional(),
    stret: z.string({required_error: 'La calle es obligatoria!!'}),
    cp: z.number({required_error: 'El codigo postal es obligatorio!!', invalid_type_error: 'El codigo postal es un numero!!'}),
    community: z.string({required_error: 'La colonia es obligatoria!!'}),
    municipy: z.string({required_error: 'El municipio es obligatorio!!'}),
    state : z.string({required_error: 'El estado es obligatorio!!'}),
    country: z.string({required_error: 'El pais es obligatorio!!'}),
    address: z.string().optional(),
    //address: z.string({required_error: 'La direccion es obligatoria!!'}).optional(),
    description: z.string().optional(),
    // description: z.string({required_error: 'La descripcion es obligatoria!!'}).optional(),
    addressref: z.string().optional(),
    // addressref: z.string({required_error: 'La direccion es obligatoria!!'}).optional(),
    homeref: z.string().optional(),
    // homeref: z.string({required_error: 'La referencia al hogar es obligatoria!!'}).optional(),
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
  }).optional(),
  contact: z.string().array().optional(),
  user: z.string({
    required_error: 'Falta el usuario que da de alta el cliente!!',
  }),
  status: z.boolean().optional(),
})
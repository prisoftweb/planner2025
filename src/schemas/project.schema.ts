import {date, z} from 'zod'

export const projectValidation = z.object({
  title: z.string({
    required_error: 'El titulo es obligatorio!!'
  }).min(5, {
    message: 'Titulo debe tener minimo 5 caracteres'
  }).max(60, {
    message: 'Titulo debe tener maximo 60 caracteres'
  }),
  code: z.string({
    required_error: 'El codigo es obligatorio!!'
  }).min(3, {
    message: 'Codigo  debe tener minimo 3 caracteres'
  }).max(20, {
    message: 'Codigo debe tener maximo 20 caracteres'
  }),
  description: z.string().min(10, {
    message: 'Descripcion debe tener minimo 10 caracteres'
  }).max(250, {
    message: 'Descripcion debe tener maximo 250 caracteres'
  }).optional(),
  date: z.string().optional(),
  amount: z.string({
    required_error: 'Monto del proyecto es obligatorio',
  }),
  photo: z.string().optional(),
  categorys: z.string({
    required_error: 'La categoria del proyecto es obligatoria'
  }),
  types: z.string({
    required_error: 'El tipo del proyecto es obligatorio'
  }),
  location: z.object({
    street: z.string().optional(),
    cp: z.string().optional(),
    community: z.string().optional(),
    municipy: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
    description: z.string().optional(),    
  }).optional(),
  hasguaranteefund: z.boolean({
    required_error: 'Tiene garantia?'
  }).optional(),
  guaranteefund: z.object({
    porcentage: z.string().optional(),
    amount: z.string().optional(),
    date: z.string().optional(),
  }).optional(),
  user: z.string({
    required_error: 'El usuario es obligatorio'
  }),
  company: z.string({
    required_error: 'La compañia es obligatoria'
  }).optional(),
  client: z.string().optional(),
  datets: z.string().optional(),
})

  // condition: [
  //   {
  //       glossary: {
  //           type: mongoose.Schema.ObjectId, 
  //           ref: 'Glossary', 
  //           requiered: [true, 'Requiere una lista del glosario de estatus']
  //       }, 
  //       date: {
  //           type: Date,
  //           default: Date.now(),
  //           select: true,
  //       },
  //       user: {
  //           type: mongoose.Schema.ObjectId,
  //           ref: 'User',
  //           requiered: [true, 'La condicion del proyecto debe tener un usuario quien lo hizo'],
  //       },
  //       status: {
  //           type: Boolean,
  //           default: true,
  //           select: true,
  //       },
  //   }
  // ],
  // progress: [
  //   {
  //       progress: {
  //           type: Number,
  //           required: [false, 'Progreso del proyecto']
  //       },
  //       date: {
  //           type: Date,
  //           default: Date.now(),
  //           select: true,
  //       },
  //       notes: {
  //           type : String,
  //           required: [false, 'Notas del progreso del proyecto'],
  //           trim: true,
  //           maxlength: [250, 'Notas debe tener maximo 250 caracteres'],
  //           minlength: [10, 'Notas debe tener minimo 10 caracteres']
  //       },
  //   }
  // ],
  // progressAverage: {
  //     type: Number,
  //     required: [false, 'Progreso del proyecto acumulado']
  // },
  // haslocation: {
  //     type: Boolean,
  //     default: false,            
  // },
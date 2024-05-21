import {create} from 'zustand'

interface NewExpenseState {
  costCenter: string,
  folio:string, 
  taxFolio:string,
  description:string,
  amount: string, 
  date:string, 
  vat:string, 
  discount:string, 
  typeExpense: string
  typeCFDI: string
  proveedor: string
  responsible: string
  category:string
  project: string
  condition: string

  voucher: (File | null),
  CFDI: (File | null)

  indexStepper: number
}

interface Actions {
  updateBasicData: (costCenter:string, folio:string, description:string, amount: string,
    date:string, taxFolio:string, vat:string, discount:string, proveedor:string, responsible:string,
    typeCFDI:string, typeExpense:string, category:string, project:string, condition:string) => void,
  updateVoucher: (file: File) => void,
  updateCDFI: (CFDI: File) => void,
  updateIndexStepper: (index: number) => void,
  reset: () => void,
}

const initialState: NewExpenseState = {
  costCenter: '',
  folio: '', 
  description: '',
  amount: '', 
  date: '', 
  taxFolio: '',
  vat: '', 
  discount: '',
  proveedor: '',
  responsible: '',
  typeCFDI: '',
  typeExpense: '',
  CFDI : null,
  voucher: null,
  indexStepper: 0,
  category: '',
  project: '',
  condition: ''
}

export const useNewExpense = create<NewExpenseState & Actions>((set) => ({
  ...initialState,
  updateBasicData: (costCenter:string, folio:string, description:string, amount: string,
      date:string, taxFolio:string, vat:string, discount:string, proveedor:string, responsible:string,
      typeCFDI:string, typeExpense:string, category:string, project:string, condition:string) => set(state => ({
    ...state,
    costCenter: costCenter,
    folio: folio,
    description: description,
    amount: amount,
    date: date,
    taxFolio: taxFolio,
    vat: vat,
    discount: discount,
    proveedor:proveedor,
    responsible: responsible,
    typeCFDI: typeCFDI,
    typeExpense: typeExpense,
    category: category,
    project: project,
    condition: condition
  })),
  updateVoucher: (file: File) => set (state => ({
    ...state,
    voucher: file    
  })),
  updateCDFI: (CFDI: File) => set(state => ({
      ...state,
      CFDI: CFDI
  })),
  updateIndexStepper: (index: number) => set(state => ({
    ...state,
    indexStepper: index
  })),
  reset: () => {
    set(initialState)
  },
}))
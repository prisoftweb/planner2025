import {create} from 'zustand'
import { Expense } from '@/interfaces/Expenses'

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
  idVat: string
  type: string
  
  voucher: (File | null),
  CFDI: (File | null)

  refresh: boolean
}

interface PettyCashState{
  isPettyCash: boolean,
  isCard: boolean
}

interface ProjectState{
  project: string,
  indexStepper: number,
  report: string,
  condition: string,
  isDeductible: boolean
}

interface CurrentExpense{
  currentExpense: (Expense | null),
}

interface Actions {
  updateBasicData: (costCenter:string, folio:string, description:string, amount: string,
    date:string, taxFolio:string, vat:string, discount:string, proveedor:string, responsible:string,
    typeCFDI:string, typeExpense:string, category:string, idVat:string, type:string) => void,
  updateVoucher: (file: File) => void,
  updateCDFI: (CFDI: File) => void,
  updateIndexStepper: (index: number) => void,
  reset: () => void,
  updateRefresh: (value: boolean) => void,
  updateDeductible: (value: boolean) => void,
  updateProject: (value:string) => void,
  updateReport: (value: string) => void,
  updateCondition: (value:string) => void,
  updateCategory: (value:string) => void,
  updatePettyCash: (value:boolean) => void,
  updateIsCard: (value:boolean) => void,
  updateCurrentExpense: (value: Expense) => void,
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
  category: '',
  refresh: false,
  idVat: '',
  type: ''
}

const projectInitial: ProjectState = {
  project: '',
  indexStepper: 0,
  report: '',
  condition: '',
  isDeductible: true
}

const pettyCashInitial: PettyCashState = {
  isPettyCash: false,
  isCard: false,
}

const initialExpense: CurrentExpense = {
  currentExpense: null,
}

export const useNewExpense = create<NewExpenseState & Actions & ProjectState & PettyCashState & CurrentExpense>((set) => ({
  ...initialState,
  ...projectInitial,
  ...pettyCashInitial,
  ...initialExpense,
  updateBasicData: (costCenter:string, folio:string, description:string, amount: string,
      date:string, taxFolio:string, vat:string, discount:string, proveedor:string, responsible:string,
      typeCFDI:string, typeExpense:string, category:string, idVat:string, type:string) => set(state => ({
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
    idVat: idVat,
    type: type
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
  updateRefresh: (value: boolean) => set(state => ({
    ...state,
    refresh: value
  })),
  updateDeductible: (value: boolean) => set(state => ({
    ...state,
    isDeductible: value
  })),
  updateProject: (value:string) => set(state => ({
    ...state,
    project: value
  })),
  updateReport: (value:string) => set(state => ({
    ...state, 
    report: value,
  })),
  updateCondition: (value:string) => set(state => ({
    ...state,
    condition: value,
  })),
  updateCategory: (value:string) => set(state => ({
    ...state,
    category: value,
  })),
  updatePettyCash: (value:boolean) => set(state => ({
    ...state,
    isPettyCash: value,
    isCard: false
  })),
  updateIsCard: (value:boolean) => set(state => ({
    ...state,
    isCard: value,
  })),
  updateCurrentExpense: (value:Expense) => set(state => ({
    ...state,
    currentExpense: value
  })),
  reset: () => {
    set(initialState)
  },
}))
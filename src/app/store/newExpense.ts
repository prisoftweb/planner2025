import {create} from 'zustand'
import { OneExpense } from '@/interfaces/Expenses'
import { Options } from '@/interfaces/Common'

interface NewExpenseState {
  costCenter: string,
  concept: string,
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
  taxExempt: string
  
  voucher: (File | null),
  CFDI: (File | null)
  haveTaxExempt: boolean,
  haveDiscount: boolean

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
  currentExpense: (OneExpense | null),
}

interface Actions {
  updateBasicData: (folio:string, description:string, amount: string,
    date:string, taxFolio:string, vat:string, discount:string, proveedor:string, responsible:string,
    typeCFDI:string, typeExpense:string, category:string, idVat:string, type:string, taxExempt: string) => void,
  updateVoucher: (file: File) => void,
  updateCDFI: (CFDI: File) => void,
  updateIndexStepper: (index: number) => void,
  reset: () => void,
  updateRefresh: (value: boolean) => void,
  updateDeductible: (value: boolean) => void,
  updateProject: (value:string) => void,
  updateReport: (value: string) => void,
  updateCondition: (value:string) => void,
  updateCostCenter: (costcenter:string, concept: string) => void,
  updateCategory: (value:string) => void,
  updatePettyCash: (value:boolean) => void,
  updateIsCard: (value:boolean) => void,
  updateCurrentExpense: (value: (OneExpense | null)) => void,
  updateHaveTaxExempt: (value:boolean) => void,
  updateHaveDiscount: (value:boolean) => void,
}

const initialState: NewExpenseState = {
  costCenter: '',
  concept: '',
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
  type: '',
  haveTaxExempt: false,
  haveDiscount: false,
  taxExempt: '',
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
  updateBasicData: ( folio:string, description:string, amount: string,
      date:string, taxFolio:string, vat:string, discount:string, proveedor:string, responsible:string,
      typeCFDI:string, typeExpense:string, category:string, idVat:string, type:string, taxExempt: string) => set(state => ({
    ...state,
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
    type: type,
    taxExempt: taxExempt
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
  updateCostCenter: (costCenter: string, concept: string) => set (state => ({
    ...state,
    costCenter: costCenter,
    concept: concept
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
  updateCurrentExpense: (value:(OneExpense | null)) => set(state => ({
    ...state,
    currentExpense: value
  })),
  updateHaveDiscount: (value:boolean) => set(state => ({
    ...state,
    haveDiscount: value,
  })),
  updateHaveTaxExempt: (value:boolean) => set(state => ({
    ...state,
    haveTaxExempt: value,
  })),
  reset: () => {
    set(initialState)
  },
}))

interface OptionsExpenseState {
  costCenter: Options[],
  projects: Options[],
  providers: Options[], 
  responsibles: Options[],
  reports: Options[],
  categories: Options[],
  types: Options[],
  conditions: Options[],
  vats: Options[],
}

const optionsExpenseInitial: OptionsExpenseState = {
  categories: [],
  conditions: [],
  costCenter: [],
  projects: [],
  providers: [],
  reports: [],
  responsibles: [],
  types: [],
  vats: [],
}

interface ActionsOptions {
  updateCategories: (cats: Options[]) => void,
  updateConditions: (conds: Options[]) => void,
  updateCostC: (costsC: Options[]) => void,
  updateProjects: (proj: Options[]) => void,
  updateProviders: (provs: Options[]) => void,
  updateResponsibles: (resp: Options[]) => void,
  updateTypes: (typs: Options[]) => void,
  updateVats: (vas: Options[]) => void,
  updateReports: (reps: Options[]) => void,
}

export const useOptionsExpense = create<OptionsExpenseState & ActionsOptions >((set) => ({
  ...optionsExpenseInitial,
  updateCategories: (cats: Options[]) => set(state => ({
    ...state,
    categories: cats,
  })),
  updateConditions: (conds: Options[]) => set(state => ({
    ...state,
    conditions: conds,
  })),
  updateCostC: (costsC: Options[]) => set(state => ({
    ...state,
    costCenter: costsC,
  })),
  updateProjects: (proj: Options[]) => set(state => ({
    ...state,
    projects: proj,
  })),
  updateProviders: (provs: Options[]) => set(state => ({
    ...state,
    providers: provs,
  })),
  updateResponsibles: (resp: Options[]) => set(state => ({
    ...state,
    responsibles: resp,
  })),
  updateTypes: (typs: Options[]) => set(state => ({
    ...state,
    types: typs,
  })),
  updateVats: (vts: Options[]) => set(state => ({
    ...state,
    vatss: vts,
  })),
  updateReports: (reps: Options[]) => set(state => ({
    ...state,
    reports: reps,
  })),
}))
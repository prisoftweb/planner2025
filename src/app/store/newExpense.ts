import {create} from 'zustand'
import { OneExpense } from '@/interfaces/Expenses'
import { Options } from '@/interfaces/Common'
import { ReportParse } from '@/interfaces/Reports'

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
  total: string
  
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
    typeCFDI:string, typeExpense:string, category:string, idVat:string, type:string, 
    taxExempt: string, total:string) => void,
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
  total: '0',
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
      typeCFDI:string, typeExpense:string, category:string, idVat:string, type:string, 
      taxExempt: string, total: string) => set(state => ({
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
    taxExempt: taxExempt,
    total: total,
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
  costCenterOpt: Options[],
  projects: Options[],
  providers: Options[],
  providersSAT: Options[], 
  responsibles: Options[],
  reportsOptions: Options[],
  categories: Options[],
  types: Options[],
  conditions: Options[],
  vats: Options[],
  reports: ReportParse[]
}

const optionsExpenseInitial: OptionsExpenseState = {
  categories: [],
  conditions: [],
  costCenterOpt: [],
  projects: [],
  providers: [],
  reportsOptions: [],
  responsibles: [],
  types: [],
  vats: [],
  providersSAT: [],
  reports: [],
}

interface ActionsOptions {
  updateCategories: (cats: Options[]) => void,
  updateConditions: (conds: Options[]) => void,
  updateCostC: (costsC: Options[]) => void,
  updateProjects: (proj: Options[]) => void,
  updateProviders: (provs: Options[]) => void,
  updateProvidersSAT: (provs: Options[]) => void,
  addProvider: (prov: Options) => void,
  addProviderSat: (prov: Options) => void,
  updateResponsibles: (resp: Options[]) => void,
  updateTypes: (typs: Options[]) => void,
  updateVats: (vas: Options[]) => void,
  updateReportsOptions: (reps: Options[]) => void,
  updateReports: (reps: ReportParse[]) => void,
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
    costCenterOpt: costsC,
  })),
  updateProjects: (proj: Options[]) => set(state => ({
    ...state,
    projects: proj,
  })),
  updateProviders: (provs: Options[]) => set(state => ({
    ...state,
    providers: provs,
  })),
  updateProvidersSAT: (provs: Options[]) => set(state => ({
    ...state,
    providersSAT: provs,
  })),
  addProvider: (prov: Options) => set(state => ({
    ...state,
    providers: [...state.providers, prov],
  })),
  addProviderSat: (prov: Options) => set(state => ({
    ...state,
    providersSAT: [...state.providersSAT, prov],
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
    vats: vts,
  })),
  updateReportsOptions: (reps: Options[]) => set(state => ({
    ...state,
    reportsOptions: reps,
  })),
  updateReports: (reps: ReportParse[]) => set(state => ({
    ...state,
    reports: reps,
  })),
}))
import {create} from 'zustand'

interface NewProjectState {
  title: string,
  code:string, 
  description:string,
  amount: string, 
  date:string, 
  category:string,
  type:string, 
  client:string, 
  user:string, 
  haveAddress:boolean, 
  company:string, 
  hasguaranteefund:boolean,
  community: string, 
  country:string, 
  cp: string, 
  municipy:string, 
  stateA:string, 
  street:string,
  percentage: string,
  dateG: string,
  amountG: string
  amountCharge: string
  dateCharge: string
  percentageCharge: string
  hasamountChargeOff: boolean
  updateBasicData: (name:string, code:string, description:string) => void,
  updateExtraData: (amount: string, date:string, category:string,type:string, 
    client:string, user:string, haveAddress:boolean, company:string, hasguaranteefund:boolean, haveChargeOff:boolean
   ) => void,
  updateAddress: (community: string, country:string, cp: string, municipy:string, 
    stateA:string, street:string,) => void,
  updateGuarantee: (percentage:string, dateG:string, amountG:string) => void,
  updateChargeOff: (percentage:string, date:string, amount:string) => void,
}

export const useNewProject = create<NewProjectState>((set) => ({
  title: '',
  code: '', 
  description: '',
  amount: '', 
  date: '', 
  category: '',
  type: '', 
  client: '', 
  user: '', 
  haveAddress: false, 
  company: '', 
  hasguaranteefund: false,
  community: '', 
  country: '', 
  cp: '', 
  municipy: '', 
  stateA: '', 
  street: '',
  amountG: '',
  dateG: '',
  percentage: '',
  amountCharge: '',
  dateCharge: '',
  hasamountChargeOff: false,
  percentageCharge: '',
  updateBasicData: (name:string, code:string, description:string) => set(state => ({
    ...state,
    title: name,
    code: code,
    description: description
  })),
  updateExtraData: (amount: string, date:string, category:string,type:string, 
    client:string, user:string, haveAddress:boolean, company:string, hasguaranteefund:boolean, haveChargeOff:boolean
   ) => set (state => ({
    ...state,
    amount:amount,
    date: date,
    category: category,
    type: type,
    client: client,
    user: user,
    haveAddress: haveAddress,
    company: company,
    hasguaranteefund: hasguaranteefund,
    hasamountChargeOff: haveChargeOff
  })),
  updateAddress: (community: string, country:string, cp: string, municipy:string, stateA:string, 
    street:string,) => set(state => ({
      ...state,
      community:community,
      country:country,
      cp:cp,
      municipy:municipy,
      stateA:stateA,
      street:street
  })),
  updateGuarantee: (percentage:string, dateG:string, amountG:string) => set(state => ({
    ...state,
    dateG: dateG,
    amountG: amountG, 
    percentage: percentage
  })),
  updateChargeOff: (percentage:string, date:string, amount:string) => set(state => ({
    ...state,
    dateCharge: date,
    amountCharge: amount, 
    percentageCharge: percentage
  })),
}))
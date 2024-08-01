import {create} from 'zustand'
import { Options } from "@/interfaces/Common"

interface OptionsReportState {
  projects: Options[],
  conditions: Options[],
  companies: Options[],
}

const optionsReportInitial: OptionsReportState = {
  conditions: [],
  projects: [],
  companies: [],
}

interface ActionsOptions {
  updateConditions: (conds: Options[]) => void,
  updateProjects: (proj: Options[]) => void,
  updateCompanies: (comps: Options[]) => void,
}

export const useOptionsReports = create<OptionsReportState & ActionsOptions >((set) => ({
  ...optionsReportInitial,
  updateConditions: (conds: Options[]) => set(state => ({
    ...state,
    conditions: conds,
  })),
  updateProjects: (proj: Options[]) => set(state => ({
    ...state,
    projects: proj,
  })),
  updateCompanies: (comps: Options[]) => set(state => ({
    ...state,
    companies: comps,
  })),
}))
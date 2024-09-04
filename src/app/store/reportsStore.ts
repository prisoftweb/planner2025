import {create} from 'zustand'
import { Options } from "@/interfaces/Common"
import { Report, ReportParse } from '@/interfaces/Reports'

interface OptionsReportState {
  projects: Options[],
  conditions: Options[],
  companies: Options[],

  reportsStore: ReportParse[],
  haveNewReport: boolean,
  haveDeleteReport: boolean,
}

const optionsReportInitial: OptionsReportState = {
  conditions: [],
  projects: [],
  companies: [],

  reportsStore: [],
  haveDeleteReport: false,
  haveNewReport: false,
}

interface ActionsOptions {
  updateConditions: (conds: Options[]) => void,
  updateProjects: (proj: Options[]) => void,
  updateCompanies: (comps: Options[]) => void,

  updateReportStore: (reps: ReportParse[]) => void,
  updateHaveDeleteReport: (value: boolean) => void,
  updateHaveNewReport: (value: boolean) => void,
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
  updateReportStore: (reps: ReportParse[]) => set(state => ({
    ...state,
    reportsStore: reps
  })),
  updateHaveDeleteReport: (value: boolean) => set(state => ({
    ...state,
    haveDeleteReport: value
  })),
  updateHaveNewReport: (value: boolean) => set(state => ({
    ...state,
    haveNewReport: value
  })),
}))

interface OneReportState {
  oneReport: Report | undefined;
}

const oneReportInitial: OneReportState = {
  oneReport: undefined,
}

interface ActionsReport {
  updateOneReportStore: (rep: Report | undefined) => void,
}

export const useOneReportStore = create<OneReportState & ActionsReport >((set) => ({
  ...oneReportInitial,
  updateOneReportStore: (rep: Report | undefined) => set(state => ({
    ...state,
    oneReport: rep
  })),
}))
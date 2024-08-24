import {create} from 'zustand'
//import { Options } from "@/interfaces/Common"
//import { ReportParse } from '@/interfaces/Reports'
import { ProjectMin, OneProjectMin } from '@/interfaces/Projects'

interface ProjectState {
  // projects: Options[],
  // conditions: Options[],
  // companies: Options[],

  projectStore: ProjectMin[],
  haveNewProject: boolean,
  haveDeleteProject: boolean,
}

const projectInitial: ProjectState = {
  // conditions: [],
  // projects: [],
  // companies: [],

  projectStore: [],
  haveDeleteProject: false,
  haveNewProject: false,
}

interface ActionsProjects {
  // updateConditions: (conds: Options[]) => void,
  // updateProjects: (proj: Options[]) => void,
  // updateCompanies: (comps: Options[]) => void,

  updateProjectStore: (proj: ProjectMin[]) => void,
  updateHaveDeleteProject: (value: boolean) => void,
  updateHaveNewProject: (value: boolean) => void,
}

export const useProjectsStore = create<ProjectState & ActionsProjects >((set) => ({
  ...projectInitial,
  // updateConditions: (conds: Options[]) => set(state => ({
  //   ...state,
  //   conditions: conds,
  // })),
  // updateProjects: (proj: Options[]) => set(state => ({
  //   ...state,
  //   projects: proj,
  // })),
  // updateCompanies: (comps: Options[]) => set(state => ({
  //   ...state,
  //   companies: comps,
  // })),
  updateProjectStore: (proj: ProjectMin[]) => set(state => ({
    ...state,
    projectStore: proj
  })),
  updateHaveDeleteProject: (value: boolean) => set(state => ({
    ...state,
    haveDeleteProject: value
  })),
  updateHaveNewProject: (value: boolean) => set(state => ({
    ...state,
    haveNewProject: value
  })),
}))

interface OneProjectState {
  oneProjectStore: OneProjectMin | undefined,
}

const oneProjectInitial: OneProjectState = {
  oneProjectStore: undefined
}

interface ActionsOneProject {
  updateOneProjectStore: (proj: OneProjectMin) => void,
}

export const useOneProjectsStore = create<OneProjectState & ActionsOneProject >((set) => ({
  ...oneProjectInitial,
  updateOneProjectStore: (proj: OneProjectMin) => set(state => ({
    ...state,
    oneProjectStore: proj
  })),
}))
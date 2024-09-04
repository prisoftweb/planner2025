import {create} from 'zustand'
import { Department } from '@/interfaces/Departments'

interface departmentState {
  departmentStore: Department[],
}

const departmentInitial: departmentState = {
  departmentStore: [],
}

interface ActionsDepartment {
  updateDepartmentStore: (lists: Department[]) => void,
}

export const useDepartmentStore = create<departmentState & ActionsDepartment >((set) => ({
  ...departmentInitial,
  updateDepartmentStore: (deps: Department[]) => set(state => ({
    ...state,
    departmentStore: deps
  })),
}));
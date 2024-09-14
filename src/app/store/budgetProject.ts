import {create} from 'zustand'
import { ProjectMin } from '@/interfaces/Projects'

import { BudgetMin } from '@/interfaces/Budget'
import { FullBudget } from '@/interfaces/BudgetProfile'

interface NewBudgetState {
  indexStepper: number
  project: ProjectMin | null
}

interface ActionsStepper {
  updateIndexStepper: (value: number) => void,
  updateProject: (value: ProjectMin) => void,
}

const initialBudgetStepper : NewBudgetState = {
  indexStepper: 0,
  project: null
}

export const useNewBudget = create<NewBudgetState & ActionsStepper>((set) => ({
  //indexStepper: 0,
  ...initialBudgetStepper,
  updateIndexStepper: (value: number) => set(state => ({
    ...state,
    indexStepper: value,
  })),
  updateProject: (value: ProjectMin) => set(state => ({
    ...state,
    project: value,
  })),
}))

interface BudgetsState {
  budgetsStore: BudgetMin[] | null
}

interface ActionsBudgets {
  updateBudgetsStore: (value: BudgetMin[]) => void,
}

const initialBudgetStore : BudgetsState = {
  budgetsStore: null
}

export const useBudgetStore = create<BudgetsState & ActionsBudgets>((set) => ({
  ...initialBudgetStore,
  updateBudgetsStore: (value: BudgetMin[]) => set(state => ({
    ...state,
    budgetsStore: value,
  })),
}))

interface OneBudgetStore {
  oneBudget: FullBudget | null
}

interface ActionsBudget {
  updateOneBudget: (value: FullBudget | null) => void,
}

const initialOneBudget : OneBudgetStore = {
  oneBudget: null
}

export const useOneBudget = create<OneBudgetStore & ActionsBudget>((set) => ({
  ...initialOneBudget,
  updateOneBudget: (value: FullBudget | null) => set(state => ({
    ...state,
    oneBudget: value,
  })),
}))
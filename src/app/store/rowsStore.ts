import {create} from 'zustand'

interface RowsState {
  numRows: number,
  changeCounter: (value: number) => void
}

export const useRowsCounter = create<RowsState>((set) => ({
  numRows: 10,
  changeCounter: (value: number) => set(state => ({
    ...state,
    numRows: value
  }))
}))
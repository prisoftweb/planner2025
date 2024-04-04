import {create} from 'zustand'

interface PermissionState {
  counter: number,
  permission: boolean,
  changeCounter: (value: number) => void,
  changePermission: (value: boolean) => void,
}

export const usePermissionCounter = create<PermissionState>((set) => ({
  counter: 0,
  permission: false,
  changeCounter: (value: number) => set(state => ({
    ...state,
    //counter: state.counter + value,
    counter: value,
  })),
  changePermission: (value: boolean) => set(state => ({
    ...state,
    permission: value,
  }))
}))
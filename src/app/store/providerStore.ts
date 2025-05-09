import {create} from 'zustand'
import { Provider } from '@/interfaces/Providers'

interface providerState {
  providerStore: Provider[],
  haveNewProvider: boolean,
  haveDeleteProvider: boolean,
}

const providerInitial: providerState = {
  providerStore: [],
  haveDeleteProvider: false,
  haveNewProvider: false,
}

interface ActionsProvider {
  updateProviderStore: (prov: Provider[]) => void,
  updateHaveDeleteProvider: (value: boolean) => void,
  updateHaveNewProvider: (value: boolean) => void,
}

export const useProviderStore = create<providerState & ActionsProvider >((set) => ({
  ...providerInitial,
  updateProviderStore: (prov: Provider[]) => set(state => ({
    ...state,
    providerStore: prov
  })),
  updateHaveDeleteProvider: (value: boolean) => set(state => ({
    ...state,
    haveDeleteProvider: value
  })),
  updateHaveNewProvider: (value: boolean) => set(state => ({
    ...state,
    haveNewProvider: value
  })),
}))

interface providerContainerState {
  oneProviderStore: Provider | undefined,
}

const oneProviderInitial: providerContainerState = {
  oneProviderStore: undefined,
}

interface ActionsOneProvider {
  updateOneProviderStore: (prov: Provider) => void,
}

export const useOneProviderStore = create< providerContainerState & ActionsOneProvider >((set) => ({
  ...oneProviderInitial,
  updateOneProviderStore: (prov: Provider) => set(state => ({
    ...state,
    oneProviderStore: prov
  })),
}));
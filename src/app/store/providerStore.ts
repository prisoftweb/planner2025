import {create} from 'zustand'
import { Provider, IProviderMin } from '@/interfaces/Providers'

interface providerState {
  providerStore: IProviderMin[],
  haveNewProvider: boolean,
  haveDeleteProvider: boolean,
}

const providerInitial: providerState = {
  providerStore: [],
  haveDeleteProvider: false,
  haveNewProvider: false,
}

interface ActionsProvider {
  updateProviderStore: (prov: IProviderMin[]) => void,
  updateHaveDeleteProvider: (value: boolean) => void,
  updateHaveNewProvider: (value: boolean) => void,
}

export const useProviderStore = create<providerState & ActionsProvider >((set) => ({
  ...providerInitial,
  updateProviderStore: (prov: IProviderMin[]) => set(state => ({
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
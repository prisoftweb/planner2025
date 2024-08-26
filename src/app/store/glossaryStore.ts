import {create} from 'zustand'
import { Glossary } from '@/interfaces/Glossary'

interface glossariesState {
  glossariesStore: Glossary[],
}

const providerInitial: glossariesState = {
  glossariesStore: [],
}

interface ActionsGlossaries {
  updateGlossariesStore: (gloss: Glossary[]) => void,
}

export const useGlossariesStore = create<glossariesState & ActionsGlossaries >((set) => ({
  ...providerInitial,
  updateGlossariesStore: (gloss: Glossary[]) => set(state => ({
    ...state,
    glossariesStore: gloss
  })),
}))
import {create} from 'zustand'
import { Catalog } from '@/interfaces/Catalogs'

interface listsState {
  listsStore: Catalog[],
}

const listsInitial: listsState = {
  listsStore: [],
}

interface ActionsLists {
  updateListsStore: (lists: Catalog[]) => void,
}

export const useListsStore = create<listsState & ActionsLists >((set) => ({
  ...listsInitial,
  updateListsStore: (lists: Catalog[]) => set(state => ({
    ...state,
    listsStore: lists
  })),
}));
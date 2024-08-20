export interface StatusTable{
  id: string,
  catalog: string,
  collection: string,
  //statuses: string,
  statuses: {
    arrStatuses: string[],
    arrColors: string[]
  }
  categories: string,
  types: string
}
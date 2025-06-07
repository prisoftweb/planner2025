export interface ICode {
  code: string
  date: string
  user: string
  project: string
  status: boolean
  datets: string
  _id: string
  __v: number
  id: string
}

export interface ICodeMin {
  _id: string
  code: string
  date: string
  user: {
    _id: string
    name: string
    photo: string
  }
  project: {
    _id: string
    title: string
    photo: string
  }
  status: boolean
}

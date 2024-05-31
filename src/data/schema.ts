export interface Transaction {
  workspace: string
  owner: string
  status: string
  costs: number
  region: string
  capacity: string
  lastEdited: string
}

export type OverviewData = {
  date: string
  "Rows written": number
  "Rows read": number
  Queries: number
  "Payments completed": number
  "Sign ups": number
  Logins: number
  "Sign outs": number
  "Support calls": number
}

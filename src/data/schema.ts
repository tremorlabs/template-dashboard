export interface Transaction {
  workspace: string;
  owner: string;
  status: string;
  costs: number;
  region: string;
  capacity: string;
  lastEdited: string;
}

export type OverviewData = {
  date: string;
  Sales: number;
  Profit: number;
  Users: number;
};

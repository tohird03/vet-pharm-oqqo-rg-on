import {IPagination} from '../types';

export interface IStaffs {
  id: string;
  fullname: string;
  phone: string;
  actions: IStaffPer[];
  pages: EPageAccess[];
}

export interface IGetStaffsParams extends IPagination {
  search?: string;
}

export interface IAddStaff {
  id?: string;
  fullname: string;
  phone: string;
  password: string;
  actionsToConnect: string[];
  pagesToConnect: EPageAccess[];
}

export interface IUpdateStaff {
  id?: string;
  fullname: string;
  phone?: string;
  password: string;
  actionsToConnect: string[];
  actionsToDisconnect: string[];
  pagesToConnect: EPageAccess[];
  pagesToDisconnect: EPageAccess[];
}

export enum EPageAccess {
  STAT = 'stat',
  PRODUCT = 'product',
  SELLING = 'selling',
  ARRIVAL = 'arrival',
  RETURNING = 'returning',
  CLIENT = 'client',
  CLIENTPAYMENT = 'clientpayment',
  SUPPLIER = 'supplier',
  SUPPLIERPAYMENT = 'supplierpayment',
  STUFF = 'stuff',
  STUFFPAYMENT = 'stuffpayment',
}

export interface IStaffPer {
  id: string;
  name: string;
}

export interface IGetStaffsReportParams extends IPagination {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
}

export interface IGetStaffsReports {
  days: string[];
  rows: IReportRow[];
}


export interface IReportRow {
  userId: string;
  fullname: string;
  byDay: Record<string, number>;
  totalMs: number;
}

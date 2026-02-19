import { IPagination } from '../types';

export interface IExpense {
  id: string;
  description: string;
  price: number;
}

export interface IGetExpenseParams extends IPagination {
  startDate: Date;
  endDate: Date;
}

export interface IAddEditExpense {
  description: string;
  price: string;
  id?: string;
}

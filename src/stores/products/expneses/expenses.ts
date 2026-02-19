import { makeAutoObservable } from 'mobx';
import { addNotification } from '@/utils';
import { IExpense, IGetExpenseParams, expenseApi } from '@/api/expense';
import { IPagination } from '@/api/types';

class ExpensesStore {
  #today = new Date();

  pageNumber = 1;
  pageSize = 20;
  search: string | null = null;
  isOpenAddEditExpenseModal = false;
  singleExpense: IExpense | null = null;
  startDate: Date | null = this.#today;
  endDate: Date | null = this.#today;

  constructor() {
    makeAutoObservable(this);
  }

  getExpense = (params: IGetExpenseParams) =>
    expenseApi.getExpenseMany(params)
      .then(res => res)
      .catch(addNotification);

  setPageNumber = (pageNumber: number) => {
    this.pageNumber = pageNumber;
  };

  setPageSize = (pageSize: number) => {
    this.pageSize = pageSize;
  };

  setIsOpenAddEditExpenseModal = (isOpenAddEditExpenseModal: boolean) => {
    this.isOpenAddEditExpenseModal = isOpenAddEditExpenseModal;
  };

  setSingleExpense = (singleExpense: IExpense | null) => {
    this.singleExpense = singleExpense;
  };

  setStartDate = (startDate: Date | null) => {
    this.startDate = startDate;
  };

  setEndDate = (endDate: Date | null) => {
    this.endDate = endDate;
  };

  reset = () => {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.search = null;
    this.isOpenAddEditExpenseModal = false;
  };
}

export const expensesStore = new ExpensesStore();

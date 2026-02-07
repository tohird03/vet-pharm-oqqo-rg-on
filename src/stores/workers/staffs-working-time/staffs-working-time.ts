import { makeAutoObservable } from 'mobx';
import { IGetStaffsParams, IGetStaffsReportParams, staffsApi } from '@/api/staffs';
import { addNotification } from '@/utils';

class StaffsWorkingTime {
  #today = new Date();

  sellerId: string | null = null;
  pageNumber = 1;
  pageSize = 50;
  startDate: Date | null = this.#today;
  endDate: Date | null = this.#today;

  constructor() {
    makeAutoObservable(this);
  }

  getStaffsReports = (params: IGetStaffsReportParams) =>
    staffsApi.getStaffsReport(params)
      .then(res => res)
      .catch(addNotification);

  setSellerId = (sellerId: string | null) => {
    this.sellerId = sellerId;
  };

  setPageNumber = (pageNumber: number) => {
    this.pageNumber = pageNumber;
  };

  setPageSize = (pageSize: number) => {
    this.pageSize = pageSize;
  };

  setStartDate = (startDate: Date | null) => {
    this.startDate = startDate;
  };

  setEndDate = (endDate: Date | null) => {
    this.endDate = endDate;
  };

  reset = () => {
    this.pageNumber = 1;
    this.pageSize = 50;
  };
}

export const staffsWorkingTimeStore = new StaffsWorkingTime();

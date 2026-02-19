import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import { IAddEditExpense, IExpense, IGetExpenseParams } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class ExpenseApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getExpenseMany = (params: IGetExpenseParams): Promise<IResponse<IExpense[]>> =>
    this.get(Endpoints.ExpensesMany, { params });

  addExpense = (params: IAddEditExpense): Promise<AxiosResponse> =>
    this.post(Endpoints.ExpensesOne, params);

  updateExpense = (params: IAddEditExpense): Promise<AxiosResponse> =>
    this.patch(Endpoints.ExpensesOne, params, { params: { id: params?.id } });

  deleteExpense = (id: string): Promise<AxiosResponse> =>
    this.delete(Endpoints.ExpensesOne, {params: {id}});
}

export const expenseApi = new ExpenseApi(config);

import { IStaff } from '@/stores/profile/types';
import { IPagination } from '../types';
import { IOrder } from '../order/types';
import { IIncomeOrder } from '../income-products/types';
import { IReturnedOrder } from '../returned-order/types';

export interface IGetProductsParams extends IPagination {
  search?: string;
}


export interface IProducts {
  id: string;
  name: string;
  count: number;
  minAmount: number;
  createdAt: string;
  cost: number;
  price: number;
  prices: IProductPrices;
  lastSellingDate: string;
  unit: IProductUnit;
}

export interface IProductPrices {
  client: number;
  doctor: number;
  farmer: number;
}

export interface IAddEditProduct {
  id?: string;
  minAmount?: number;
  name: string;
  count: number;
  cost: number;
  unit: IProductUnit;
  price: number;
  prices: IProductPrices;
}

export interface IProductTotalCalc {
  calcPage: {
    totalPrice: number;
    totalCost: number;
    totalCount: number;
  };
  calcTotal: {
    totalPrice: number;
    totalCost: number;
    totalCount: number;
  };
}

export interface IGetSingleProductParams {
  productId: string;
  startDate?: Date;
  endDate?: Date;
  staffId?: string;
}

export interface IGetSingleProducts {
  products: ISingleProductStory[];
  actualCount: number;
  totalSellingCount: number;
  totalArrivalCount: number;
  totalReturningCount: number;
}

export interface ISingleProductStory {
  count: number;
  type: 'selling' | 'arrival' | 'returning';
  product?: IProducts;
  staff: IStaff;
  id: string;
  selling: IOrder;
  arrival: IIncomeOrder;
  returning: IReturnedOrder;
  createdAt: string;
}


export enum IProductUnit {
  PIECE = 'PIECE',
  LITER = 'LITER',
  KILOGRAM = 'KILOGRAM',
  METER = 'METER',
}

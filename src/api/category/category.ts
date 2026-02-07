import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import { ICategory, IEditCategory } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class CategoryApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getCategories = (): Promise<IResponse<ICategory[]>> =>
    this.get(Endpoints.CategoryMany);

  updateCategory = (params: IEditCategory): Promise<AxiosResponse> =>
    this.patch(Endpoints.CategoryOne, params, { params: { id: params?.id } });
}

export const categoryApi = new CategoryApi(config);

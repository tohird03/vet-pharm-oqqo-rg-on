import {makeAutoObservable} from 'mobx';
import {addNotification} from '@/utils';
import { ICategory } from '@/api/category/types';
import { categoryApi } from '@/api/category/category';

class CategoryStore {
  isOpenEditCategoryModal = false;
  singleCategory: ICategory | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getCategories = () =>
    categoryApi.getCategories()
      .then(res => res)
      .catch(addNotification);

  setSingleCategory = (singleCategory: ICategory | null) => {
    this.singleCategory = singleCategory;
  };

  setIsOpenEditCategoryModal = (isOpenEditCategoryModal: boolean) => {
    this.isOpenEditCategoryModal = isOpenEditCategoryModal;
  };

  reset() {
    this.singleCategory = null;
    this.isOpenEditCategoryModal = false;
  }
}

export const categoryStore = new CategoryStore();

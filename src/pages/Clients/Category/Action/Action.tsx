import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { categoryStore } from '@/stores/clients';
import { authStore } from '@/stores/auth';
import { isShowEditPayments } from '@/utils/isShowEdit';
import { ICategory } from '@/api/category/types';

type Props = {
  category: ICategory;
};

export const Action: FC<Props> = observer(({ category }) => {

  const handleEditPayment = () => {
    categoryStore.setSingleCategory(category);
    categoryStore.setIsOpenEditCategoryModal(true);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
      <Button onClick={handleEditPayment} type="primary" icon={<EditOutlined />} />
    </div>
  );
});

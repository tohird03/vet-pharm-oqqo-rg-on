import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useQuery } from '@tanstack/react-query';
import { Table, Typography } from 'antd';
import classNames from 'classnames';
import { AddEditModal } from './AddEditModal';
import styles from './category.scss';
import { categoriesColumns } from './constants';
import { categoryStore } from '@/stores/clients';

const cn = classNames.bind(styles);

export const Category = observer(() => {
  const { data: categoriesData, isLoading: loading } = useQuery({
    queryKey: ['getCategories'],
    queryFn: () =>
      categoryStore.getCategories(),
  });

  useEffect(() => () => {
    categoryStore.reset();
  }, []);

  return (
    <main>
      <div className={cn('clients-payments__head')}>
        <Typography.Title level={3}>Mijozlar kategoriyasi</Typography.Title>
      </div>

      <Table
        columns={categoriesColumns}
        dataSource={categoriesData?.data?.data || []}
        loading={loading}
        pagination={false}
      />

      {categoryStore.isOpenEditCategoryModal && <AddEditModal />}
    </main>
  );
});

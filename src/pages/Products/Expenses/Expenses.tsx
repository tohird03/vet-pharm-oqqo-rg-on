import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, DatePicker, DatePickerProps, Table, Tooltip, Typography } from 'antd';
import classNames from 'classnames';
import { getPaginationParams } from '@/utils/getPaginationParams';
import { AddEditModal } from './AddEditModal';
import styles from './expenses.scss';
import dayjs from 'dayjs';
import { expensesStore } from '@/stores/products';
import { expenseColumns } from './constants';

const cn = classNames.bind(styles);

export const Expenses = observer(() => {
  const { data: clientsInfoData, isLoading: loading } = useQuery({
    queryKey: [
      'getExpense',
      expensesStore.pageNumber,
      expensesStore.pageSize,
      expensesStore.startDate,
      expensesStore.endDate,
    ],
    queryFn: () =>
      expensesStore.getExpense({
        pageNumber: expensesStore.pageNumber,
        pageSize: expensesStore.pageSize,
        startDate: expensesStore.startDate!,
        endDate: expensesStore.endDate!,
      }),
  });

  const handleStartDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      expensesStore.setStartDate(null);
    }
    expensesStore.setStartDate(new Date(dateString));
  };

  const handleEndDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      expensesStore.setEndDate(null);
    }
    expensesStore.setEndDate(new Date(dateString));
  };

  const handleAddNewClient = () => {
    expensesStore.setIsOpenAddEditExpenseModal(true);
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    expensesStore.setPageNumber(page);
    expensesStore.setPageSize(pageSize!);
  };

  useEffect(() => () => {
    expensesStore.reset();
  }, []);

  return (
    <main>
      <div className={cn('expenses-info__head')}>
        <Typography.Title level={3}>Harajatlar</Typography.Title>
        <div className={cn('expenses-info__filter')}>
          <DatePicker
            className={cn('expenses__datePicker')}
            onChange={handleStartDateChange}
            placeholder={'Boshlanish sanasi'}
            defaultValue={dayjs(expensesStore.startDate)}
            allowClear={false}
          />
          <DatePicker
            className={cn('expenses__datePicker')}
            onChange={handleEndDateChange}
            placeholder={'Tugash sanasi'}
            defaultValue={dayjs(expensesStore.endDate)}
            allowClear={false}
          />
          <Button
            onClick={handleAddNewClient}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            To&lsquo;lov qo&lsquo;shish
          </Button>
        </div>
      </div>

      <Table
        columns={expenseColumns}
        dataSource={clientsInfoData?.data?.data || []}
        loading={loading}
        pagination={{
          total: clientsInfoData?.data?.totalCount,
          current: expensesStore?.pageNumber,
          pageSize: expensesStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(clientsInfoData?.data?.totalCount),
        }}
      />

      {expensesStore.isOpenAddEditExpenseModal && <AddEditModal />}
    </main>
  );
});

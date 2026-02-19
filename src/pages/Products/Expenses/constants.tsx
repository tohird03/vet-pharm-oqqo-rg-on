import React from 'react';
import { ColumnType } from 'antd/es/table';
import { Action } from './Action';
import { priceFormat } from '@/utils/priceFormat';
import { getFullDateFormat } from '@/utils/getDateFormat';
import { IExpense } from '@/api/expense';

export const expenseColumns: ColumnType<IExpense>[] = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Qiymati',
    align: 'center',
    render: (value, record) => priceFormat(record?.price),
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: 'To\'lov haqida',
    align: 'center',
    width: 200,
    render: (value, record) => record?.description,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action expense={record} />,
  },
];

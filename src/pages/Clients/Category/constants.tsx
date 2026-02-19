import React from 'react';
import {ColumnType} from 'antd/es/table';
import {Action} from './Action';
import { ICategory } from '@/api/category/types';

export const categoriesColumns: ColumnType<ICategory>[] = [
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
    title: 'Kategoriya nomi',
    align: 'center',
    render: (value, record) => record?.name,
  },
  {
    key: 'minPercent',
    dataIndex: 'minPercent',
    title: 'Narxning eng past foiz ustamasi',
    align: 'center',
    render: (value, record) => <span>{record?.minPercent}%</span>,
  },
  {
    key: 'percent',
    dataIndex: 'percent',
    title: 'Narx ustiga qo\'yiladigan foiz',
    align: 'center',
    render: (value, record) => <span>{record?.percent}%</span>,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action category={record} />,
  },
];

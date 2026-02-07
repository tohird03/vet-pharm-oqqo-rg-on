import React from 'react';
import {ColumnType} from 'antd/es/table';
import {Action} from './Action';
import { priceFormat } from '@/utils/priceFormat';
import { IClientsPayments } from '@/api/payment/types';
import { getFullDateFormat } from '@/utils/getDateFormat';
import { ClientNameLink } from '@/pages/ActionComponents/ClientNameLink';
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

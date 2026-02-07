import {ColumnType} from 'antd/es/table';
import {IStaffs} from '@/api/staffs';
import {formatPhoneNumber} from '@/utils/phoneFormat';

export const staffsWorkingTimeReportsColumns: ColumnType<IStaffs>[] = [
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
    title: 'Xodim',
    align: 'center',
    render: (value, record) => record?.fullname,
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Telefon raqami',
    align: 'center',
    render: (value, record) => `+${formatPhoneNumber(record?.phone)}`,
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Faol ish vaqti',
    align: 'center',
    render: (value, record) => `+${formatPhoneNumber(record?.phone)}`,
  },
];

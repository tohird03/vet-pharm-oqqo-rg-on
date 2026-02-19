import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm } from 'antd';
import { addNotification } from '@/utils';
import { IStaffsPayments } from '@/api/staffs-payments/types';
import { staffsPaymentStore } from '@/stores/workers/staffs-payments';
import { authStore } from '@/stores/auth';
import { staffsPaymentsApi } from '@/api/staffs-payments/staffs-payments';
import { IExpense, expenseApi } from '@/api/expense';
import { expensesStore } from '@/stores/products';

type Props = {
  expense: IExpense;
};

export const Action: FC<Props> = observer(({ expense }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteExpense } =
    useMutation({
      mutationKey: ['deleteExpense'],
      mutationFn: (id: string) => expenseApi.deleteExpense(id!),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getExpense'] });
      },
      onError: addNotification,
    });

  const handleEditStaffsPayments = () => {
    expensesStore.setSingleExpense(expense);
    expensesStore.setIsOpenAddEditExpenseModal(true);
  };

  const handleDelete = () => {
    deleteExpense(expense?.id);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
      <>
        <Button onClick={handleEditStaffsPayments} type="primary" icon={<EditOutlined />} />
        <Popconfirm
          title="Xodim hisobotini o'chirish"
          description="Rostdan ham xodimni bu hisobotini o'chirishni xohlaysizmi?"
          onConfirm={handleDelete}
          okText="Ha"
          okButtonProps={{ style: { background: 'red' } }}
          cancelText="Yo'q"
        >
          <Button type="primary" icon={<DeleteOutlined />} danger />
        </Popconfirm>
      </>
    </div>
  );
});

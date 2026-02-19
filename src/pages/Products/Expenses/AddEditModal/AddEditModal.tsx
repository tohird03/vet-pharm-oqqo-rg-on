import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import {addNotification} from '@/utils';
import { priceFormat } from '@/utils/priceFormat';
import { IAddEditExpense, expenseApi } from '@/api/expense';
import { expensesStore } from '@/stores/products';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {mutate: addNewExpense} =
    useMutation({
      mutationKey: ['addNewExpense'],
      mutationFn: (params: IAddEditExpense) => expenseApi.addExpense(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getExpense']});
        addNotification('To\'lov muvaffaqiyatli qo\'shildi');
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const {mutate: updateExpense} =
    useMutation({
      mutationKey: ['updateExpense'],
      mutationFn: (params: IAddEditExpense) => expenseApi.updateExpense(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getExpense']});
        addNotification('To\'lov muvaffaqiyatli tahrirlandi');
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (values: IAddEditExpense) => {
    setLoading(true);

    if (expensesStore?.singleExpense) {
      updateExpense({
        ...values,
        id: expensesStore?.singleExpense?.id!,
      });

      return;
    }
    addNewExpense(values);
  };

  const handleModalClose = () => {
    expensesStore.setSingleExpense(null);
    expensesStore.setIsOpenAddEditExpenseModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (expensesStore.singleExpense) {
      form.setFieldsValue({
        ...expensesStore.singleExpense,
      });
    }
  }, [expensesStore.singleExpense]);

  return (
    <Modal
      open={expensesStore.isOpenAddEditExpenseModal}
      title={expensesStore.singleExpense ? 'Harajatni tahrirlash' : 'Harajatni qo\'shish'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={expensesStore.singleExpense ? 'Harajatni tahrirlash' : 'Harajatni qo\'shish'}
      cancelText="Bekor qilish"
      centered
      confirmLoading={loading}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="To'lov qiymati"
          name="price"
          initialValue={0}
          rules={[{required: true}]}
        >
          <InputNumber
            placeholder="To'lov qiymati"
            defaultValue={0}
            style={{ width: '100%' }}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>

        <Form.Item
          label="To'lov haqida ma'lumot"
          rules={[{required: true}]}
          name="description"
        >
          <Input.TextArea
            placeholder="To'lov haqida ma'lumot"
            style={{ width: '100%' }}
            rows={4}
            maxLength={100}
            showCount
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

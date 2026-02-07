import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Input, InputNumber, Modal } from 'antd';
import { categoryStore } from '@/stores/clients';
import { addNotification } from '@/utils';
import { priceFormat } from '@/utils/priceFormat';
import { categoryApi } from '@/api/category/category';
import { IEditCategory } from '@/api/category/types';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: IEditCategory) => {
    setLoading(true);

    if (categoryStore?.singleCategory) {
      categoryApi.updateCategory({
        ...values,
        id: categoryStore?.singleCategory?.id,
      })
        .then(() => {
          addNotification('Kategoriya muvaffaqiyatli tahrirlandi!');
          queryClient.invalidateQueries({ queryKey: ['getCategories'] });
          handleModalClose();
        })
        .catch(addNotification)
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleModalClose = () => {
    categoryStore.setSingleCategory(null);
    categoryStore.setIsOpenEditCategoryModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };


  useEffect(() => {
    if (categoryStore.singleCategory) {
      form.setFieldsValue(categoryStore.singleCategory);
    }
  }, [categoryStore.singleCategory]);

  return (
    <Modal
      open={categoryStore.isOpenEditCategoryModal}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText="Tahrirlash"
      cancelText="Bekor qilish"
      centered
      confirmLoading={loading}
      title="Mijoz kategoriyasini tahrirlash"
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Kategoriya nomi"
          name="name"
          initialValue={0}
        >
          <Input
            placeholder="Kategoriya nomi"
            defaultValue={0}
            style={{ width: '100%' }}
            disabled
          />
        </Form.Item>
        <Form.Item
          label="Narx ustiga qo'yiladigan foiz"
          name="percent"
          initialValue={0}
        >
          <InputNumber
            placeholder="Narx ustiga qo'yiladigan foiz"
            defaultValue={0}
            style={{ width: '100%' }}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

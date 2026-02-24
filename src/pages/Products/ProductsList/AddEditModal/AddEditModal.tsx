import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { addNotification } from '@/utils';
import { productsListStore } from '@/stores/products';
import { priceFormat } from '@/utils/priceFormat';
import { productsApi } from '@/api/product/product';
import { IAddEditProduct, IProductUnit } from '@/api/product/types';
import { ProductUnitOptions } from '../constants';

type FormTypes = {
  id?: string;
  minAmount?: number;
  name: string;
  count: number;
  cost: number;
  unit: IProductUnit;
  priceDoctor: number;
  priceClient: number;
  priceFermer: number;
};

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { mutate: addNewProduct } =
    useMutation({
      mutationKey: ['addNewProduct'],
      mutationFn: (params: IAddEditProduct) => productsApi.addNewProduct(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getProducts'] });
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const { mutate: updateProduct } =
    useMutation({
      mutationKey: ['updateProduct'],
      mutationFn: (params: IAddEditProduct) => productsApi.updateProduct(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getProducts'] });
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (values: FormTypes) => {
    setLoading(true);

    const valueProducts: IAddEditProduct = {
      ...values,
      count: 0,
      price: values?.cost,
      prices: {
        doctor: values?.priceDoctor,
        farmer: values?.priceFermer,
        client: values?.priceClient,
      },
    };

    if (productsListStore?.singleProduct) {
      updateProduct({
        ...valueProducts,
        id: productsListStore?.singleProduct?.id!,
      });

      return;
    }
    addNewProduct(valueProducts);
  };

  const handleModalClose = () => {
    productsListStore.setSingleProduct(null);
    productsListStore.setIsOpenAddEditProductModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (productsListStore.singleProduct) {
      form.setFieldsValue({
        ...productsListStore.singleProduct,
        priceDoctor: productsListStore?.singleProduct?.prices?.doctor,
        priceFermer: productsListStore?.singleProduct?.prices?.farmer,
        priceClient: productsListStore?.singleProduct?.prices?.client,
      });
    }
  }, [productsListStore.singleProduct]);

  return (
    <Modal
      open={productsListStore.isOpenAddEditProductModal}
      title={productsListStore.singleProduct ? 'Mahsulotni tahrirlash' : 'Mahsulotni qo\'shish'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText={productsListStore.singleProduct ? 'Mahsulotni tahrirlash' : 'Mahsulotni qo\'shish'}
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
          label="Mahsulot nomi"
          rules={[{ required: true }]}
          name="name"
        >
          <Input placeholder="Mahsulot nomi" />
        </Form.Item>
        <Form.Item
          label="Mahsulot birligi"
          name="unit"
          rules={[{ required: true }]}
        >
          <Select
            options={ProductUnitOptions}
            placeholder="Mahsulot birligi"
          />
        </Form.Item>
        <Form.Item
          label="Ogohlantiruvchi qoldiq"
          name="minAmount"
          rules={[{ required: true }]}
        >
          <InputNumber
            placeholder="Ushbu sondan kam qolgan mahsulot haqida sizni ogohlantiramiz!"
            style={{ width: '100%' }}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="Sotib olingan narxi"
          rules={[{ required: true }]}
          name="cost"
        >
          <InputNumber
            placeholder="Sotib olingan narxi"
            style={{ width: '100%' }}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="Doctorga sotish narxi"
          rules={[{ required: true }]}
          name="priceDoctor"
        >
          <InputNumber
            placeholder="Sotish narxi"
            style={{ width: '100%' }}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="Fermerga sotish narxi"
          rules={[{ required: true }]}
          name="priceFermer"
        >
          <InputNumber
            placeholder="Sotish narxi"
            style={{ width: '100%' }}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
        <Form.Item
          label="Mijozga sotish narxi"
          rules={[{ required: true }]}
          name="priceClient"
        >
          <InputNumber
            placeholder="Sotish narxi"
            style={{ width: '100%' }}
            formatter={(value) => priceFormat(value!)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

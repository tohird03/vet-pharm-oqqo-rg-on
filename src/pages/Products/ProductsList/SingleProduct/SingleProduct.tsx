import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { productsListStore } from '@/stores/products';
import { DatePicker, DatePickerProps, Select, Table, Typography } from 'antd';
import { singleProductColumns } from './constants';
import classNames from 'classnames/bind';
import { styles } from './single-product.scss';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { staffsApi } from '@/api/staffs';

const cn = classNames.bind(styles);

export const SingleProduct = observer(() => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);

  const { data: sellerData, isLoading: loadingSeller } = useQuery({
    queryKey: ['getSellers'],
    queryFn: () =>
      staffsApi.getStaffs({
        pageNumber: 1,
        pageSize: 1000,
      }),
  });

  const handleChangeSeller = (value: string) => {
    if (value) {
      productsListStore.setSellerId(value);

      return;
    }

    productsListStore.setSellerId(null);
  };

  const handleStartDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      productsListStore.setStartDate(null);
    }
    productsListStore.setStartDate(new Date(dateString));
  };

  const handleEndDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      productsListStore.setEndDate(null);
    }
    productsListStore.setEndDate(new Date(dateString));
  };

  const sellerOptions = useMemo(() => (
    sellerData?.data?.data.map((sellerData) => ({
      value: sellerData?.id,
      label: `${sellerData?.fullname}`,
    }))
  ), [sellerData]);

  useEffect(() => {
    if (productId) {
      setLoading(true);

      productsListStore.getSingleProducts(productId);

      productsListStore.getSingleProductStory({
        productId,
        startDate: productsListStore?.startDate!,
        endDate: productsListStore?.endDate!,
        staffId: productsListStore?.sellerId!,
      })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [
    productId,
    productsListStore?.startDate,
    productsListStore?.endDate,
    productsListStore?.sellerId,
  ]);

  return (
    <div>
      <div className={cn('single-product__header')}>
        <div>
          <Typography.Title
            className={cn('single-product__name')}
            level={3}
          >
            {productsListStore?.singleProduct?.name}
          </Typography.Title>
          <Typography.Title
            className={cn('single-product__name')}
            level={4}
          >
            Qoldig&apos;i: {productsListStore?.singleProduct?.count}
          </Typography.Title>
        </div>

        <div className={cn('orders__filter')}>
          <Select
            options={sellerOptions}
            onChange={handleChangeSeller}
            className={cn('orders__search')}
            placeholder="Sotuvchilar"
            loading={loadingSeller}
            allowClear
          />
          <DatePicker
            className={cn('promotion__datePicker')}
            onChange={handleStartDateChange}
            placeholder={'Boshlanish sanasi'}
            defaultValue={dayjs(productsListStore.startDate)}
            allowClear={false}
          />
          <DatePicker
            className={cn('promotion__datePicker')}
            onChange={handleEndDateChange}
            placeholder={'Tugash sanasi'}
            defaultValue={dayjs(productsListStore.endDate)}
            allowClear={false}
          />
        </div>
      </div>

      <Table
        columns={singleProductColumns}
        dataSource={productsListStore?.singleProductStory?.products || []}
        bordered
        scroll={{ x: 500 }}
        summary={(pageData) => (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={1} index={0}>
                Jami
              </Table.Summary.Cell>
              <Table.Summary.Cell
                colSpan={4}
                index={1}
                className={cn('total__order')}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {productsListStore?.singleProductStory?.totalSellingCount}
                </div>
              </Table.Summary.Cell>
              <Table.Summary.Cell
                index={2}
                colSpan={4}
                className={cn('total__arrival')}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {productsListStore?.singleProductStory?.totalArrivalCount}
                </div>
              </Table.Summary.Cell>
              <Table.Summary.Cell
                index={3}
                colSpan={4}
                className={cn('total__returning')}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {productsListStore?.singleProductStory?.totalReturningCount}
                </div>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={1} index={0}>
                Umumiy qoldiq
              </Table.Summary.Cell>
              <Table.Summary.Cell
                colSpan={12}
                index={2}
                className={cn('total')}
              >
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {productsListStore?.singleProductStory?.actualCount}
                </div>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        )}
        pagination={false}
        loading={loading}
      />

    </div>
  );
});

import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Col, Collapse, DatePicker, DatePickerProps, Input, Row, Select, Table, Typography } from 'antd';
import styles from './styles.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import { staffsApi } from '@/api/staffs';
import { staffsWorkingTimeStore } from '@/stores/workers';
import dayjs from 'dayjs';
import { formatMs } from '@/utils/dateFormat';
const { Panel } = Collapse;

const cn = classNames.bind(styles);

export const StaffsWorkingTimeReport = observer(() => {

  const { data: staffsReportData, isLoading: staffsReportLoader } = useQuery({
    queryKey: ['get-staff-report',
      staffsWorkingTimeStore?.startDate,
      staffsWorkingTimeStore?.endDate,
      staffsWorkingTimeStore?.sellerId],
    queryFn: () =>
      staffsWorkingTimeStore.getStaffsReports({
        pageNumber: 1,
        pageSize: 1000,
        startDate: staffsWorkingTimeStore?.startDate!,
        endDate: staffsWorkingTimeStore?.endDate!,
        userId: staffsWorkingTimeStore?.sellerId!,
      }),
  });

  // ================== BUGUN ==================
  const today = useMemo(() => {
    const days = staffsReportData?.data?.days;

    return days ? days[days.length - 1] : null;
  }, [staffsReportData]);

  // ================== ACCORDION DATA ==================
  const accordionData = useMemo(() => {
    const report = staffsReportData?.data;

    if (!report || !today) return [];

    return report.rows.map((row) => ({
      key: row.userId,
      fullname: row.fullname,
      today,
      todayMs: row.byDay?.[today] ?? 0,
      byDay: row.byDay,
      days: report.days,
    }));
  }, [staffsReportData, today]);

  // ================== START DATE FILTER ==================
  const filterDaysFromStart = (days: string[]) => {
    if (!staffsWorkingTimeStore.startDate) return days;

    const start = dayjs(staffsWorkingTimeStore.startDate).format('YYYY-MM-DD');

    return days.filter((d) => d >= start);
  };

  // ================== INNER TABLE ==================
  const innerColumns = [
    {
      title: 'Sana',
      dataIndex: 'date',
    },
    {
      title: 'Faollik vaqti',
      dataIndex: 'activityMs',
      className: 'staffs-report__time',
      render: (ms: number) => formatMs(ms),
    },
  ];

  const { data: sellerData, isLoading: loadingSeller } = useQuery({
    queryKey: ['getSellers'],
    queryFn: () =>
      staffsApi.getStaffs({
        pageNumber: 1,
        pageSize: 1000,
      }),
  });

  const handleStartDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      staffsWorkingTimeStore.setStartDate(null);
    }
    staffsWorkingTimeStore.setStartDate(new Date(dateString));
  };

  const handleEndDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!dateString) {
      staffsWorkingTimeStore.setEndDate(null);
    }
    staffsWorkingTimeStore.setEndDate(new Date(dateString));
  };

  const sellerOptions = useMemo(() => (
    sellerData?.data?.data.map((sellerData) => ({
      value: sellerData?.id,
      label: `${sellerData?.fullname}`,
    }))
  ), [sellerData]);

  return (
    <main>
      <div className={cn('time-report__head')}>
        <Typography.Title level={3}>Xodimlarning faollik hisoboti</Typography.Title>
        <div className={cn('time-report__filter')}>
          <DatePicker
            className={cn('promotion__datePicker')}
            onChange={handleStartDateChange}
            placeholder={'Boshlanish sanasi'}
            defaultValue={dayjs(staffsWorkingTimeStore.startDate)}
            allowClear={false}
          />
          <DatePicker
            className={cn('promotion__datePicker')}
            onChange={handleEndDateChange}
            placeholder={'Tugash sanasi'}
            defaultValue={dayjs(staffsWorkingTimeStore.endDate)}
            allowClear={false}
          />
        </div>
      </div>

      {/* ACCORDION */}
      <Collapse className={cn('staffs-report__accardion')} accordion>
        {accordionData.map((item) => (
          <Panel
            key={item.key}
            header={
              <Row style={{ width: '100%' }}>
                <Col span={8}>
                  <Typography.Text strong>
                    {item.fullname}
                  </Typography.Text>
                </Col>
                <Col span={8} style={{ textAlign: 'start' }}>
                  {formatMs(item.todayMs)}
                </Col>
                <Col span={8} style={{ textAlign: 'start' }}>
                  {item.today}
                </Col>
              </Row>
            }
          >
            <Table
              size="small"
              pagination={false}
              columns={innerColumns}
              dataSource={filterDaysFromStart(item.days).map((day) => ({
                index: day?.indexOf,
                key: day,
                date: day,
                activityMs: item.byDay?.[day] ?? 0,
              }))}
              summary={(pageData) => {
                const totalMs = pageData.reduce(
                  (sum, row) => sum + (row.activityMs || 0),
                  0
                );

                const totalDays = pageData.length;

                return (
                  <Table.Summary>
                    <Table.Summary.Row style={{backgroundColor: '#BEE6FF', fontWeight: 'bold'}}>
                      <Table.Summary.Cell index={1}>
                        <b>Jami: {totalDays} kun</b>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}>
                        <b>
                          {formatMs(totalMs)}
                        </b>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </Panel>
        ))}
      </Collapse>
    </main>
  );
});

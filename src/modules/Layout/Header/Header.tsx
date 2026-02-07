import './header.scss';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout as AntdLayout, MenuProps, Typography } from 'antd';
import { ROUTES } from '@/constants';
import { useStores } from '@/stores';
import { LogOut } from '../LogOut/LogOut';
import { CloseDay } from '../CloseDay';
import { WorkTimeStartStopModal } from '../WorkTimeStartStopModal';

type Props = {
  collapsed: boolean;
  onCollapsedClick: () => void;
  isMobile?: boolean;
};

export const Header = observer(({ collapsed, onCollapsedClick, isMobile }: Props) => {
  const { authStore } = useStores();
  const activity = authStore.staffInfo?.activity;

  const [seconds, setSeconds] = useState(0);
  const baseSecondsRef = useRef(0);
  const startClientSecRef = useRef<number | null>(null);

  const handleStartOrStopWorkTime = () => {
    authStore?.setIsOpenStartStopTimeModal(true);
  };

  const items: MenuProps['items'] = [
    ...(isMobile
      ? [{
        key: '2',
        label: (
          <>
            <Typography.Title level={5} style={{ margin: '0' }}>
              {authStore.staffInfo?.fullname}
            </Typography.Title>
            <Typography.Title level={5} style={{ margin: '0' }}>
              +{authStore.staffInfo?.phone}
            </Typography.Title>
          </>
        ),
      }] : []),
    {
      key: '1',
      label: <LogOut />,
    },
    {
      key: '2',
      label: <CloseDay />,
    },
  ];

  /* ===============================
  PROFILE / ACTIVITY O'ZGARGANDA
=============================== */
  useEffect(() => {
    if (!activity) return;

    setSeconds(activity.today.totalSeconds);
    baseSecondsRef.current = activity.today.totalSeconds;

    if (activity.isActive) {
      startClientSecRef.current = Math.floor(Date.now() / 1000);
    } else {
      startClientSecRef.current = null;
    }
  }, [activity?.isActive, activity?.today.totalSeconds]);

  /* ===============================
   TIMER ISHLASHI
  =============================== */
  useEffect(() => {
    const nowTime = new Date().getHours();

    if (nowTime < 8 || nowTime >= 18) return;
    if (!activity?.isActive || !startClientSecRef.current) return;

    const interval = setInterval(() => {
      const nowSec = Math.floor(Date.now() / 1000);

      setSeconds(
        baseSecondsRef.current + (nowSec - startClientSecRef.current!)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [activity?.isActive]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return `${h} soat ${m} daqiqa ${s} soniya`;
  };

  return (
    <AntdLayout.Header className={`header header__isclose-${authStore?.isCloseDay}`}>
      <div className="header__left">
        <Button type="text" onClick={onCollapsedClick}>
          {collapsed
            ? <MenuUnfoldOutlined className="header__icon" />
            : <MenuFoldOutlined className="header__icon" />}
        </Button>
        {!isMobile && authStore.isCloseDay && <span className="layout__logo-text">Vet Pharm</span>}
        {isMobile &&
          <span className="layout__logo-text">
            {authStore.isCloseDay ? 'Kun yopilgan' : 'Vet pharm'}
          </span>
        }

        <div className="header__profile">
          {!isMobile && (
            <>
              <Typography.Text style={{ color: 'white', fontSize: 16 }}>
                {formatTime(seconds)}
              </Typography.Text>
              <Button
                type="primary"
                style={
                  {
                    backgroundColor: authStore?.staffInfo?.activity?.isActive ? '#FFA500' : '#16a34a',
                    borderColor: authStore?.staffInfo?.activity?.isActive ? '#FFA500' : '#16a34a',
                  }
                }
                onClick={handleStartOrStopWorkTime}
              >
                {
                  authStore?.staffInfo?.activity?.isActive
                    ? 'Ishni to\'xtatish'
                    : 'Ishni boshlash'
                }
              </Button>
              <Typography.Title level={5} style={{ color: 'white', margin: '0' }}>
                {authStore.staffInfo?.fullname}
              </Typography.Title>
              <Typography.Title level={5} style={{ color: 'white', margin: '0' }}>
                +{authStore.staffInfo?.phone}
              </Typography.Title>
            </>
          )}
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar style={{ backgroundColor: '#1677FF' }} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
      {authStore?.isOpenStartStopTimeModal && <WorkTimeStartStopModal />}
    </AntdLayout.Header>
  );
});

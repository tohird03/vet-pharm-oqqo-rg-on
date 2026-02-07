import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Modal } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api';
import { addNotification } from '@/utils';
import { useStores } from '@/stores';

export const WorkTimeStartStopModal: React.FC = observer(() => {
  const { authStore } = useStores();

  const { mutate: workTimeStartStop } =
    useMutation({
      mutationKey: ['workTimeStartStop'],
      mutationFn: () => authApi.setActivitySession(),
      onSuccess: () => {
        authStore.getProfile();
        handleCancel();
      },
      onError: addNotification,
    });

  const handleOk = () => {
    workTimeStartStop();
  };

  const handleCancel = () => {
    authStore?.setIsOpenStartStopTimeModal(false);
  };

  return (
    <Modal
      title={
        authStore?.staffInfo?.activity?.isActive
          ? 'Ishni to\'xtatish'
          : 'Ishni boshlash'
      }
      open={authStore?.isOpenStartStopTimeModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={
        authStore?.staffInfo?.activity?.isActive
          ? 'Ishni to\'xtatish'
          : 'Ishni boshlash'
      }
      okButtonProps={{ style: { backgroundColor: 'red' } }}
      cancelText="Bekor qilish"
    />
  );
});

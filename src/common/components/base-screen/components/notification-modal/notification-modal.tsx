import { type ReactElement } from 'react';
import {
  CloseButton,
  ModalContainer,
  ModalContent,
  NotificationDate,
  NotificationHeader,
  NotificationItem,
  NotificationList,
  NotificationText,
} from './notification-modal.styles';

export const NotificationModal = ({
  onClose,
  isModalOpen,
  notifications,
}: {
  onClose: () => void;
  isModalOpen: boolean;
  notifications: Array<{
    residentName: string;
    medicineName: string;
    dosage: string;
    time: string;
    endDate: string;
    wasRead: boolean;
  }>;
}): ReactElement => {
  const incrementDate = (date: string): string => {
    const [day, month, year] = date.split('/');
    const newDate = new Date(`${month}/${day}/${year}`);
    newDate.setDate(newDate.getDate() + 1);
    return newDate.toLocaleDateString();
  };

  return (
    <ModalContainer isOpen={isModalOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Notificações</h2>
        <NotificationList>
          {notifications?.length === 0 ? (
            <NotificationItem read={true}>Nenhuma notificação</NotificationItem>
          ) : (
            notifications?.map((notification, index) => (
              <NotificationItem key={index} read={notification.wasRead}>
                <NotificationHeader>
                  {notification.residentName}
                </NotificationHeader>
                <NotificationText>
                  Medicação: {notification.medicineName} ({notification.dosage})
                </NotificationText>
                <NotificationText>
                  Horário: {notification.time}
                </NotificationText>
                <NotificationDate>
                  Data final: {incrementDate(notification.endDate)}
                </NotificationDate>
              </NotificationItem>
            ))
          )}
        </NotificationList>
      </ModalContent>
    </ModalContainer>
  );
};

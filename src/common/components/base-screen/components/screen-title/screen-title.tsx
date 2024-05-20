import { type ReactElement, useState, useEffect, useContext } from 'react';
import {
  Container,
  ScreenTitleText,
  UserName,
  UserSection,
  BellIconContainer,
} from './screen-title.styles';
import { FaBell } from 'react-icons/fa';
import { NotificationModal } from '../notification-modal/notification-modal';
import { NotificationServiceObjection } from '../../services/objecion/notification-service-objection';
import { ApplicationContext } from '../../../../../application-context';

const THIRTY_MINUTES = 1800000;

export const ScreenTitle = ({
  screenTitle,
}: {
  screenTitle: string;
}): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const { httpClient } = useContext(ApplicationContext);
  const [notifications, setNotifications] = useState<
    Array<{
      residentName: string;
      medicineName: string;
      dosage: string;
      time: string;
      endDate: string;
      wasRead: boolean;
    }>
  >([]);

  const fetchNotifications = async (): Promise<void> => {
    const notifications =
      await new NotificationServiceObjection().getNotification(httpClient);
    setNotifications(notifications);
    setHasNewNotifications(
      notifications.some((notification) => !notification.wasRead),
    );
  };

  const markAsRead = async (): Promise<void> => {
    if (!hasNewNotifications) return;
    await new NotificationServiceObjection().markNotificationsAsRead(
      httpClient,
    );
    setHasNewNotifications(false);
  };

  useEffect(() => {
    void fetchNotifications();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const intervalId = setInterval(fetchNotifications, THIRTY_MINUTES);

    return () => {
      clearInterval(intervalId);
    };
  }, [httpClient]);

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    void markAsRead();
    void fetchNotifications();
  };

  return (
    <Container>
      <ScreenTitleText>{screenTitle}</ScreenTitleText>
      <UserSection>
        <UserName>Olá, {localStorage.getItem('name')?.split(' ')[0]}</UserName>
        <BellIconContainer onClick={handleOpenModal}>
          <FaBell />
          {hasNewNotifications && <span />}
        </BellIconContainer>
      </UserSection>
      {isModalOpen && (
        <NotificationModal
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
          notifications={notifications}
        />
      )}
    </Container>
  );
};

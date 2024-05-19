import { type HttpClient } from '../../../../http-client/http-client';

export interface NotificationService {
  getNotification: (httpClient: HttpClient) => Promise<
    Array<{
      residentName: string;
      medicineName: string;
      dosage: string;
      time: string;
      endDate: string;
      wasRead: boolean;
    }>
  >;

  markNotificationsAsRead: (httpClient: HttpClient) => Promise<void>;
}

import { type HttpClient } from '../../../../http-client/http-client';
import { type NotificationService } from '../interfaces/notification-service';
import { NotificationArrayResponse } from '../response/notification-array-response';

export class NotificationServiceObjection implements NotificationService {
  public async getNotification(httpClient: HttpClient): Promise<
    Array<{
      residentName: string;
      medicineName: string;
      dosage: string;
      time: string;
      endDate: string;
      wasRead: boolean;
    }>
  > {
    const response = await httpClient.request({
      path: '/notifications',
      method: 'get',
    });

    return response?.getData(NotificationArrayResponse).toDomain() ?? [];
  }

  public async markNotificationsAsRead(httpClient: HttpClient): Promise<void> {
    await httpClient.request({
      path: '/notifications/markAsRead',
      method: 'put',
    });
  }
}

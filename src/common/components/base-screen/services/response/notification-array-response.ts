import { NotificationResponse } from './notification-response';

export class NotificationArrayResponse {
  public constructor(public notifications: NotificationResponse[]) {}

  public toDomain(): Array<{
    residentName: string;
    medicineName: string;
    dosage: string;
    time: string;
    endDate: string;
    wasRead: boolean;
  }> {
    return this.notifications?.map((notification) =>
      new NotificationResponse(
        notification.residentName,
        notification.medicineName,
        notification.dosage,
        notification.time,
        notification.endDate,
        notification.employeeId,
        notification.wasRead,
      ).toDomain(),
    );
  }
}

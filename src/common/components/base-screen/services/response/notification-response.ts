import moment from 'moment';

export class NotificationResponse {
  public constructor(
    public residentName: string,
    public medicineName: string,
    public dosage: string,
    public time: string,
    public endDate: Date,
    public employeeId: number,
    public wasRead: boolean,
  ) {}

  public toDomain(): {
    residentName: string;
    medicineName: string;
    dosage: string;
    time: string;
    endDate: string;
    wasRead: boolean;
  } {
    return {
      residentName: this.residentName,
      medicineName: this.medicineName,
      dosage: this.dosage,
      time: this.time,
      endDate: moment(this.endDate).format('DD/MM/YYYY'),
      wasRead: this.wasRead,
    };
  }
}

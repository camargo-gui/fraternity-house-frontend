import { toast } from 'react-toastify';
import { type medicationSheetService } from '../interfaces/medication-sheet-service';
import { noop } from 'lodash';
import { type HttpClient } from '../../../common/http-client/http-client';
import { type MedicationSheet } from '../../entities/medication-sheet';

export class ObjectionMedicationSheetService implements medicationSheetService {
  private readonly apiUrl = '/medication-sheet';

  public async createMedicationSheet(
    httpClient: HttpClient,
    medicationSheet: MedicationSheet,
  ): Promise<void> {
    const medicationSheetDTO = {
      residentId: medicationSheet.residentId,
      observations: medicationSheet.observations,
    };

    try {
      await httpClient.request({
        path: this.apiUrl,
        method: 'post',
        data: {
          ...medicationSheetDTO,
          prescriptions: medicationSheet.prescriptions,
        },
      });
      toast.success('Ficha de medicação cadastrada com sucesso');
    } catch (e) {
      noop();
    }
  }
}

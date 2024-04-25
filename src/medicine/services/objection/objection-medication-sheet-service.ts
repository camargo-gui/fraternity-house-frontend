import { noop } from 'lodash';
import { toast } from 'react-toastify';
import { type HttpClient } from '../../../common/http-client/http-client';
import { type MedicationSheet } from '../../entities/medication-sheet';
import { MedicationSheetsResponse } from '../../entities/medication-sheets-response';
import { type MedicationSheetService } from '../interfaces/medication-sheet-service';

export class ObjectionMedicationSheetService implements MedicationSheetService {
  private readonly apiUrl = '/medication-sheet';

  private readonly apiPrescriptionUrl = '/prescription';

  public async createMedicationSheet(
    httpClient: HttpClient,
    medicationSheet: MedicationSheet,
  ): Promise<void> {
    const medicationSheetDTO = {
      residentId: medicationSheet.residentId,
      observations: medicationSheet.observations,
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await httpClient.request({
        path: this.apiUrl,
        method: 'post',
        data: {
          ...medicationSheetDTO,
          prescriptions: medicationSheet.prescriptions,
        },
      });

      toast.success(
        response.data.medicationSheet.medicationWasCreated === false
          ? 'Prescrições adicionadas a ficha já existe'
          : 'Ficha de medicação cadastrada com sucesso',
      );
    } catch (e) {
      noop();
    }
  }

  public async getAllPrescriptions(
    httpClient: HttpClient,
  ): Promise<MedicationSheetsResponse | undefined> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl,
        method: 'get',
      });

      return response?.getData(MedicationSheetsResponse);
    } catch (e) {
      return undefined;
    }
  }

  public async deletePrescription(
    httpClient: HttpClient,
    prescriptionId: number,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: `${this.apiPrescriptionUrl}/${prescriptionId}`,
        method: 'delete',
      });
      toast.success('Prescrição excluída com sucesso');
    } catch (e) {
      noop();
    }
  }

  public async updatePrescription(
    httpClient: HttpClient,
    prescription: {
      id: number;
      firstTime: string;
      dosage: string;
      frequency: string;
      startDate: string;
      endDate: string;
    },
  ): Promise<void> {
    try {
      await httpClient.request({
        path: `${this.apiPrescriptionUrl}`,
        method: 'put',
        data: prescription,
      });
      toast.success('Prescrição atualizada com sucesso');
    } catch (e) {
      toast.error('Falha ao atualizar prescrição');
      noop();
    }
  }
}

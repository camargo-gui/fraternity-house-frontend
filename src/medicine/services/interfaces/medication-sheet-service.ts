import { type HttpClient } from '../../../common/http-client/http-client';
import { type MedicationSheet } from '../../entities/medication-sheet';
import { type MedicationSheetsResponse } from '../../entities/medication-sheets-response';

export interface MedicationSheetService {
  createMedicationSheet: (
    httpClient: HttpClient,
    medicationSheet: MedicationSheet,
  ) => Promise<void>;
  updateMedicationSheet: (
    httpClient: HttpClient,
    medicationSheet: {
      id: number;
      observations: string;
      responsibleId: number;
    },
  ) => Promise<void>;
  getAllPrescriptions: (
    httpClient: HttpClient,
  ) => Promise<MedicationSheetsResponse | undefined>;
  deletePrescription: (
    httpClient: HttpClient,
    prescriptionId: number,
  ) => Promise<void>;
  updatePrescription: (
    httpClient: HttpClient,
    prescription: {
      id: number;
      firstTime: string;
      dosage: string;
      frequency: string;
      startDate: string;
      endDate: string;
    },
  ) => Promise<void>;
}

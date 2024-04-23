import { type HttpClient } from '../../../common/http-client/http-client';
import { type MedicationSheet } from '../../entities/medication-sheet';

export interface medicationSheetService {
  createMedicationSheet: (
    httpClient: HttpClient,
    medicationSheet: MedicationSheet,
  ) => Promise<void>;
}

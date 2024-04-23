import { type MedicationSheetBody } from './medication-sheet-body';

export class MedicationSheetsResponse {
  public constructor(public medicationSheets: MedicationSheetBody[]) {}
}

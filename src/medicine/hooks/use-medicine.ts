import { noop } from 'lodash';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationContext } from '../../application-context';
import { setLoading } from '../../redux/slices/loadingSlice';
import type { AppDispatch } from '../../redux/store/store';
import { type Medicine } from '../entities/medicine';
import type { PharmacologicalName } from '../entities/pharmacological-name';
import { ObjectionMedicineService } from '../services/objection/objection-medicine-service';
import { ObjectionPharmacologicalNameService } from '../services/objection/objection-pharmacological-name-service';
import { type PharmacologicalForm } from '../entities/pharmacological-form';
import { ObjectionPharmacologicalFormService } from '../services/objection/objection-pharmacological-form-service';
import { type MedicationSheetBody } from '../entities/medication-sheet-body';
import { ObjectionMedicationSheetService } from '../services/objection/objection-medication-sheet-service';

export const useMedicines = (): {
  medicines: Medicine[];
  pharmacologicalNames: PharmacologicalName[];
  pharmacologicalForms: PharmacologicalForm[];
  medicationSheets: MedicationSheetBody[];
  refetch: () => Promise<void>;
} => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [pharmacologicalNames, setPharmacologicalNames] = useState<
    PharmacologicalName[]
  >([]);
  const [pharmacologicalForms, setPharmacologicalForms] = useState<
    PharmacologicalForm[]
  >([]);
  const [medicationSheets, setMedicineSheets] = useState<MedicationSheetBody[]>(
    [],
  );

  const { httpClient } = useContext(ApplicationContext);
  const dispatch: AppDispatch = useDispatch();

  const fetchMedicines = useCallback(async () => {
    const meds = await new ObjectionMedicineService().getMedicines(httpClient);
    if (meds !== undefined) setMedicines(meds);
  }, [httpClient]);

  const fetchPharmacologicalNames = useCallback(async () => {
    const names =
      await new ObjectionPharmacologicalNameService().getPharmacologicalNames(
        httpClient,
      );

    if (names !== undefined) setPharmacologicalNames(names);
  }, [httpClient]);

  const fetchPharmacologicalForms = useCallback(async () => {
    const names =
      await new ObjectionPharmacologicalFormService().getPharmacologicalForms(
        httpClient,
      );

    console.log(names);

    if (names !== undefined) setPharmacologicalForms(names);
  }, [httpClient]);

  const fetchPrescriptions = useCallback(async () => {
    const medicationPrescriptions =
      await new ObjectionMedicationSheetService().getAllPrescriptions(
        httpClient,
      );

    if (medicationPrescriptions !== undefined)
      setMedicineSheets(medicationPrescriptions.medicationSheets);
  }, [httpClient]);

  async function getAllMedicinesInformation(): Promise<void> {
    dispatch(setLoading(true));
    await Promise.all([
      fetchMedicines().catch(noop),
      fetchPharmacologicalForms().catch(noop),
      fetchPrescriptions().catch(noop),
      fetchPharmacologicalNames().catch(noop),
    ]).finally(() => dispatch(setLoading(false)));
  }

  useEffect(() => {
    void getAllMedicinesInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    medicines,
    pharmacologicalNames,
    pharmacologicalForms,
    medicationSheets,
    refetch: getAllMedicinesInformation,
  };
};

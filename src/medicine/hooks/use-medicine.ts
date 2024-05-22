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
import { ObjectionEmployeeService } from '../../employee/services/objection/objection-employee-service';
import { type Employee } from '../../employee/entities/employee';

export const useMedicines = (): {
  medicines: Medicine[];
  pharmacologicalNames: PharmacologicalName[];
  pharmacologicalForms: PharmacologicalForm[];
  medicationSheets: MedicationSheetBody[];
  employees: Employee[];
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
  const [employees, setEmployees] = useState<Employee[]>([]);

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

  const fetchEmployees = useCallback(async () => {
    const response = await new ObjectionEmployeeService().getEmployees(
      httpClient,
    );

    if (response !== undefined) {
      setEmployees(response);
    }
  }, [httpClient]);

  async function getAllMedicinesInformation(): Promise<void> {
    dispatch(setLoading(true));

    await Promise.all([
      fetchMedicines().catch(noop),
      fetchPharmacologicalForms().catch(noop),
      fetchPrescriptions().catch(noop),
      fetchPharmacologicalNames().catch(noop),
      fetchEmployees().catch(noop),
    ]);

    dispatch(setLoading(false));
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
    employees,
    refetch: getAllMedicinesInformation,
  };
};

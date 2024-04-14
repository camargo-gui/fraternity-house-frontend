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

export const useMedicines = (): {
  medicines: Medicine[];
  pharmacologicalNames: PharmacologicalName[];
  pharmacologicalForms: PharmacologicalForm[];
  refetch: () => Promise<void>;
} => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [pharmacologicalNames, setPharmacologicalNames] = useState<
    PharmacologicalName[]
  >([]);
  const [pharmacologicalForms, setPharmacologicalForms] = useState<
    PharmacologicalForm[]
  >([]);

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

    console.log(names);

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

  async function getAllMedicinesInformation(): Promise<void> {
    dispatch(setLoading(true));
    void fetchMedicines().catch(noop);
    void fetchPharmacologicalForms().catch(noop);
    void fetchPharmacologicalNames()
      .catch(noop)
      .finally(() => dispatch(setLoading(false)));
  }

  useEffect(() => {
    void getAllMedicinesInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    medicines,
    pharmacologicalNames,
    pharmacologicalForms,
    refetch: getAllMedicinesInformation,
  };
};

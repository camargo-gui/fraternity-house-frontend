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

export const useMedicines = (): {
  medicines: Medicine[];
  pharmacologicalNames: PharmacologicalName[];
  refetch: () => Promise<void>;
} => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [pharmacologicalNames, setPharmacologicalNames] = useState<
    PharmacologicalName[]
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

  async function getAllMedicinesInformation(): Promise<void> {
    dispatch(setLoading(true));
    void fetchMedicines().catch(noop);
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
    refetch: getAllMedicinesInformation,
  };
};

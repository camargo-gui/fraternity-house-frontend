import { useCallback, useEffect, useState } from 'react';
import { type Medicine } from '../entities/medicine';
import type { PharmacologicalName } from '../entities/pharmacological-name';
import { ObjectionMedicineService } from '../services/objection/objection-medicine-service';
import { ObjectionPharmacologicalNameService } from '../services/objection/objection-pharmacological-name-service';

export const useMedicines = (): {
  medicines: Medicine[];
  pharmacologicalNames: PharmacologicalName[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [pharmacologicalNames, setPharmacologicalNames] = useState<
    PharmacologicalName[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMedicines = useCallback(async () => {
    const medicineService = new ObjectionMedicineService();
    const pharmacologicalNameservice =
      new ObjectionPharmacologicalNameService();
    setLoading(true);
    try {
      const meds = await medicineService.getMedicines();
      setMedicines(meds);
      const pharmaNames =
        await pharmacologicalNameservice.getPharmacologicalNames();
      setPharmacologicalNames(pharmaNames);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMedicines();
  }, [fetchMedicines]);

  return {
    medicines,
    pharmacologicalNames,
    loading,
    error,
    refetch: fetchMedicines,
  };
};

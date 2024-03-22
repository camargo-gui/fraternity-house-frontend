import { ObjectionResidentService } from '../services/objection/objection-resident-service';
import { type ResidentDTO } from './../dto/resident-dto';
import { useState, useEffect, useCallback } from 'react'; // Import the missing 'useCallback' function
export const useResident = (): {
  residents: ResidentDTO[];
  refetch: () => Promise<void>;
} => {
  const [residents, setResidents] = useState<ResidentDTO[]>([]);

  const fetchResidents = useCallback(async (): Promise<void> => {
    const service = new ObjectionResidentService();
    const residents = await service.getAllResidents();
    setResidents(residents);
  }, []);

  useEffect(() => {
    void fetchResidents();
  }, [fetchResidents]);

  return {
    residents,
    refetch: fetchResidents,
  };
};

import { type HttpClient } from '../../common/http-client/http-client';
import { ObjectionResidentService } from '../services/objection/objection-resident-service';
import { type Resident } from '../entities/resident';
import { useState, useEffect, useCallback } from 'react';

interface Props {
  httpClient: HttpClient;
}

export const useResident = ({
  httpClient,
}: Props): {
  residents: Resident[] | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
} => {
  const [residents, setResidents] = useState<Resident[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchResidents = useCallback(async (): Promise<void> => {
    const service = new ObjectionResidentService();
    setIsLoading(true);
    const residents = await service.getAllResidents(httpClient);
    setIsLoading(false);
    setResidents(residents);
  }, [httpClient]);

  useEffect(() => {
    void fetchResidents();
  }, [fetchResidents]);

  return {
    residents,
    isLoading,
    refetch: fetchResidents,
  };
};

import { type HttpClient } from '../../common/http-client/http-client';
import { ObjectionResidentService } from '../services/objection/objection-resident-service';
import { type ResidentDTO } from './../dto/resident-dto';
import { useState, useEffect, useCallback } from 'react';

interface Props {
  httpClient: HttpClient;
}

export const useResident = ({
  httpClient,
}: Props): {
  residents: ResidentDTO[] | undefined;
  refetch: () => Promise<void>;
} => {
  const [residents, setResidents] = useState<ResidentDTO[] | undefined>([]);

  const fetchResidents = useCallback(async (): Promise<void> => {
    const service = new ObjectionResidentService();
    const residents = await service.getAllResidents(httpClient);
    setResidents(residents);
  }, [httpClient]);

  useEffect(() => {
    void fetchResidents();
  }, [fetchResidents]);

  return {
    residents,
    refetch: fetchResidents,
  };
};

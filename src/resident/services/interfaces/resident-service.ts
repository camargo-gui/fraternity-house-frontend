import { type HttpClient } from '../../../common/http-client/http-client';
import { type Resident } from '../../entities/resident';

export interface ResidentService {
  getAllResidents: (httpCliente: HttpClient) => Promise<Resident[] | undefined>;
  getResidents: (
    httpClient: HttpClient,
    cpf: string,
  ) => Promise<Resident | undefined>;
  postResident: (
    httpCliente: HttpClient,
    resident: Resident,
    imageFile: File | null,
  ) => Promise<void>;
  updateResident: (
    httpClient: HttpClient,
    resident: Resident,
    imageFile: File | null,
  ) => Promise<void>;
  deleteResident: (httpClient: HttpClient, cpf: string) => Promise<void>;
  undeleteResident: (httpClient: HttpClient, cpf: string) => Promise<void>;
}

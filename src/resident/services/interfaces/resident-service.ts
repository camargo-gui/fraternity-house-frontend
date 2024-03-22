import { type HttpClient } from '../../../common/http-client/http-client';
import { type ResidentDTO } from '../../dto/resident-dto';

export interface ResidentService {
  getAllResidents: (
    httpCliente: HttpClient,
  ) => Promise<ResidentDTO[] | undefined>;
  getResidents: (
    httpClient: HttpClient,
    cpf: string,
  ) => Promise<ResidentDTO | undefined>;
  postResident: (
    httpCliente: HttpClient,
    resident: ResidentDTO,
  ) => Promise<boolean>;
  updateResident: (
    httpClient: HttpClient,
    resident: ResidentDTO,
  ) => Promise<boolean>;
  deleteResident: (httpClient: HttpClient, cpf: string) => Promise<boolean>;
}

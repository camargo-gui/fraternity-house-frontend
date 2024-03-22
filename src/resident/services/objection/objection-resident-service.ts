import { type ResidentDTO } from './../../dto/resident-dto';
import { type HttpClient } from './../../../common/http-client/http-client';
import { type ResidentService } from '../interfaces/resident-service';

export class ObjectionResidentService implements ResidentService {
  private readonly url = 'http://localhost:3344/resident';

  public async getAllResidents(
    httpClient: HttpClient,
  ): Promise<ResidentDTO[] | undefined> {
    return await httpClient.get<ResidentDTO[]>(this.url);
  }

  public async getResidents(
    httpClient: HttpClient,
    cpf: string,
  ): Promise<ResidentDTO | undefined> {
    const response = await httpClient.get<ResidentDTO>(`${this.url}/${cpf}`);
    return response;
  }

  public async postResident(
    httpClient: HttpClient,
    resident: ResidentDTO,
  ): Promise<boolean> {
    const response = await httpClient.post(this.url, resident);
    return response;
  }

  public async updateResident(
    httpClient: HttpClient,
    resident: ResidentDTO,
  ): Promise<boolean> {
    return await httpClient.put(this.url, resident);
  }

  public async deleteResident(
    httpClient: HttpClient,
    cpf: string,
  ): Promise<boolean> {
    return await httpClient.delete(`${this.url}/${cpf}`);
  }
}

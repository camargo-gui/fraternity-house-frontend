import { ResidentDTO } from './../../dto/resident-dto';
import { type HttpClient } from './../../../common/http-client/http-client';
import { type ResidentService } from '../interfaces/resident-service';
import { ResidentResponse } from '../response/resident-response';
import { noop } from 'lodash';
import { toast } from 'react-toastify';

export class ObjectionResidentService implements ResidentService {
  private readonly url = '/resident';

  public async getAllResidents(
    httpClient: HttpClient,
  ): Promise<ResidentDTO[] | undefined> {
    try {
      const response = await httpClient.request({
        path: this.url,
        method: 'get',
      });
      return response?.getData(ResidentResponse).residents ?? [];
    } catch (e) {
      return [];
    }
  }

  public async getResidents(
    httpClient: HttpClient,
    cpf: string,
  ): Promise<ResidentDTO | undefined> {
    try {
      const response = await httpClient.request({
        path: `${this.url}/${cpf}`,
        method: 'get',
      });
      return response?.getData<ResidentDTO>(ResidentDTO);
    } catch (e) {
      return undefined;
    }
  }

  public async postResident(
    httpClient: HttpClient,
    resident: ResidentDTO,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: this.url,
        method: 'post',
        data: resident,
      });

      toast.success('Residente cadastrado com sucesso');
    } catch (e) {
      noop();
    }
  }

  public async updateResident(
    httpClient: HttpClient,
    resident: ResidentDTO,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: this.url,
        method: 'put',
        data: resident,
      });
      toast.success('Residente atualizado com sucesso');
    } catch (e) {
      noop();
    }
  }

  public async deleteResident(
    httpClient: HttpClient,
    cpf: string,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: this.url,
        method: 'delete',
        data: { cpf },
      });
      toast.success('Residente deletado com sucesso');
    } catch (e) {
      noop();
    }
  }
}

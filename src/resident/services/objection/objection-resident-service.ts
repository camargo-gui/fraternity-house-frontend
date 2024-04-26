import { noop } from 'lodash';
import { toast } from 'react-toastify';
import { type ResidentService } from '../interfaces/resident-service';
import { ResidentResponse } from '../response/resident-response';
import { type HttpClient } from './../../../common/http-client/http-client';
import { ResidentDTO } from './../../dto/resident-dto';
import { formatSpecialCharacters } from '../../../utils/format-special-characters';

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
    formData: ResidentDTO,
    imageFile: File | null,
  ): Promise<void> {
    try {
      console.log('formData', formData);
      await httpClient.request({
        path: this.url,
        method: 'post',
        data: {
          name: formData.name,
          cpf: formatSpecialCharacters(formData.cpf),
          rg: formData.rg,
          contact_phone: formatSpecialCharacters(formData.contact_phone),
          birthday: formData.birthday,
          image: imageFile,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
        data: {
          ...resident,
          cpf: formatSpecialCharacters(resident.cpf),
        },
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

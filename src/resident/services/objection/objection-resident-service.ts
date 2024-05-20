import { noop } from 'lodash';
import { toast } from 'react-toastify';
import { type ResidentService } from '../interfaces/resident-service';
import { ResidentResponse } from '../response/resident-response';
import { type HttpClient } from './../../../common/http-client/http-client';
import { Resident } from '../../entities/resident';
import { formatSpecialCharacters } from '../../../utils/format-special-characters';

export class ObjectionResidentService implements ResidentService {
  private readonly url = '/resident';

  public async getAllResidents(
    httpClient: HttpClient,
  ): Promise<Resident[] | undefined> {
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
  ): Promise<Resident | undefined> {
    try {
      const response = await httpClient.request({
        path: `${this.url}/${cpf}`,
        method: 'get',
      });
      return response?.getData<Resident>(Resident);
    } catch (e) {
      return undefined;
    }
  }

  public async postResident(
    httpClient: HttpClient,
    formData: Resident,
    imageFile: File | null,
  ): Promise<void> {
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
  }

  public async updateResident(
    httpClient: HttpClient,
    resident: Resident,
    imageFile: File | null,
  ): Promise<void> {
    try {
      console.log('resident', resident);
      await httpClient.request({
        path: this.url,
        method: 'put',
        data: {
          name: resident.name,
          cpf: formatSpecialCharacters(resident.cpf),
          rg: resident.rg,
          contact_phone: formatSpecialCharacters(resident.contact_phone),
          birthday: resident.birthday,
          image: imageFile,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
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

  public async undeleteResident(
    httpClient: HttpClient,
    cpf: string,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: `${this.url}/restore`,
        method: 'put',
        data: { cpf },
      });
      toast.success('Residente reativado com sucesso');
    } catch (e) {
      noop();
    }
  }

  public async sendReport(httpClient: HttpClient): Promise<void> {
    try {
      await httpClient.request({
        path: `${this.url}/report`,
        method: 'post',
      });
      toast.success('Relatório enviado com sucesso');
    } catch (e) {
      toast.error('Erro ao enviar relatório');
      console.log('Erro ao enviar relatorio: ', e);
    }
  }
}

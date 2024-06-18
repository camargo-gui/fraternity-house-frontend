import { toast } from 'react-toastify';
import { type HttpClient } from '../../../common/http-client/http-client';
import { Accompaniment } from '../../entities/accompaniment';
import { type AccompanimentService } from '../interface/accompaniment-service';
import { type AccompanimentStatusEnum } from '../../entities/accompaniment-status';

export class ObjectionAccompanimentService implements AccompanimentService {
  private readonly urlBase = '/accompaniment';

  async getAllResidentsHasAccompaniments(
    httpClient: HttpClient,
    type: string,
  ): Promise<Accompaniment[]> {
    try {
      const response = await httpClient.request({
        path: this.urlBase + '/list-residents' + `?type=${type}`,
        method: 'get',
      });
      const data = response?.getArrayData(Accompaniment) ?? [];

      return (
        data?.map((data) => {
          return new Accompaniment(
            data.id,
            data.date,
            data.description,
            data.residentId,
            data.employeeId,
            data.type,
            data.residentName,
            data.updated_at,
            data.nutritionistStatus,
            data.psychologicalStatus,
            data.physicalStatus,
          );
        }) ?? []
      );
    } catch (e) {
      return [];
    }
  }

  async createAccompaniment(
    httpClient: HttpClient,
    accompaniment: {
      description: string;
      residentId: number;
      type: 'PSYCHOLOGIST' | 'PHYSIOTHERAPIST' | 'NUTRITIONIST';
    },
    accompanimentStatus: AccompanimentStatusEnum,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: this.urlBase,
        method: 'post',
        data: {
          description: accompaniment.description,
          residentId: accompaniment.residentId,
          type: accompaniment.type,
          accompanimentStatus,
        },
      });
      toast.success('Acompanhamento criado com sucesso!');
    } catch (e) {
      console.error('Erro ao criar o acompanhamento no objection:', e);
    }
  }

  async getAccompanimentByResident(
    httpClient: HttpClient,
    type: string,
    id: number,
  ): Promise<Accompaniment[]> {
    try {
      const response = await httpClient.request({
        path: this.urlBase + `?type=${type}` + `&residentId=${id}`,
        method: 'get',
      });
      const data = response?.getArrayData(Accompaniment);
      return (
        data?.map((data) => {
          return new Accompaniment(
            data.id,
            data.date,
            data.description,
            data.residentId,
            data.employeeId,
            data.type,
            data.residentName,
            data.updated_at,
          ).toDomain();
        }) ?? []
      );
    } catch (e) {
      return [];
    }
  }

  async updateAccompaniment(
    httpClient: HttpClient,
    id: number,
    newDescription: string,
  ): Promise<void> {
    try {
      await httpClient.request({
        path: this.urlBase + `/${id}`,
        method: 'put',
        data: {
          description: newDescription,
        },
      });
      toast.success('Acompanhamento atualizado com sucesso!');
    } catch (e) {
      console.error('Erro ao atualizar o acompanhamento no objection:', e);
    }
  }
}

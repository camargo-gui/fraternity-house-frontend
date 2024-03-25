import { noop } from 'lodash';
import { toast } from 'react-toastify';
import type { HttpClient } from '../../../common/http-client/http-client';
import { Medicine } from '../../entities/medicine';
import type { MedicineService } from '../interfaces/medicine-service';
import { MedicineArrayResponse } from '../response/medicine-array-response';

export class ObjectionMedicineService implements MedicineService {
  private readonly apiUrl = '/medicine';

  public async getMedicines(httpClient: HttpClient): Promise<Medicine[]> {
    try {
      const response = await httpClient.request({
        path: this.apiUrl,
        method: 'get',
      });

      return response?.getData(MedicineArrayResponse).medicines ?? [];
    } catch (e) {
      return [];
    }
  }

  public async getMedicine(
    httpClient: HttpClient,
    id: string,
  ): Promise<Medicine | undefined> {
    const getMedicineUrl = `${this.apiUrl}/${id}`;
    try {
      const response = await httpClient.request({
        path: getMedicineUrl,
        method: 'get',
      });

      return response?.getData(Medicine) ?? undefined;
    } catch (e) {
      return undefined;
    }
  }

  public async createMedicine(
    httpClient: HttpClient,
    medicine: Medicine,
  ): Promise<void> {
    const medicineDTO = {
      name: medicine.name,
      pharmaceutical_forms: medicine.pharmaceutical_forms,
      id_pharmacological_name: Number(medicine.PharmacologicalName.id),
    };

    try {
      await httpClient.request({
        path: this.apiUrl,
        method: 'post',
        data: medicineDTO,
      });
      toast.success('Medicamento cadastrado com sucesso');
    } catch (e) {
      noop();
    }
  }

  public async updateMedicine(
    httpClient: HttpClient,
    medicine: Medicine,
  ): Promise<void> {
    const medicineDTO = {
      id: medicine.id,
      name: medicine.name,
      pharmaceutical_forms: medicine.pharmaceutical_forms,
      id_pharmacological_name: medicine.PharmacologicalName.id,
    };

    const updateMedicineUrl = `${this.apiUrl}`;

    try {
      await httpClient.request({
        path: updateMedicineUrl,
        method: 'put',
        data: medicineDTO,
      });
      toast.success('Medicamento atualizado com sucesso');
    } catch (e) {
      noop();
    }
  }

  public async deleteMedicine(
    httpClient: HttpClient,
    id: string,
  ): Promise<void> {
    const deleteMedicineUrl = `${this.apiUrl}/${id}`;

    try {
      await httpClient.request({
        path: deleteMedicineUrl,
        method: 'delete',
      });
      toast.success('Medicamento deletado com sucesso');
    } catch (e) {
      noop();
    }
  }
}

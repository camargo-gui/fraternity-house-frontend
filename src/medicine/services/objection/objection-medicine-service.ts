import axios from 'axios';
import type { Medicine } from '../../entities/medicine';
import type { MedicineService } from '../interfaces/medicine-service';

export class ObjectionMedicineService implements MedicineService {
  private readonly apiUrl = 'http://localhost:3344/medicine';

  public async getMedicines(): Promise<Medicine[]> {
    const response = await axios.get<{ medicines: Medicine[] }>(this.apiUrl, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTEwNjc1NDcsImV4cCI6MTcxMTE1Mzk0N30.jva2LgJ0TwunGeR9oNDq9x93zPmrtOXyEN4i9O7Gyho`,
      },
    });
    return response.data.medicines;
  }

  public async getMedicine(id: string): Promise<Medicine> {
    const response = await axios.get<Medicine>(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTEwNjc1NDcsImV4cCI6MTcxMTE1Mzk0N30.jva2LgJ0TwunGeR9oNDq9x93zPmrtOXyEN4i9O7Gyho`,
      },
    });
    return response.data;
  }

  public async createMedicine(medicine: Medicine): Promise<void> {
    const medicineDTO = {
      name: medicine.name,
      pharmaceutical_forms: medicine.pharmaceuticalForms,
      id_pharmacological_name: Number(medicine.pharmacologicalName.id),
    };
    await axios.post(this.apiUrl, medicineDTO, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTEwNjc1NDcsImV4cCI6MTcxMTE1Mzk0N30.jva2LgJ0TwunGeR9oNDq9x93zPmrtOXyEN4i9O7Gyho`,
      },
    });
  }

  public async updateMedicine(medicine: Medicine): Promise<void> {
    const medicineDTO = {
      name: medicine.name,
      pharmaceutical_forms: medicine.pharmaceuticalForms,
      id_pharmacological_name: medicine.pharmacologicalName.id,
    };
    await axios.put(`${this.apiUrl}/${medicine.id}`, medicineDTO);
  }

  public async deleteMedicine(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }
}

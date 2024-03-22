import axios from 'axios';
import { type ResidentDTO } from '../../dto/resident-dto';
import { type ResidentService } from '../interfaces/resident-service';

export class ObjectionResidentService implements ResidentService {
  private readonly url = 'http://localhost:3344/resident';

  public async getAllResidents(): Promise<ResidentDTO[]> {
    const response = await axios.get<{ residents: ResidentDTO[] }>(this.url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTEwNjc1NDcsImV4cCI6MTcxMTE1Mzk0N30.jva2LgJ0TwunGeR9oNDq9x93zPmrtOXyEN4i9O7Gyho`,
      },
    });
    return response.data.residents;
  }

  public async getResidents(cpf: string): Promise<ResidentDTO> {
    const response = await axios.get<ResidentDTO>(`${this.url}/${cpf}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTEwNjc1NDcsImV4cCI6MTcxMTE1Mzk0N30.jva2LgJ0TwunGeR9oNDq9x93zPmrtOXyEN4i9O7Gyho`,
      },
    });
    return response.data;
  }

  public async postResident(resident: ResidentDTO): Promise<void> {
    await axios.post(this.url, resident, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTEwNjc1NDcsImV4cCI6MTcxMTE1Mzk0N30.jva2LgJ0TwunGeR9oNDq9x93zPmrtOXyEN4i9O7Gyho`,
      },
    });
  }

  public async updateResident(resident: ResidentDTO): Promise<void> {
    await axios.put(this.url, resident, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTEwNjc1NDcsImV4cCI6MTcxMTE1Mzk0N30.jva2LgJ0TwunGeR9oNDq9x93zPmrtOXyEN4i9O7Gyho`,
      },
    });
  }

  public async deleteResident(cpf: string): Promise<void> {
    await axios.delete(`${this.url}/${cpf}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTEwNjc1NDcsImV4cCI6MTcxMTE1Mzk0N30.jva2LgJ0TwunGeR9oNDq9x93zPmrtOXyEN4i9O7Gyho`,
      },
    });
  }
}

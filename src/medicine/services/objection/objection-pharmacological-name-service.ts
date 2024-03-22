import axios from 'axios';
import type { PharmacologicalName } from '../../entities/pharmacological-name';
import type { PharmacologicalNameService } from '../interfaces/pharmacological-name-service';

export class ObjectionPharmacologicalNameService
  implements PharmacologicalNameService
{
  private readonly apiUrl = 'http://localhost:3344/pharmacological-name';

  public async getPharmacologicalNames(): Promise<PharmacologicalName[]> {
    const response = await axios.get<{
      pharmacologicalNames: PharmacologicalName[];
    }>(this.apiUrl, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE3MTEwNjc1NDcsImV4cCI6MTcxMTE1Mzk0N30.jva2LgJ0TwunGeR9oNDq9x93zPmrtOXyEN4i9O7Gyho`,
      },
    });
    return response.data.pharmacologicalNames;
  }
}

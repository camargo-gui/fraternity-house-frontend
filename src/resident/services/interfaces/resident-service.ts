import { type ResidentDTO } from '../../dto/resident-dto';

export interface ResidentService {
  getAllResidents: () => Promise<ResidentDTO[]>;
  getResidents: (cpf: string) => Promise<ResidentDTO>;
  postResident: (resident: ResidentDTO) => Promise<void>;
  updateResident: (resident: ResidentDTO) => Promise<void>;
  deleteResident: (cpf: string) => Promise<void>;
}

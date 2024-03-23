import { type ResidentDTO } from '../../dto/resident-dto';

export class ResidentResponse {
  public constructor(public residents: ResidentDTO[]) {}
}

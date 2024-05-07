import { type Resident } from '../../entities/resident';

export class ResidentResponse {
  public constructor(public residents: Resident[]) {}
}

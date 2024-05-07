import { type Screening } from '../../entities/screening';

export class ScreeningResponse {
  public constructor(public screening: Screening) {}
}

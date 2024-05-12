import { type HttpClient } from '../../../common/http-client/http-client';
import { type SpecialNeeds } from '../../entities/special-needs';

export interface SpecialNeedsService {
  getSpecialNeeds: (
    httpClient: HttpClient,
  ) => Promise<SpecialNeeds[] | undefined>;
}

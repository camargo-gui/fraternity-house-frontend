import { type HttpClient } from '../../../common/http-client/http-client';
import { type Accompaniment } from '../../entities/accompaniment';

export interface AccompanimentService {
  getAllResidentsHasAccompaniments: (
    httpClient: HttpClient,
    type: string,
  ) => Promise<Accompaniment[]>;
}

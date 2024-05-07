import { type HttpClient } from '../../../common/http-client/http-client';
import { type Illnesses } from '../../entities/illnesses';

export interface IllnessesService {
  getIllnesses: (httpClient: HttpClient) => Promise<Illnesses[] | undefined>;
}

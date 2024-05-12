import { type HttpClient } from '../../../common/http-client/http-client';
import { type Screening } from '../../entities/screening';

export interface ScreeningService {
  get: (httpClient: HttpClient, id: string) => Promise<Screening | undefined>;
  create: (httpClient: HttpClient, screening: Screening) => Promise<void>;
  update: (httpClient: HttpClient, screening: Screening) => Promise<void>;
}

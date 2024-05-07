import { type HttpClient } from '../../../common/http-client/http-client';
import { type Screening } from '../../entities/screening';

export interface ScreeningService {
  getScreening: (
    httpClient: HttpClient,
    id: string,
  ) => Promise<Screening | undefined>;
  postScreening: (
    httpClient: HttpClient,
    screening: Screening,
  ) => Promise<void>;
  updateScreening: (
    httpClient: HttpClient,
    screening: Screening,
  ) => Promise<void>;
}

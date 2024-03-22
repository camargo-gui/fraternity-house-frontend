import { plainToInstance } from 'class-transformer';

export class HttpClientResponse {
  public constructor(
    private readonly statusCode: number,
    private readonly data: unknown,
  ) {}

  public getData<TResponse>(DataType: ClassType<TResponse>): TResponse {
    return plainToInstance(DataType, this.data);
  }

  public getArrayData<TResponse>(DataType: ClassType<TResponse>): TResponse[] {
    return plainToInstance(DataType, this.data as unknown[]);
  }

  public hasStatus(status: number): boolean {
    return this.statusCode === status;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassType<T> = new (...args: any[]) => T;

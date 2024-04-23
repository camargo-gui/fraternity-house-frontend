export class LoginResponse {
  public constructor(
    public readonly token: string,
    public readonly name: string,
  ) {}
}

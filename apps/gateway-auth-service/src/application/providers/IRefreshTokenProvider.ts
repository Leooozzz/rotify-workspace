export interface IRefreshTokenProvider {
  generate(userId: string): Promise<string>;
  verify(token: string): Promise<string | null>;
  revoke(token: string): Promise<void>;
}

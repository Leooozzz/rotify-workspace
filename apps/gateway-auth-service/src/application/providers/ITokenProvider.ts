export interface ITokenProvider {
  generateToken(userId: string): Promise<string>;
  validateToken(token: string): Promise<string | null>;
}

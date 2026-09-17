export interface ITokenPayload {
  sub: string;
  role: "ADMIN" | "USER";
  companyId: string | null;
  companyRole: "OWNER" | "MEMBER" | null;
}

export interface ITokenProvider {
  generateToken(payload: ITokenPayload): Promise<string>;
  validateToken(token: string): Promise<ITokenPayload | null>;
}

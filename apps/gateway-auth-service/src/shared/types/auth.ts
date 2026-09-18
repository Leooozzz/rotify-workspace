export interface IAuthContext {
  userId: string;
  role: "ADMIN" | "USER";
  companyId: string | null;
  companyRole: "OWNER" | "MEMBER" | null;
}

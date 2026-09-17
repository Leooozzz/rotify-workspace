import type { IAuthContext } from "./auth";

declare global {
  namespace Express {
    interface Request {
      auth?: IAuthContext;
    }
  }
}

export {};

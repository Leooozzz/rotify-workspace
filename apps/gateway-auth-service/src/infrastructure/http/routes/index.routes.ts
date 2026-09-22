import { Router, type Request } from "express";
import { usersRoutes } from "./users.routes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../../../config/env.config";

const router = Router();

router.use("/users", usersRoutes);

router.use(
  "/orders",
  ensureAuthenticated,
  createProxyMiddleware({
    target: env.ORDERS_SERVICE,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        const auth = (req as Request).auth;

        if (!auth) return;

        proxyReq.setHeader("x-user-id", auth.userId);

        if (auth.companyId) {
          proxyReq.setHeader("x-company-id", auth.companyId);
        }
      },
    },
  }),
);

export { router };

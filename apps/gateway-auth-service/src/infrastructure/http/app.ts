import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/index.routes";
import { AppError } from "../../shared/errors/AppError";
import { env } from "../../config/env.config";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(`/${env.VERSION_API}`, router);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "gateway-users",
    timestamp: new Date().toISOString(),
  });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    error: "InternalServerError",
    message: "Internal server error",
  });
};

app.use(errorHandler);

export { app };

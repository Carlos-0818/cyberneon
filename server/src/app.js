/**
 * 建立 Express 應用實例
 * 負責設定 Middlewares 及掛載 Routes
 * 統一錯誤處理流程
 * 不負責 listen（由 server 負責）
 */

import express from "express";
import cors from "cors";
import morgan from "morgan";

import { env } from "./config/env.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./routes/index.js";

const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

/**
 * Middlewares
 */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

/**
 * Routes
 */
app.use("/api", router);

/**
 * Not found + error handler
 */
app.use(notFound);
app.use(errorHandler);

export default app;

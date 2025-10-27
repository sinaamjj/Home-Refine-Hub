import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import bookingsRouter from "./routes/bookings";
import expertsRouter from "./routes/experts";
import howItWorksRouter from "./routes/how-it-works";
import servicesRouter from "./routes/services";
import statsRouter from "./routes/stats";
import { env } from "./utils/env";

const app = express();

app.use(cors({
  origin: env.clientOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/experts", expertsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/how-it-works", howItWorksRouter);
app.use("/api/stats", statsRouter);
app.use("/api/bookings", bookingsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "آدرس مورد نظر یافت نشد",
    path: req.originalUrl,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unexpected error", error);
  res.status(500).json({ message: "خطای غیرمنتظره رخ داد" });
});

export default app;

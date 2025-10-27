import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z
    .string()
    .optional()
    .transform((value) => (value ? Number.parseInt(value, 10) : undefined))
    .pipe(z.number().int().positive().default(5000)),
  CLIENT_ORIGINS: z
    .string()
    .optional()
    .transform((value) =>
      value
        ?.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    )
    .pipe(z.array(z.string().url()).optional()),
});

const parsed = envSchema.safeParse({
  PORT: process.env.PORT,
  CLIENT_ORIGINS: process.env.CLIENT_ORIGINS,
});

if (!parsed.success) {
  console.error("Failed to parse environment variables", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

export const env = {
  port: parsed.data.PORT,
  clientOrigins:
    parsed.data.CLIENT_ORIGINS && parsed.data.CLIENT_ORIGINS.length > 0
      ? parsed.data.CLIENT_ORIGINS
      : ["http://localhost:5173"],
};

import { Router } from "express";
import { z } from "zod";
import { experts } from "../data/experts";

const router = Router();

const expertQuerySchema = z.object({
  city: z.string().optional(),
  specialty: z.string().optional(),
  verified: z
    .string()
    .optional()
    .transform((value) => (value ? value === "true" : undefined)),
});

router.get("/", (req, res) => {
  const filters = expertQuerySchema.safeParse(req.query);

  if (!filters.success) {
    return res.status(400).json({
      message: "درخواست نامعتبر است",
      errors: filters.error.flatten().fieldErrors,
    });
  }

  const { city, specialty, verified } = filters.data;

  const filteredExperts = experts.filter((expert) => {
    if (city && expert.location !== city) {
      return false;
    }

    if (specialty && !expert.specialty.includes(specialty)) {
      return false;
    }

    if (typeof verified === "boolean" && expert.verified !== verified) {
      return false;
    }

    return true;
  });

  res.json({
    data: filteredExperts,
    meta: {
      total: filteredExperts.length,
    },
  });
});

router.get("/:id", (req, res) => {
  const expert = experts.find((item) => item.id === req.params.id);

  if (!expert) {
    return res.status(404).json({ message: "متخصص یافت نشد" });
  }

  res.json({ data: expert });
});

export default router;

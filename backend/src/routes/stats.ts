import { Router } from "express";
import { platformStats } from "../data/stats";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ data: platformStats });
});

export default router;

import { Router } from "express";
import { howItWorksSteps } from "../data/how-it-works";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ data: howItWorksSteps });
});

export default router;

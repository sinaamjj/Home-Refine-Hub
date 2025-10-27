import { Router } from "express";
import { serviceCategories } from "../data/services";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ data: serviceCategories });
});

export default router;

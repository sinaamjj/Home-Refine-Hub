import { Router } from "express";
import { z } from "zod";
import { bookings } from "../data/bookings";
import { serviceCategories } from "../data/services";
import { Booking } from "../types";

const router = Router();

const bookingSchema = z.object({
  name: z.string().min(3, "نام باید حداقل ۳ کاراکتر باشد"),
  phone: z
    .string()
    .min(8, "شماره تماس معتبر نیست")
    .regex(/^[0-9+\-\s]+$/, "فرمت شماره تماس معتبر نیست"),
  serviceId: z.string(),
  scheduledFor: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), "تاریخ رزرو نامعتبر است"),
  description: z.string().max(500, "توضیحات باید کمتر از ۵۰۰ کاراکتر باشد").optional(),
  city: z.string().min(2, "نام شهر کوتاه است"),
});

router.get("/", (_req, res) => {
  res.json({ data: bookings });
});

router.post("/", (req, res) => {
  const parsed = bookingSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "اطلاعات وارد شده معتبر نیست",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const bookingData = parsed.data;
  const serviceExists = serviceCategories.some((service) => service.id === bookingData.serviceId);

  if (!serviceExists) {
    return res.status(404).json({ message: "خدمت انتخابی یافت نشد" });
  }

  const booking: Booking = {
    ...bookingData,
    id: `booking-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);

  res.status(201).json({
    message: "رزرو با موفقیت ثبت شد",
    data: booking,
  });
});

export default router;

import { HowItWorksStep } from "../types";

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "step-search",
    title: "جستجوی خدمت",
    description: "خدمت مورد نیاز خود را انتخاب کنید",
    icon: "Search",
    step: 1,
  },
  {
    id: "step-select",
    title: "انتخاب متخصص",
    description: "بهترین متخصص را براساس امتیاز و قیمت انتخاب کنید",
    icon: "UserCheck",
    step: 2,
  },
  {
    id: "step-schedule",
    title: "رزرو وقت",
    description: "زمان دلخواه خود را برای انجام کار تعیین کنید",
    icon: "Calendar",
    step: 3,
  },
  {
    id: "step-complete",
    title: "انجام کار",
    description: "متخصص در زمان مقرر کار شما را انجام می‌دهد",
    icon: "CheckCircle",
    step: 4,
  },
];

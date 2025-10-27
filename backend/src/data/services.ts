import { ServiceCategory } from "../types";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "service-installations",
    title: "تاسیسات",
    description: "لوله‌کشی، شوفاژ، کولر",
    icon: "Wrench",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "service-home",
    title: "خانه",
    description: "تعمیرات و نگهداری",
    icon: "Home",
    color: "text-green-600 dark:text-green-400",
  },
  {
    id: "service-cleaning",
    title: "نظافت",
    description: "نظافت منزل و اداری",
    icon: "Sparkles",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "service-construction",
    title: "ساختمان",
    description: "بازسازی و بنایی",
    icon: "Hammer",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "service-electric",
    title: "برق",
    description: "برقکاری و تابلو",
    icon: "Zap",
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    id: "service-plumbing",
    title: "لوله‌کشی",
    description: "آب، فاضلاب، گاز",
    icon: "Droplet",
    color: "text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "service-paint",
    title: "نقاشی",
    description: "رنگ‌آمیزی ساختمان",
    icon: "Paintbrush",
    color: "text-pink-600 dark:text-pink-400",
  },
  {
    id: "service-insulation",
    title: "عایقکاری",
    description: "عایق حرارتی و رطوبتی",
    icon: "Shield",
    color: "text-indigo-600 dark:text-indigo-400",
  },
];

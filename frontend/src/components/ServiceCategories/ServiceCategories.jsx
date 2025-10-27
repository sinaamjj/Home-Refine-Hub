import { useEffect, useState } from "react";
import {
  Droplet,
  Hammer,
  Home,
  Paintbrush,
  Shield,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { fetchServiceCategories } from "@/lib/api";
import styles from "./ServiceCategories.module.css";

const ICON_COMPONENTS = {
  Wrench,
  Home,
  Sparkles,
  Hammer,
  Zap,
  Droplet,
  Paintbrush,
  Shield,
};

const ICON_COLORS = {
  "text-blue-600 dark:text-blue-400": "#2563eb",
  "text-green-600 dark:text-green-400": "#16a34a",
  "text-purple-600 dark:text-purple-400": "#9333ea",
  "text-orange-600 dark:text-orange-400": "#ea580c",
  "text-yellow-600 dark:text-yellow-400": "#ca8a04",
  "text-cyan-600 dark:text-cyan-400": "#0891b2",
  "text-pink-600 dark:text-pink-400": "#db2777",
  "text-indigo-600 dark:text-indigo-400": "#4f46e5",
};

const ServiceCategories = () => {
  const [serviceCategories, setServiceCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    setIsLoading(true);
    fetchServiceCategories()
      .then((response) => {
        if (!isSubscribed) {
          return;
        }

        const categories = response?.data ?? response;
        setServiceCategories(categories ?? []);
        setError(null);
      })
      .catch((err) => {
        if (!isSubscribed) {
          return;
        }
        setError(err);
      })
      .finally(() => {
        if (!isSubscribed) {
          return;
        }
        setIsLoading(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>دسته‌بندی خدمات</h2>
          <p className={styles.subtitle}>
            متخصصین حرفه‌ای در تمام زمینه‌های بازسازی و تعمیرات منزل
          </p>
        </div>

        {error && (
          <div className={styles.alert}>
            <div className={styles.alertTitle}>خطا در دریافت دسته‌بندی خدمات</div>
            <div>{error.message}</div>
          </div>
        )}

        <div className={styles.grid}>
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <div key={`category-skeleton-${index}`} className={styles.skeletonCard}>
                <div className={styles.skeletonCircle} />
                <div className={styles.skeletonLine} />
                <div className={`${styles.skeletonLine} ${styles.smallLine}`} />
              </div>
            ))}

          {!isLoading &&
            serviceCategories?.map((category) => {
              const Icon = ICON_COMPONENTS[category.icon] ?? Wrench;
              const iconColor = ICON_COLORS[category.color] ?? "#16a34a";

              return (
                <div key={category.id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <div className={styles.iconWrapper}>
                      <Icon size={32} style={{ color: iconColor }} />
                    </div>
                    <h3 className={styles.cardTitle}>{category.title}</h3>
                    <p className={styles.cardDescription}>{category.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;

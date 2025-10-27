import { useEffect, useMemo, useState } from "react";
import { Calendar, CheckCircle, Search, UserCheck } from "lucide-react";
import { fetchHowItWorksSteps } from "@/lib/api";
import styles from "./HowItWorks.module.css";

const ICON_COMPONENTS = {
  Search,
  UserCheck,
  Calendar,
  CheckCircle,
};

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    setIsLoading(true);
    fetchHowItWorksSteps()
      .then((response) => {
        if (!isSubscribed) {
          return;
        }

        const nextSteps = response?.data ?? response;
        setSteps(nextSteps ?? []);
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

  const normalizedSteps = useMemo(
    () =>
      steps?.map((step) => ({
        ...step,
        Icon: ICON_COMPONENTS[step.icon] ?? CheckCircle,
      })),
    [steps]
  );

  return (
    <section id="how-it-works" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>چگونه کار می‌کند؟</h2>
          <p className={styles.subtitle}>
            در چند گام ساده به متخصص مورد نیاز خود دسترسی پیدا کنید
          </p>
        </div>

        {error && (
          <div className={styles.alert}>
            <div className={styles.alertTitle}>خطا در دریافت مراحل</div>
            <div>{error.message}</div>
          </div>
        )}

        <div className={styles.grid}>
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`how-it-works-skeleton-${index}`}
                className={styles.skeletonCard}
              >
                <div className={styles.skeletonCircleSmall} />
                <div className={styles.skeletonCircleLarge} />
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLine} />
              </div>
            ))}

          {!isLoading &&
            normalizedSteps?.map((step, index) => {
              const { Icon } = step;
              const isLast = index === normalizedSteps.length - 1;

              return (
                <div key={step.id} className={styles.card}>
                  <div className={styles.stepBadge}>{step.step}</div>
                  <div className={styles.iconWrapper}>
                    <Icon size={40} color="hsl(var(--primary))" />
                  </div>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardDescription}>{step.description}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

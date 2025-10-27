import { useEffect, useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { fetchPlatformStats } from "@/lib/api";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    setIsLoading(true);
    fetchPlatformStats()
      .then((response) => {
        if (!isSubscribed) {
          return;
        }

        const nextStats = response?.data ?? response;
        setStats(nextStats);
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

  const formattedStats = useMemo(() => {
    const formatter = new Intl.NumberFormat("fa-IR");
    const data = stats ?? {};
    const satisfaction = data.satisfaction ?? 0;

    return {
      professionals: `${formatter.format(data.professionals ?? 0)}`,
      completedProjects: `${formatter.format(data.completedProjects ?? 0)}`,
      satisfaction: satisfaction.toFixed(1),
    };
  }, [stats]);

  return (
    <section className={styles.hero}>
      <div className={styles.background} aria-hidden="true">
        <div className={styles.gradient} />
        <div className={styles.pattern} />
        <div className={styles.overlay} />
      </div>

      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              دسترسی آسان به
              <span className={styles.titleAccent}>بهترین متخصصین بازسازی</span>
            </h1>
            <p className={styles.description}>
              رزرو آنلاین متخصصین ساختمان، تاسیسات، نظافت و خدمات منزل با بهترین
              کیفیت و قیمت
            </p>

            {error && (
              <div className={styles.alert}>
                <div className={styles.alertTitle}>
                  خطا در دریافت آمار پلتفرم
                </div>
                <div>{error.message}</div>
              </div>
            )}

            <div className={styles.searchCard}>
              <div className={styles.searchGroup}>
                <div className={styles.inputWrapper}>
                  <Search className={styles.inputIcon} size={20} />
                  <input
                    type="text"
                    placeholder="به چه خدمتی نیاز دارید؟"
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <MapPin className={styles.inputIcon} size={20} />
                  <input
                    type="text"
                    placeholder="انتخاب شهر"
                    className={styles.input}
                  />
                </div>
                <button type="button" className={styles.searchButton}>
                  جستجو
                </button>
              </div>
            </div>

            <div className={styles.stats}>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`hero-stat-skeleton-${index}`}
                    className={styles.stat}
                  >
                    <div className={styles.skeleton} />
                    <div
                      className={`${styles.skeleton} ${styles.smallSkeleton}`}
                    />
                  </div>
                ))
              ) : (
                <>
                  <div className={styles.stat}>
                    <div className={styles.statValue}>
                      +{formattedStats.professionals}
                    </div>
                    <div className={styles.statLabel}>متخصص فعال</div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statValue}>
                      +{formattedStats.completedProjects}
                    </div>
                    <div className={styles.statLabel}>پروژه موفق</div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statValue}>
                      {formattedStats.satisfaction}
                    </div>
                    <div className={styles.statLabel}>رضایت کاربران</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

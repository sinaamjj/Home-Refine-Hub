import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
import { fetchPlatformStats } from "@/lib/api";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const featuredProjects = useMemo(
    () => [
      {
        id: "elahiye-renovation",
        title: "بازسازی کامل آپارتمان الهیه",
        description: "اتمام پروژه در ۴۵ روز با امتیاز ۴.۹ از مشتری",
        image:
          "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
        badge: "پروژه منتخب این هفته",
      },
      {
        id: "pasdaran-kitchen",
        title: "نوسازی آشپزخانه مدرن در پاسداران",
        description: "بازطراحی کامل با متریال سفارشی و تحویل در ۲۸ روز",
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
        badge: "بازدید برتر کاربران",
      },
      {
        id: "farmanieh-villa",
        title: "بازسازی ویلای کلاسیک در فرشته",
        description: "ترکیب سبک کلاسیک و مدرن با رضایت ۱۰۰٪ مشتری",
        image:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        badge: "پروژه ویژه تیم حرفه‌ای",
      },
    ],
    []
  );
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

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

  useEffect(() => {
    if (featuredProjects.length <= 1) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [featuredProjects.length]);

  const goToProject = (nextIndex) => {
    setCurrentProjectIndex((nextIndex + featuredProjects.length) % featuredProjects.length);
  };

  const activeProject = featuredProjects[currentProjectIndex];

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

          <div className={styles.visual}>
            <div className={styles.visualSlider}>
              <div key={activeProject.id} className={styles.visualCard}>
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className={styles.visualImage}
                  loading="lazy"
                />
                <span className={styles.visualBadge}>{activeProject.badge}</span>
                <div className={styles.visualCaption}>
                  <h3>{activeProject.title}</h3>
                  <p>{activeProject.description}</p>
                </div>
              </div>

              <div className={styles.sliderControls}>
                <button
                  type="button"
                  className={styles.sliderButton}
                  onClick={() => goToProject(currentProjectIndex - 1)}
                  aria-label="پروژه قبلی"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.sliderButton}
                  onClick={() => goToProject(currentProjectIndex + 1)}
                  aria-label="پروژه بعدی"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
              </div>

              <div className={styles.sliderDots} role="tablist" aria-label="پروژه‌های منتخب">
                {featuredProjects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`${styles.sliderDot} ${
                      index === currentProjectIndex ? styles.sliderDotActive : ""
                    }`}
                    onClick={() => goToProject(index)}
                    aria-label={`نمایش ${project.title}`}
                    aria-selected={index === currentProjectIndex}
                    role="tab"
                  />
                ))}
              </div>
            </div>
            <div className={styles.visualStats}>
              <div className={styles.visualStat}>
                <span className={styles.visualStatLabel}>میانگین تحویل پروژه</span>
                <span className={styles.visualStatValue}>۲۱ روز</span>
              </div>
              <div className={styles.visualStat}>
                <span className={styles.visualStatLabel}>پروژه‌های فعال امروز</span>
                <span className={styles.visualStatValue}>+۱۸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

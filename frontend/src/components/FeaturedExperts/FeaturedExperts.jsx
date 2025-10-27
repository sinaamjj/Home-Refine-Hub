import { useEffect, useState } from "react";
import { Award, MapPin, Star } from "lucide-react";
import { fetchExperts } from "@/lib/api";
import styles from "./FeaturedExperts.module.css";

const FeaturedExperts = () => {
  const [experts, setExperts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    setIsLoading(true);
    fetchExperts()
      .then((response) => {
        if (!isSubscribed) {
          return;
        }

        const nextExperts = response?.data ?? response;
        setExperts(nextExperts ?? []);
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
    <section id="experts" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>متخصصین برتر</h2>
          <p className={styles.subtitle}>بهترین متخصصین بازسازی با بالاترین امتیازات</p>
        </div>

        {error && (
          <div className={styles.alert}>
            <div className={styles.alertTitle}>خطا در دریافت اطلاعات</div>
            <div>{error.message}</div>
          </div>
        )}

        <div className={styles.grid}>
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`expert-skeleton-${index}`} className={styles.skeletonCard}>
                <div className={styles.skeletonBox} />
                <div className={`${styles.skeletonLine} ${styles.largeLine}`} />
                <div className={`${styles.skeletonLine} ${styles.mediumLine}`} />
                <div className={`${styles.skeletonLine} ${styles.smallLine}`} />
                <div className={styles.skeletonLine} />
              </div>
            ))}

          {!isLoading &&
            experts?.map((expert) => (
              <div key={expert.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <div className={styles.imageContainer}>
                    <img src={expert.avatar} alt={expert.name} className={styles.image} />
                  </div>
                  {expert.verified && (
                    <span className={styles.verifiedBadge}>
                      <Award size={14} />
                      تایید شده
                    </span>
                  )}
                </div>
                <div className={styles.content}>
                  <h3 className={styles.name}>{expert.name}</h3>
                  <p className={styles.specialty}>{expert.specialty}</p>

                  <div className={styles.ratingRow}>
                    <span className={styles.ratingValue}>
                      <Star size={16} style={{ fill: "#facc15", color: "#facc15" }} />
                      {expert.rating}
                    </span>
                    <span className={styles.ratingCount}>({expert.reviews} نظر)</span>
                  </div>

                  <div className={styles.location}>
                    <MapPin size={16} />
                    <span>{expert.location}</span>
                  </div>

                  <p className={styles.description}>{expert.description}</p>

                  <div className={styles.tags}>
                    {expert.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.footer}>
                    <span className={styles.price}>{expert.price}</span>
                    <button type="button" className={styles.outlineButton}>
                      رزرو
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className={styles.cta}>
          <button type="button" className={styles.ctaButton}>
            مشاهده تمام متخصصین
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperts;

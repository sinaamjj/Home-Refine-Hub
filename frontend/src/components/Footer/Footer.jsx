import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.brand}>
              <div className={styles.logo}>بازچین</div>
              <p className={styles.description}>
                پلتفرم تخصصی دسترسی به متخصصین بازسازی و تعمیرات منزل
              </p>
              <div className={styles.socials}>
                <a href="#" className={styles.socialLink} aria-label="اینستاگرام">
                  <Instagram size={16} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="توییتر">
                  <Twitter size={16} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="لینکدین">
                  <Linkedin size={16} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="فیسبوک">
                  <Facebook size={16} />
                </a>
              </div>
            </div>

            <div>
              <h3 className={styles.columnTitle}>خدمات</h3>
              <div className={styles.linkList}>
                <a href="#" className={styles.link}>
                  تاسیسات
                </a>
                <a href="#" className={styles.link}>
                  نظافت
                </a>
                <a href="#" className={styles.link}>
                  ساختمان
                </a>
                <a href="#" className={styles.link}>
                  برقکاری
                </a>
              </div>
            </div>

            <div>
              <h3 className={styles.columnTitle}>شرکت</h3>
              <div className={styles.linkList}>
                <a href="#" className={styles.link}>
                  درباره ما
                </a>
                <a href="#" className={styles.link}>
                  تماس با ما
                </a>
                <a href="#" className={styles.link}>
                  فرصت‌های شغلی
                </a>
                <a href="#" className={styles.link}>
                  بلاگ
                </a>
              </div>
            </div>

            <div>
              <h3 className={styles.columnTitle}>پشتیبانی</h3>
              <div className={styles.linkList}>
                <a href="#" className={styles.link}>
                  مرکز پشتیبانی
                </a>
                <a href="#" className={styles.link}>
                  قوانین و مقررات
                </a>
                <a href="#" className={styles.link}>
                  حریم خصوصی
                </a>
                <a href="#" className={styles.link}>
                  سوالات متداول
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>© ۱۴۰۳ بازچین. تمامی حقوق محفوظ است.</div>
      </div>
    </footer>
  );
};

export default Footer;

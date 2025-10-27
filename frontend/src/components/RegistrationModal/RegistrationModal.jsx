import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { UserPlus, Briefcase, Home as HomeIcon, X } from "lucide-react";
import styles from "./RegistrationModal.module.css";

const RegistrationModal = ({ isOpen, onClose, onSelect }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.modal}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="بستن">
          <X size={20} />
        </button>

        <div className={styles.header}>
          <span className={styles.pill}>ثبت‌نام سریع</span>
          <h2>نوع حساب خود را انتخاب کنید</h2>
          <p>برای شروع همکاری با بازچین، نوع حساب کاربری مناسب خود را انتخاب کنید.</p>
        </div>

        <div className={styles.options}>
          <button type="button" className={styles.optionCard} onClick={() => onSelect("customer")}>
            <div className={styles.iconWrapper}>
              <HomeIcon size={24} />
            </div>
            <div className={styles.optionContent}>
              <h3>ثبت‌نام مشتری</h3>
              <p>رزرو سریع متخصصین تایید شده و مدیریت درخواست‌های خدمات منزل.</p>
            </div>
            <span className={styles.cta}>شروع فرایند</span>
          </button>

          <button type="button" className={styles.optionCard} onClick={() => onSelect("professional")}>
            <div className={styles.iconWrapper}>
              <Briefcase size={24} />
            </div>
            <div className={styles.optionContent}>
              <h3>ثبت‌نام متخصص</h3>
              <p>پیوستن به شبکه متخصصین بازچین و دریافت پروژه‌های هدفمند.</p>
            </div>
            <span className={styles.cta}>شروع همکاری</span>
          </button>
        </div>

        <div className={styles.footer}>
          <UserPlus size={18} />
          <span>اکانت دارید؟ از بخش ورود در بالای صفحه وارد شوید.</span>
        </div>
      </div>
    </div>
  );
};

RegistrationModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

RegistrationModal.defaultProps = {
  isOpen: false,
};

export default RegistrationModal;

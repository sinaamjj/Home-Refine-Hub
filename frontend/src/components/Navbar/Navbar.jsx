import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Moon, Sun, Menu, LogIn, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#services", label: "خدمات" },
  { href: "#how-it-works", label: "نحوه کار" },
  { href: "#experts", label: "متخصصین" },
  { href: "#about", label: "درباره ما" },
];

const Navbar = ({ onProfessionalSignUp, onNavigateHome }) => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const prefersDark = document.documentElement.classList.contains("dark");
    setIsDark(prefersDark);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next);
      }
      return next;
    });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleProfessionalSignUp = useCallback(() => {
    if (onProfessionalSignUp) {
      onProfessionalSignUp();
    }
  }, [onProfessionalSignUp]);

  const handleNavigateHome = useCallback(
    (hash) => {
      if (onNavigateHome) {
        onNavigateHome(hash);
      }
    },
    [onNavigateHome]
  );

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.brandButton}
            onClick={() => handleNavigateHome()}
          >
            بازچین
          </button>

          <div className={styles.links}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.link}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigateHome(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={toggleTheme}
              className={styles.iconButton}
              aria-label="تغییر تم"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button type="button" className={styles.outlineButton}>
              <LogIn size={16} />
              ورود
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleProfessionalSignUp}
            >
              ثبت‌نام متخصصین
            </button>
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={toggleMobileMenu}
              aria-label="باز کردن منو"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.mobileOverlay} ${
          isMobileMenuOpen ? styles.mobileOverlayVisible : ""
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-hidden={!isMobileMenuOpen}
        id="mobile-navigation"
      >
        <div className={styles.mobileHeader}>
          <span className={styles.brand}>بازچین</span>
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={toggleMobileMenu}
            aria-label="بستن منو"
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.mobileContent}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={(event) => {
                  event.preventDefault();
                  setIsMobileMenuOpen(false);
                  handleNavigateHome(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className={styles.mobileActions}>
            <button type="button" className={styles.mobileOutlineButton}>
              <LogIn size={16} /> ورود
            </button>
            <button
              type="button"
              className={styles.mobileSecondaryButton}
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleProfessionalSignUp();
              }}
            >
              ثبت‌نام متخصصین
            </button>
            <button
              type="button"
              className={styles.mobileThemeButton}
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
            >
              {isDark ? "حالت روشن" : "حالت تیره"}
            </button>
          </div>
        </div>
      </aside>
    </nav>
  );
};

Navbar.propTypes = {
  onProfessionalSignUp: PropTypes.func,
  onNavigateHome: PropTypes.func,
};

Navbar.defaultProps = {
  onProfessionalSignUp: undefined,
  onNavigateHome: undefined,
};

export default Navbar;

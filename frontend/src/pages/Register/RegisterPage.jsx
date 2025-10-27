import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import homeStyles from "@/styles/Home.module.css";
import styles from "./RegisterPage.module.css";

const ROLE_CONFIG = {
  professional: {
    title: "ثبت‌نام متخصصین",
    subtitle: "پیوستن به شبکه متخصصین بازچین و دریافت پروژه‌های هدفمند در سراسر کشور",
    highlights: [
      { icon: BadgeCheck, text: "دریافت پروژه‌های تضمینی و پرداخت امن" },
      { icon: Building2, text: "مدیریت تقویم و منطقه فعالیت به صورت هوشمند" },
      { icon: Sparkles, text: "دسترسی به داشبورد پیشرفته ارزیابی عملکرد" },
    ],
    infoTitle: "مزایای ویژه متخصصین",
    infoItems: [
      "دسترسی فوری به پروژه‌های متناسب با مهارت شما",
      "پرداخت تضمین‌شده و امکان دریافت پیش‌پرداخت",
      "ابزارهای بازاریابی و مدیریت اعتبار حرفه‌ای",
      "پشتیبانی ۷ روز هفته تیم بازچین",
    ],
    roleLabel: "متخصص",
  },
  customer: {
    title: "ثبت‌نام مشتریان",
    subtitle: "ایجاد حساب کاربری برای رزرو سریع متخصصین مورد اعتماد و مدیریت درخواست‌ها",
    highlights: [
      { icon: ShieldCheck, text: "متخصصین تأیید شده و تضمین کیفیت" },
      { icon: UserPlus, text: "فرآیند رزرو ساده و پشتیبانی لحظه‌ای" },
      { icon: CheckCircle2, text: "پیگیری مرحله‌ای پروژه و پرداخت امن" },
    ],
    infoTitle: "چرا بازچین؟",
    infoItems: [
      "انتخاب متخصص برتر بر اساس امتیاز کاربران",
      "گزارش پیشرفت پروژه در هر مرحله",
      "پشتیبانی اختصاصی برای مدیریت درخواست‌ها",
      "گارانتی بازگشت وجه در صورت عدم رضایت",
    ],
    roleLabel: "مشتری",
  },
};

const professionalFields = [
  { name: "fullName", label: "نام و نام خانوادگی", type: "text", autoComplete: "name" },
  { name: "phone", label: "شماره همراه", type: "tel", autoComplete: "tel" },
  { name: "email", label: "ایمیل", type: "email", autoComplete: "email" },
  { name: "city", label: "شهر محل فعالیت", type: "text", autoComplete: "address-level2" },
  {
    name: "serviceCategory",
    label: "حوزه تخصصی",
    type: "select",
    options: [
      "بازسازی کامل",
      "نقاشی و دکوراسیون",
      "تأسیسات و لوله‌کشی",
      "برق‌کاری و هوشمندسازی",
      "نظافت و خدمات روزمره",
    ],
  },
  {
    name: "experience",
    label: "سابقه کاری",
    type: "select",
    options: ["کمتر از ۲ سال", "۲ تا ۵ سال", "۵ تا ۱۰ سال", "بیش از ۱۰ سال"],
  },
  {
    name: "bio",
    label: "معرفی کوتاه",
    type: "textarea",
    rows: 4,
    placeholder: "تجربه‌ها و مهارت‌های کلیدی خود را توضیح دهید",
  },
  { name: "password", label: "رمز عبور", type: "password", autoComplete: "new-password" },
  {
    name: "confirmPassword",
    label: "تأیید رمز عبور",
    type: "password",
    autoComplete: "new-password",
  },
];

const customerFields = [
  { name: "fullName", label: "نام و نام خانوادگی", type: "text", autoComplete: "name" },
  { name: "phone", label: "شماره همراه", type: "tel", autoComplete: "tel" },
  { name: "email", label: "ایمیل", type: "email", autoComplete: "email" },
  {
    name: "propertyType",
    label: "نوع ملک",
    type: "select",
    options: ["آپارتمان", "ویلایی", "تجاری", "اداری"],
  },
  {
    name: "city",
    label: "شهر شما",
    type: "text",
    autoComplete: "address-level2",
  },
  {
    name: "preferredServices",
    label: "خدمات مورد نیاز",
    type: "textarea",
    rows: 4,
    placeholder: "نوع خدمات یا پروژه‌ای که در نظر دارید را شرح دهید",
  },
  { name: "password", label: "رمز عبور", type: "password", autoComplete: "new-password" },
  {
    name: "confirmPassword",
    label: "تأیید رمز عبور",
    type: "password",
    autoComplete: "new-password",
  },
];

const RegisterPage = ({ role, onRoleChange, onNavigateHome }) => {
  const [formValues, setFormValues] = useState({});
  const [status, setStatus] = useState(null);

  const fields = useMemo(
    () => (role === "customer" ? customerFields : professionalFields),
    [role]
  );

  const roleContent = ROLE_CONFIG[role] ?? ROLE_CONFIG.professional;

  useEffect(() => {
    setFormValues({});
    setStatus(null);
  }, [role]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValues.password && formValues.password !== formValues.confirmPassword) {
      setStatus({ type: "error", message: "رمز عبور و تکرار آن یکسان نیست" });
      return;
    }

    setStatus({
      type: "success",
      message: "درخواست شما با موفقیت ثبت شد. تیم پشتیبانی به زودی با شما تماس می‌گیرد.",
    });
  };

  const renderField = (field) => {
    if (field.type === "select") {
      return (
        <label key={field.name} className={styles.field}>
          <span className={styles.fieldLabel}>{field.label}</span>
          <div className={styles.selectWrapper}>
            <select
              name={field.name}
              className={styles.select}
              value={formValues[field.name] ?? ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                انتخاب کنید
              </option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </label>
      );
    }

    if (field.type === "textarea") {
      return (
        <label key={field.name} className={`${styles.field} ${styles.fullWidth}`}>
          <span className={styles.fieldLabel}>{field.label}</span>
          <textarea
            name={field.name}
            className={`${styles.input} ${styles.textarea}`}
            rows={field.rows ?? 3}
            placeholder={field.placeholder}
            value={formValues[field.name] ?? ""}
            onChange={handleChange}
          />
        </label>
      );
    }

    return (
      <label key={field.name} className={styles.field}>
        <span className={styles.fieldLabel}>{field.label}</span>
        <input
          name={field.name}
          type={field.type}
          className={styles.input}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          value={formValues[field.name] ?? ""}
          onChange={handleChange}
        />
      </label>
    );
  };

  return (
    <main className={`${homeStyles.main} ${styles.main}`}>
      <div className="container">
        <div className={styles.backRow}>
          <button type="button" className={styles.backButton} onClick={() => onNavigateHome()}>
            بازگشت به صفحه اصلی
          </button>
          <ArrowRight size={16} className={styles.backIcon} />
          <span className={styles.backCurrent}>ثبت‌نام</span>
        </div>

        <section className={styles.pageCard}>
          <div className={styles.intro}>
            <span className={styles.pill}>پلتفرم بازچین</span>
            <h1 className={styles.title}>{roleContent.title}</h1>
            <p className={styles.subtitle}>{roleContent.subtitle}</p>

            <div className={styles.roleTabs}>
              <button
                type="button"
                className={`${styles.roleTab} ${
                  role === "professional" ? styles.roleTabActive : styles.roleTabInactive
                }`}
                onClick={() => onRoleChange("professional")}
              >
                ثبت‌نام متخصص
              </button>
              <button
                type="button"
                className={`${styles.roleTab} ${
                  role === "customer" ? styles.roleTabActive : styles.roleTabInactive
                }`}
                onClick={() => onRoleChange("customer")}
              >
                ثبت‌نام مشتری
              </button>
            </div>

            <ul className={styles.highlights}>
              {roleContent.highlights.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <Icon size={18} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className={styles.infoBox}>
              <ShieldCheck size={18} />
              <p>اطلاعات شما با امنیت کامل نگهداری می‌شود و فقط برای فعال‌سازی حساب استفاده خواهد شد.</p>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h2>فرم ثبت‌نام {roleContent.roleLabel}</h2>
              <p>اطلاعات مورد نیاز را وارد کنید تا در کمترین زمان حساب شما فعال شود.</p>
            </div>

            {status && (
              <div
                className={`${styles.status} ${status.type === "error" ? styles.statusError : styles.statusSuccess}`}
              >
                {status.message}
              </div>
            )}

            <div className={styles.fieldsGrid}>{fields.map((field) => renderField(field))}</div>

            <div className={styles.terms}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">شرایط و قوانین استفاده از خدمات بازچین را می‌پذیرم.</label>
            </div>

            <button type="submit" className={styles.submitButton}>
              تکمیل ثبت‌نام
              <ArrowRight size={18} />
            </button>

            <div className={styles.helpLine}>
              <CheckCircle2 size={16} />
              <p>
                نیاز به راهنمایی دارید؟ با پشتیبانی بازچین تماس بگیرید: <a href="tel:02100000000">۰۲۱-۰۰۰۰-۰۰۰۰</a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

RegisterPage.propTypes = {
  role: PropTypes.oneOf(["professional", "customer"]).isRequired,
  onRoleChange: PropTypes.func.isRequired,
  onNavigateHome: PropTypes.func.isRequired,
};

export default RegisterPage;

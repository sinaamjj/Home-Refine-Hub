import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const fields = useMemo(
    () => (role === "customer" ? customerFields : professionalFields),
    [role]
  );

  const roleContent = ROLE_CONFIG[role] ?? ROLE_CONFIG.professional;

  useEffect(() => {
    setFormValues({});
    setStatus(null);
    setErrors({});
    setTouchedFields({});
  }, [role]);

  const getFieldError = useCallback((name, value, values) => {
    const stringValue = typeof value === "string" ? value.trim() : value;

    switch (name) {
      case "fullName": {
        if (!stringValue) {
          return "وارد کردن نام الزامی است.";
        }
        if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(stringValue)) {
          return "لطفاً فقط حروف فارسی یا لاتین وارد کنید.";
        }
        return undefined;
      }
      case "city": {
        if (!stringValue) {
          return "انتخاب شهر الزامی است.";
        }
        if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(stringValue)) {
          return "نام شهر باید فقط شامل حروف باشد.";
        }
        return undefined;
      }
      case "phone": {
        if (!stringValue) {
          return "شماره همراه خود را وارد کنید.";
        }
        if (!/^0\d{10}$/.test(stringValue)) {
          return "شماره همراه معتبر وارد کنید.";
        }
        return undefined;
      }
      case "email": {
        if (!stringValue) {
          return "ایمیل خود را وارد کنید.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
          return "ایمیل وارد شده معتبر نیست.";
        }
        return undefined;
      }
      case "password": {
        if (!stringValue) {
          return "رمز عبور را وارد کنید.";
        }
        if (stringValue.length < 8) {
          return "رمز عبور باید حداقل ۸ کاراکتر باشد.";
        }
        return undefined;
      }
      case "confirmPassword": {
        if (!stringValue) {
          return "تکرار رمز عبور الزامی است.";
        }
        if (values.password && stringValue !== values.password) {
          return "رمز عبور و تکرار آن یکسان نیست.";
        }
        return undefined;
      }
      case "bio":
      case "preferredServices": {
        if (!stringValue) {
          return "توضیح این بخش را تکمیل کنید.";
        }
        if (stringValue.length < 10) {
          return "لطفاً توضیحات کامل‌تری وارد کنید.";
        }
        return undefined;
      }
      case "serviceCategory":
      case "experience":
      case "propertyType": {
        if (!stringValue) {
          return "لطفاً یک گزینه را انتخاب کنید.";
        }
        return undefined;
      }
      default: {
        if (!stringValue) {
          return "پر کردن این فیلد الزامی است.";
        }
        return undefined;
      }
    }
  }, []);

  const updateFieldError = useCallback(
    (currentErrors, fieldName, values) => {
      const nextErrors = { ...currentErrors };
      const message = getFieldError(fieldName, values[fieldName], values);
      if (message) {
        nextErrors[fieldName] = message;
      } else {
        delete nextErrors[fieldName];
      }
      return nextErrors;
    },
    [getFieldError]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...formValues, [name]: value };
    setFormValues(nextValues);

    if (touchedFields[name]) {
      setErrors((prev) => updateFieldError(prev, name, nextValues));
    }

    if (name === "password" && touchedFields.confirmPassword) {
      setErrors((prev) => updateFieldError(prev, "confirmPassword", nextValues));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const updatedTouched = { ...touchedFields, [name]: true };
    setTouchedFields(updatedTouched);
    setErrors((prev) => updateFieldError(prev, name, formValues));

    if (name === "password" && updatedTouched.confirmPassword) {
      setErrors((prev) => updateFieldError(prev, "confirmPassword", formValues));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationMap = fields.reduce((acc, field) => {
      acc[field.name] = true;
      return acc;
    }, {});
    setTouchedFields(validationMap);

    const nextErrors = fields.reduce((acc, field) => {
      const message = getFieldError(field.name, formValues[field.name], formValues);
      if (message) {
        acc[field.name] = message;
      }
      return acc;
    }, {});

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ type: "error", message: "لطفاً خطاهای فرم را برطرف کنید." });
      return;
    }

    setErrors({});
    setStatus({
      type: "success",
      message: "درخواست شما با موفقیت ثبت شد. تیم پشتیبانی به زودی با شما تماس می‌گیرد.",
    });
  };

  const renderField = (field) => {
    const error = errors[field.name];
    const isInvalid = Boolean(error);
    const errorId = isInvalid ? `${field.name}-error` : undefined;

    if (field.type === "select") {
      return (
        <label key={field.name} className={styles.field}>
          <span className={styles.fieldLabel}>{field.label}</span>
          <div className={styles.selectWrapper}>
            <select
              name={field.name}
              className={`${styles.select} ${isInvalid ? styles.inputError : ""}`}
              value={formValues[field.name] ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={isInvalid}
              aria-describedby={errorId}
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
            {isInvalid ? (
              <span id={errorId} className={styles.fieldError}>
                {error}
              </span>
            ) : null}
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
            className={`${styles.input} ${styles.textarea} ${isInvalid ? styles.inputError : ""}`}
            rows={field.rows ?? 3}
            placeholder={field.placeholder}
            value={formValues[field.name] ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={isInvalid}
            aria-describedby={errorId}
          />
          {isInvalid ? (
            <span id={errorId} className={styles.fieldError}>
              {error}
            </span>
          ) : null}
        </label>
      );
    }

    return (
      <label key={field.name} className={styles.field}>
        <span className={styles.fieldLabel}>{field.label}</span>
        <input
          name={field.name}
          type={field.type}
          className={`${styles.input} ${isInvalid ? styles.inputError : ""}`}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          value={formValues[field.name] ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={isInvalid}
          aria-describedby={errorId}
        />
        {isInvalid ? (
          <span id={errorId} className={styles.fieldError}>
            {error}
          </span>
        ) : null}
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

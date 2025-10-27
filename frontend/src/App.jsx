import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RegistrationModal from "@/components/RegistrationModal/RegistrationModal";
import HomePage from "@/pages/Home/HomePage";
import RegisterPage from "@/pages/Register/RegisterPage";
import styles from "@/styles/Home.module.css";

const VIEW_HOME = "home";
const VIEW_REGISTER = "register";

const getInitialRoute = () => {
  if (typeof window === "undefined") {
    return { view: VIEW_HOME, role: "professional" };
  }

  const path = window.location.pathname.replace(/\/+$/, "");
  if (path.startsWith("/register")) {
    const [, , rawRole] = path.split("/");
    const role = rawRole === "customer" ? "customer" : "professional";
    return { view: VIEW_REGISTER, role };
  }

  return { view: VIEW_HOME, role: "professional" };
};

const App = () => {
  const [route, setRoute] = useState(() => {
    const initial = getInitialRoute();
    if (typeof window !== "undefined") {
      window.history.replaceState(initial, "", window.location.pathname);
    }
    return initial;
  });
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const navigate = useCallback(
    (view, role, { replace = false } = {}) => {
      setRoute((current) => {
        const nextRole = role ?? current.role ?? "professional";

        if (typeof window !== "undefined") {
          const state = { view, role: nextRole };
          if (view === VIEW_REGISTER) {
            const targetPath = `/register/${nextRole}`;
            if (replace) {
              window.history.replaceState(state, "", targetPath);
            } else {
              window.history.pushState(state, "", targetPath);
            }
          } else {
            if (replace) {
              window.history.replaceState(state, "", "/");
            } else {
              window.history.pushState(state, "", "/");
            }
          }
        }

        return { view, role: nextRole };
      });
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handlePopState = (event) => {
      const state = event.state;
      if (state?.view === VIEW_REGISTER) {
        setRoute({ view: VIEW_REGISTER, role: state.role ?? "professional" });
        return;
      }

      setRoute(getInitialRoute());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const openRegistrationModal = useCallback(() => {
    setIsRegistrationModalOpen(true);
  }, []);

  const closeRegistrationModal = useCallback(() => {
    setIsRegistrationModalOpen(false);
  }, []);

  const handleRegistrationSelect = useCallback(
    (selectedRole) => {
      closeRegistrationModal();
      navigate(VIEW_REGISTER, selectedRole);
    },
    [closeRegistrationModal, navigate]
  );

  const handleNavigateHome = useCallback(
    (hash) => {
      closeRegistrationModal();
      navigate(VIEW_HOME, undefined, { replace: route.view === VIEW_HOME && !hash });

      if (typeof window !== "undefined") {
        const targetHash = hash
          ? hash.startsWith("#")
            ? hash
            : `#${hash}`
          : "";
        const state = { view: VIEW_HOME, role: route.role ?? "professional" };
        window.history.replaceState(state, "", `/${targetHash}`);
        requestAnimationFrame(() => {
          if (hash) {
            const elementId = hash.replace("#", "");
            const element = document.getElementById(elementId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
      }
    },
    [closeRegistrationModal, navigate, route.role, route.view]
  );

  const handleRoleChange = useCallback(
    (nextRole) => {
      navigate(VIEW_REGISTER, nextRole, { replace: true });
    },
    [navigate]
  );

  const renderedPage = useMemo(() => {
    if (route.view === VIEW_REGISTER) {
      return (
        <RegisterPage
          role={route.role}
          onRoleChange={handleRoleChange}
          onNavigateHome={handleNavigateHome}
        />
      );
    }

    return <HomePage />;
  }, [handleNavigateHome, handleRoleChange, route.role, route.view]);

  return (
    <div className={styles.page}>
      <Navbar onProfessionalSignUp={openRegistrationModal} onNavigateHome={handleNavigateHome} />
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={closeRegistrationModal}
        onSelect={handleRegistrationSelect}
      />
      {renderedPage}
      <Footer />
    </div>
  );
};

export default App;

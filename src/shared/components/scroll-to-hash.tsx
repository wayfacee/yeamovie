import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToHash: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          element.click();
        }, 500);
      }
    }
  }, [hash]);

  return null;
};

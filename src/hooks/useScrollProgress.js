import { useEffect, useState } from "react";

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(scrollTop / totalScrollable);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return progress;
}


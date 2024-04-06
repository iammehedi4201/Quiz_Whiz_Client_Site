import { useEffect } from "react";

const useTimer = (initialTime: number, callback: () => void) => {
  useEffect(() => {
    let intervalId: number;
    if (initialTime > 0) {
      intervalId = setInterval(() => {
        callback();
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [initialTime, callback]);
};

export default useTimer;

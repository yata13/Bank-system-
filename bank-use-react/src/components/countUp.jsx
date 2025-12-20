import { useEffect, useState } from "react";

export default function CountUp({ start = 0, end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let current = start;
    const totalSteps = duration / 30;
    const increment = (end - start) / totalSteps;

    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setCount(Math.floor(current));
    }, 30);

    return () => clearInterval(interval);
  }, [start, end, duration]);

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <span>{formatNumber(count)}{suffix}</span>
  );
}

"use client";

import { createElement, useEffect, useRef, useState } from "react";

export default function Reveal({
  as = "section",
  className = "",
  delay = 0,
  children,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ...props,
      ref,
      className: `reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`,
      style: { "--reveal-delay": `${delay}ms`, ...props.style },
    },
    children,
  );
}

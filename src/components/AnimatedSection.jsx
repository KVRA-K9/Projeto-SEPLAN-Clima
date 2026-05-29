import React, { useEffect, useRef, useState } from 'react';

export function useAnimateOnScroll(threshold = 0.1, once = false) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Sempre visível quando está na viewport
            setIsVisible(true);
            // Só incrementa animKey na primeira vez (se once=true)
            if (!hasAnimated.current) {
              hasAnimated.current = true;
              setAnimKey((k) => k + 1);
            }
          } else if (!once) {
            // Se não for modo 'once', permite sumir quando sai da viewport
            setIsVisible(false);
          }
          // Se once=true e saiu da viewport: não faz nada (permanece visível)
        });
      },
      { threshold, rootMargin: '80px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isVisible, animKey };
}

export default function AnimatedSection({ children, style, className = '', threshold = 0.1, delay = 0, duration = 1000, once = false }) {
  const { ref, isVisible, animKey } = useAnimateOnScroll(threshold, once);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.98) translateY(12px)',
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        ...style
      }}
    >
      <div key={animKey}>
        {children}
      </div>
    </div>
  );
}

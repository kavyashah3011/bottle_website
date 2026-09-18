import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const isHovered = useRef(false);
  const currentText = useRef('');
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on non-touch desktop screens with standard motion preferences
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const container = containerRef.current;
    const inner = innerRef.current;
    const textSpan = textRef.current;
    if (!container || !inner || !textSpan) return;

    // Smooth RAF loop for 60fps/120fps lerp without React re-renders
    const renderLoop = () => {
      // Lerp position (factor 0.22)
      const factor = 0.22;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * factor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * factor;

      container.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        container.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor]');
      const nextHovered = Boolean(interactiveEl || target?.closest('button, a, input, [role="button"]'));
      const nextText = interactiveEl ? interactiveEl.getAttribute('data-cursor') || '' : '';

      // Only update DOM styles when hover state or text actually changes
      if (nextHovered !== isHovered.current || nextText !== currentText.current) {
        isHovered.current = nextHovered;
        currentText.current = nextText;

        if (nextHovered) {
          inner.className =
            'flex items-center justify-center rounded-full transition-all duration-300 ease-out w-16 h-16 bg-white/15 backdrop-blur-sm border border-brand-amber/60 scale-100';
        } else {
          inner.className =
            'flex items-center justify-center rounded-full transition-all duration-300 ease-out w-3 h-3 bg-brand-amber/80 border border-white/40 scale-100';
        }

        textSpan.textContent = nextText;
        textSpan.style.display = nextText ? 'block' : 'none';
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      container.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      container.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block opacity-0 transition-opacity duration-200"
      style={{
        transform: 'translate3d(-100px, -100px, 0)'
      }}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="flex items-center justify-center rounded-full transition-all duration-300 ease-out w-3 h-3 bg-brand-amber/80 border border-white/40 scale-100"
      >
        <span
          ref={textRef}
          className="text-[9px] font-bold tracking-widest text-brand-light uppercase text-center hidden"
        />
      </div>
    </div>
  );
}

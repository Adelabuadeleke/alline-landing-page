import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHeroAnimation({
  svgRef,
  gridRef,
  headlineRef,
  descriptionRef,
  formRef,
  onSVGComplete,
}) {
  const prefersReduced = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (prefersReduced.current) {
      gsap.set(
        [
          gridRef?.current,
          headlineRef?.current,
          descriptionRef?.current,
          formRef?.current,
        ].filter(Boolean),
        { opacity: 1, y: 0 },
      );
      onSVGComplete?.();
      return;
    }

    const svgEl = svgRef?.current;
    if (!svgEl) return;

    const outerPath = svgEl.querySelector('[data-logo-path="outer"]');
    const innerPath = svgEl.querySelector('[data-logo-path="inner"]');

    function initPath(path) {
      if (!path) return 0;
      try {
        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        return len;
      } catch {
        path.style.strokeDasharray = 3200;
        path.style.strokeDashoffset = 3200;
        return 3200;
      }
    }

    const outerLen = initPath(outerPath);
    const innerLen = initPath(innerPath);

    gsap.set(svgEl, { opacity: 0 });
    gsap.set(
      [
        gridRef?.current,
        headlineRef?.current,
        descriptionRef?.current,
        formRef?.current,
      ].filter(Boolean),
      { opacity: 0, y: 20 },
    );

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl
      /* ── Phase A: draw IN ── */
      .to(svgEl, { opacity: 1, duration: 0.2 })
      .to(
        outerPath,
        { strokeDashoffset: 0, duration: 1.55, ease: "power2.inOut" },
        "<",
      )
      .to(
        innerPath,
        { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" },
        "-=1.15",
      )
      .to(
        gridRef?.current,
        { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
        "-=0.7",
      )
      .to(
        headlineRef?.current,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5",
      )
      .to(
        descriptionRef?.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4",
      )
      .to(
        formRef?.current,
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        "-=0.35",
      )

      /* ── Hold ── */
      .to({}, { duration: 1.5 })

      /* ── Phase B: draw OUT — strokes retract ── */
      .to(innerPath, {
        strokeDashoffset: innerLen,
        duration: 0.9,
        ease: "power2.inOut",
      })
      .to(
        outerPath,
        { strokeDashoffset: outerLen, duration: 1.1, ease: "power2.inOut" },
        "-=0.6",
      )
      .to(
        svgEl,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => onSVGComplete?.(),
        },
        "-=0.3",
      );

    return () => {
      tl.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

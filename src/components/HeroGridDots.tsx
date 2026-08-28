import { useEffect, useRef } from "react";

const GRID      = 60;   // must match SVG grid cell size in px
const MAX_DOTS  = 55;   // max simultaneous active dots
const SPAWN_MS  = 140;  // ms between spawns
const DOT_R_MIN = 2.0;  // min dot radius in CSS px
const DOT_R_MAX = 3.5;  // max dot radius
const GLOW_MULT = 5.5;  // glow radius = dot radius × this
const MAX_ALPHA = 0.72; // peak opacity

interface Dot {
  x: number;
  y: number;
  r: number;
  life: number;  // 0 → 1
  rate: number;  // life per ms
}

const HeroGridDots = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let dots: Dot[] = [];
    let lastSpawn = 0;
    let raf = 0;
    let prev = 0;
    let canvasW = 0; // CSS px
    let canvasH = 0;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvasW = parent.offsetWidth;
      canvasH = parent.offsetHeight;
      canvas.width  = Math.round(canvasW * dpr);
      canvas.height = Math.round(canvasH * dpr);
      canvas.style.width  = `${canvasW}px`;
      canvas.style.height = `${canvasH}px`;
    }

    function spawn(now: number) {
      if (now - lastSpawn < SPAWN_MS) return;
      if (dots.length >= MAX_DOTS) return;
      lastSpawn = now;

      // The SVG grid uses backgroundPosition:"center top"
      // so intersection columns are offset by (width % GRID) / 2
      const offsetX = (canvasW % GRID) / 2;
      const offsetY = 0; // "top". Starts flush

      const cols = Math.floor((canvasW - offsetX) / GRID) + 1;
      const rows = Math.floor(canvasH / GRID) + 1;
      if (cols < 1 || rows < 1) return;

      let x: number, y: number, attempts = 0;
      do {
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        x = offsetX + col * GRID;
        y = offsetY + row * GRID;
        attempts++;
      } while (
        attempts < 10 &&
        dots.some(d => d.x === x && d.y === y)
      );

      dots.push({
        x,
        y,
        r:    DOT_R_MIN + Math.random() * (DOT_R_MAX - DOT_R_MIN),
        life: 0,
        rate: 0.0006 + Math.random() * 0.0004,
      });
    }

    function draw(now: number) {
      const dt = prev ? Math.min(now - prev, 50) : 16;
      prev = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      spawn(now);
      dots = dots.filter(d => d.life < 1);

      for (const d of dots) {
        d.life = Math.min(1, d.life + d.rate * dt);

        // fade-in 0→0.2, hold 0.2→0.8, fade-out 0.8→1
        let alpha: number;
        if (d.life < 0.2) {
          alpha = d.life / 0.2;
        } else if (d.life < 0.8) {
          alpha = 1;
        } else {
          alpha = (1 - d.life) / 0.2;
        }
        alpha = Math.max(0, alpha) * MAX_ALPHA;

        const gr = d.r * GLOW_MULT;
        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, gr);
        grd.addColorStop(0,    `rgba(0,144,255,${(alpha * 0.95).toFixed(3)})`);
        grd.addColorStop(0.25, `rgba(0,144,255,${(alpha * 0.55).toFixed(3)})`);
        grd.addColorStop(0.6,  `rgba(0,144,255,${(alpha * 0.15).toFixed(3)})`);
        grd.addColorStop(1,    `rgba(0,144,255,0)`);

        // Glow halo
        ctx.beginPath();
        ctx.arc(d.x, d.y, gr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Crisp centre dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,144,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    // Respect prefers-reduced-motion: the dots are purely decorative, so when
    // the user asks for reduced motion we size the canvas but never start the
    // animation loop (leaving it blank rather than animating).
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: -9,
        maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
      }}
    />
  );
};

export default HeroGridDots;

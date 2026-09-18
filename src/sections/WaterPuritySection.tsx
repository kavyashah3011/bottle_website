import { useRef, useEffect, useState } from 'react';
import { Droplets, ShieldCheck, Mountain, Activity } from 'lucide-react';

export function WaterPuritySection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for fluid physics
    const nodeCount = 50;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1.2,
      baseAlpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse influence
      const mx = mousePos.x * width;
      const my = mousePos.y * height;

      // Draw particle connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Bounce borders
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Subtle mouse repulsion
        const dx = n1.x - mx;
        const dy = n1.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          n1.x += (dx / dist) * 1.5;
          n1.y += (dy / dist) * 1.5;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${n1.baseAlpha})`;
        ctx.fill();

        // Connect near nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d2 = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (d2 < 90) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - d2 / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section id="water" className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-black border-t border-white/5 overflow-hidden">
      {/* Background aquatic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-aqua/8 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono tracking-mega text-brand-aqua uppercase">
              // THE SOURCE & CHEMISTRY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
              SUBTERRANEAN PURITY
            </h2>
            <span className="text-sm font-serif-luxury tracking-widest text-white/50 italic">
              Filtered by 18 Years of Alpine Basalt
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-brand-amber tracking-widest">
              CERTIFIED LABORATORY ASSAY
            </span>
          </div>
        </div>

        {/* Interactive Fluid Canvas Container */}
        <div
          onMouseMove={handleMouseMove}
          className="relative w-full rounded-2xl overflow-hidden glass-panel border border-brand-aqua/20 p-8 sm:p-12 flex flex-col justify-between min-h-[420px]"
        >
          {/* Background Interactive Particle Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          <div className="relative z-10 max-w-xl flex flex-col gap-4">
            <span className="text-[10px] font-mono tracking-mega text-brand-aqua uppercase">
              Interactive Fluid Dynamics • Move Cursor to Disrupt
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              MICRO-STRUCTURED HYDRATION.
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              Untouched by modern pollutants, rain and glacial melt percolate through dense igneous basalt rock at 2,840 meters elevation. The result is an alkaline composition rich in bioavailable trace minerals with low surface tension.
            </p>
          </div>

          {/* 4 Purity Metrics Bar */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Natural pH</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-amber">7.85</span>
              <span className="text-[10px] text-white/50">Optimal blood alkalinity</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Total Dissolved Solids</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">42 mg/L</span>
              <span className="text-[10px] text-white/50">Light crisp palate feel</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Microplastics</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-aqua">0.00 ppm</span>
              <span className="text-[10px] text-white/50">100% Flint glass sealed</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Filtration Age</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">18 Yrs</span>
              <span className="text-[10px] text-white/50">Subterranean cycle</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

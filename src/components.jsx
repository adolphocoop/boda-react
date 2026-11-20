import { useState, useEffect, useRef } from "react";
import { TARGET } from "./data.js";

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { el && el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={"rv " + className} style={{ transitionDelay: delay + "ms" }}>{children}</div>;
}

export function Petals() {
  const items = Array.from({ length: 16 }, (_, i) => ({
    left: (i * 6.4 + (i % 3) * 3) % 100,
    size: 10 + (i * 7) % 14,
    dur: 12 + (i * 5) % 12,
    delay: -((i * 3) % 14),
    dx: ((i % 2 ? 1 : -1) * (40 + (i * 11) % 90)) + "px",
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} className="petal" style={{ left: p.left + "%", width: p.size, height: p.size, animationDuration: p.dur + "s", animationDelay: p.delay + "s", "--dx": p.dx }} />
      ))}
    </div>
  );
}

export function Countdown() {
  const calc = () => Math.max(0, TARGET - new Date());
  const [ms, setMs] = useState(calc());
  useEffect(() => { const t = setInterval(() => setMs(calc()), 1000); return () => clearInterval(t); }, []);
  const s = Math.floor(ms / 1000);
  const parts = [["Días", Math.floor(s / 86400)], ["Horas", Math.floor(s / 3600) % 24], ["Min", Math.floor(s / 60) % 60], ["Seg", s % 60]];
  return (
    <div className="flex gap-3 sm:gap-6 justify-center">
      {parts.map(([l, v]) => (
        <div key={l} className="card rounded-2xl w-16 sm:w-24 py-3 sm:py-4 shadow-sm">
          <div className="text-3xl sm:text-5xl font-semibold tabular-nums">{String(v).padStart(2, "0")}</div>
          <div className="text-xs sm:text-sm tracking-widest uppercase mute">{l}</div>
        </div>
      ))}
    </div>
  );
}

export function Art({ kind }) {
  const C = "#b89b72";
  const arts = {
    rings: <g fill="none" stroke={C} strokeWidth="3"><circle cx="75" cy="105" r="34"/><circle cx="125" cy="105" r="34"/><path d="M100 52l8 10-8 8-8-8z" fill={C}/></g>,
    flower: <g fill="#fff" stroke={C} strokeWidth="2">{[0,60,120,180,240,300].map(a => <ellipse key={a} cx="100" cy="68" rx="14" ry="30" transform={`rotate(${a} 100 100)`}/>)}<circle cx="100" cy="100" r="11" fill={C}/></g>,
    heart: <path d="M100 150C40 110 50 60 82 60c10 0 16 6 18 12 2-6 8-12 18-12 32 0 42 50-18 90z" fill="none" stroke={C} strokeWidth="3"/>,
    glass: <g fill="none" stroke={C} strokeWidth="3"><path d="M70 55h30l-4 40a11 11 0 0 1-22 0z"/><path d="M104 55h30l-4 40a11 11 0 0 1-22 0z" transform="translate(6 0)"/><path d="M85 106v40m-10 0h20M125 106v40m-10 0h20"/></g>,
    arch: <g fill="none" stroke={C} strokeWidth="3"><path d="M55 160V95a45 45 0 0 1 90 0v65z"/><path d="M70 160V97a30 30 0 0 1 60 0v63"/></g>,
    cake: <g fill="none" stroke={C} strokeWidth="3"><rect x="62" y="125" width="76" height="26" rx="4"/><rect x="76" y="98" width="48" height="27" rx="4"/><rect x="88" y="74" width="24" height="24" rx="4"/><path d="M100 60v14"/></g>,
  };
  return <svg viewBox="0 0 200 200" className="w-full h-full">{arts[kind]}</svg>;
}

export function Rsvp() {
  const [name, setName] = useState("");
  const [n, setN] = useState("1");
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="card rounded-3xl p-10 pop">
      <div className="script text-5xl acc">¡Gracias, {name}!</div>
      <p className="mute mt-3">Hemos registrado tu confirmación para {n} {n === "1" ? "persona" : "personas"}. Nos hará muy felices compartir ese día contigo.</p>
    </div>
  );
  return (
    <div className="card rounded-3xl p-8 sm:p-10 text-left space-y-5 shadow-sm">
      <label className="block">
        <span className="text-sm tracking-widest uppercase mute">Tu nombre</span>
        <input value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl px-4 py-3" placeholder="Nombre y apellido" />
      </label>
      <label className="block">
        <span className="text-sm tracking-widest uppercase mute">Asistentes</span>
        <select value={n} onChange={e => setN(e.target.value)} className="mt-2 w-full rounded-xl px-4 py-3">
          {[1, 2, 3, 4, 5].map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </label>
      {/* Aquí puedes enviar los datos a tu backend, Formspree, Google Forms, etc. */}
      <button onClick={() => name.trim() && setDone(true)} className="btn w-full rounded-full py-4 uppercase text-sm">Confirmar asistencia</button>
    </div>
  );
}

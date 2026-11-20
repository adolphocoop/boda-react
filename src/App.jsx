import { Reveal, Petals, Countdown, Art, Rsvp } from "./components.jsx";
import { NOVIOS, tiles, story, eventos, ORACION } from "./data.js";

// Carga automáticamente todas las imágenes de src/images (orden alfabético por nombre de archivo)
const fotos = Object.entries(
  import.meta.glob("./images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}", { eager: true, import: "default" })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

export default function App() {
  return (
    <main>
      <section className="hero relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-16">
        <Petals />
        <div className="relative z-10">
          <p className="h1 tracking-[.4em] uppercase text-sm mute">¡Nos casamos!</p>
          <h1 className="h2 script text-7xl sm:text-9xl my-4 leading-tight">{NOVIOS[0]} <span className="acc">&amp;</span> {NOVIOS[1]}</h1>
          <div className="h3">
            <div className="line w-48 mx-auto mb-5" />
            <p className="text-2xl sm:text-3xl tracking-widest">26 · DICIEMBRE · 2026</p>
            <div className="mt-10"><Countdown /></div>
          </div>
        </div>
        <div className="absolute bottom-6 text-3xl acc float" aria-hidden="true">↓</div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <Reveal>
          <h2 className="script text-6xl acc">Nuestra historia</h2>
          <p className="mute mt-4">Cada capítulo nos trajo hasta aquí.</p>
        </Reveal>
        <div className="mt-14 space-y-10 text-left border-l border-[color:var(--line)] pl-8 ml-2">
          {story.map(([y, t, d], i) => (
            <Reveal key={y} delay={i * 120}>
              <div className="relative">
                <span className="absolute -left-[41px] top-2 w-4 h-4 rounded-full" style={{ background: "var(--accent)" }} />
                <div className="acc tracking-widest text-sm">{y}</div>
                <h3 className="text-2xl font-semibold">{t}</h3>
                <p className="mute">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section >
      <section className="hero relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-16">
           <div>
           <div className="card rounded-3xl p-8 text-center h-full shadow-sm hover:-translate-y-2 transition-transform duration-500">
            <h4 className="script text-6xl acc mt-2">Nuestros Padres</h4>
            <h2 className="text-3xl acc mt-2">Novia</h2>
            <p className="h1 tracking-[.4em] uppercase text-sm mute">Melda Campos Bañuelos</p>      
            <p className="h1 tracking-[.4em] uppercase text-sm mute">Pedro Aguilera Márquez</p>
            <h2 className="text-3xl acc mt-2">Novio</h2>
            <p className="h1 tracking-[.4em] uppercase text-sm mute">Nacy Ortiz</p>
            <p className="h1 tracking-[.4em] uppercase text-sm mute">Jaime Martínez</p>


              </div>

        </div>
      </section>

       <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto text-center card rounded-3xl px-8 py-12 sm:px-14 shadow-sm">
          <Reveal>
            <div className="acc text-3xl float" aria-hidden="true">✦</div>
            <h2 className="script text-6xl acc mt-2">Nuestra oración</h2>
            <div className="line w-40 mx-auto my-6" />
          </Reveal>
          <div className="space-y-5 text-xl sm:text-2xl italic leading-relaxed">
            {ORACION.map((p, i) => (
              <Reveal key={i} delay={i * 150}><p>{p}</p></Reveal>
            ))}
          </div>
          <Reveal delay={900}><p className="script text-4xl acc mt-8">Amén</p></Reveal>
        </div>
      </section>
      <section className="bg2 py-24 px-6">
        <Reveal className="text-center mb-12">
          <h2 className="script text-6xl acc">Momentos</h2>
          {fotos.length === 0 && <p className="mute mt-3">Agrega tus fotos en la carpeta src/images.</p>}
        </Reveal>
        <div className={"mx-auto grid grid-cols-2 gap-4 sm:gap-6 " + (fotos.length > 0 && fotos.length < 3 ? "max-w-3xl" : "max-w-5xl md:grid-cols-3")}>
          {fotos.length > 0
            ? fotos.map((src, i) => (
                <Reveal key={src} delay={(i % 6) * 100}>
                  <div className="tile rounded-3xl aspect-[3/4]" style={{ background: "var(--bg2)" }}>
                    <img src={src} alt={"Foto " + (i + 1) + " de los novios"} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                </Reveal>
              ))
            : tiles.map((t, i) => (
                <Reveal key={t.kind} delay={i * 100}>
                  <div className="tile rounded-3xl aspect-square relative" style={{ background: t.bg }}>
                    <Art kind={t.kind} />
                    <span className="absolute bottom-3 left-0 right-0 text-center tracking-widest uppercase text-xs mute">{t.label}</span>
                  </div>
                </Reveal>
              ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <Reveal className="text-center mb-12"><h2 className="script text-6xl acc">El gran día</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {eventos.map(([t, h, l, d], i) => (
            <Reveal key={t} delay={i * 150}>
              <div className="card rounded-3xl p-8 text-center h-full shadow-sm hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-3xl font-semibold">{t}</h3>
                <div className="acc text-2xl mt-2">{h}</div>
                <p className="mt-3">{l}</p>
                <p className="mute">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        
      </section>
      <section className="max-w-4xl mx-auto px-6 py-24">
        <Reveal className="text-center mb-12"><h2 className="script text-6xl acc">Regalos</h2></Reveal> 
        <div>
           <div className="card rounded-3xl p-8 text-center h-full shadow-sm hover:-translate-y-2 transition-transform duration-500">
                
          <p style={{ textAlign: "center" }}>Su presencia es nuestro mejor regalo; si desean tener un detalle, agradecemos su aporte en efectivo o transferencia.</p>
              </div>

        </div>
      </section>

      <section id="rsvp" className="bg2 py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <Reveal><h2 className="script text-6xl acc">¿Nos acompañas?</h2><p className="mute mt-3 mb-8"></p></Reveal>
          <Reveal delay={150}><Rsvp /></Reveal>
        </div>
      </section>

      <footer className="text-center py-14 px-6">
        <div className="script text-5xl acc float">{NOVIOS[0][0]} &amp; {NOVIOS[1][0]}</div>
        <p className="mute mt-3 tracking-widest text-sm uppercase">26 · 12 · 2026 — Con amor</p>
      </footer>
    </main>
  );
}

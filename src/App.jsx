import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

const WEDDING = new Date('2026-12-10T10:30:00+05:30')
const GALLERY = [
  ['/hero.jpg','Saravanan and Ragasudha together'],['/gallery1.jpg','A candid laugh together'],
  ['/couple2.jpg','A close moment'],['/gallery2.jpg','A joyful greeting'],['/gallery3.jpg','Exchanging a bouquet'],
  ['/gallery4.jpg','A close moment'],['/gallery5.jpg','With friends'],['/gallery6.jpg','With family'],
  ['/gallery7.jpg','Together with everyone'],['/gallery8.jpg','A close circle'],
  ['/gallery9.jpg','With extended family'],['/gallery10.jpg','Surrounded by loved ones'],
]
const EVENTS = [
  { bg:'/eventbg-wedding.jpg', color:'#5a3200', eyebrow:'FOREVER BEGINS HERE', title:'The Wedding',
    sub:'Join us as we exchange vows and become one.', rows:[['Date','10 December 2026'],['Time','10:30 AM to 12:00 AM'],['Venue','ANUT Mahal, Aruppukottai']],
    map:'https://maps.app.goo.gl/SPz3SK3NY4kxVBCw5',
    cal:'https://www.google.com/calendar/render?action=TEMPLATE&text=The+Wedding&dates=20261210T103000%2F20261210T120000&location=ANUT+Mahal%2C+Aruppukottai&details=Join+us+as+we+exchange+vows+and+become+one.' },
  { bg:'/eventbg-reception.jpg', color:'#6b1e48', eyebrow:'AN EVENING TO REMEMBER', title:'Engagement',
    sub:'An evening of celebration, food and festivities.', rows:[['Date','09 December 2026'],['Time','7:00 PM onwards'],['Venue','ANUT Mahal, Aruppukottai']],
    map:'https://maps.app.goo.gl/SPz3SK3NY4kxVBCw5',
    cal:'https://www.google.com/calendar/render?action=TEMPLATE&text=Reception&dates=20261209T190000%2F20261209T210000&location=ANUT+Mahal%2C+Aruppukottai&details=An+evening+of+celebration%2C+food+and+festivities.' },
]

function Reveal({ children, delay = 0, style, className, as = 'div' }) {
  const M = motion[as]
  return (
    <M className={className} style={style} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease: 'easeOut' }}>
      {children}
    </M>
  )
}

function Corner({ pos }) {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" style={{ position: 'absolute', opacity: .55, ...pos }}>
      <path d="M2 2 C 2 20, 20 2, 44 2" fill="none" stroke="var(--gold)" strokeWidth="1" />
      <circle cx="44" cy="2" r="2.2" fill="var(--gold)" />
      <path d="M2 2 C 2 20, 2 2, 2 30" fill="none" stroke="var(--gold)" strokeWidth="1" />
      <circle cx="2" cy="30" r="2.2" fill="var(--gold)" />
    </svg>
  )
}

const SPARKS = [[8,5,63],[18,3,37],[28,4,4],[40,3,37],[55,5,75],[68,3,9],[80,4,61],[90,3,85]]

function Seal() {
  const dots = Array.from({ length: 20 }, (_, i) => { const a = (i / 20) * Math.PI * 2; return [29 + 27 * Math.cos(a), 29 + 27 * Math.sin(a)] })
  return (
    <svg width="58" height="58" viewBox="0 0 58 58">
      <defs><radialGradient id="sealWax" cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#9b3363" /><stop offset="70%" stopColor="#6b1e48" /><stop offset="100%" stopColor="#4a1430" />
      </radialGradient></defs>
      {dots.map((d, i) => <circle key={i} cx={d[0]} cy={d[1]} r=".9" fill="rgba(255,255,255,0.35)" />)}
      <circle cx="29" cy="29" r="24" fill="url(#sealWax)" stroke="rgba(255,255,255,0.25)" />
      <circle cx="29" cy="29" r="18.5" fill="none" stroke="rgba(240,208,128,0.55)" strokeWidth=".75" />
      <text x="29" y="34" textAnchor="middle" fontFamily="var(--font-display)" fontStyle="italic" fontWeight="600" fontSize="17" fill="var(--gold-light)">
        S<tspan fontSize="11" dy="-1">&amp;</tspan><tspan dy="1">R</tspan>
      </text>
    </svg>
  )
}

function Cover({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const start = () => { if (opening) return; setOpening(true); setTimeout(onOpen, 1700) }
  return (
    <motion.div exit={{ y: '-100%', opacity: 0 }} transition={{ duration: .9, ease: 'easeInOut' }} onClick={start}
      style={{ position: 'fixed', inset: 0, zIndex: 200, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 28%, #fffdf8 0%, #f7efdf 45%, #ecdfc4 100%)' }}>
      {SPARKS.map(([l, s, h], i) => (
        <motion.div key={i} initial={{ y: 0, opacity: 0 }} animate={{ y: `-${h}vh`, opacity: [0, 1, 0] }} transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeOut' }}
          style={{ position: 'absolute', bottom: 0, left: `${l}%`, width: s, height: s, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 6px rgba(201,148,42,.6)', pointerEvents: 'none' }} />
      ))}
      <Corner pos={{ top: 24, left: 24 }} />
      <Corner pos={{ top: 24, right: 24, transform: 'scaleX(-1)' }} />
      <Corner pos={{ bottom: 24, left: 24, transform: 'scaleY(-1)' }} />
      <Corner pos={{ bottom: 24, right: 24, transform: 'scale(-1,-1)' }} />
      <div className="eyebrow" style={{ marginBottom: 10 }}>With Love &amp; Joy</div>
      <div className="gold-shimmer" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(34px,5.5vw,60px)', textAlign: 'center', lineHeight: 1.15, padding: '0 20px' }}>Saravanan &amp; Ragasudha</div>
      <p style={{ fontStyle: 'italic', fontSize: 14, color: 'var(--text-medium)', marginTop: 4 }}>request the pleasure of your company</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '10px 0 22px' }}>
        <span style={{ width: 26, height: 1, background: 'var(--gold)', opacity: .6 }} />
        <span style={{ width: 5, height: 5, background: 'var(--gold)', transform: 'rotate(45deg)' }} />
        <span style={{ width: 26, height: 1, background: 'var(--gold)', opacity: .6 }} />
      </div>
      <motion.div animate={{ y: opening ? 0 : [0, -5, 0] }} transition={{ duration: 3, repeat: opening ? 0 : Infinity }} style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -30, background: 'radial-gradient(circle, rgba(201,148,42,.28) 0%, transparent 70%)', filter: 'blur(4px)', zIndex: -1 }} />
        <div style={{ position: 'relative', width: 220, height: 150 }}>
          <motion.div animate={opening ? { y: -70, opacity: 1 } : { y: 0, opacity: 0 }} transition={{ delay: .6, duration: .8 }}
            style={{ position: 'absolute', left: '50%', top: 30, width: 168, height: 108, marginLeft: -84, background: 'linear-gradient(#fff,#fdf8ee)', borderRadius: 4, border: '1px solid rgba(201,148,42,.4)', boxShadow: '0 10px 24px rgba(90,50,0,.18)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: 'var(--gold-deep)' }}>S &amp; R</span>
            <span style={{ width: 30, height: 1, background: 'var(--gold)', opacity: .5 }} />
            <span style={{ fontFamily: 'var(--font-label)', fontSize: 8, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--text-medium)' }}>10 · 12 · 2026</span>
          </motion.div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(#fffaf0,#f3e6cd)', border: '1px solid var(--gold)', borderRadius: 6, boxShadow: '0 20px 44px rgba(90,50,0,.22), inset 0 0 0 3px rgba(255,255,255,.5)', zIndex: 2 }} />
          <div style={{ position: 'absolute', inset: 6, border: '1px solid rgba(201,148,42,.35)', borderRadius: 3, pointerEvents: 'none', zIndex: 2 }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 6, overflow: 'hidden', zIndex: 2, background: 'linear-gradient(135deg, transparent 49.3%, rgba(201,148,42,.35) 50%, transparent 50.7%), linear-gradient(45deg, transparent 49.3%, rgba(201,148,42,.35) 50%, transparent 50.7%)' }} />
          <motion.div animate={opening ? { rotateX: 180 } : { rotateX: 0 }} transition={{ duration: .7, delay: .3 }}
            style={{ position: 'absolute', top: -1, left: -1, width: 222, height: 76, background: 'linear-gradient(#fdf3df,#ecd9ae)', clipPath: 'polygon(0 0,100% 0,50% 100%)', transformOrigin: 'center top', zIndex: opening ? 1 : 4 }} />
          <motion.div animate={opening ? { opacity: 0, scale: 1.4 } : { opacity: 1, scale: 1 }} transition={{ duration: .3 }}
            style={{ position: 'absolute', top: 76, left: '50%', marginLeft: -29, width: 58, height: 58, zIndex: 5, filter: 'drop-shadow(0 6px 10px rgba(107,30,72,.4))' }}>
            <Seal />
          </motion.div>
        </div>
      </motion.div>
      <motion.p animate={{ opacity: opening ? 0 : 1 }} initial={{ opacity: 0 }} transition={{ delay: 1 }}
        style={{ marginTop: 30, fontFamily: 'var(--font-label)', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-medium)' }}>Tap the seal to open</motion.p>
    </motion.div>
  )
}

function Hero() {
  return (
    <section style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("photos/hero.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center 20%', backgroundColor: '#3a2a1a' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,.55) 0%, rgba(0,0,0,.15) 20%, transparent 38%, transparent 55%, rgba(0,0,0,.6) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Reveal style={{ padding: 'clamp(28px,5vw,56px) 24px 18px', textAlign: 'center' }}>
          <div style={{ width: 'clamp(54px,6vw,76px)', height: 'clamp(68px,6vw,76px)', margin: '0 auto 10px', borderRadius: '50%', border: '1px solid rgba(255,255,255,.85)', background: 'rgba(0,0,0,.22)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-script)', fontSize: 'clamp(20px,2.4vw,30px)', color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.7)' }}>S&amp;R</div>
          <div className="eyebrow" style={{ color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.7)' }}>Together With Our Families</div>
        </Reveal>
        <div style={{ flex: 1, minHeight: 140 }} />
        <Reveal className="glass-card" delay={.2} style={{ padding: 'clamp(20px,3vw,40px) clamp(24px,4vw,56px) clamp(32px,4vw,48px)', margin: '0 auto clamp(24px,4vw,44px)', maxWidth: 560, width: 'calc(100% - 24px)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(46px,8vw,84px)', lineHeight: 1.15, color: '#fff' }}>Saravanan</div>
          <div style={{ fontFamily: 'var(--font-label)', fontSize: 'clamp(13px,1.4vw,16px)', letterSpacing: '.35em', color: 'var(--gold-light)', margin: '2px 0' }}>AND</div>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(46px,8vw,84px)', lineHeight: 1.15, color: '#fff' }}>Ragasudha</div>
          <div className="divider" style={{ background: 'var(--gold-light)' }} />
          <div style={{ fontFamily: 'var(--font-label)', fontSize: 'clamp(13px,1.4vw,16px)', letterSpacing: '.15em', color: 'rgba(255,255,255,.85)' }}>10 · 12 · 2026 &nbsp;·&nbsp; Aruppukottai</div>
        </Reveal>
      </div>
    </section>
  )
}

function Countdown() {
  const calc = () => { const d = Math.max(0, WEDDING - new Date()); return [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60] }
  const [t, setT] = useState(calc)
  useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i) }, [])
  const L = ['Days', 'Hours', 'Minutes', 'Seconds']
  return (
    <section style={{ position: 'relative', minHeight: '70svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', padding: 'clamp(80px,10vh,140px) 24px clamp(60px,8vh,110px)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("photos/couple2.png")', backgroundSize: 'cover', backgroundPosition: 'center 12%', backgroundColor: '#3a2a1a' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(255,250,240,.85) 0%, rgba(245,236,224,.90) 100%)' }} />
      <div className="content-col" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Reveal as="p" className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Counting Down To</Reveal>
        <Reveal as="h2" className="gold-shimmer" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(44px,7vw,76px)', margin: '6px 0 clamp(30px,4vw,44px)', fontWeight: 400 }}>Our Wedding Day</Reveal>
        <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(10px,1.5vw,18px)' }}>
          {t.map((n, i) => (
            <div key={i} className="glass-card" style={{ padding: 'clamp(16px,2.5vw,28px) 4px' }}>
              <div style={{ fontSize: 'clamp(30px,5vw,56px)', fontWeight: 600, color: 'var(--gold)' }}>{String(n).padStart(2, '0')}</div>
              <div style={{ fontFamily: 'var(--font-label)', fontSize: 'clamp(10px,1.2vw,13px)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold-deep)', marginTop: 4 }}>{L[i]}</div>
            </div>
          ))}
        </Reveal>
        <Reveal as="p" style={{ marginTop: 26, fontFamily: 'var(--font-label)', fontSize: 'clamp(13px,1.4vw,16px)', letterSpacing: '.05em', color: 'var(--gold-deep)' }}>We can't wait to celebrate with you</Reveal>
      </div>
    </section>
  )
}

function EventSection({ e }) {
  const btn = { display: 'inline-block', marginTop: 22, padding: '12px 22px', borderRadius: 999, fontFamily: 'var(--font-label)', fontSize: 13, letterSpacing: '.08em', textDecoration: 'none', textTransform: 'uppercase' }
  return (
    <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(70px,9vh,120px) 28px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("photos/photo1.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center 20%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(253,248,240,.94) 0%, rgba(253,248,240,.80) 40%, rgba(253,248,240,.86) 100%)' }} />
      <div className="content-col" style={{ position: 'relative', zIndex: 2 }}>
        <Reveal as="p" className="eyebrow" style={{ color: e.color }}>{e.eyebrow}</Reveal>
        <Reveal as="h2" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(52px,8vw,84px)', color: e.color, margin: '4px 0 14px', fontWeight: 400 }}>{e.title}</Reveal>
        <Reveal as="p" style={{ fontSize: 'clamp(18px,2vw,24px)', fontStyle: 'italic', color: 'var(--text-medium)', marginBottom: 26, maxWidth: 420 }}>{e.sub}</Reveal>
        <Reveal style={{ border: `1px solid ${e.color}33`, borderRadius: 14, padding: 'clamp(20px,3vw,32px) clamp(22px,3vw,34px)', background: 'rgba(255,255,255,.55)', backdropFilter: 'blur(6px)' }}>
          {e.rows.map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(0,0,0,.06)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 'clamp(12px,1.3vw,14px)', letterSpacing: '.1em', textTransform: 'uppercase', color: e.color }}>{k}</span>
              <span style={{ fontSize: 'clamp(15px,1.6vw,18px)', color: 'var(--text-dark)', textAlign: 'right' }}>{v}</span>
            </div>
          ))}
        </Reveal>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <motion.a href={e.map} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ ...btn, border: `1px solid ${e.color}`, color: e.color }}>View on Map</motion.a>
          <motion.a href={e.cal} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} style={{ ...btn, background: e.color, color: '#fff' }}>Add to Calendar</motion.a>
        </div>
      </div>
    </section>
  )
}

// function Gallery() {
//   const [big, setBig] = useState(null)
//   return (
//     <section style={{ minHeight: '100svh', padding: 'clamp(70px,9vh,120px) clamp(20px,4vw,56px)', background: 'var(--cream)' }}>
//       <div style={{ textAlign: 'center', marginBottom: 'clamp(28px,4vw,48px)' }}>
//         <Reveal as="p" className="eyebrow">A Few Of Our Moments</Reveal>
//         <Reveal as="h2" className="gold-shimmer" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(42px,7vw,72px)', marginTop: 6, fontWeight: 400 }}>Our Journey</Reveal>
//         <Reveal as="p" style={{ fontFamily: 'var(--font-label)', fontSize: 12, color: 'var(--text-medium)', marginTop: 6 }}>Hover or tap a photo to see it larger</Reveal>
//       </div>
//       <div className="gallery-masonry content-col--wide">
//         {GALLERY.map(([src, alt]) => (
//           <motion.div key={src} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} whileHover={{ scale: 1.03 }}
//             onClick={() => setBig(src)}
//             style={{ breakInside: 'avoid', marginBottom: 10, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(201,148,42,.35)', cursor: 'pointer', position: 'relative', boxShadow: '0 4px 14px rgba(0,0,0,.08)' }}>
//             <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
//           </motion.div>
//         ))}
//       </div>
//       <AnimatePresence>
//         {big && (
//           <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBig(null)}>
//             <img src={big} alt="" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   )
// }

function Final() {
  return (
    <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(80px,10vh,140px) 28px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("photos/hero.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center 25%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(255,250,240,.80) 0%, rgba(245,236,224,.90) 100%)' }} />
      <div className="content-col" style={{ position: 'relative', zIndex: 2 }}>
        <Reveal style={{ width: 56, height: 56, margin: '0 auto 18px', borderRadius: '50%', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-script)', fontSize: 22, color: 'var(--gold-deep)' }}>S&amp;R</Reveal>
        <Reveal as="h2" className="gold-shimmer" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(42px,7vw,72px)', marginBottom: 10, fontWeight: 400 }}>With Love &amp; Gratitude</Reveal>
        <Reveal as="p" style={{ fontSize: 'clamp(16px,1.8vw,20px)', color: 'var(--text-medium)', maxWidth: 460, margin: '0 auto 22px', lineHeight: 1.6 }}>Your presence is the greatest gift we could ask for. We can't wait to begin this new chapter surrounded by the people we love most.</Reveal>
        <Reveal className="divider" />
        <Reveal as="p" className="eyebrow" style={{ marginTop: 10 }}>#SaravananWedsRagasudha</Reveal>
      </div>
    </section>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [muted, setMuted] = useState(false)
  const audio = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => { document.body.style.overflow = opened ? '' : 'hidden' }, [opened])
  const open = () => { setOpened(true); audio.current?.play().catch(() => {}) }
  const toggle = () => { const m = !muted; setMuted(m); if (audio.current) audio.current.muted = m }

  return (
    <>
      <audio ref={audio} src="/music.mp3" loop preload="auto" />
      <AnimatePresence>{!opened && <Cover onOpen={open} />}</AnimatePresence>
      <motion.div style={{ scaleY, position: 'fixed', right: 0, top: 0, width: 3, height: '100vh', background: 'linear-gradient(180deg,var(--gold),var(--gold-light))', transformOrigin: 'center top', zIndex: 9999 }} />
      <button aria-label={muted ? 'Unmute music' : 'Mute music'} onClick={toggle}
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.25)', color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        {muted ? '🔇' : '🔊'}
      </button>
      <main>
        <Hero />
        <Countdown />
        {EVENTS.map(e => <EventSection key={e.title} e={e} />)}
        {/* <Gallery /> */}
        <Final />
      </main>
    </>
  )
}

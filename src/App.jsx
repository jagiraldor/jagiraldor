import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { links, skills, education, featured } from './data.js'
import { Reveal, Divider, Skills, Contact, ProjectCard } from './ui.jsx'

const routes = [
  { id: 'inicio', label: 'Inicio', icon: 'fa-house' },
  { id: 'sobre-mi', label: 'Sobre mí', icon: 'fa-user' },
  { id: 'proyectos', label: 'Proyectos', icon: 'fa-code' }
]

const useRoute = () => {
  const read = () => location.hash.replace('#/', '') || 'inicio'
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const on = () => { setRoute(read()); scrollTo(0, 0) }
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [])
  return route
}

const Nav = ({ route, light, toggle }) => {
  const [min, setMin] = useState(route === 'inicio')
  const [hover, setHover] = useState(false)
  useEffect(() => {
    const on = () => setMin(scrollY > 80)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [route])
  return (
    <div className={`floating-menu-container ${min && !hover ? 'minimized' : ''}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <nav className="floating-menu">
        <a href="#/inicio" className="menu-brand" aria-label="Inicio"><span className="menu-brand-mono">JG</span></a>
        <span className="menu-divider" />
        {routes.map(r => (
          <a key={r.id} href={`#/${r.id}`} className={`menu-item ${route === r.id ? 'active' : ''}`} data-label={r.label}><i className={`fa-solid ${r.icon}`} /></a>
        ))}
        <button className="menu-item" data-label="Tema" onClick={toggle}><i className="fa-solid fa-circle-half-stroke" /></button>
      </nav>
    </div>
  )
}

const Intro = () => {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 600], [1, 0])
  const blur = useTransform(scrollY, [0, 600], ['blur(0px)', 'blur(10px)'])
  const scale = useTransform(scrollY, [0, 600], [1.05, 1.11])
  const y = useTransform(scrollY, [0, 600], [0, 44])
  return (
    <motion.div className="intro-screen" style={{ opacity, filter: blur }}>
      <motion.img src="/jagiraldor/LogoBanerF.png" alt="" className="intro-background-img" style={{ scale, y }} />
      <div className="intro-title">
        <span className="intro-eyebrow rise" style={{ '--d': '.1s' }}>Tecnólogo en Software · Barranquilla</span>
        <h1 className="hero-name rise" style={{ '--d': '.25s' }}>Jesus Giraldo</h1>
        <p className="hero-role rise" style={{ '--d': '.4s' }}>Desarrollador web · Videojuegos y experiencias digitales</p>
        <p className="hero-pitch rise" style={{ '--d': '.55s' }}>Construyo sitios web, videojuegos y simuladores 3D con estructura clara y atención al detalle. Busco oportunidades donde pueda aportar código y seguir aprendiendo.</p>
        <div className="hero-actions rise" style={{ '--d': '.7s', pointerEvents: 'auto' }}>
          <a href={`mailto:${links.email}`} className="btn btn-solid"><i className="fa-solid fa-envelope" /> Contactar</a>
          <a href="#/proyectos" className="btn">Ver proyectos <i className="fa-solid fa-arrow-right" /></a>
          <a href={links.linkedin} target="_blank" rel="noopener" className="btn btn-ghost"><i className="fa-brands fa-linkedin" /> LinkedIn</a>
        </div>
      </div>
    </motion.div>
  )
}

const Home = () => (
  <>
    <Intro />
    <main style={{ paddingTop: '100vh' }}>
      <div className="sticky-line" />
      <div className="container" style={{ paddingTop: 60 }}>
        <Reveal className="spec-sheet">
          <div className="spec-cell"><span className="spec-num">IUB</span><span className="spec-lbl">Tecnólogo en Software</span></div>
          <div className="spec-cell"><span className="spec-num">01</span><span className="spec-lbl">Proyecto en vivo</span></div>
          <div className="spec-cell"><span className="spec-num">SENA</span><span className="spec-lbl">Téc. Sistemas Teleinformáticos</span></div>
        </Reveal>
        <Divider label="Sobre mí" />
        <Reveal className="panel-grid">
          <div className="panel-cell">
            <span className="eyebrow">Perfil</span>
            <p>Soy estudiante de <strong>Tecnólogo en Software</strong> en Barranquilla. Trato cada proyecto con rigor técnico: primero una estructura clara, después el producto terminado.</p>
          </div>
          <div className="panel-cell">
            <span className="eyebrow">Qué hago</span>
            <ul className="service-list">
              <li>Desarrollo web a medida para clientes</li>
              <li>Videojuegos y simuladores 3D con Unity y Blender</li>
              <li>Extensiones de navegador y herramientas digitales</li>
            </ul>
          </div>
        </Reveal>
        <Divider label="Habilidades" />
        <Skills items={skills} />
        <Divider label="Proyecto destacado" />
        <ProjectCard p={featured} />
        <Reveal style={{ textAlign: 'center', margin: '40px 0 0' }}>
          <a href="#/proyectos" className="btn btn-ghost">Explorar todos los proyectos <i className="fa-solid fa-arrow-right" /></a>
        </Reveal>
        <Contact email={links.email} />
      </div>
    </main>
  </>
)

const About = () => (
  <main className="page-content">
    <div className="container">
      <Reveal><span className="eyebrow">Sobre mí</span></Reveal>
      <Reveal delay={0.05}><h1 className="title-lg" style={{ marginBottom: 10 }}>Jesus Giraldo</h1></Reveal>
      <Reveal delay={0.1}><p className="hero-role" style={{ marginBottom: 8 }}>Desarrollador web · Estudiante de Tecnólogo en Software</p></Reveal>
      <Reveal delay={0.15}><p className="op-loc">📍 Barranquilla, Colombia</p></Reveal>
      <Reveal delay={0.2}><p className="lede" style={{ maxWidth: 720 }}>Soy desarrollador y trabajo en sitios y aplicaciones web a medida, extensiones de navegador, videojuegos y simuladores 3D. Estudio Tecnólogo en Software en la IUB y sigo aprendiendo React, Next.js y TypeScript para crear experiencias digitales cada vez mejores.</p></Reveal>
      <Divider label="Formación" />
      <Reveal className="op-edu">
        {education.map(e => (
          <div className="op-edu-item" key={e.title}>
            <span className="op-edu-year">{e.year}</span>
            <strong className="op-edu-title">{e.href ? <a href={e.href} target="_blank" rel="noopener">{e.title}</a> : e.title}</strong>
            <span className="op-edu-place">{e.place}</span>
          </div>
        ))}
      </Reveal>
      <Divider label="Habilidades" />
      <Skills items={skills} />
      <Divider label="Redes" />
      <Reveal className="link-row">
        <a href={links.linkedin} target="_blank" rel="noopener"><i className="fa-brands fa-linkedin" /> LinkedIn</a>
        <a href={links.github} target="_blank" rel="noopener"><i className="fa-brands fa-github" /> GitHub</a>
        <a href={links.instagram} target="_blank" rel="noopener"><i className="fa-brands fa-instagram" /> @jesusgiraldor</a>
        <a href={links.tiktok} target="_blank" rel="noopener"><i className="fa-brands fa-tiktok" /> @jesusandresgirald</a>
      </Reveal>
      <Contact email={links.email} />
    </div>
  </main>
)

const Projects = () => (
  <main className="page-content">
    <div className="container">
      <Reveal><span className="eyebrow">Mi trabajo</span></Reveal>
      <Reveal delay={0.05}><h1 className="title-lg" style={{ marginBottom: 16 }}>Proyectos</h1></Reveal>
      <Reveal delay={0.1}><p className="lede" style={{ marginBottom: 52 }}>Un registro honesto de lo que he construido y lo que está en mesa de dibujo. Prefiero mostrar poco y terminado, antes que mucho a medias.</p></Reveal>
      <div className="projects-grid">
        <ProjectCard p={featured} min={440} />
        <Reveal className="proj-card compact">
          <div>
            <span className="status-tag status-dev"><span className="dot" /> En desarrollo</span>
            <h3>Próximo proyecto</h3>
            <p>Estoy trabajando en una nueva experiencia interactiva. Compartiré los detalles cuando tenga forma.</p>
          </div>
          <span className="proj-cta" style={{ color: 'var(--muted)' }}><i className="fa-solid fa-clock" /> Por anunciar · 2026</span>
        </Reveal>
      </div>
    </div>
  </main>
)

const pages = { inicio: Home, 'sobre-mi': About, proyectos: Projects }

export default function App() {
  const route = useRoute()
  const [light, setLight] = useState(() => localStorage.theme === 'light')
  useEffect(() => {
    document.body.classList.toggle('light-mode', light)
    localStorage.theme = light ? 'light' : 'dark'
  }, [light])
  const Page = pages[route] || Home
  return (
    <>
      <Nav route={route} light={light} toggle={() => setLight(l => !l)} />
      <AnimatePresence mode="wait">
        <motion.div key={route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <Page />
        </motion.div>
      </AnimatePresence>
      <footer className="footer">
        <p><strong>Jesus Giraldo</strong> — Barranquilla, Colombia</p>
        <p>© 2026 Jesus Giraldo · Todos los derechos reservados</p>
        <p>Email: <a href={`mailto:${links.email}`}>{links.email}</a></p>
      </footer>
    </>
  )
}

import { motion } from 'framer-motion'

export const Reveal = ({ children, delay = 0, className = '', style }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

export const Divider = ({ label }) => (
  <Reveal className="dim-line">
    <span className="seg" />
    <span className="lbl">{label}</span>
    <span className="seg" />
  </Reveal>
)

export const Skills = ({ items }) => (
  <Reveal className="skills-wrap">
    {items.map((s, i) => (
      <motion.span
        key={s}
        className="skill"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.05, duration: 0.35 }}
        whileHover={{ y: -3 }}
      >
        {s}
      </motion.span>
    ))}
  </Reveal>
)

export const Contact = ({ email }) => (
  <>
    <Divider label="Contacto" />
    <Reveal className="team-cta">
      <div className="team-cta-text">
        <h2 className="title-md" style={{ marginBottom: 14 }}>¿Tienes un proyecto o una vacante? Hablemos.</h2>
        <p className="lede">Escríbeme y te respondo lo antes posible.</p>
      </div>
      <a href={`mailto:${email}`} className="btn btn-solid"><i className="fa-solid fa-envelope" /> Escribirme</a>
    </Reveal>
  </>
)

export const ProjectCard = ({ p, min }) => (
  <motion.a
    href={p.href}
    target="_blank"
    rel="noopener"
    className="proj-card proj-card-img"
    style={{ '--bg-image': "url('/jagiraldor/instpecamIMG1.jpg')", minHeight: min }}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.5 }}
  >
    <div className="proj-card-body">
      <span className="status-tag status-live"><span className="dot" /> En vivo</span>
      <span className="proj-tag">{p.tag}</span>
      <h3>{p.title}</h3>
      <p>{p.text}</p>
      <div className="proj-tech">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
      <span className="proj-cta"><i className="fa-solid fa-arrow-right" /> Ver proyecto</span>
    </div>
  </motion.a>
)

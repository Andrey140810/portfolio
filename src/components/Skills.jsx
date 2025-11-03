import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt } from 'react-icons/fa'
import { SiRedux, SiFirebase, SiJson } from 'react-icons/si'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const skills = [
    { name: 'HTML5', icon: FaHtml5, color: '#e34c26', level: 90 },
    { name: 'CSS3', icon: FaCss3Alt, color: '#264de4', level: 85 },
    { name: 'JavaScript', icon: FaJs, color: '#f7df1e', level: 80 },
    { name: 'React', icon: FaReact, color: '#61dafb', level: 75 },
    { name: 'Redux', icon: SiRedux, color: '#764abc', level: 70 },
    { name: 'Git', icon: FaGitAlt, color: '#f05032', level: 75 },
    { name: 'Firebase', icon: SiFirebase, color: '#ffca28', level: 65 },
    { name: 'JSON Server', icon: SiJson, color: '#000000', level: 70 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Технологический стек</h2>
          <p className="section-subtitle">
            Инструменты и технологии, с которыми я работаю
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300 }
              }}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                <skill.icon />
              </div>
              <h3>{skill.name}</h3>
              <div className="skill-bar">
                <motion.div
                  className="skill-progress"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ 
                    duration: 1,
                    delay: index * 0.1,
                    ease: 'easeOut'
                  }}
                />
              </div>
              <span className="skill-level">{skill.level}%</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="skills-description"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p>
            Постоянно изучаю новые технологии и практики разработки.
            Готов применять свои знания для решения реальных бизнес-задач
            и создания качественных продуктов.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills


import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { FaGraduationCap, FaCode, FaRocket } from 'react-icons/fa'
import profileImage from '../assets/profile.jpg'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const features = [
    {
      icon: FaCode,
      title: 'Код высокого качества',
      description: 'Пишу чистый, поддерживаемый и масштабируемый код, следуя лучшим практикам разработки.',
    },
    {
      icon: FaGraduationCap,
      title: 'Постоянное обучение',
      description: 'Активно изучаю новые технологии и прохожу обучение в Result University, пишу дипломную работу.',
    },
    {
      icon: FaRocket,
      title: 'Готов к проектам',
      description: 'Готов работать как в команде, так и самостоятельно над интересными проектами и задачами.',
    },
  ]

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2 variants={itemVariants} className="section-title">
            О себе
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle">
            Познакомьтесь поближе с моим опытом и подходом к разработке
          </motion.p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about-image-border">
              <motion.img
                src={profileImage}
                alt="Andrey - Frontend Developer"
                className="about-image"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Frontend-разработчик с фокусом на качество</h3>
            <p>
              Я начинающий frontend-разработчик с глубоким интересом к созданию современных
              веб-приложений. Моя страсть к программированию подталкивает меня постоянно
              изучать новые технологии и совершенствовать свои навыки.
            </p>
            <p>
              В настоящее время я пишу дипломную работу в Result University, что позволяет
              мне углубленно изучать современные подходы к разработке и применять их на практике.
            </p>
            <p>
              Я ищу возможности для роста как в рамках постоянной работы, так и на фриланс-проектах,
              где могу применить свои знания React, Redux, и других современных инструментов.
            </p>

            <div className="about-stats">
              <motion.div
                className="stat-item"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                <div className="stat-number">10+</div>
                <div className="stat-label">Проектов</div>
              </motion.div>
              <motion.div
                className="stat-item"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                <div className="stat-number">100%</div>
                <div className="stat-label">Готовность</div>
              </motion.div>
              <motion.div
                className="stat-item"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
              >
                <div className="stat-number">∞</div>
                <div className="stat-label">Энтузиазма</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="about-features"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About


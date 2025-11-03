import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Andrey140810/repos?sort=updated&per_page=6')
        const data = await response.json()
        
        // Фильтруем репозитории, оставляем только те, которые могут быть интересны
        const filteredRepos = data
          .filter(repo => !repo.fork && repo.name !== 'Andrey140810')
          .slice(0, 6)
          .map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || 'Описание проекта отсутствует',
            url: repo.html_url,
            language: repo.language || 'Other',
            stars: repo.stargazers_count,
            updated: repo.updated_at,
          }))
        
        setRepos(filteredRepos)
      } catch (error) {
        console.error('Error fetching repos:', error)
        // Fallback данные на случай ошибки API
        setRepos([
          {
            id: 1,
            name: 'Portfolio Website',
            description: 'Современный сайт-портфолио с анимациями и адаптивным дизайном',
            url: 'https://github.com/Andrey140810',
            language: 'React',
            stars: 0,
            updated: new Date().toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'HTML': '#e34c26',
      'CSS': '#264de4',
      'React': '#61dafb',
      'Other': '#8b5cf6',
    }
    return colors[language] || colors.Other
  }

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Мои проекты</h2>
          <p className="section-subtitle">
            Посмотрите на мои работы и проекты на GitHub
          </p>
        </motion.div>

        {loading ? (
          <div className="projects-loading">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="loading-spinner"
            />
            <p>Загрузка проектов...</p>
          </div>
        ) : (
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {repos.length > 0 ? (
              repos.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="project-header">
                    <div className="project-icon">
                      <FaCode />
                    </div>
                    <div className="project-badge">
                      <span style={{ backgroundColor: getLanguageColor(project.language) }}>
                        {project.language}
                      </span>
                    </div>
                  </div>
                  
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <div className="project-footer">
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub /> Код
                    </motion.a>
                    {project.stars > 0 && (
                      <span className="project-stars">
                        <HiSparkles /> {project.stars}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="projects-empty">
                <FaCode size={48} />
                <p>Проекты будут отображены здесь</p>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.a
            href="https://github.com/Andrey140810"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub /> Посмотреть все проекты на GitHub
            <FaExternalLinkAlt />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects


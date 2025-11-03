import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { FaGithub, FaTelegram } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const contactMethods = [
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'Andrey140810',
      href: 'https://github.com/Andrey140810',
      color: '#24292e',
    },
    {
      icon: FaTelegram,
      label: 'Telegram',
      value: '@andrey_9001',
      href: 'https://t.me/andrey_9001',
      color: '#0088cc',
    },
    {
      icon: HiMail,
      label: 'Email',
      value: 'andrey.front.dev@gmail.com',
      href: 'mailto:andrey.front.dev@gmail.com',
      color: '#ea4335',
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Симуляция отправки формы
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Связаться со мной</h2>
          <p className="section-subtitle">
            Готов к новым проектам и возможностям сотрудничества
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants} className="contact-intro">
              <h3>Давайте начнем работу!</h3>
              <p>
                Я открыт для предложений о работе, фриланс-проектах и интересных
                возможностях сотрудничества. Если у вас есть проект, над которым
                нужно поработать, или вы хотите обсудить возможности, свяжитесь со мной!
              </p>
            </motion.div>

            <div className="contact-methods">
              {contactMethods.map((method) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="method-icon" style={{ color: method.color }}>
                    <method.icon />
                  </div>
                  <div className="method-info">
                    <span className="method-label">{method.label}</span>
                    <span className="method-value">{method.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="contact-availability"
            >
              <div className="availability-badge">
                <span className="availability-dot"></span>
                <span>Доступен для проектов</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ваше имя"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Сообщение</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Расскажите о вашем проекте или предложении..."
              />
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="form-success"
              >
                ✓ Сообщение отправлено! Спасибо за обращение.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact


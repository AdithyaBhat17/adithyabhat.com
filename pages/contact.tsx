import Navbar from '@/components/navbar'
import Head from '@/components/header'
import Container from '@/components/container'
import { useMemo, useState, BaseSyntheticEvent, useEffect } from 'react'
import Footer from '@/components/footer'

import { useForm } from 'react-hook-form'
import FormErrorMessage from '@/components/error-message'
import { ContactData, ContactResponse } from '@/interfaces/contact'
import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '@/utils/motion'

export default function Contact() {
  const { register, handleSubmit, errors } = useForm()
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setTimeout(() => setStatus('idle'), 3000)
    }
  }, [status])

  const submitMessage = async (
    data: ContactData,
    event: BaseSyntheticEvent
  ) => {
    const { name, email, message } = data
    if (!name || !email || !message.trim()) {
      return
    }
    try {
      setStatus('sending')
      const contactResponse = await fetch(`/api/contact`, {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          email,
          message: message.trim(),
        }),
      })
      const contactStatus: ContactResponse = await contactResponse.json()
      if (contactStatus.success) {
        setStatus('success')
        event.target.reset()
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const buttonText = useMemo(() => {
    if (status === 'success') return 'Message sent!'
    else if (status === 'error') return 'Mission Failed 😶'
    else if (status === 'sending') return 'Sending message'
    return 'Send message'
  }, [status])

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head title="Contact - Adithya NR" />
      <Navbar />
      <Container>
        <div className="md:w-2/3 w-full mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:text-5xl text-3xl font-bold mb-3"
          >
            Get in touch
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Send me a message here and I&apos;ll get back to you ASAP
          </motion.p>
          <motion.form
            variants={stagger}
            onSubmit={handleSubmit(submitMessage)}
          >
            <motion.div variants={fadeInUp} className="form-group">
              <label className="label" htmlFor="name">
                Your name
              </label>
              <input
                className="input"
                type="text"
                ref={register({ required: 'Name cannot be empty 🙁' })}
                name="name"
                id="name"
                placeholder="Mike Wazowski"
              />
              {errors.name ? (
                <FormErrorMessage message={errors.name.message} />
              ) : null}
            </motion.div>
            <motion.div variants={fadeInUp} className="form-group">
              <label className="label" htmlFor="email">
                Your email address
              </label>
              <input
                className="input"
                type="email"
                ref={register({
                  required: 'Please provide your email address 😓',
                  pattern: {
                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                    message: 'Invalid email address...',
                  },
                })}
                name="email"
                id="email"
                placeholder="mike@monstersinc.com"
              />
              {errors.email ? (
                <FormErrorMessage message={errors.email.message} />
              ) : null}
            </motion.div>
            <motion.div variants={fadeInUp} className="form-group">
              <label className="label" htmlFor="message">
                Your message
              </label>
              <textarea
                ref={register({
                  required: 'Please leave a message 😢',
                  minLength: { value: 10, message: 'Message too short 😞' },
                })}
                className="input"
                name="message"
                id="message"
                rows={5}
              />
              {errors.message ? (
                <FormErrorMessage message={errors.message.message} />
              ) : null}
            </motion.div>
            <motion.input
              variants={fadeInUp}
              whileHover={{ scale: 1.05, x: 0 }}
              whileTap={{ scale: 0.5, x: 0 }}
              type="submit"
              role="submit"
              value={buttonText}
              className={`submit-button w-full sm:w-auto ${
                status === 'success' ? 'bg-green-600 text-black' : ''
              }`}
            />
          </motion.form>
        </div>
      </Container>
      <br />
      <Footer />
    </motion.div>
  )
}

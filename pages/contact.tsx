import Container from '@/components/container'
import Head from '@/components/header'
import { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react'

import FormErrorMessage from '@/components/error-message'
import { ContactData, ContactResponse } from '@/interfaces/contact'
import { event as logEvent } from '@/lib/gtag'
import { fadeInUp, stagger } from '@/utils/motion'
import { motion } from 'framer-motion'
import useResetScroll from 'hooks/useResetScroll'
import { useForm } from 'react-hook-form'

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [status, setStatus] = useState('idle')

  useResetScroll()

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
      logEvent({
        action: 'User submitted form without filling details',
        category: 'engagement',
        label: 'user_error',
        value: 0,
      })
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
        logEvent({
          action: 'User sent a message',
          category: 'engagement',
          label: 'user_success',
          value: 100,
        })
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
    <motion.div
      className="p-0 w-full"
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
    >
      <Head title="Contact - Adithya NR" />
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
                name="name"
                id="name"
                data-testid="name"
                placeholder="Mike Wazowski"
                {...register('name', { required: 'Name cannot be empty 🙁' })}
              />
              {errors.name ? (
                <FormErrorMessage message={errors.name.message as string} />
              ) : null}
            </motion.div>
            <motion.div variants={fadeInUp} className="form-group">
              <label className="label" htmlFor="email">
                Your email address
              </label>
              <input
                className="input"
                type="email"
                data-testid="email"
                {...register('email', {
                  required: 'Please provide your email address 😓',
                  pattern: {
                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/u,
                    message: 'Invalid email address...',
                  },
                })}
                name="email"
                id="email"
                placeholder="mike@monstersinc.com"
              />
              {errors.email ? (
                <FormErrorMessage message={errors.email.message as string} />
              ) : null}
            </motion.div>
            <motion.div variants={fadeInUp} className="form-group">
              <label className="label" htmlFor="message">
                Your message
              </label>
              <textarea
                {...register('message', {
                  required: 'Please leave a message 😢',
                  minLength: { value: 10, message: 'Message too short 😞' },
                })}
                className="input"
                name="message"
                data-testid="message"
                id="message"
                rows={5}
              />
              {errors.message ? (
                <FormErrorMessage message={errors.message.message as string} />
              ) : null}
            </motion.div>
            <motion.input
              variants={fadeInUp}
              whileHover={{ scale: 1.05, x: 0 }}
              whileTap={{ scale: 0.5, x: 0 }}
              type="submit"
              role="submit"
              value={buttonText}
              className={`submit-button hover:text-white w-full sm:w-auto ${
                status === 'success' ? 'bg-green-600 text-black' : ''
              }`}
            />
          </motion.form>
        </div>
      </Container>
      <br />
    </motion.div>
  )
}

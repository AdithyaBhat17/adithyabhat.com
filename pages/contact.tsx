import Navbar from '@/components/navbar'
import Head from '@/components/header'
import Container from '@/components/container'
import {
  Fragment,
  useMemo,
  useState,
  BaseSyntheticEvent,
  useEffect,
} from 'react'
import Footer from '@/components/footer'

import { useForm } from 'react-hook-form'
import FormErrorMessage from '@/components/error-message'
import { ContactData, ContactResponse } from '@/interfaces/contact'

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
    <Fragment>
      <Head title="Contact - Adithya NR" />
      <Navbar />
      <Container>
        <div className="md:w-2/3 w-full mx-auto">
          <h1 className="md:text-5xl text-3xl font-bold mb-3">Get in touch</h1>
          <p>Send me a message here and I&apos;ll get back to you ASAP</p>
          <form onSubmit={handleSubmit(submitMessage)}>
            <div className="form-group">
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
            </div>
            <div className="form-group">
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
            </div>
            <div className="form-group">
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
            </div>
            <input
              type="submit"
              role="submit"
              value={buttonText}
              className={`submit-button w-full sm:w-auto ${
                status === 'success' ? 'bg-green-600 text-black' : ''
              }`}
            />
          </form>
        </div>
      </Container>
      <br />
      <Footer />
    </Fragment>
  )
}

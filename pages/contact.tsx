import Navbar from '@/components/navbar'
import Head from '@/components/header'
import Container from '@/components/container'
import { useState, FormEvent, useMemo, ChangeEvent } from 'react'
import FormErrorMessage from '@/components/error-message'

export interface ContactResponse {
  success: boolean
  message: string
}

export default function Contact() {
  const [data, setData] = useState({
    name: '',
    email: '',
    text: '',
  })
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const buttonText = useMemo(() => {
    if (status === 'success') return message
    else if (status === 'sending') return 'Sending message'
    return 'Send message'
  }, [status, message])

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const hasInvalidInputs = (
    name: string,
    email: string,
    text: string
  ): boolean => {
    if (!name.trim()) {
      setStatus('error')
      setMessage('Please provide your name 😢')
      return true
    }
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please provide your email 😢')
      return true
    }
    if (!text.trim()) {
      setStatus('error')
      setMessage('Looks like you forgot to leave a message 🥺')
      return true
    }
    return false
  }

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setMessage('')
    if (hasInvalidInputs(name, email, text)) return
    try {
      const { name, email, text } = data
      const contactResponse = await fetch(`/api/contact`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          message: text,
        }),
      })
      const contactStatus: ContactResponse = await contactResponse.json()
      if (contactStatus.success) {
        setStatus('success')
        setMessage(contactStatus.message)
        setData({ name: '', email: '', text: '' })
      } else {
        setStatus('error')
        setMessage(contactStatus.message)
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to send message 😢')
    }
    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  const { text, email, name } = data

  return (
    <>
      <Head title="Contact - Adithya NR" />
      <Navbar />
      <Container>
        <div className="md:w-2/3 w-full mx-auto">
          <h1 className="md:text-5xl text-3xl font-bold mb-3">Get in touch</h1>
          <p>Send me a message here and I&apos;ll get back to you ASAP</p>
          <form onSubmit={sendMessage}>
            <div className="form-group">
              <label className="label" htmlFor="name">
                Your name
              </label>
              <input
                onFocus={() => setStatus('idle')}
                className="input"
                onChange={handleInputChange}
                type="text"
                defaultValue={name || ''}
                name="name"
                id="name"
                placeholder="Mike Wazowski"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="email">
                Your email address
              </label>
              <input
                onFocus={() => setStatus('idle')}
                className="input"
                type="email"
                onChange={handleInputChange}
                defaultValue={email || ''}
                name="email"
                id="email"
                placeholder="mike@monstersinc.com"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="text">
                Your message
              </label>
              <textarea
                onFocus={() => setStatus('idle')}
                className="input"
                onChange={handleInputChange}
                defaultValue={text || ''}
                name="text"
                id="text"
                rows={5}
              />
            </div>
            <input
              type="submit"
              role="submit"
              value={buttonText}
              className={`submit-button w-full sm:w-auto ${
                status === 'success' ? 'bg-green-600 text-black' : ''
              }`}
            />
            {status === 'error' ? <FormErrorMessage message={message} /> : null}
          </form>
        </div>
      </Container>
    </>
  )
}

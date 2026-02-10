import { useForm } from 'react-hook-form';
import { useState, useEffect, useMemo } from 'react';
import type { ContactData, ContactResponse } from '@/types/contact';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timeout = setTimeout(() => setStatus('idle'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const submitMessage = async (data: ContactData) => {
    const { name, email, message, website } = data;
    if (!name || !email || !message.trim()) return;

    try {
      setStatus('sending');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email,
          message: message.trim(),
          website: website || '',
        }),
      });
      const result: ContactResponse = await response.json();
      if (result.success) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const buttonText = useMemo(() => {
    if (status === 'success') return 'Message sent!';
    if (status === 'error') return 'Something went wrong';
    if (status === 'sending') return 'Sending...';
    return 'Send message';
  }, [status]);

  return (
    <form onSubmit={handleSubmit(submitMessage)}>
      <div className="form-group">
        <label className="label" htmlFor="name">Your name</label>
        <input
          className="input"
          type="text"
          id="name"
          placeholder="Mike Wazowski"
          {...register('name', { required: 'Name cannot be empty' })}
        />
        {errors.name && (
          <span className="text-[var(--destructive)] text-sm mt-1 inline-block">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="label" htmlFor="email">Your email address</label>
        <input
          className="input"
          type="email"
          id="email"
          placeholder="mike@monstersinc.com"
          {...register('email', {
            required: 'Please provide your email address',
            pattern: {
              value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/u,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <span className="text-[var(--destructive)] text-sm mt-1 inline-block">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Honeypot field - hidden from users, visible to bots */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          opacity: 0,
          height: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <label htmlFor="website">Website (leave empty)</label>
        <input
          type="text"
          id="website"
          autoComplete="off"
          tabIndex={-1}
          {...register('website')}
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="message">Your message</label>
        <textarea
          className="input"
          id="message"
          rows={5}
          {...register('message', {
            required: 'Please leave a message',
            minLength: { value: 10, message: 'Message too short' },
          })}
        />
        {errors.message && (
          <span className="text-[var(--destructive)] text-sm mt-1 inline-block">
            {errors.message.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`submit-button w-full sm:w-auto ${
          status === 'success' ? 'bg-green-600 border-green-600' : ''
        } ${status === 'sending' ? 'opacity-70 cursor-wait' : ''}`}
      >
        {buttonText}
      </button>
    </form>
  );
}

import { useForm } from 'react-hook-form';
import { useState, useEffect, useMemo, useRef } from 'react';
import type { ContactData, ContactResponse } from '@/types/contact';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>();
  const [status, setStatus] = useState('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timeout = setTimeout(() => setStatus('idle'), 4000);
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

  if (status === 'success') {
    return (
      <div className="success-state">
        <div className="success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="var(--accent)" strokeWidth="2" className="success-circle" />
            <path d="M15 25l6 6 12-14" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="success-check" />
          </svg>
        </div>
        <h3 className="success-title font-display">Message sent!</h3>
        <p className="success-text font-body">
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <style>{`
          .success-state {
            text-align: center;
            padding: 3rem 1rem;
            animation: success-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes success-enter {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .success-icon {
            margin: 0 auto 1.5rem;
            width: 48px;
            height: 48px;
          }
          .success-circle {
            stroke-dasharray: 150;
            stroke-dashoffset: 150;
            animation: draw-circle 0.6s 0.2s ease forwards;
          }
          @keyframes draw-circle {
            to { stroke-dashoffset: 0; }
          }
          .success-check {
            stroke-dasharray: 40;
            stroke-dashoffset: 40;
            animation: draw-check 0.4s 0.6s ease forwards;
          }
          @keyframes draw-check {
            to { stroke-dashoffset: 0; }
          }
          .success-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.5rem;
          }
          .success-text {
            color: var(--text-muted);
            font-size: 0.9375rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit(submitMessage)} className="contact-form-inner">
        <div className={`form-field ${focusedField === 'name' ? 'is-focused' : ''} ${errors.name ? 'has-error' : ''}`}>
          <label className="field-label" htmlFor="name">
            <span className="field-label-text">What's your name?</span>
            <span className="field-label-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
          </label>
          <input
            className="field-input"
            type="text"
            id="name"
            placeholder="Mike Wazowski"
            {...register('name', { required: 'Name cannot be empty' })}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.name && (
            <span className="field-error">{errors.name.message}</span>
          )}
        </div>

        <div className={`form-field ${focusedField === 'email' ? 'is-focused' : ''} ${errors.email ? 'has-error' : ''}`}>
          <label className="field-label" htmlFor="email">
            <span className="field-label-text">Where can I reach you?</span>
            <span className="field-label-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
          </label>
          <input
            className="field-input"
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
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.email && (
            <span className="field-error">{errors.email.message}</span>
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

        <div className={`form-field ${focusedField === 'message' ? 'is-focused' : ''} ${errors.message ? 'has-error' : ''}`}>
          <label className="field-label" htmlFor="message">
            <span className="field-label-text">What's on your mind?</span>
            <span className="field-label-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </span>
          </label>
          <textarea
            className="field-input field-textarea"
            id="message"
            rows={5}
            placeholder="Tell me about your project, idea, or just say hello..."
            {...register('message', {
              required: 'Please leave a message',
              minLength: { value: 10, message: 'Message too short' },
            })}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.message && (
            <span className="field-error">{errors.message.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`send-button ${status === 'sending' ? 'is-sending' : ''} ${status === 'error' ? 'is-error' : ''}`}
        >
          <span className="send-button-text">
            {status === 'sending' ? 'Sending...' : status === 'error' ? 'Something went wrong' : 'Send message'}
          </span>
          {status === 'idle' && (
            <svg className="send-button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4z" />
              <path d="m22 2-11 11" />
            </svg>
          )}
          {status === 'sending' && (
            <span className="send-spinner" />
          )}
        </button>
      </form>

      <style>{`
        .contact-form-inner {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* ===== FIELD WRAPPER ===== */
        .form-field {
          position: relative;
        }

        /* ===== LABELS ===== */
        .field-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.625rem;
          color: var(--text-secondary);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .field-label-icon {
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .is-focused .field-label {
          color: var(--accent);
        }

        .is-focused .field-label-icon {
          opacity: 1;
          color: var(--accent);
          transform: scale(1.1);
        }

        .has-error .field-label {
          color: var(--destructive);
        }

        /* ===== INPUTS ===== */
        .field-input {
          appearance: none;
          width: 100%;
          padding: 0.875rem 1rem;
          background: var(--bg-surface);
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9375rem;
          color: var(--text);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .field-input::placeholder {
          color: var(--text-muted);
          opacity: 0.6;
        }

        .field-input:focus {
          border-color: var(--accent);
          background: var(--bg-elevated);
          box-shadow: 0 0 0 3px var(--accent-glow), 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .has-error .field-input {
          border-color: var(--destructive);
        }

        .has-error .field-input:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .field-textarea {
          resize: vertical;
          min-height: 120px;
        }

        /* ===== ERROR MESSAGES ===== */
        .field-error {
          display: block;
          color: var(--destructive);
          font-size: 0.8125rem;
          font-family: 'Space Grotesk', sans-serif;
          margin-top: 0.375rem;
          animation: shake 0.4s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }

        /* ===== SEND BUTTON ===== */
        .send-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          padding: 0.875rem 2rem;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: var(--radius);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 0.9375rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          width: 100%;
          margin-top: 0.5rem;
        }

        @media (min-width: 640px) {
          .send-button {
            width: auto;
          }
        }

        .send-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .send-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--accent-glow-strong);
        }

        .send-button:hover:not(:disabled)::before {
          opacity: 1;
        }

        .send-button:hover:not(:disabled) .send-button-icon {
          transform: translate(3px, -3px);
        }

        .send-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .send-button-icon {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .send-button.is-sending {
          opacity: 0.8;
          cursor: wait;
        }

        .send-button.is-error {
          background: var(--destructive);
        }

        /* ===== SPINNER ===== */
        .send-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ===== REDUCED MOTION ===== */
        @media (prefers-reduced-motion: reduce) {
          .field-error {
            animation: none;
          }
          .send-spinner {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

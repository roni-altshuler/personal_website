'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function Contact() {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Field validation states
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  


  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters long';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters long';
        }
        break;
    }
    
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
        break;
    }
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateField('name', name);
    const isEmailValid = validateField('email', email);
    const isMessageValid = validateField('message', message);
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      setStatus('Please fix the form errors before submitting');
      return;
    }

    setStatus('Sending...');
    setIsLoading(true);

    try {

      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          message
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success case
      setStatus('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setFieldErrors({
        name: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.pageTitle}>Contact Me</h1>
        <p>Have a question or want to work together? Fill out the form below.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={name} 
              onChange={handleInputChange}
              className={fieldErrors.name ? styles.inputError : ''}
              required 
            />
            {fieldErrors.name && (
              <span className={styles.fieldError}>{fieldErrors.name}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={email} 
              onChange={handleInputChange}
              className={fieldErrors.email ? styles.inputError : ''}
              required 
            />
            {fieldErrors.email && (
              <span className={styles.fieldError}>{fieldErrors.email}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea 
              id="message"
              name="message" 
              value={message} 
              onChange={handleInputChange}
              className={fieldErrors.message ? styles.inputError : ''}
              rows="5" 
              required
            ></textarea>
            {fieldErrors.message && (
              <span className={styles.fieldError}>{fieldErrors.message}</span>
            )}
          </div>
          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading && <span className={styles.loadingSpinner} />}
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
          {status && (
            <p className={`${styles.statusMessage} ${
              status.includes('successfully') ? styles.success : 
              status.includes('failed') || status.includes('error') ? styles.error : ''
            }`}>
              {status}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}

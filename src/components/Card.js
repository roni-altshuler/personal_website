'use client';

import React, { useState } from 'react';
import styles from '../styles/Card.module.css';
import Modal from './Modal';

const Card = ({ title, description, children, modalContent }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p>{description}</p>
      {children}
      {modalContent}
    </div>
  );
};

export default Card;

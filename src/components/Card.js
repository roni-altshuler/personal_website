'use client';

import React, { useState } from 'react';
import styles from '../styles/Card.module.css';
import Modal from './Modal';

const Card = ({ title, description, date, link, modalContent }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.glowLink}>
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        {date && <p className={styles.date}>{date}</p>}
      </div>
      <p>{description}</p>
      {modalContent}
    </div>
  );
};

export default Card;

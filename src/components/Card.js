'use client';

import React, { useState } from 'react';
import styles from '../styles/Card.module.css';
import Modal from './Modal';

import Image from 'next/image';

const Card = ({ title, description, date, link, modalContent, logo, logoAlt }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {logo && <Image src={logo} alt={logoAlt} className={styles.logo} />}
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className={styles.glowLink}>
                {title}
              </a>
            ) : (
              title
            )}
          </h2>
          <p>{description}</p>
        </div>
        {date && <p className={styles.date}>{date}</p>}
      </div>
      <div className={styles.cardBody}>
        {modalContent}
      </div>
    </div>
  );
};

export default Card;

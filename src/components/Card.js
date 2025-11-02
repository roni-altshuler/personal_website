'use client';

import React, { useState } from 'react';
import styles from '../styles/Card.module.css';
import Modal from './Modal';
import Image from 'next/image';

const Card = ({ title, description, date, link, modalContent, logo, logoAlt, children, customHeader }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (e) => {
    // Don't open modal if clicking a link
    if (e.target.tagName.toLowerCase() === 'a') return;
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.card} onClick={handleCardClick}>
        {customHeader || children || (
          <div className={styles.cardHeader}>
            {logo && <Image src={logo} alt={logoAlt} className={styles.logo} />}
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>
                {link ? (
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.glowLink}
                    onClick={(e) => e.stopPropagation()}
                  >
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
        )}
        {!children && modalContent && (
          <div className={styles.cardBody}>
            {modalContent}
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalHeader}>
            {logo && <Image src={logo} alt={logoAlt} className={styles.modalLogo} />}
            <h2>{title}</h2>
            <p className={styles.date}>{date}</p>
          </div>
          <div className={styles.modalBody}>
            {modalContent}
          </div>
          {link && (
            <div className={styles.modalFooter}>
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.glowLink}
              >
                Visit Website
              </a>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default Card;

'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from '../styles/Card.module.css';
import Modal from './Modal';
import Image from 'next/image';
import useCardTilt from './cards/useCardTilt';

const Card = ({
  title,
  description,
  date,
  link,
  modalContent,
  lead,
  disableModal = false,
  logo,
  logoAlt,
  children,
  customHeader,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reduced = useReducedMotion();
  const tilt = useCardTilt();

  const handleCardClick = (e) => {
    if (disableModal) return;
    if (e.target.tagName.toLowerCase() === 'a') return;
    setIsModalOpen(true);
  };

  const showBody = !children && !customHeader && (lead || modalContent);

  return (
    <>
      <motion.div
        className={`${styles.card} ${disableModal ? styles.static : ''}`}
        onClick={handleCardClick}
        onMouseMove={tilt.reduced ? undefined : tilt.onMouseMove}
        onMouseEnter={tilt.reduced ? undefined : tilt.onMouseEnter}
        onMouseLeave={tilt.reduced ? undefined : tilt.onMouseLeave}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={tilt.reduced ? undefined : tilt.style}
      >
        {customHeader || children || (
          <div className={styles.cardHeader}>
            {logo && (
              <Image
                src={logo}
                alt={logoAlt}
                className={styles.logo}
                width={100}
                height={100}
              />
            )}
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
        {showBody && (
          <div className={styles.cardBody}>
            {lead && <p className={styles.lead}>{lead}</p>}
            {modalContent}
          </div>
        )}
      </motion.div>

      {!disableModal && isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalHeader}>
            {logo && (
              <Image
                src={logo}
                alt={logoAlt}
                className={styles.modalLogo}
                width={150}
                height={150}
              />
            )}
            <h2>{title}</h2>
            <p className={styles.date}>{date}</p>
          </div>
          <div className={styles.modalBody}>
            {lead && <p className={styles.lead}>{lead}</p>}
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

'use client';

import React, { useState } from 'react';
import styles from '../styles/Card.module.css';
import Modal from './Modal';

const Card = ({ title, description, children, modalContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.card} onClick={modalContent ? openModal : null}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}

      {modalContent && isModalOpen && (
        <Modal onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default Card;

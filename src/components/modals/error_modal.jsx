import React from 'react';
import { Modal } from 'antd';

const ErrorModal = ({ isModalOpen, handleOk, errorMessage }) => {
  return (
    <Modal
      title="Error!"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleOk}
      closable={false}
      
    >
      <p id="modal-text">{errorMessage}</p>
    </Modal>
  );
};

export default ErrorModal;

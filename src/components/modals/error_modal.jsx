import React from 'react';
import { Modal } from 'antd';

const ErrorModal = ({ isModalOpen, handleOk, handleCancel, errorMessage }) => (
  <Modal
    title="Error"
    open={isModalOpen}
    onOk={handleOk}
    onCancel={handleCancel}
    okText="Yes"
    cancelText="No"
  >
    <p id='modal-text'>{errorMessage}</p>
  </Modal>
);

export default ErrorModal;

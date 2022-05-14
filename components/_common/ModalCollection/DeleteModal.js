import React from 'react'
import { Modal, Row } from 'antd'

import { Button } from '../../index'

const DeleteModal = ({ isOpen, onCancel, onSubmit, label }) => {
  return (
    <Modal
      visible={isOpen}
      onCancel={onCancel}
      title="Delete Confirmation"
      footer={null}
    >
      <h3 style={{ marginBottom: '48px' }}>{label}</h3>
      <Row justify="end" style={{ marginTop: '8px', marginBottom: '8px' }}>
        <div style={{ marginRight: '8px' }}>
          <Button isOutline onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <Button onClick={onSubmit}>Delete</Button>
      </Row>
    </Modal>
  )
}

export default DeleteModal

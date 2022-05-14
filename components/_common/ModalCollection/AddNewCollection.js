import React, { useState, useEffect } from 'react'
import { css, cx } from '@emotion/css'
import { v4 as uuid } from 'uuid'
import { Modal, Row } from 'antd'

import { Button } from '../../index'
import { db } from '../../../db'
import { setNotification } from '../../../helper'

const inputField = css({
  outline: 'none',
  width: '100%',
  border: '1px solid lightgray',
  borderRadius: '8px',
  padding: '8px 16px'
})

const AddNewCollection = ({ isOpen, onCancel, refresh }) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState({
    message: '',
    bool: false
  })

  const handleAddCollection = async () => {
    /* Check input only alphanumeric */
    if (!validate(input)) {
      handleError('No special characters, only alphanumeric.')
      return
    }

    const checkedName = await checkDuplicateName(input)
    if (!checkedName) {
      handleError('Name already in your collection. Input another name.')
      return
    }

    const newCollection = {
      id: uuid().slice(0, 4),
      name: input,
      detail: []
    }

    const res = await db.collection.add(newCollection)
    if (res) {
      await refresh()
      setInput('')
      onCancel()
      setNotification('Success add new collection.')
    }
  }

  const checkDuplicateName = async (name) => {
    const res = await db.collection.where('name').equals(name).count()
    if (res > 0) {
      return false
    } else {
      return true
    }
  }

  const validate = (str) => {
    const isOnlyAlphanumeric = /^\w+$/.test(str)
    return isOnlyAlphanumeric
  }

  const handleError = (message) => {
    const newObj = {
      message,
      bool: true
    }
    setError(newObj)
    setTimeout(() => {
      setError((prev) => ({
        ...prev,
        bool: false
      }))
    }, 2000)
  }

  return (
    <Modal
      visible={isOpen}
      footer={null}
      title="Add New Collection"
      onCancel={onCancel}
    >
      <div
        style={{
          marginBottom: '24px'
        }}
      >
        <h4>Add new collection name:</h4>
        <input
          type="text"
          className={cx(inputField)}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          value={input}
        />
        {error.bool && <p style={{ color: 'red' }}>{error.message}</p>}
        <Row justify="end" style={{ marginTop: '8px', marginBottom: '8px' }}>
          <div style={{ marginRight: '8px' }}>
            <Button isOutline onClick={onCancel}>
              Cancel
            </Button>
          </div>
          <Button onClick={handleAddCollection}>Add</Button>
        </Row>
      </div>
    </Modal>
  )
}

export default AddNewCollection

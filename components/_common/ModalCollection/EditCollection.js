import React, { useState, useEffect } from 'react'
import { Modal, Row } from 'antd'
import { css, cx } from '@emotion/css'
import { useRouter } from 'next/router'

import { Button, ToggleButton, EmptyState } from '../../index'
import { db } from '../../../db'
import { setNotification } from '../../../helper'

const inputField = css({
  outline: 'none',
  width: '100%',
  border: '1px solid lightgray',
  borderRadius: '8px',
  padding: '8px 16px'
})

const EditCollection = (props) => {
  const { isOpen, onCancel, isShowingList = false, refresh } = props
  const { push, query } = useRouter()
  const { slug } = query
  const [input, setInput] = useState('')
  const [data, setData] = useState([])
  const [currentId, setCurrentId] = useState(null)
  const [error, setError] = useState({
    message: '',
    bool: false
  })

  const handleEdit = async () => {
    if (!validate(input)) {
      handleError('No special characters, only alphanumeric.')
      return
    }

    const checkedName = await checkDuplicateName(input)
    if (!checkedName) {
      handleError('Name already in your collection. Input another name.')
      return
    }

    const res = await db.collection.update(currentId, {
      name: input
    })

    if (res) {
      onCancel()
      isShowingList ? refresh() : push(`/collection/detail/${input}`)
      setNotification('Success edit collection.')
    }
  }

  const fetchData = async () => {
    if (!slug) {
      return
    }

    const [res] = await db.collection.where('name').equals(slug).toArray()
    const { id, name } = res
    if (res) {
      setCurrentId(id)
      setInput(name)
    }
  }

  const fetchList = async () => {
    const res = await db.collection.toArray()
    const listOfCollection = res.map((collection) => {
      return {
        ...collection,
        isSelected: false
      }
    })
    setData(listOfCollection)
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

  const handleSelectCollection = (valueName, valueId) => {
    const tempArray = data.map((item) => {
      const { id, isSelected } = item
      return {
        ...item,
        isSelected: id === valueId ? true : false
      }
    })

    setCurrentId(valueId)
    setInput(valueName)
    setData(tempArray)
  }

  useEffect(() => {
    isShowingList ? fetchList() : fetchData()
  }, [])

  return (
    <Modal
      visible={isOpen}
      onCancel={onCancel}
      footer={null}
      title="Edit Collection"
    >
      <div style={{ marginBottom: '24px' }}>
        <h4>Edit collection name:</h4>
        <input
          type="text"
          placeholder="Choose your collection below"
          className={cx(inputField)}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          value={input}
        />
        {error.bool && <p style={{ color: 'red' }}>{error.message}</p>}
      </div>

      {isShowingList && (
        <div style={{ marginBottom: '24px' }}>
          <h4>Choose collection to edit:</h4>
          {data.length > 0 ? (
            data.map((item) => (
              <ToggleButton
                key={item.id}
                label={item.name}
                active={item.isSelected}
                onClick={() => {
                  handleSelectCollection(item.name, item.id)
                }}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      )}
      <Row justify="end" style={{ marginTop: '8px', marginBottom: '8px' }}>
        <div style={{ marginRight: '8px' }}>
          <Button isOutline onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <Button onClick={handleEdit} disabled={!currentId}>
          Edit
        </Button>
      </Row>
    </Modal>
  )
}

export default EditCollection

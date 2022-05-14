import React, { useState, useEffect } from 'react'
import { Row, Col, Modal } from 'antd'
import { css, cx } from '@emotion/css'
import { v4 as uuid } from 'uuid'
import { FrownOutlined } from '@ant-design/icons'

import { Button, ToggleButton } from '../../index'
import { db } from '../../../db'

const inputField = css({
  outline: 'none',
  width: '100%',
  border: '1px solid lightgray',
  borderRadius: '8px',
  padding: '8px 16px'
})

const AddAnimeToCollection = ({ isOpen, onCancel, onSubmit, currentId }) => {
  const [data, setData] = useState([])
  const [input, setInput] = useState('')
  const [isOpenInput, setOpenInput] = useState(false)
  const [bookmarkedCollection, setBookmarkedCollection] = useState([])
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
      await fetchData()
    }

    setInput('')
  }

  const retrieveSelectedData = () => {
    const res = data.filter(({ isSelected }) => {
      return isSelected
    })
    onSubmit(res)
  }

  const handleSelectCollection = (id) => {
    const tempArray = [...data]
    tempArray.forEach((item) => {
      if (item.id === id) item.isSelected = !item.isSelected
    })
    setData(tempArray)
  }

  const fetchData = async () => {
    const res = await db.collection.toArray()
    const listOfCollection = res.map((collection) => {
      return {
        ...collection,
        isSelected: false
      }
    })

    const alreadyCollected = res.filter((collection) => {
      return collection.detail.find((item) => item.id === currentId)
    })

    setBookmarkedCollection(alreadyCollected)
    setData(listOfCollection)
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

  const validate = (str) => {
    const isOnlyAlphanumeric = /^\w+$/.test(str)
    return isOnlyAlphanumeric
  }

  const checkDuplicateName = async (name) => {
    const res = await db.collection.where('name').equals(name).count()
    if (res > 0) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Modal
      visible={isOpen}
      footer={null}
      title="Your Collection"
      onCancel={onCancel}
    >
      {!isOpenInput && (
        <div
          className={css({
            marginBottom: '24px'
          })}
        >
          <Button
            isOutline
            onClick={() => {
              setOpenInput(true)
            }}
          >
            Add new collection
          </Button>
        </div>
      )}

      {isOpenInput && (
        <div
          className={css({
            marginBottom: '24px'
          })}
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
          <Row
            justify="end"
            className={css({ marginTop: '8px', marginBottom: '8px' })}
          >
            <div className={css({ marginRight: '8px' })}>
              <Button
                isOutline
                onClick={() => {
                  setOpenInput(false)
                }}
              >
                Cancel
              </Button>
            </div>
            <Button onClick={handleAddCollection}>Add</Button>
          </Row>
        </div>
      )}

      <div
        className={css({
          marginBottom: '48px'
        })}
      >
        <h4>Choose collection to add anime:</h4>
        {data.length > 0 ? (
          data.map((item) => (
            <ToggleButton
              key={item.id}
              label={item.name}
              active={item.isSelected}
              onClick={() => {
                handleSelectCollection(item.id)
              }}
              disabled={bookmarkedCollection.some(
                (collection) => collection.id === item.id
              )}
            />
          ))
        ) : (
          <div
            className={css({
              marginTop: '48px',
              textAlign: 'center',
              color: 'lightgray'
            })}
          >
            <FrownOutlined size="large" style={{ fontSize: '24px' }} />
            <p style={{ fontSize: '20px', marginBottom: '4px' }}>
              No collection here
            </p>
            <p>You can add new collection by clicking button above</p>
          </div>
        )}
      </div>

      <Row justify="end">
        <Button
          disabled={data.every((item) => !item.isSelected)}
          onClick={retrieveSelectedData}
        >
          Add to collection
        </Button>
      </Row>
    </Modal>
  )
}

export default AddAnimeToCollection

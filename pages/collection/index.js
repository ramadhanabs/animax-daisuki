/* External Import */
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { css, cx } from '@emotion/css'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'

/* Internal Import  */
import { db } from '../../db'
import { CardListCollection, Loading, EmptyState } from '../../components'
import {
  AddNewCollection as DialogAdd,
  DeleteModal as DialogDelete,
  EditCollection as DialogEdit
} from '../../components/_common/ModalCollection'
import { setNotification } from '../../helper'

const cardContainer = css({
  marginTop: '100px',
  marginBottom: '120px',
  padding: '16px'
})

const buttonText = css({
  display: 'none',
  marginBottom: '0px',
  marginLeft: '4px',
  '@media (min-width: 420px)': {
    display: 'block'
  }
})

const navButton = css({
  cursor: 'pointer',
  border: '1px solid #2c8cd1',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '8px',
  marginLeft: '8px',
  backgroundColor: '#edf5fa',
  fontWeight: 600,
  color: '#2c8cd1',
  ':hover': { backgroundColor: '#d7ebf7' }
})

const defaultImage =
  'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80'

const Collection = () => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [dialog, setDialog] = useState({
    add: false,
    edit: false,
    delete: false
  })

  const fetchData = async () => {
    setLoading(true)
    const res = await db.collection.toArray()

    const tempArray = res.map((item) => {
      const { detail } = item
      const coverImage =
        detail.length > 0 ? detail.at(-1).posterImg : defaultImage
      return {
        ...item,
        coverImage
      }
    })

    setData(tempArray)
    setLoading(false)
  }

  const handleDialog = (key, value, id) => {
    setDialog((prev) => ({
      ...prev,
      [key]: value
    }))

    if (id) {
      setCurrentId(id)
    }
  }

  const handleDelete = async () => {
    const res = await db.collection.delete(currentId)
    setDialog('delete', false)
    fetchData()
    setNotification('Success delete collection.')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <div className={cx(cardContainer)}>
      <Row
        align="middle"
        justify="space-between"
        style={{ marginBottom: '16px' }}
      >
        <h1 style={{ marginBottom: 0 }}>Your Collection</h1>
        <Row>
          <button
            className={cx(navButton)}
            style={{ marginRight: '8px' }}
            onClick={() => handleDialog('add', true)}
          >
            <PlusOutlined />
            <p className={cx(buttonText)}>Add</p>
          </button>
          <button
            className={cx(navButton)}
            onClick={() => handleDialog('edit', true)}
          >
            <EditOutlined />
            <p className={cx(buttonText)}>Edit</p>
          </button>
        </Row>
      </Row>
      <Row>
        {data.length > 0 ? (
          data.map((item) => {
            const { id, name } = item
            return (
              <Col key={id} span={24}>
                <CardListCollection
                  item={item}
                  isCollected={id % 2}
                  route={`/collection/detail/${name}`}
                  onDelete={() => handleDialog('delete', true, id)}
                />
              </Col>
            )
          })
        ) : (
          <EmptyState />
        )}
      </Row>
      {dialog.add && (
        <DialogAdd
          isOpen={dialog.add}
          onCancel={() => handleDialog('add', false)}
          refresh={fetchData}
        />
      )}
      {dialog.edit && (
        <DialogEdit
          isOpen={dialog.edit}
          onCancel={() => handleDialog('edit', false)}
          isShowingList
          refresh={fetchData}
        />
      )}
      {dialog.delete && (
        <DialogDelete
          isOpen={dialog.delete}
          label="Are you sure to delete this collection?"
          onCancel={() => handleDialog('delete', false)}
          onSubmit={handleDelete}
        />
      )}
    </div>
  )
}

export default Collection

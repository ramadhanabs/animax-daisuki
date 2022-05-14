import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { css, cx } from '@emotion/css'
import { Row, Col } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import { db } from '../../../db'
import {
  Loading,
  Button,
  EmptyState,
  CardListCollection as Card
} from '../../../components'
import {
  DeleteModal as DialogDelete,
  EditCollection as DialogEdit
} from '../../../components/_common/ModalCollection'
import { setNotification } from '../../../helper'

const cardContainer = css({
  marginTop: '120px',
  marginBottom: '120px',
  padding: '16px'
})

const CollectionDetail = () => {
  const { query } = useRouter()
  const { slug } = query

  const [data, setData] = useState({})
  const [listAnime, setListAnime] = useState([])
  const [dialog, setDialog] = useState({
    edit: false,
    delete: false
  })
  const [currentId, setCurrentId] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const fetchData = async () => {
    if (!slug) {
      return
    }

    setLoading(true)
    const [res] = await db.collection.where('name').equals(slug).toArray()
    const listAnime = res.detail.map((item) => {
      const { id, img, name, posterImg } = item
      return {
        id,
        img,
        name,
        coverImage: posterImg
      }
    })
    setData(res)
    setListAnime(listAnime)
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
    const { detail } = await db.collection.get(data.id)
    const tempArray = [...detail]
    const index = tempArray.findIndex((item) => item.id === currentId)
    tempArray.splice(index, 1)

    db.collection
      .where('id')
      .equals(data.id)
      .modify((item) => {
        item.detail = tempArray
      })

    handleDialog('delete', false)
    fetchData()
    setNotification('Success delete anime from collection.')
  }

  useEffect(() => {
    fetchData()
  }, [slug])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <div className={cx(cardContainer)}>
            <Row justify="space-between" style={{ marginBottom: '24px' }}>
              <h1 style={{ marginBottom: '0px' }}>{data.name} Detail</h1>
              <Button onClick={() => handleDialog('edit', true)}>
                <EditOutlined /> Edit
              </Button>
            </Row>
            <Row>
              {listAnime.length > 0 ? (
                listAnime.map((item) => {
                  const { id } = item
                  return (
                    <Col key={id} span={24}>
                      <Card
                        item={item}
                        isForCollectionDetail
                        route={`/detail/${id}`}
                        onDelete={() => handleDialog('delete', true, id)}
                      />
                    </Col>
                  )
                })
              ) : (
                <EmptyState />
              )}
            </Row>
            <DialogDelete
              isOpen={dialog.delete}
              onCancel={() => handleDialog('delete', false)}
              label={`Are you sure to remove this anime from your "${data.name}" collection?`}
              onSubmit={handleDelete}
            />
            {dialog.edit && (
              <DialogEdit
                isOpen={dialog.edit}
                onCancel={() => handleDialog('edit', false)}
              />
            )}
          </div>
        )
      )}
    </>
  )
}

export default CollectionDetail

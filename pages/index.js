/* eslint-disable @next/next/no-img-element */
/* External Import */
import { useState, useEffect } from 'react'
import { Row, Col, Pagination } from 'antd'
import { css, cx } from '@emotion/css'
import { PlusOutlined } from '@ant-design/icons'

/* Internal Import */
import { CardListAnime as Card, Button, Loading } from '../components'
import client from '../apollo-client'
import { GET_ALL_ANIME } from '../graphql'

const cardContainer = css({
  marginTop: '100px',
  marginBottom: '120px',
  padding: '16px'
})

const defaultDataHit = {
  page: 1,
  perPage: 10
}

export default function Home() {
  const [media, setMedia] = useState([])
  const [variables, setVariables] = useState(defaultDataHit)
  const [isLoading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const { data } = await client.query({
      query: GET_ALL_ANIME,
      variables
    })
    setMedia(data.Page.media)
    setLoading(false)
  }

  const handlePagination = (value) => {
    setVariables((prev) => ({
      ...prev,
      page: value
    }))
  }

  useEffect(() => {
    fetchData()
  }, [variables])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={cx(cardContainer)}>
          <Row
            align="middle"
            justify="space-between"
            style={{ marginBottom: '16px' }}
          >
            <h1 style={{ marginBottom: 0 }}>Anime List</h1>
            <Button>
              <PlusOutlined /> Bulk Add
            </Button>
          </Row>
          <Row>
            {media &&
              media.map((item) => {
                const { id } = item
                return (
                  <Col key={id} span={24}>
                    <Card item={item} isCollected={id % 2} />
                  </Col>
                )
              })}
          </Row>
          <Row justify="center">
            <Pagination
              defaultCurrent={variables.page}
              total={100}
              onChange={handlePagination}
              showSizeChanger={false}
            />
          </Row>
        </div>
      )}
    </>
  )
}

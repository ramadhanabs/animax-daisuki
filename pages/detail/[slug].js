/* eslint-disable @next/next/no-img-element */
/* External Import */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { css, cx } from '@emotion/css'
import { Row, Col, notification } from 'antd'
import ReactHtmlParser from 'react-html-parser'

/* Internal Import */
import { GET_DETAIL_ANIME } from '../../graphql'
import client from '../../apollo-client'
import { db } from '../../db'
import { Loading, Button } from '../../components'
import { AddAnimeToCollection as ModalCollection } from '../../components/_common/ModalCollection'
import { setNotification } from '../../helper'

const defaultImage =
  'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80'

const cardContainer = css({
  marginTop: '120px',
  marginBottom: '120px',
  padding: '16px'
})

const DetailPage = () => {
  const { query } = useRouter()
  const { slug } = query

  const [media, setMedia] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [dialog, setDialog] = useState(false)

  const fetchData = async () => {
    if (!slug) {
      return
    }
    const variables = {
      mediaId: slug
    }
    setLoading(true)
    const { data } = await client.query({
      query: GET_DETAIL_ANIME,
      variables
    })
    setMedia(data.Media)
    setLoading(false)
  }

  const handleSubmit = async (selectedData) => {
    const tempObj = {
      id: slug,
      name: media.title.english || media.title.native,
      img: media.bannerImage || '',
      posterImg: media.coverImage.large || ''
    }

    selectedData.forEach((data) => {
      db.collection
        .where('name')
        .equals(data.name)
        .modify((item) => {
          item.detail.push(tempObj)
        })
    })

    setDialog(false)
    setNotification('Success adding anime to collection.')
  }

  useEffect(() => {
    fetchData()
  }, [slug])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        media && (
          <div className={cx(cardContainer)}>
            <h1>Anime Detail</h1>
            <div
              className={css({
                marginBottom: '16px'
              })}
            >
              <img
                src={media.bannerImage || defaultImage}
                alt={`banner-${media.id}`}
                className={css({
                  width: '100%',
                  aspectRatio: '20/9',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '16px'
                })}
              />
            </div>
            <Row
              className={css({
                marginBottom: '16px'
              })}
            >
              <Col span={24} style={{ marginBottom: '24px' }}>
                <div>
                  <h1>{media.title?.english}</h1>
                  <h4>{media.title?.native}</h4>
                </div>
              </Col>
              <Col span={24}>
                <div>
                  <p
                    className={css({
                      marginBottom: '4px'
                    })}
                  >
                    Average Score
                  </p>
                  <h2>{media.averageScore}/100</h2>
                </div>
              </Col>
            </Row>
            <Row
              align="middle"
              className={css({
                marginBottom: '16px'
              })}
            >
              <p
                className={css({
                  marginBottom: '0px'
                })}
              >
                Genre:
              </p>
              <Row>
                {media.genres &&
                  media.genres.map((genre) => (
                    <div
                      key={genre}
                      className={css({
                        margin: '4px',
                        padding: '4px 16px',
                        borderRadius: '4px',
                        color: '#0070c0',
                        background: '#cfe8fa'
                      })}
                    >
                      {genre}
                    </div>
                  ))}
              </Row>
            </Row>
            <div
              className={css({
                marginBottom: '32px'
              })}
            >
              <h2>Description</h2>
              <p>{ReactHtmlParser(media.description)}</p>
            </div>
            <Button
              onClick={() => {
                setDialog(true)
              }}
            >
              Add to Collection
            </Button>
          </div>
        )
      )}
      {dialog && (
        <ModalCollection
          currentId={slug}
          isOpen={dialog}
          onCancel={() => {
            setDialog(false)
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default DetailPage

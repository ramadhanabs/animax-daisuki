/* eslint-disable @next/next/no-img-element */
/* External Import */
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col } from 'antd'
import { css, cx } from '@emotion/css'

/* Internal Import */
import Card from '../components/Card'
import styles from '../styles/Home.module.css'
import client from '../apollo-client'
import { GET_ALL_ANIME } from '../graphql'
import Navbar from '../components/Navbar'

const defaultDataHit = {
  page: 1,
  perPage: 10
}

export default function Home() {
  const [media, setMedia] = useState([])
  const [variables, setVariables] = useState(defaultDataHit)

  const fetchData = async () => {
    const { data } = await client.query({
      query: GET_ALL_ANIME,
      variables
    })
    setMedia(data.Page.media)
  }

  useEffect(() => {
    fetchData()
  }, [variables])

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center'
      })}
    >
      <Head>
        <title>Animax - Anime List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main
        className={css({
          maxWidth: '768px'
        })}
      >
        <Row
          className={css({
            marginTop: '120px'
          })}
        >
          {media &&
            media.map((item) => {
              const { id, title, coverImage } = item
              const { native, english } = title
              return (
                <Col key={id} span={24}>
                  <Card>
                    {coverImage && (
                      <img
                        className={css({
                          width: 'auto',
                          height: '150px',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          borderRadius: '8px',
                          marginRight: '16px'
                        })}
                        src={item.coverImage.large}
                        alt={`banner-${id}`}
                      />
                    )}
                    <div>
                      <h2>{english ? english : native}</h2>
                      <h5>{native}</h5>
                      <button
                        className={css({
                          cursor: 'pointer',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          backgroundColor: 'gray',
                          color: '#fff',
                          border: 'none',
                          '&:hover': {
                            backgroundColor: 'lightgray'
                          }
                        })}
                      >
                        See Detail
                      </button>
                    </div>
                  </Card>
                </Col>
              )
            })}
        </Row>
      </main>
    </div>
  )
}

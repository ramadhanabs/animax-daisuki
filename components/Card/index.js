/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { css, cx } from '@emotion/css'
import { Row } from 'antd'
import { HeartTwoTone } from '@ant-design/icons'
import Link from 'next/link'

const root = css({
  padding: '24px',
  backgroundColor: '#fefefe',
  border: '1px solid lightgray',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  marginBottom: '20px',
  borderRadius: '10px',
  transition: 'all ease-in-out 0.3s',
  ':hover': {
    backgroundColor: '#edf5fa',
    border: '1px solid #7dc3f5',
    transition: 'all ease-in-out 0.1s'
  }
})

const bannerImage = css({
  width: 'auto',
  height: '150px',
  objectFit: 'cover',
  objectPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '8px',
  marginRight: '16px'
})

const headingTitle = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical'
})

const Card = ({ item, isCollected }) => {
  const { id, title, coverImage } = item
  const { native, english } = title

  return (
    <Link href={`/detail/${id}`}>
      <a className={cx(root)}>
        <Row
          wrap={false}
          style={{
            paddingRight: '12px'
          }}
        >
          {coverImage && (
            <div>
              <img
                className={cx(bannerImage)}
                src={item.coverImage.large}
                alt={`banner-${id}`}
              />
            </div>
          )}
          <div>
            <h2 className={cx(headingTitle)}>{english ? english : native}</h2>
            <h5>{native}</h5>
          </div>
        </Row>
        <div>{isCollected ? <HeartTwoTone twoToneColor="#eb2f96" /> : ''}</div>
      </a>
    </Link>
  )
}

export default Card

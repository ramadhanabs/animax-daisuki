import React from 'react'
import { css, cx } from '@emotion/css'
import { Row } from 'antd'
import Link from 'next/link'
import { DeleteTwoTone } from '@ant-design/icons'

const root = css({
  width: '100%',
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
  marginBottom: '4px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical'
})

const detailText = css({
  color: 'gray',
  marginBottom: '4px'
})

const chip = css({
  maxWidth: '120px',
  margin: '4px',
  padding: '4px 12px',
  borderRadius: '4px',
  backgroundColor: '#edf5fa',
  border: '1px solid #7dc3f5',
  fontSize: '10px',
  color: '#7dc3f5',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})

const iconButton = css({
  outline: 'none',
  border: 'none',
  background: 'none',
  padding: '8px',
  borderRadius: '8px',
  transition: 'all ease-in-out 0.1s',
  ':hover': {
    backgroundColor: '#dcf0fc',
    transition: 'all ease-in-out 0.1s'
  }
})

const CardCollection = (props) => {
  const { item, isForCollectionDetail = false, route, onDelete } = props
  const { id, name, coverImage, detail } = item

  const handleDelete = (e) => {
    e.preventDefault()
    onDelete()
  }

  return (
    <Link href={route}>
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
                src={coverImage}
                alt={`banner-${id}`}
              />
            </div>
          )}
          <div style={{ width: '100%' }}>
            <h2 className={cx(headingTitle)}>{name}</h2>
            {!isForCollectionDetail && (
              <>
                <p className={cx(detailText)}>Total Anime: {detail.length}</p>
                <Row>
                  {detail.length > 0 && (
                    <>
                      {detail.slice(0, 2).map((item) => (
                        <div key={item.id} className={cx(chip)}>
                          {item.name}
                        </div>
                      ))}
                      {detail.length > 2 && (
                        <div className={cx(chip)}>
                          +{detail.length - 2} more
                        </div>
                      )}
                    </>
                  )}
                </Row>
              </>
            )}
          </div>
        </Row>
        <div>
          <button className={cx(iconButton)} onClick={(e) => handleDelete(e)}>
            <DeleteTwoTone
              style={{ fontSize: '16px' }}
              twoToneColor="#c92e2e"
            />
          </button>
        </div>
      </a>
    </Link>
  )
}

export default CardCollection

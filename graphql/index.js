import { gql } from '@apollo/client'

export const GET_ALL_ANIME = gql`
  query GET_ALL_ANIME($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media {
        id
        bannerImage
        title {
          english
          native
        }
        coverImage {
          large
        }
      }
    }
  }
`

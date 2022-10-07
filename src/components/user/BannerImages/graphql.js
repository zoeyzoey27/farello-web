import { gql } from "@apollo/client"

export const GET_BANNER_IMAGES = gql`
  query BannerImages {
    bannerImages {
      id
      urlImage
    }
  }
`
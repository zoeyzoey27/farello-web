import { gql } from '@apollo/client'

const getBannerImages = gql `
    query getBannerImages {
        bannerImages {
           id
           urlImage  
        }
    }
`
const getCategories = gql `
    query getCategories {
        categories {
           id
           name
           imageURL
           description
        }
    } 
`
const getProducts = gql `
    query getProducts {
        products {
            id
            name
            priceOrigin
            priceSale
            quantity
            imageMain
            images
            description
            category {
                id
                name
            }
        }
    }
`

const getSingleProduct = gql `
    query getSingleProduct($id: ID!) {
        product(id: $id) {
            id
            name
            priceOrigin
            priceSale
            quantity
            imageMain
            images
            description
            category {
                id
                name
            }
        }
    }
`
const getCategory = gql `
    query getCategory($id: ID!) {
        category(id: $id) {
           id
           name
           imageURL
           description
        }
    }
`
export { getBannerImages, getCategories, getProducts, getSingleProduct, getCategory }
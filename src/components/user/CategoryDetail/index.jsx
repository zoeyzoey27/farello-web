import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { Row } from 'antd'
import { useQuery } from '@apollo/client'
import { getCategory } from '../../../graphqlClient/queries'

const CategoryDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');  
  const { loading, error, data } = useQuery(getCategory, {
    variables: {
        id: id
    },
    skip: id === null
  })

if (loading) return <p>Loading...</p>
if (error) return <p>Error!</p>
  return (
    <Row className="flex items-center justify-between my-10 w-full h-[300px] px-[50px]">
        <Row className="flex flex-col bg-[#f8f8f8] flex-1 h-full p-10">
            <Row className="text-[2.2rem] font-semibold block mb-5">{data?.category?.name}</Row>
            <Row className="text-[1.6rem]">{data?.category?.description}</Row>
        </Row>
        <img src={data?.category?.imageURL} alt='' className="h-[300px] object-cover object-center" />
    </Row>
  )
}

export default CategoryDetail
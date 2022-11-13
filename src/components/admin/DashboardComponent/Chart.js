import React, { useState, useEffect } from 'react'
import { Row } from 'antd'
import i18n from '../../../translation'
import ReactECharts from 'echarts-for-react';
import { GET_CATEGORIES } from './graphql';
import { DESC } from '../../../constant';
import { useQuery } from '@apollo/client';

const Chart = () => {
    const [dataCate, setDataCate] = useState([])
    const { data } = useQuery(GET_CATEGORIES, {
        variables: {
          categorySearchInput: {},
          skip: null,
          take: null,
          orderBy: {
            createdAt: DESC
          }
        }
      })
    useEffect(() => {
        if (data) {
          const items = data?.categories?.map((item) => {
              return {
                value: item.products.length,
                name: item.name,
              }
          })
          setDataCate(items)
        }
      },[data])
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: i18n.t('orderList.totalProducts'),
        type: 'pie',
        radius: '75%',
        data: dataCate,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  
  return (
    <Row className="w-full mt-5 hidden md:block">
        <ReactECharts option={option} style={{width: '100%'}} />
    </Row>
  )
}

export default Chart
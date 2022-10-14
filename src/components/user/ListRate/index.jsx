import React, { useState, createElement, useEffect } from 'react'
import { Row, Button, Rate, Comment, List, Tooltip, Avatar, Modal, Empty, message } from 'antd'
import { BsPencil } from 'react-icons/bs'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import FormRate from '../FormRate'
import { useMutation } from '@apollo/client'
import { UPDATE_COMMENT } from './graphql'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant'

const ListRate = ({product, setLoading}) => {
  const userId = localStorage.getItem("id_token")
  const [updateComment] = useMutation(UPDATE_COMMENT)
  const [data, setData] = useState([])
  const [ratePoint, setRatePoint] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const like = ({id, likes, dislikes, userLiked, userDisLiked}) => {
    setLoading(true)
    updateComment({
        variables: {
            updateCommentId: id,
            commentUpdateInput: {
                likes: likes + 1,
                dislikes: userDisLiked.find(item => item === userId) ? dislikes - 1 : dislikes,
                userLiked: [...userLiked, userId],
                userDisLiked: userDisLiked.find(item => item === userId) 
                              ? userDisLiked.filter(item => item !== userId) 
                              : userDisLiked,
                updatedAt: moment().format(DATE_TIME_FORMAT),
            }
        },
        onCompleted: () => {
            setLoading(false)
        },
        onError: (err) => {
            setLoading(false)
            message.err(`${err.message}`)
        }
    })
  };
  const dislike = ({id, likes, dislikes, userLiked, userDisLiked}) => {
    setLoading(true)
    updateComment({
        variables: {
            updateCommentId: id,
            commentUpdateInput: {
                likes: userLiked.find(item => item === userId) ? likes - 1 : likes,
                dislikes: dislikes + 1,
                userLiked: userLiked.find(item => item === userId)  ? userLiked.filter(item => item !== userId) : userLiked,
                userDisLiked: [...userDisLiked, userId],
                updatedAt: moment().format(DATE_TIME_FORMAT),
            }
        },
        onCompleted: () => {
            setLoading(false)
        },
        onError: (err) => {
            setLoading(false)
            message.err(`${err.message}`)
        }
    })
  };
  useEffect(() => {
     if (product?.comments?.length > 0){
        let sum = 0;
        const items = product?.comments?.map((item) => {
            sum+=item.ratePoint
            return {
                actions: [
                    <Tooltip key="comment-basic-like" title="Hữu ích">
                        <span 
                            onClick={() => like({
                                id: item.id, 
                                likes: item.likes, 
                                dislikes: item.dislikes,
                                userLiked: item.userLiked,
                                userDisLiked: item.userDisLiked})} 
                            className="flex items-center">
                            {createElement(item?.userLiked?.find(item => item === userId) ? LikeFilled : LikeOutlined)}
                            <span className="ml-3">{item.likes}</span>
                        </span>
                    </Tooltip>,
                    <Tooltip key="comment-basic-dislike" title="Không hữu ích">
                        <span 
                            onClick={() => dislike({
                                id: item.id, 
                                likes: item.likes, 
                                dislikes: item.dislikes,
                                userLiked: item.userLiked,
                                userDisLiked: item.userDisLiked})} 
                            className="flex items-center">
                            {React.createElement(item?.userDisLiked?.find(item => item === userId) ? DislikeFilled : DislikeOutlined)}
                            <span className="ml-3">{item.dislikes}</span>
                        </span>
                    </Tooltip>,
                ],
                author: (<Row className="text-[1.6rem]">{item.createdBy.fullName}</Row>),
                avatar: (<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size={45}>{item.createdBy.fullName[0]}</Avatar>),
                content: (
                <>
                    <Rate value={item.ratePoint} allowHalf disabled />
                    <Row className="text-[#AFAAAA] text-[1.4] mt-1">{item.rateDescription}</Row>
                    <Row className="text-[1.6rem] mt-4">
                        {item.content}
                    </Row>
                </>
                ),
                datetime: item.createdAt,
            }
        })
        setData(items)
        setRatePoint(parseInt(sum/product?.comments?.length))
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  return (
    <Row className="flex flex-col">
        {product?.comments?.length > 0 ? (
            <>
                <Row className="!my-[50px] px-10 py-6 bg-[#f8f8f8] rounded flex items-center justify-between">
                    <Row className="flex flex-col">
                        <Rate disabled allowHalf value={ratePoint} />
                        <Row className="text-[1.6rem] text-[#154c79] mt-3">{`${ratePoint} trên 5`}</Row>
                    </Row>
                    <Button 
                        size="large"
                        onClick={showModal}
                        className="flex items-center !bg-[#154c79] !border-[#154c79] !text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        <BsPencil className="mr-3 text-[1.8rem]" />
                        Viết đánh giá
                    </Button>
                </Row>
                <Row className="text-[1.6rem] mb-5">{`Tất cả: ${product?.comments?.length} đánh giá`}</Row>
                <List
                    className="comment-list"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <li>
                            <Comment
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                            />
                        </li>
                    )}
                />
            </>
        ) : (
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                   height: 100,
                   margin: '20px auto'
                }}
                className="flex justify-center flex-col mb-10"
                description={
                <span className="text-[1.6rem]">
                    Rất tiếc, sản phẩm chưa có đánh giá nào!
                </span>
                }>
                <Row className="flex justify-center">
                    <Button 
                        size="large"
                        onClick={showModal}
                        className="flex items-center !bg-[#154c79] !border-[#154c79] !text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        <BsPencil className="mr-3 text-[1.8rem]" />
                        Viết đánh giá
                    </Button>
                </Row>
            </Empty>
        )}
        <Modal title="Đánh giá sản phẩm" visible={isModalOpen} centered footer={false} onCancel={handleCancel}>
            <FormRate product={product} />
        </Modal>
    </Row> 
  )
}

export default ListRate
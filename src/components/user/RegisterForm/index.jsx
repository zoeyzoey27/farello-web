import React, { useState, useEffect } from 'react'
import { Row, Button, Form, Input, Typography, Divider, DatePicker, Select, Col, message  } from 'antd'
import { schemaValidate } from '../../../validation/Register'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../../api/axiosClient'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from './graphql'
import { convertTimeToString, DATE_TIME_FORMAT } from '../../../constant'
import moment from 'moment'
import i18n from '../../../translation'

const RegisterForm = ({setLoading}) => {
  const { Title } = Typography
  const { Option } = Select
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [registerUser] = useMutation(REGISTER_USER)
  const [provinceList, setProvinceList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [communeList, setCommuneList] = useState([])
  const yupSync = converSchemaToAntdRule(schemaValidate)

  const onFinish = async (values) => {
    setLoading(true)
    if (values.password !== values.rePassword) {
      setLoading(false)
      message.error(i18n.t('register.messageError'));
    }
    else {
      const province = provinceList.find((item) => item.code === form.getFieldsValue().province).name
      const district = districtList.find((item) => item.code === form.getFieldsValue().district).name
      const commune = communeList.find((item) => item.code === form.getFieldsValue().commune).name
      const adminAddress = `${commune} - ${district} - ${province}`
      const customId = 'US' + Math.floor(Math.random() * Date.now())
      await registerUser({
        variables: {
          userRegisterInput: {
            userId: customId.trim(),
            fullName: values.name.trim(),
            email: values.email.trim(),
            password: values.password.trim(),
            phoneNumber: values.phone.trim(),
            address: adminAddress,
            provinceCode: values.province,
            districtCode: values.district,
            communeCode: values.commune,
            idCard: values.idCard.trim(),
            birthday: convertTimeToString(values.birthday, DATE_TIME_FORMAT),
            status: 'AVAILABLE',
            createdAt: moment().format(DATE_TIME_FORMAT),
            updatedAt: moment().format(DATE_TIME_FORMAT),
          }
        },
        onCompleted: () => {
          setLoading(false)
          navigate('/login')
          message.success(i18n.t('register.messageSuccess'));
        },
        onError: (err) => {
          setLoading(false)
          message.error(`${err.message}`);
        }
      })
    }
  }
  useEffect(() => {
     axiosClient.get('province').then((res) => {
      setProvinceList(res.data.results)
     })
  },[])
  const onChangeProvince = async (value) => {
    await axiosClient.get(`district?province=${value}`).then((res) => {
      setDistrictList(res.data.results)
    })
  }
  const onChangeDistrict = async (value) => {
    await axiosClient.get(`commune?district=${value}`).then((res) => {
      setCommuneList(res.data.results)
    })
  }
  return (
    <Row className="w-full flex justify-center mb-20">
      <Row className="py-10 px-20 rounded bg-white w-full md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] flex flex-col shadow-lg">
        <Title level={3} className="block !mb-10 !text-[#343a40]">{i18n.t('register.title')}</Title>
        <Row className="text-[1.6rem]">{i18n.t('common.enterInfo')}</Row>
        <Row className="mb-5 text-[1.6rem]">{i18n.t('common.subtitle')}</Row>
        <Form
          layout="vertical"
          form={form}
          autoComplete="off"
          onFinish={onFinish}
          className="w-full">
          <Form.Item
            name="name"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  {i18n.t('common.fullName')}
                  <Row className="text-red-500 ml-3">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}>
            <Input size="large" placeholder="User" className="rounded" />
          </Form.Item>
          <Form.Item
            name="birthday"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  {i18n.t('common.birthday')}
              </Row>
            }
            required={false}>
            <DatePicker size="large" placeholder="01/01/1990" className="rounded w-full" format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item 
              label={
                  <Row className="font-semibold text-[1.6rem]">
                     {i18n.t('common.address')}
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
              <Row gutter={{xs: 0, md: 16}}>
                <Col xs={24}>
                  <Form.Item
                      name="province"
                      required={false}
                      rules={[yupSync]}>
                      <Select
                          showSearch
                          size="large"
                          className="w-full text-[1.6rem]"
                          placeholder={i18n.t('common.province')}
                          optionFilterProp="children"
                          onChange={onChangeProvince}
                          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                          filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                          }>
                          {
                            provinceList.map((item) => (
                              <Option key={item.code} value={item.code} className="text-[1.6rem]">{item.name}</Option>
                            ))
                          }
                        </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="district"
                    required={false}
                    rules={[yupSync]}>
                    <Select
                        showSearch
                        size="large"
                        className="w-full text-[1.6rem]"
                        placeholder={i18n.t('common.district')}
                        optionFilterProp="children"
                        onChange={onChangeDistrict}
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }>
                        {
                          districtList.map((item) => (
                            <Option key={item.code} value={item.code} className="text-[1.6rem]">{item.name}</Option>
                          ))
                        }
                      </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="commune"
                    className="mb-0"
                    required={false}
                    rules={[yupSync]}>
                    <Select
                        showSearch
                        size="large"
                        className="w-full text-[1.6rem]"
                        placeholder={i18n.t('common.commune')}
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }>
                        {
                          communeList.map((item) => (
                            <Option key={item.code} value={item.code} className="text-[1.6rem]">{item.name}</Option>
                          ))
                        }
                      </Select>
                  </Form.Item>
                </Col>
              </Row>
           </Form.Item>
          <Form.Item
            name="email"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  {i18n.t('common.email')}
                  <Row className="text-red-500 ml-3">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}>
            <Input size="large" placeholder="user@gmail.com" className="rounded" />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  {i18n.t('common.password')}
                  <Row className="text-red-500 ml-3">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}>
            <Input.Password size="large" placeholder="user@123" className="rounded" />
          </Form.Item>
          <Form.Item
            name="rePassword"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  {i18n.t('register.passwordConfirm')}
                  <Row className="text-red-500 ml-3">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}>
            <Input.Password size="large" placeholder="user@123" className="rounded" />
          </Form.Item>
          <Form.Item
            name="phone"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  {i18n.t('common.phone')}
                  <Row className="text-red-500 ml-3">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}>
            <Input size="large" placeholder="0366057503" className="rounded" />
          </Form.Item>
          <Form.Item
            name="idCard"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  {i18n.t('common.idCard')}
              </Row>
            }
            required={false}>
            <Input size="large" placeholder="123456789" className="rounded" />
          </Form.Item>
          <Form.Item>
            <Button 
              htmlType="submit" 
              size="large" 
              className="bg-colorTheme text-white hover:bg-colorTheme hover:text-white hover:border-colorTheme w-full mt-5 font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
              {i18n.t('register.title')}
            </Button>
          </Form.Item>
          <Divider><Row className="font-normal text-[1.3rem]">{i18n.t('register.goToLogin')}</Row></Divider>
          <Form.Item>
            <Button 
              size="large" 
              onClick={() => navigate('/login')}
              className="border-colorTheme border-1 text-colorTheme hover:text-colorTheme hover:border-colorTheme w-full font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
              {i18n.t('register.loginButton')}
            </Button>
          </Form.Item>
        </Form> 
      </Row>
    </Row>
  )
}

export default RegisterForm
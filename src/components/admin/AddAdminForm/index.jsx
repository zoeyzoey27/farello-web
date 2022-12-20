import React, { useEffect, useState } from 'react'
import { 
    Space, 
    Form, 
    Input, 
    Row, 
    Typography, 
    Button, 
    Select,
    Col,
    message,
    DatePicker, 
    Breadcrumb
} from 'antd'
import { schemaValidate } from '../../../validation/AddAdmin'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md'
import { FiSave } from 'react-icons/fi'
import axiosClient from '../../../api/axiosClient'
import { ADD_ADMIN, GET_ADMIN, UPDATE_ADMIN_INFO } from './graphql'
import { useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import { DATE_TIME_FORMAT, convertTimeToString, AVAILABLE, DATE_FORMAT, EDIT } from '../../../constant'
import i18n from '../../../translation'

const AddAdminForm = ({setLoading, action, id}) => {
  const navigate = useNavigate()
  const [addAdmin] = useMutation(ADD_ADMIN)
  const [updateAdmin] = useMutation(UPDATE_ADMIN_INFO)
  const { Option } = Select
  const [form] = Form.useForm()
  const [provinceList, setProvinceList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [communeList, setCommuneList] = useState([])
  const { Title } = Typography
  const yupSync = converSchemaToAntdRule(schemaValidate)

  const { data } = useQuery(GET_ADMIN, {
    variables: {
      adminId: id
    },
    skip: id === null,
    onCompleted: () => {
      setLoading(false)
    }
  })
  const onFinish = (values) => {
    setLoading(true)
    if (values.password !== values.rePassword) {
      message.error(`${i18n.t('addAdmin.message.passwordIncorrect')}`)
    }
    else {
      const province = provinceList.find((item) => item.code === form.getFieldsValue().province).name
      const district = districtList.find((item) => item.code === form.getFieldsValue().district).name
      const commune = communeList.find((item) => item.code === form.getFieldsValue().commune).name
      const adminAddress = `${commune} - ${district} - ${province}`
      const customId = 'NV' + Math.floor(Math.random() * Date.now())
      addAdmin({
        variables: {
          adminRegisterInput: {
            adminId: customId,
            fullName: values.fullName,
            email: values.email,
            password: values.password,
            phoneNumber: values.phone,
            address: adminAddress,
            provinceCode: values.province,
            districtCode: values.district,
            communeCode: values.commune,
            idCard: values.idcard,
            birthday: convertTimeToString(values.birthday),
            status: AVAILABLE,
            createdAt: moment().format(DATE_TIME_FORMAT),
            updatedAt: moment().format(DATE_TIME_FORMAT),
          },
        },
        onCompleted: () => {
          setLoading(false)
          message.success(`${i18n.t('addAdmin.message.createAccountSuccess')}`)
          form.resetFields()
        },
        onError: (error) => {
          setLoading(false)
          message.error(`${error.message}`)
        },
      })
    }
  }
  const onUpdate = (values) => {
    setLoading(true)
    const province = provinceList.find((item) => item.code === form.getFieldsValue().province).name
    const district = districtList.find((item) => item.code === form.getFieldsValue().district).name
    const commune = communeList.find((item) => item.code === form.getFieldsValue().commune).name
    const adminAddress = `${commune} - ${district} - ${province}`
    updateAdmin({
      variables: {
        updateAdminId: id,
        adminUpdateInput: {
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phone,
          address: adminAddress,
          provinceCode: values.province,
          districtCode: values.district,
          communeCode: values.commune,
          idCard: values.idcard,
          birthday: convertTimeToString(values.birthday),
          status: AVAILABLE,
          updatedAt: moment().format(DATE_TIME_FORMAT),
        },
      },
      onCompleted: () => {
        setLoading(false)
        message.success(`${i18n.t('addAdmin.message.editingSuccessful')}`)
        navigate("/admin/adminList")
      },
      onError: (error) => {
        setLoading(false)
        message.error(`${error.message}`)
      },
    })
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
  useEffect(() => {
    if (data) {
       form.setFieldsValue({
          fullName: data?.admin?.fullName,
          phone: data?.admin?.phoneNumber,
          email: data?.admin?.email,
          idcard: data?.admin?.idCard,
          province: data?.admin?.provinceCode,
       })
       if (data?.admin?.birthday) {
        form.setFieldsValue({
          birthday: moment(data?.admin?.birthday, DATE_FORMAT),
        })
       }
       onChangeProvince(data?.admin?.provinceCode)
       form.setFieldsValue({
            district: data?.admin?.districtCode,
       })
       onChangeDistrict(data?.admin?.districtCode)
       form.setFieldsValue({
          commune: data?.admin?.communeCode,
       })
    }
  }, [data, form])
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full bg-white p-10">
        <Title level={4} className="whitespace-pre-wrap">
          {action === EDIT ? i18n.t('addAdmin.title.edit') : i18n.t('addAdmin.title.addNew')}
        </Title>
        <Breadcrumb className="text-[1.6rem] mb-5">
              <Breadcrumb.Item 
                onClick={() => navigate('/admin/dashboard')}
                className="hover:text-black cursor-pointer">
                {i18n.t('common.dashboard')}
              </Breadcrumb.Item>
              <Breadcrumb.Item className="font-semibold">
                  {action === EDIT ? i18n.t('addAdmin.title.edit') : i18n.t('addAdmin.title.addNew')}
              </Breadcrumb.Item>
          </Breadcrumb>
        <Row className="text-[1.6rem]">{i18n.t('common.enterInfo')}</Row>
        <Row className="mb-5 text-[1.6rem]">{i18n.t('common.subtitle')}</Row>
        <Form 
            layout='vertical'
            autoComplete='off' 
            onFinish={action === 'edit' ? onUpdate : onFinish} 
            form={form}>
            <Form.Item
                name="fullName"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     {i18n.t('common.fullName')}
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="Admin" className="rounded" />
            </Form.Item>
            <Form.Item
                name="birthday"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     {i18n.t('common.birthday')}
                  </Row>
                }>
                <DatePicker 
                   size="large" 
                   format={DATE_FORMAT} 
                   placeholder="01/01/1990" 
                   className="w-full" />
            </Form.Item>
            <Form.Item 
              className="mb-0 w-full xl:w-[60%]"
              label={
                  <Row className="font-semibold text-[1.6rem]">
                     {i18n.t('common.address')}
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
              <Row gutter={{xs: 0, md: 16}}>
                <Col xs={24} md={8}>
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
                <Col xs={24} md={8}>
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
                <Col xs={24} md={8}>
                  <Form.Item
                    name="commune"
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
                name="phone"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     {i18n.t('common.phone')}
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="0366057503" className="rounded" />
            </Form.Item>
           <Form.Item
                name="email"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     {i18n.t('common.email')}
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="admin@gmail.com" className="rounded" />
            </Form.Item>
            {
              action !== EDIT && (
                <>
                <Form.Item
                    name="password"
                    className="w-full md:w-1/2 lg:w-1/3"
                    required={false}
                    rules={[yupSync]}
                    label={
                      <Row className="font-semibold text-[1.6rem]">
                        {i18n.t('common.password')}
                        <Row className="text-red-500 ml-3">*</Row>
                      </Row>
                    }>
                    <Input.Password size="large" placeholder="admin@123" className="rounded" />
                </Form.Item>
                <Form.Item
                    name="rePassword"
                    className="w-full md:w-1/2 lg:w-1/3"
                    required={false}
                    rules={[yupSync]}
                    label={
                      <Row className="font-semibold text-[1.6rem]">
                        {i18n.t('common.rePassword')}
                        <Row className="text-red-500 ml-3">*</Row>
                      </Row>
                    }>
                    <Input.Password size="large" placeholder="admin@123" className="rounded" />
                </Form.Item>
                </>
              )
            }
            <Form.Item
                name="idcard"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     {i18n.t('common.idCard')}
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="0123456789" className="rounded" />
            </Form.Item>
            <Row className="flex flex-col md:flex-row !mt-10">
              <Form.Item>
                  <Button 
                      size="large" 
                      onClick={() => form.resetFields()}
                      className="flex items-center justify-center md:mr-5 w-full md:w-[100px] !bg-white !text-colorTheme hover:bg-white hover:text-colorTheme hover:border-colorTheme !border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                      <MdDeleteOutline className="mr-3 text-[2rem]" />
                      {i18n.t('common.reset')}
                  </Button>
              </Form.Item>
              <Form.Item>
                  <Button 
                      size="large" 
                      htmlType="submit"
                      className="flex items-center justify-center w-full md:min-w-[100px] !bg-colorTheme border-colorTheme !text-white hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                      <FiSave className="mr-3 text-[2rem]" />
                      {action === EDIT ? i18n.t('common.saveChange') : i18n.t('addAdmin.buttonLabel')}
                  </Button>
              </Form.Item>
            </Row>
        </Form>
    </Space>
  )
}

export default AddAdminForm
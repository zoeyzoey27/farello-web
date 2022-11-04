import React from 'react'
import { Row, Button } from 'antd'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import i18n from '../../../translation'

const BaseTitleHeader = ({totalCount, handleClick, buttonLabel}) => {

  return (
    <Row className="flex flex-col-reverse md:flex-row md:justify-between my-5">
        <Row className="text-[1.6rem] mt-5 md:mt-0">
            {i18n.t('common.total')} 
            <Row className="font-semibold text-colorTheme mx-2">{totalCount}</Row> 
            {i18n.t('common.result')} 
        </Row>
        <Button   
            size="large" 
            htmlType="submit" 
            onClick={handleClick}
            className="w-fit !bg-colorTheme !text-white !border-colorTheme hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90 text-[1.6rem] hover:shadow-md flex items-center">
            <AiOutlineAppstoreAdd className="mr-1 text-[2rem] text-white" />
            {buttonLabel}
        </Button>
    </Row>
  )
}

export default BaseTitleHeader
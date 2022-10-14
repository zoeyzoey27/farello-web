import * as Yup from 'yup'

export const schemaValidate = Yup.object().shape({
  content: Yup.string()
    .required('Vui lòng nhập nội dung đánh giá!'),
})
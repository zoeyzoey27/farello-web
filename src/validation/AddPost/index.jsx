import * as Yup from 'yup'

export const schemaValidate = Yup.object().shape({
  title: Yup.string()
    .required('Vui lòng nhập tiêu đề bài viết!'),
  categoryName: Yup.string()
    .required('Vui lòng chọn danh mục bài viết!'),
  content: Yup.string()
    .required('Vui lòng nhập nội dung bài viết!'),
  image: Yup.mixed()
    .required('Vui lòng tải lên ảnh minh họa!'),
})
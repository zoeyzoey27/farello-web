import React from 'react'
import { Space, Breadcrumb, Image, Row, Col } from 'antd'
import about from '../../../assets/images/about.jpg'
import about2 from '../../../assets/images/gioi-thieu.jpg'
import design from '../../../assets/images/gioi-thieu1.jpg'
import product from '../../../assets/images/gioi-thieu2.jpg'
import videoBackground from '../../../assets/images/nature_spirit.mov'

const AboutUs = () => {
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="max-w-full max-h-full mb-10">
        <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[1.6rem] font-semibold">Giới thiệu</Breadcrumb.Item>
        </Breadcrumb>
        <Image src={about} alt="" preview={false} />
        <Row className="title-header">NGUỒN CẢM HỨNG CỦA FARELLO</Row>
        <Row className="text-[1.6rem] text-justify lg:!mx-[50px] xl:!mx-[100px]">
           Bước ra từ câu chuyện của những người trẻ với khát khao tìm thấy "định nghĩa" về chính bản 
           thân mình giữa những hoài nghi về nhận thức,năng lực và cuộc sống. Farello được tạo ra như 
           một người bạn đồng hành, một lăng kính đa chiều và rộng mở để bạn "nhìn rõ" chính mình và thế giới xung quanh.
           <br />
           Với thông điệp "WHEN IN DOUBT, WEAR GLASSES", Farello mong muốn được hiện diện trong cuộc sống của bạn hàng ngày, 
           đưa cho bạn những góc nhìn thật khác biệt, gợi cho bạn cảm hứng tìm ra điều tích cực ngay cả trong những khoảnh khắc bạn bối rối, mông lung.
           <br />
           Đối với Farello, bạn chính là "độc bản". Chúng tôi mong muốn bạn có một góc nhìn đủ rộng, đủ tốt để đưa ra những lựa chọn 
           khiến bạn hạnh phúc, đủ tự tin để theo đuổi những gì bạn đam mê. Chúng tôi biết rằng bạn có cá tính, có tri thức, 
           có lập trường riêng. Đâu cần phải chạy theo sống đông, bạn chỉ cần bắt kịp "lý tưởng" của riêng mình.
        </Row>
        <Row className="flex justify-between my-[50px]">
            <Col span={11} className="mb-[30px] bg-[#f8f8f8] p-[50px]" >
                <Col className="mb-10">
                     <Row className="uppercase font-semibold mb-2 text-[2rem]">Tầm nhìn</Row>
                     <Row className="text-[1.6rem] text-justify">
                        Không ngừng SÁNG TẠO để nâng cao chất lượng dịch vụ, Farello mang sứ mệnh trở thành danh hiệu quốc dân -"Top of Mind" 
                        của mọi độ tuổi và phong cách, từ thanh lịch, sang trọng, tri thức đến cá tính, nổi loạn.
                     </Row>
                </Col>
                <Col className="mb-10">
                     <Row className="uppercase font-semibold mb-2 text-[2rem]">SỨ MỆNH</Row>
                     <Row className="text-[1.6rem] text-justify">
                        Không ngừng SÁNG TẠO để nâng cao chất lượng dịch vụ, Farello mang sứ mệnh trở thành danh hiệu quốc dân -"Top of Mind" của mọi 
                        độ tuổi và phong cách, từ thanh lịch, sang trọng, tri thức đến cá tính, nổi loạn.
                     </Row>
                </Col>
                <Col className="mb-10">
                     <Row className="uppercase font-semibold mb-2 text-[2rem]">GIÁ TRỊ CỐT LÕI</Row>
                     <Row className="text-[1.6rem] text-justify">
                        Không ngừng SÁNG TẠO để nâng cao chất lượng dịch vụ, Farello mang sứ mệnh trở thành danh hiệu quốc dân -"Top of Mind" của mọi độ 
                        tuổi và phong cách, từ thanh lịch, sang trọng, tri thức đến cá tính, nổi loạn.
                     </Row>
                </Col>
            </Col>
            <Col span={11} className="mb-[30px]">
              <Image src={about2} alt="" preview={false} className="w-full object-cover object-center" />
            </Col>
            <Col span={11} className=" bg-[#f8f8f8] p-[50px]">
                <Image src={design} alt="" preview={false} className="mb-5 w-full object-cover object-center" />
                <Row className="uppercase font-semibold mb-2 text-[2rem]">THIẾT KẾ</Row>
                <Row className="text-[1.6rem] text-justify">
                    Farello tin rằng người khách hàng thông thái không muốn những thiết kế chỉ "hợp thời" trong một thời gian ngắn. 
                    Chúng tôi tạo ra những mẫu thiết kế đơn giản, tinh tế, phù hợp trong mọi hoàn cảnh, dễ ứng dụng với các trang 
                    phục hàng ngày của bạn và hợp mốt nhiều năm. Bạn không cần phải là người am hiểu thời trang mới có thể "diện đẹp" 
                    một chiếc kính Farello. Farello là chiếc kính "quốc dân" có thể hỗ trợ cho mọi phong cách ăn mặc dù là thanh lịch, 
                    trẻ trung hay cá tính, phóng khoáng. Bạn chỉ cần chọn "đúng kính" mà thôi.
                </Row>
            </Col>
            <Col span={11} className="bg-[#f8f8f8] p-[50px]">
                <Image src={product} alt="" preview={false} className="mb-5" />
                <Row className="uppercase font-semibold mb-2 text-[2rem]">SẢN PHẨM</Row>
                <Row className="text-[1.6rem] text-justify">
                    Đối với Farello, một sản phẩm thành công không chỉ thực sự "chạm" đến khách hàng mà còn "chạm" đến thiên nhiên. Mỗi 
                    chiếc kính Farello là sự tổng hòa của hai yếu tố : Thân thiện với làn da, đôi mắt và thân thiện với môi trường. Chúng 
                    tôi sử dụng chất liệu Titanium, Acetate, Stainless steel và công nghệ gia công từ Ý để đảm bảo chiếc kính đem lại cảm 
                    giác dễ chịu nhất có thể và tránh xa những tác động tiêu cực cho hành tinh xanh.
                </Row>
            </Col>
        </Row>
        <video preload='false' autoPlay muted loop className='max-h-[680px] w-full object-cover'>
          <source src={videoBackground} type="video/mp4" />
        </video>
        <Row className="text-[1.6rem] text-justify lg:!mx-[50px] xl:!mx-[100px] my-10">
           Để có được những sản phẩm vừa vặn và phù hợp với gương mặt phù hợp của người Việt, linh hoạt và thuận lợi cho mọi hoạt động, 
           mỗi chiếc kính Farello trải qua đến 60 bước thiết kế và gia công mới có được thông số kỹ thuật phù hợp nhất. Kết hợp với vật 
           liệu cao cấp và công nghệ sản xuất tiên tiến được hoàn thiện bởi nghệ nhân có tay nghề cao, bạn sẽ bất ngờ không chỉ với vẻ đẹp 
           thời trang mà còn là độ bền vượt trội mà sản phẩm mang lại.
        </Row>
    </Space>
  )
}

export default AboutUs
import { BsChevronRight, BsChevronLeft } from "react-icons/bs"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import slider_1 from "../../assets/slider/banner_1.jpg"
import slider_2 from "../../assets/slider/banner_2.jpeg"
import slider_3 from "../../assets/slider/banner_3.jpeg"
import slider_4 from "../../assets/slider/banner_4.jpg"


function Banner() {
  const SampleNextArrow = props => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '15px',
          lineHeight: '1.5715'
        }}
        onClick={onClick}
      >
        <BsChevronRight color="#1f2937" size={22}/>
      </div>
    )
  }
  const SamplePrevArrow = props => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '15px',
          lineHeight: '1.5715'
        }}
        onClick={onClick}
      >
        <BsChevronLeft color="#1f2937" size={22}/>
      </div>
    )
  }
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow/>,
    nextArrow: <SampleNextArrow/>,
  };

  return (
    <section className='container mx-auto'>
      <div className="mb-14">
        <Slider {...settings}>
          <div>
            <img src={slider_1} alt="" className='w-100'/>
          </div>
          <div >
            <img src={slider_2} alt="" className='w-100'/>
          </div>
          <div>
            <img src={slider_3} alt="" className='w-100'/>
          </div>
          <div>
            <img src={slider_4} alt="" className='w-100'/>
          </div>
        </Slider>
      </div>
    </section>
  )
}

export default Banner
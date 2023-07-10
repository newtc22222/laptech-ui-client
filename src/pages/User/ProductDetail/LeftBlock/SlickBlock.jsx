/** @format */

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator';

function SlickBlock(props) {
  const initProductDetail = useSelector((state) => state.products.productDetail.data);
  const dataImage = initProductDetail?.data?.imageList;
  const images = dataImage?.filter((image) => image.type === 'ADVERTISE');

  const settings = {
    customPaging: function (i) {
      return (
        <div>
          <img
            style={{ border: '1px solid gray' }}
            src={images[i]?.url}
            alt="small-slide"
            height="100px"
            width="100px"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <LoadingIndicator loading={dataImage ? false : true} />
      <div>
        <Slider {...settings}>
          {images?.map((image, index) => {
            return (
              <div className="" style={{ width: 800 }}>
                <div className="h-[400px]">
                  <img src={image.url} alt="" className="h-full w-full rounded-xl object-scale-down" />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default SlickBlock;

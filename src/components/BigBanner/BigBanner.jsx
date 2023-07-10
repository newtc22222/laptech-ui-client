/** @format */

import Slider from 'react-slick';

import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { bannerService } from '../../services/banner.service';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import './bigbanner.scss';

const BigBanner = () => {
  const [banners, setBanners] = useState([]);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    setRequesting(true);
    bannerService.getAllBanner().then((res) => {
      if (res.status === 200) {
        setBanners(res.data);
        setRequesting(false);
      }
    });
  }, []);

  return (
    <>
      <LoadingIndicator loading={requesting} />
      <div className="container__bigbanner">
        <div className="containner__body">
          <div className="containner__first-item">
            <Slider slidesToShow={1} slidesToScroll={1} autoplay={true} autoplaySpeed={2000}>
              {banners.map((src, idx) => (
                <div key={idx} className="owl-item">
                  <div className="item">
                    <img className="h-[100%] w-[100%]" src={src?.path} alt="" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default BigBanner;

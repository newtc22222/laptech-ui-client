/** @format */

import { useSelector } from 'react-redux';
import { StarFill } from 'react-bootstrap-icons';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { feedbackService } from '../../../services';
import { convertUTCDate } from '../../../utils/ConvertUTCDate';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';

const Star = ({ star }) => {
  return [...Array(star)].map((e, i) => (
    <i key={i}>
      <StarFill />
    </i>
  ));
};

const RatingPage = () => {
  const { id } = useParams();
  const [ratingList, setRatingList] = useState([]);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    fetchRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRatings = () => {
    setRequesting(true);
    feedbackService.getFeedbackByProductId(id).then((res) => {
      if (res.status === 200) {
        setRequesting(false);
        setRatingList(res.data);
      }
    });
  };

  const initProductDetail = useSelector((state) => state.products.productDetail.data);
  const dataProduct = initProductDetail?.data?.product;
  const dataImage = initProductDetail?.data?.imageList;
  const images = dataImage?.filter((image) => image.type === 'ADVERTISE');
  const sumStar = ratingList?.reduce((partialSum, a) => partialSum + Number(a.ratingPoint), 0);
  const avgStar = sumStar / ratingList?.length;

  return requesting === false && ratingList?.length === 0 ? (
    <div className="pt-[120px] text-center p-[100px] min-h-[100vh] font-bold text-[20px]">
      Sản phẩm này chưa có đánh giá nào
    </div>
  ) : (
    <>
      <LoadingIndicator loading={requesting} />
      <div className="flex flex-col pt-[120px] min-h-[100vh] px-20 ">
        <div className="font-bold text-[18px]">Đánh giá {dataProduct?.name}</div>
        {!isNaN(avgStar) && (
          <div className="flex">
            <span>{avgStar}</span>
            <Rating name="read-only" precision={0.05} value={avgStar} readOnly />
          </div>
        )}
        {images.length > 0 && (
          <div>
            <img src={images[0].url} alt="rating-img" />
          </div>
        )}

        <div>
          {ratingList?.map((comment, index) => {
            return (
              <div className="py-8 border-b m-4" key={index}>
                <p className="font-bold">{comment.username}</p>
                <span className="text-yellow-300 flex">
                  <Star star={comment.ratingPoint} />
                </span>

                <p className="text-2xl">{comment.content}</p>
                <div className="flex">
                  <span className="mr-2 text-[gray]">{convertUTCDate(comment.createdDate)}</span>
                </div>
                <Divider sx={{ opacity: 0.4 }} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RatingPage;

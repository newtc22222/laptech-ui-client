/** @format */

import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import clsx from 'clsx';
import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { feedbackService, historyService, orderService, userService } from '../../services';
import { convertUTCDate } from '../../utils/ConvertUTCDate';

const RatingStar = ({ onClick }) => {
  const [numberStar, setNumberStar] = useState(0);

  const active = 'text-yellow-300';

  return (
    <div className="cursor-pointer flex gap-6">
      {[...Array(5)].map((e, i) => (
        <i
          key={i}
          onClick={() => {
            setNumberStar(i + 1);
            onClick(i + 1);
          }}
        >
          <StarFill className={clsx('text-5xl', i + 1 <= numberStar && active)} />
        </i>
      ))}
    </div>
  );
};

const Star = ({ star }) => {
  return [...Array(star)].map((e, i) => (
    <i key={i}>
      <StarFill />
    </i>
  ));
};

function ProductRating() {
  const dataUser = JSON.parse(localStorage.getItem('loginClient')) || {};
  const { user } = dataUser || {};
  const { id } = useParams();
  const [ratingList, setRatingList] = useState([]);
  const [content, setContent] = useState();
  const [point, setPoint] = useState();
  const navigate = useNavigate();
  const maxRenderCount = 2;
  const [allOrders, setAllOrders] = useState([]);
  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    userService.getAllOrders().then((res) => {
      if (res.status === 200) {
        setAllOrders(res.data);

        const findOrdersReceived = res.data?.filter((order) => order.orderStatus === 'RECEIVED');
        const orderIds = findOrdersReceived?.map((order) => order.id);

        orderIds?.forEach((orderId) => {
          historyService.getDetailItem(orderId).then((res) => {
            if (res.status === 200) {
              const item = res?.data[0]?.product?.id;
              setProductIds((prevProductIds) => [...prevProductIds, item]);
            }
          });
        });
      }
    });
  }, []);

  const fetchRatings = () => {
    feedbackService.getFeedbackByProductId(id).then((res) => setRatingList(res.data));
  };

  useEffect(() => {
    fetchRatings();
  }, [ratingList]);

  const initProductDetail = useSelector((state) => state.products.productDetail.data);
  const dataProduct = initProductDetail?.data?.product;

  const [showModal, setShowModal] = useState(false);

  const sumStar = ratingList?.reduce((partialSum, a) => partialSum + Number(a.ratingPoint), 0);
  const avgStar = sumStar / ratingList?.length;

  const handleNavigate = () => {
    navigate(`/detail/${id}/rating`);
  };

  const handleFeedback = (event) => {
    event.preventDefault();

    const dataRating = {
      productId: dataProduct?.id,
      userId: user.id,
      content: content,
      ratingPoint: point,
      id: crypto.randomUUID().toString().slice(0, 5),
      updateBy: 'system',
    };

    feedbackService
      .postFeedback(dataRating)
      .then((res) => {
        if (res.status === 201) {
          setContent('');
          setRatingList((prevRatingList) => [...prevRatingList, dataRating]);
          setShowModal(false);
        } else {
          toast.error('Chỉ được đánh giá sản phẩm 1 lần');
        }
      })
      .catch((error) => {
        toast.error('Chỉ được đánh giá sản phẩm 1 lần');
      });
  };

  return (
    <div className=" my-12 w-full flex justify-center flex-col ">
      <div className="flex">
        <p className="text-3xl font-bold">Đánh giá {dataProduct?.name} </p>
        {!isNaN(avgStar) && (
          <div className="flex">
            <span>{avgStar}</span>
            <Rating name="read-only" precision={0.05} value={avgStar} readOnly />
          </div>
        )}
      </div>
      {ratingList?.map((comment, index) => {
        if (index < maxRenderCount) {
          return (
            <div className="py-8 border-b" key={index}>
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
        }
        return null;
      })}

      <div className="flex items-center justify-center gap-4 ">
        {productIds.length > 0 && productIds.includes(id) && (
          <div className="w-full">
            <button
              className="bg-[#04aa6d] p-4 rounded w-[100%]  text-white border-none cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <i>
                <StarFill />
              </i>
              &nbsp; Viết đánh giá
            </button>

            <Modal show={showModal} onClose={() => setShowModal(false)} size="5xl">
              <Modal.Header>
                <p className="text-2xl font-bold">Đánh giá {dataProduct?.name}</p>
              </Modal.Header>
              <Modal.Body>
                <div className="p-8 text-center">
                  <div className="font-bold p-4 text-2xl flex items-center justify-center">
                    <p>{dataProduct?.name}</p>
                  </div>

                  <div className="flex justify-center my-4">
                    <RatingStar
                      onClick={(e) => {
                        setPoint(e);
                      }}
                    />
                  </div>

                  <form className="flex flex-col items-center gap-4" onSubmit={handleFeedback}>
                    <textarea
                      className="w-full rounded-xl p-4 border border-[#04aa6d]"
                      id=""
                      name=""
                      cols="30"
                      rows="10"
                      required
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      value={content}
                      placeholder="Mời bạn chia sẻ thêm một số cảm nhận về sản phẩm ..."
                    ></textarea>

                    <button type="submit" className="p-4 bg-[#04aa6d] rounded-xl text-white border-none cursor-pointer">
                      Gửi đánh giá ngay
                    </button>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        )}
        <div className="w-full">
          <button
            onClick={() => handleNavigate()}
            className="border border-[#04aa6d] w-[100%]  p-4 rounded text-[#04aa6d] w-1/2 cursor-pointer"
          >
            Xem {ratingList?.length} đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductRating;

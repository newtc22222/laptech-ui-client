/** @format */

import { useSelector } from 'react-redux';
import { StarFill } from 'react-bootstrap-icons';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { feedbackService } from '../../../services';
import { convertUTCDate } from '../../../utils/ConvertUTCDate';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Paper, Tab, makeStyles } from '@material-ui/core';
import Pagination from '../../../components/Pagination/Pagination';

const Star = ({ star }) => {
  return [...Array(star)].map((e, i) => (
    <i key={i}>
      <StarFill />
    </i>
  ));
};

const useStyles = makeStyles((theme) => ({
  indicator: {
    display: 'none',
  },

  activeTab: {
    backgroundColor: 'rgb(4, 170, 109)',
    color: '#ffffff',
    fontSize: '14px',

    // Add any other styles you want for the active tab
  },
  tab: {
    fontSize: '14px',
    backgroundColor: '#DCDCDC',
    color: 'black',
  },
}));

const RatingPage = () => {
  const { id } = useParams();
  const [ratingList, setRatingList] = useState([]);
  const [requesting, setRequesting] = useState(false);
  const [value, setValue] = useState('1');

  let PageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    FetchRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FetchRatings = () => {
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
  const sumStar = ratingList?.reduce((partialSum, a) => partialSum + Number(a.ratingPoint), 0);
  const avgStar = sumStar / ratingList?.length;
  const classes = useStyles();
  const oneStar = ratingList?.filter((rating) => rating.ratingPoint === 1);
  const twoStar = ratingList?.filter((rating) => rating.ratingPoint === 2);
  const threeStar = ratingList?.filter((rating) => rating.ratingPoint === 3);
  const fourStar = ratingList?.filter((rating) => rating.ratingPoint === 4);
  const fiveStar = ratingList?.filter((rating) => rating.ratingPoint === 5);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return ratingList?.slice(firstPageIndex, lastPageIndex);
  }, [PageSize, currentPage, ratingList]);
  return requesting === false && ratingList?.length === 0 ? (
    <div className="pt-[120px] text-center  min-h-[100vh] font-bold text-[20px]">Sản phẩm này chưa có đánh giá nào</div>
  ) : (
    <>
      <LoadingIndicator loading={requesting} />

      <div className="flex  pt-[120px] h-[100%] min-h-[100vh] w-[100%] px-[40px] bg-[#fff] py-[40px] ">
        <div className="w-[25%]">
          <div className="font-bold text-[18px]">Đánh giá {dataProduct?.name}</div>
          {!isNaN(avgStar) && (
            <div className="flex flex-col">
              <div className="flex gap-2 pb-[20px]">
                <span style={{ color: 'red', fontWeight: 'bold' }}>{avgStar}/5</span>
                <Rating name="read-only" precision={0.05} value={avgStar} readOnly />
              </div>

              <>
                <div className="flex gap-2">
                  <Rating name="read-only" precision={0.05} value={5} readOnly />
                  <span style={{ fontWeight: 'bold' }}>{fiveStar?.length} đánh giá</span>
                </div>
                <div className="flex gap-2">
                  <Rating name="read-only" precision={0.05} value={4} readOnly />
                  <span style={{ fontWeight: 'bold' }}>{fourStar?.length} đánh giá</span>
                </div>
                <div className="flex gap-2">
                  <Rating name="read-only" precision={0.05} value={3} readOnly />
                  <span style={{ fontWeight: 'bold' }}>{threeStar?.length} đánh giá</span>
                </div>
                <div className="flex gap-2">
                  <Rating name="read-only" precision={0.05} value={2} readOnly />
                  <span style={{ fontWeight: 'bold' }}>{twoStar?.length} đánh giá</span>
                </div>
                <div className="flex gap-2">
                  <Rating name="read-only" precision={0.05} value={1} readOnly />
                  <span style={{ fontWeight: 'bold' }}>{oneStar?.length} đánh giá</span>
                </div>
              </>
            </div>
          )}
        </div>
        <div className="w-[75%] flex flex-col">
          <TabContext value={value}>
            <TabList
              classes={{ indicator: classes.indicator }}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab className={value === '1' ? classes.activeTab : classes.tab} label="Tất cả" value="1" />
              <Tab className={value === '2' ? classes.activeTab : classes.tab} label="5 sao" value="2" />
              <Tab className={value === '3' ? classes.activeTab : classes.tab} label="4 sao" value="3" />
              <Tab className={value === '4' ? classes.activeTab : classes.tab} label="3 sao" value="4" />
              <Tab className={value === '5' ? classes.activeTab : classes.tab} label="2 sao" value="5" />
              <Tab className={value === '6' ? classes.activeTab : classes.tab} label="1 sao" value="6" />
            </TabList>

            <TabPanel style={{ padding: 0 }} value="1">
              <Paper style={{ padding: '10px' }}>
                {currentData?.map((comment, index) => {
                  return (
                    <>
                      <div className="py-8 border-b m-4">
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
                    </>
                  );
                })}
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={ratingList?.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </Paper>
            </TabPanel>

            <TabPanel style={{ padding: 0 }} value="2">
              {fiveStar?.length > 0 ? (
                <Paper style={{ padding: '10px' }}>
                  {fiveStar?.map((comment, index) => {
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
                </Paper>
              ) : (
                <div className="flex flex-col items-center">
                  <div>
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/7d900d4dc402db5304b2090a184404cb.png"
                      alt=""
                    />
                  </div>
                  <span>Chưa có đánh giá</span>
                </div>
              )}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="3">
              {fourStar?.length > 0 ? (
                <Paper style={{ padding: '10px' }}>
                  {fourStar?.map((comment, index) => {
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
                </Paper>
              ) : (
                <div className="flex flex-col items-center">
                  <div>
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/7d900d4dc402db5304b2090a184404cb.png"
                      alt=""
                    />
                  </div>
                  <span>Chưa có đánh giá</span>
                </div>
              )}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="4">
              {threeStar?.length > 0 ? (
                <Paper style={{ padding: '10px' }}>
                  {threeStar?.map((comment, index) => {
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
                </Paper>
              ) : (
                <div className="flex flex-col items-center">
                  <div>
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/7d900d4dc402db5304b2090a184404cb.png"
                      alt=""
                    />
                  </div>
                  <span>Chưa có đánh giá</span>
                </div>
              )}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="5">
              {twoStar?.length > 0 ? (
                <Paper style={{ padding: '10px' }}>
                  {twoStar?.map((comment, index) => {
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
                </Paper>
              ) : (
                <div className="flex flex-col items-center">
                  <div>
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/7d900d4dc402db5304b2090a184404cb.png"
                      alt=""
                    />
                  </div>
                  <span>Chưa có đánh giá</span>
                </div>
              )}
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="6">
              {oneStar?.length > 0 ? (
                <Paper style={{ padding: '10px' }}>
                  {oneStar?.map((comment, index) => {
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
                </Paper>
              ) : (
                <div className="flex flex-col items-center">
                  <div>
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/7d900d4dc402db5304b2090a184404cb.png"
                      alt=""
                    />
                  </div>
                  <span>Chưa có đánh giá</span>
                </div>
              )}
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </>
  );
};

export default RatingPage;

/** @format */

import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './productdetail.module.scss';
import { useDispatch } from 'react-redux';
import { getProductDetailApi, getProductImages } from '../../../redux/product/productsApi';
import { getComments } from '../../../redux/comment/commentsApi';
import { getFeedbacks } from '../../../redux/feedback/feedbacksApi';
import SlickBlock from './LeftBlock/SlickBlock';
import { Comment, ProductRating } from '../../../components';
import Article from './LeftBlock/Article';
import PayInfo from './RightBlock/PayInfo';
import Parameter from './RightBlock/Parameter';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    getProductDetailApi(dispatch, id);
    getProductImages(dispatch, id);
    getComments(dispatch, id);
    getFeedbacks(dispatch, id);
  }, [id, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
  }, [id]);

  return (
    <>
      <LoadingIndicator loading={loading} />
      <>
        <div className={clsx('bg-white', styles.main)}>
          <Helmet>
            <title>Laptech.com | Chi tiết sản phẩm</title>
            <meta name="description" content="Description of detail product" />
          </Helmet>
          <div className="max-w-8xl m-auto">
            <div className="flex gap-8">
              <div className={clsx(styles.left, 'w-3/5')}>
                <SlickBlock />
                <Article />
                <ProductRating />
              </div>
              <div className={clsx(styles.right, 'w-2/5')}>
                <PayInfo />
                <div className="mt-[210px]">
                  <Parameter />
                </div>
              </div>
            </div>

            <Comment />
          </div>
        </div>
      </>
    </>
  );
}

export default ProductDetail;

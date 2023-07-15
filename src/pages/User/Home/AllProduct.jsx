/** @format */

import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductCard } from '../../../components';
import { getAllProductApi } from '../../../redux/product/productsApi';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';
import { useNavigate } from 'react-router-dom';

function AllProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAllProductApi(dispatch);
  }, []);

  const products = useSelector((state) => state.products.allProducts.data);

  const [visible, setVisible] = useState(8);

  const showMoreItems = () => {
    setVisible((prevVisible) => prevVisible + 4);
  };

  return (
    <>
      <LoadingIndicator loading={!products} />
      <section className="flex justify-center items-center">
        <div className="flex flex-col justify-center">
          <h4 className="text-center font-bold  text-[1.6rem]">TẤT CẢ SẢN PHẨM</h4>
          <span
            className="text-[#0099FF] cursor-pointer font-bold text-center my-4"
            onClick={() => navigate('/products')}
          >
            Xem tất cả
          </span>

          <div className="w-full flex">
            <Row gutter={0}>
              {products?.slice(0, visible).map((product) => (
                <Col className="gutter-row" span={6}>
                  <div className="rounded-xl overflow-hidden">
                    <div className="mx-4 rounded-xl overflow-hidden">
                      <ProductCard {...product} />
                      <div className="my-[20px]"></div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {visible < products?.length && (
            <button
              onClick={showMoreItems}
              className="outline-none flex m-auto justify-center w-[200px] border-none text-[#fff] text-xl my-10 border bg-[#04aa6d] px-10 py-4 rounded-lg cursor-pointer"
            >
              Xem thêm
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export default AllProduct;

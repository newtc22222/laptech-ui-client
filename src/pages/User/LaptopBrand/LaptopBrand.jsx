/** @format */

import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../../components';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';
import { productService } from '../../../services';

const LaptopBrand = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    setRequesting(true);
    productService.getProductByBrandId(id).then((res) => {
      setData(res.data);
      setRequesting(false);
    });
  }, [id]);

  return (
    <>
      <LoadingIndicator loading={requesting} />

      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <section className="flex justify-center items-center">
          <div className="flex flex-col justify-center mt-[80px]">
            <h4 className=" text-center font-bold my-4 text-[1.6rem]">TẤT CẢ SẢN PHẨM</h4>

            <div className="w-full min-w-[1200px] flex">
              <Row gutter={0}>
                {data?.map((product) => (
                  <Col className="gutter-row max-w-[100%]" span={6} key={product.id}>
                    <div className="rounded-xl overflow-hidden">
                      <div className="rounded-xl overflow-hidden">
                        <ProductCard {...product} />
                        <div className="my-[20px]"></div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LaptopBrand;

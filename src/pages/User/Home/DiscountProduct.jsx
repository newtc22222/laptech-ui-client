/** @format */

import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import { ProductCard } from '../../../components';
import NextArrow from '../../../components/Slick/NextArrow';
import PrevArrow from '../../../components/Slick/PrevArrow';
import { getAllProductApi } from '../../../redux/product/productsApi';
import Section from './Section';

function DiscountProduct() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts.data);

  useEffect(() => {
    if (!products) getAllProductApi(dispatch, true);
  }, []);

  const productsHasDiscount = products.filter((product) => product.discountPrice < product.price);
  if (productsHasDiscount.length === 0) return <></>;

  return (
    <Section styles="rounded-xl overflow-hidden">
      <h4 className="flex justify-end font-bold my-4 text-[1.6rem]">SẢN PHẨM ĐANG GIẢM GIÁ</h4>
      <div className="w-full">
        <Slider slidesToShow={4} slidesToScroll={4} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
          {productsHasDiscount.map((product, idx) => (
            <div className="w-full" key={idx}>
              <div className="mx-4">
                <ProductCard key={product.name} {...product} data={product} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Section>
  );
}

export default memo(DiscountProduct);

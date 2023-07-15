/** @format */

import { Button, InputBase, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from '../../../components';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';
import { productService } from '../../../services';

const SearchPage = () => {
  useEffect(() => {
    productService.getAllBrands().then((res) => {
      setAllBrand(res.data);
    });
  }, []);
  const pathName = window.location.href;
  const [price, setPrice] = useState({ startPrice: '', endPrice: '' });
  const [dataFilter, setDataFilter] = useState('');
  const name = pathName.slice(pathName.lastIndexOf('=') + 1);
  const [allBrand, setAllBrand] = useState([]);
  const [brandId, setBrandId] = useState(null);
  const [requesting, setRequesting] = useState(false);

  const data = useSelector((state) => state.products.productSearch.data);
  const products = dataFilter ? dataFilter : data;

  const handlePriceChange = (event, type) => {
    setPrice((prevPrice) => ({ ...prevPrice, [type]: event.target.value }));
  };

  const handleInputChange = (event, newInputValue) => {
    const selectedBrand = allBrand.find((option) => option.name === newInputValue);
    if (selectedBrand) {
      setBrandId(selectedBrand.id);
    }
    return null;
  };
  const handleSubmit = () => {
    const { startPrice, endPrice } = price;
    const hasBrandId = brandId !== null ? brandId : '';
    const hasPrice = startPrice !== '' && endPrice !== '';

    const queryParams = new URLSearchParams();

    queryParams.append('isCard', 'true');
    queryParams.append('name', name);

    if (hasBrandId) {
      queryParams.append('brandId', hasBrandId);
    }

    if (hasPrice) {
      queryParams.append('startPrice', startPrice);
      queryParams.append('endPrice', endPrice);
    }

    const queryString = queryParams.toString();
    setRequesting(true);

    productService.getProductByFilter(queryString).then((res) => {
      setDataFilter(res.data);
      setRequesting(false);
    });
  };

  return requesting === false && products?.length === 0 ? (
    <div className="flex justify-center items-center h-[100vh]">Không tìm thấy sản phẩm nào trong hệ thống </div>
  ) : (
    <>
      <LoadingIndicator loading={requesting} />

      <div className=" pt-[100px] flex m-auto h-[100%] w-[100%] ">
        <div className="w-[20%]">
          <div className="flex flex-col items-center">
            <Autocomplete
              id="combo-box-demo"
              options={allBrand}
              getOptionLabel={(option) => option.name}
              style={{ width: 220, marginBottom: '20px' }}
              renderInput={(params) => <TextField {...params} label="Brand" variant="outlined" />}
              onInputChange={handleInputChange}
            />

            <div className="flex flex-col mx-12 my-12">
              <span className="mb-[20px]">Khoảng Giá </span>
              <div className="flex">
                <InputBase
                  className="bg-[#fff] w-[100px] px-2"
                  placeholder="₫ TỪ"
                  onChange={(event) => handlePriceChange(event, 'startPrice')}
                />
                <span className="mx-2 text-[gray]">-</span>
                <InputBase
                  className="bg-[#fff] w-[100px] px-2"
                  placeholder="₫ ĐẾN"
                  onChange={(event) => handlePriceChange(event, 'endPrice')}
                />
              </div>

              <Button
                variant="contained"
                style={{ backgroundColor: '#04aa6d', color: '#fff', marginTop: '20px' }}
                onClick={handleSubmit}
              >
                ÁP DỤNG
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[90%] min-h-[600px]">
          <Row gutter={0}>
            {products?.map((product) => (
              <Col className="gutter-row" span={6} key={product.id}>
                <div className="rounded-xl overflow-hidden">
                  <div className="rounded-xl overflow-hidden min-w-[1200px]">
                    <ProductCard {...product} />
                    <div className="my-[20px]"></div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default SearchPage;

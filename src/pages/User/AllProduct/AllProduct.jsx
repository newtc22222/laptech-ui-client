/** @format */

import { Button } from '@material-ui/core';
import { Col, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { ProductCard } from '../../../components';
import CheckBox from '../../../components/Checkbox/Checkbox';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';
import { productService } from '../../../services';

const Filter = () => {
  const [requesting, setRequesting] = useState(true);
  const [productList, setProductList] = useState([]);

  const Rams = ['8 GB', '4 GB', '16 GB', '32 GB', '64 GB'];
  const CPUs = ['Core i3', 'Core i5', 'Core i7', 'Core i9'];
  const Hardwares = ['SSD 512 GB', 'SSD 128 GB', 'SSD 256 GB', 'SSD 1 TB'];
  const Screens = ['15.6 inch', '14.0 inch', '16.0 inch', '16.1 inch'];

  useEffect(() => {
    productService.getAllProducts().then((res) => {
      setRequesting(true);
      if (res.status === 200) {
        setRequesting(false);
        setProductList(res.data);
      }
    });
  }, []);

  const initFilter = {
    ram: [],
    cpu: [],
    hardware: [],
    screen: [],
  };

  const [products, setProducts] = useState(productList);
  const [filter, setFilter] = useState(initFilter);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case 'RAM':
          setFilter({ ...filter, ram: [...filter.ram, item] });
          break;
        case 'CPU':
          setFilter({ ...filter, cpu: [...filter.cpu, item] });
          break;
        case 'HARDWARE':
          setFilter({ ...filter, hardware: [...filter.hardware, item] });
          break;
        case 'SCREEN':
          setFilter({ ...filter, screen: [...filter.screen, item] });
          break;

        default:
      }
    } else {
      switch (type) {
        case 'RAM':
          const newRam = filter.ram.filter((e) => e !== item);
          setFilter({ ...filter, ram: newRam });
          break;
        case 'CPU':
          const newCpu = filter.cpu.filter((e) => e !== item);
          setFilter({ ...filter, cpu: newCpu });
          break;
        case 'HARDWARE':
          const newHardWare = filter.hardware.filter((e) => e !== item);
          setFilter({ ...filter, hardware: newHardWare });
          break;
        case 'SCREEN':
          const newScreen = filter.screen.filter((e) => e !== item);
          setFilter({ ...filter, screen: newScreen });
          break;

        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const updateProducts = useCallback(() => {
    let temp = productList;

    if (filter.ram.length > 0) {
      temp = temp.filter((product) => product.labelList.some((item) => filter.ram.includes(item.title)));
    }

    if (filter.cpu.length > 0) {
      temp = temp.filter((product) => product.labelList.some((item) => filter.cpu.includes(item.title)));
    }

    if (filter.hardware.length > 0) {
      temp = temp.filter((product) => product.labelList.some((item) => filter.hardware.includes(item.title)));
    }

    if (filter.screen.length > 0) {
      temp = temp.filter((product) => product.labelList.some((item) => filter.screen.includes(item.title)));
    }

    setProducts(temp);
  }, [filter, productList]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  return (
    <div className="pt-[80px] h-[100%] w-[100%] flex" style={{ margin: '0 auto' }}>
      <LoadingIndicator loading={requesting} />
      <section className="flex ">
        <div className="w-[15%] my-12 flex flex-col ml-[40px] ">
          <>
            <span className="font-bold">RAM</span>
            {Rams.map((item, index) => (
              <div key={index} className="my-1">
                <CheckBox
                  label={item}
                  onChange={(input) => filterSelect('RAM', input.checked, item)}
                  checked={filter.ram.includes(item)}
                />
              </div>
            ))}
          </>
          <>
            <span className="font-bold">CPU</span>

            {CPUs.map((item, index) => (
              <div key={index} className="catalog__filter__widget__content__item my-1">
                <CheckBox
                  label={item}
                  onChange={(input) => filterSelect('CPU', input.checked, item)}
                  checked={filter.cpu.includes(item)}
                />
              </div>
            ))}
          </>

          <>
            <span className="font-bold">Ổ CỨNG</span>

            {Hardwares.map((item, index) => (
              <div key={index} className="catalog__filter__widget__content__item my-1">
                <CheckBox
                  label={item}
                  onChange={(input) => filterSelect('HARDWARE', input.checked, item)}
                  checked={filter.hardware.includes(item)}
                />
              </div>
            ))}
          </>
          <>
            <span className="font-bold">MÀN HÌNH</span>

            {Screens.map((item, index) => (
              <div key={index} className="catalog__filter__widget__content__item my-1">
                <CheckBox
                  label={item}
                  onChange={(input) => filterSelect('SCREEN', input.checked, item)}
                  checked={filter.screen.includes(item)}
                />
              </div>
            ))}
          </>

          <Button style={{ color: '#fff', backgroundColor: '#04aa6d', margin: '20px' }} onClick={() => clearFilter()}>
            Xóa bộ lọc
          </Button>
        </div>
        {products?.length > 0 ? (
          <div className=" w-[85%] flex flex-col justify-center">
            <h4 className="text-center font-bold my-4 text-[1.6rem]">TẤT CẢ SẢN PHẨM</h4>

            <div className="w-full flex">
              <Row gutter={0}>
                {products?.map((product) => (
                  <Col className="gutter-row" span={6}>
                    <div className="rounded-xl overflow-hidden">
                      <div className="mx-4 rounded-xl overflow-hidden min-w-[1200px]">
                        <ProductCard {...product} />
                        <div className="my-[20px]"></div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        ) : (
          <div className=" w-[85%] flex justify-center h-[100vh] items-center min-w-[1200px]">
            Không tìm thấy sản phẩm nào trong hệ thống
          </div>
        )}
      </section>
    </div>
  );
};

export default Filter;

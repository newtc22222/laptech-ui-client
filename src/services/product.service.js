/** @format */

import { axiosClient } from '../api';

export const productService = {
  getAllProducts() {
    return axiosClient.get(`/products?isCard=true`);
  },
  getProductById(id) {
    return axiosClient.get(`/products/${id}/detail`);
  },
  getProductImageById(id) {
    return axiosClient.get(`/products/${id}/images`);
  },
  getProductDetailById(id) {
    return axiosClient.get(`/products/${id}/details`);
  },
  getAllBrands() {
    return axiosClient.get(`/brands`);
  },
  getProductByBrandId(id) {
    return axiosClient.get(`/brands/${id}/products?isCard=true`);
  },
  getProductByOrderId(id) {
    return axiosClient.get(`/invoices/${id}/units?isCard=true`);
  },
  getProductByName(keyword) {
    return axiosClient.get(`products/filter?isCard=true&name=${keyword}`);
  },
  getProductByFilter(queryParams) {
    return axiosClient.get(`/products/filter?${queryParams}`);
  },
};

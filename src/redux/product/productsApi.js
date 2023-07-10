/** @format */

import { productService } from '../../services';
import { getAllProducts, getProductImage, getProductDetail, updateAllProduct, getProductByName } from './productsSlice';

export const updateAllProducts = async (dispatch, data) => {
  dispatch(updateAllProduct(data));
};

export const getAllProductByCategory = async (dispatch, category) => {
  let res = await productService.getProductByCategory(category);
  dispatch(getAllProducts(res));
};

export const getAllProductApi = async (dispatch) => {
  let productList = await productService.getAllProducts();
  dispatch(getAllProducts(productList));
};

export const getProductDetailApi = async (dispatch, id) => {
  let res = await productService.getProductById(id);
  dispatch(getProductDetail(res));
};

export const getProductImages = async (dispatch, id) => {
  let res = await productService.getProductImageById(id);
  dispatch(getProductImage(res));
};

export const getProductsByName = async (dispatch, name) => {
  let res = await productService.getProductByName(name);
  dispatch(getProductByName(res));
};

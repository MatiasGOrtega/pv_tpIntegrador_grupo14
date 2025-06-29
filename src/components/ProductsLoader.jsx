import { memo, useEffect } from 'react';
import { useAppDispatch } from '../hooks/store';
import axios from 'axios';
import { setProductsFromAPI } from '../app/productsSlice';

const URL_API = import.meta.env.VITE_URL_API_PRODUCTS;

const ProductsLoader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(URL_API);
        dispatch(setProductsFromAPI(data));
      } catch (error) {
        console.error("Error loading products from API", error);
        // Los productos locales permanecen
      }
    };

    fetchProducts();
  }, [dispatch]);

  return null;
};

export default memo(ProductsLoader);
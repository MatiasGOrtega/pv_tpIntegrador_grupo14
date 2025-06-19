import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_API = import.meta.env.VITE_URL_API_PRODUCTS;

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get(URL_API);
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const { data } = await axios.get(`${URL_API}/${id}`);
    return data;
  }
);

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    editProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.favorites.indexOf(productId);

      if (index === -1) {
        state.favorites.push(productId);
      } else {
        state.favorites.splice(index, 1);
      }
      // Guardamos los faoritos en el localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem('favorites');
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch de los productos
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      // Fetch de un producto por ID
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentItem = action.payload;
      });
  },
});

export const { addProduct, editProduct, deleteProduct, toggleFavorite } = productsSlice.actions;
export default productsSlice.reducer;
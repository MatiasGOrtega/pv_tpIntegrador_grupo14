import { createSlice, createSelector } from '@reduxjs/toolkit';

const loadInitialState = () => {
  const localProducts = JSON.parse(localStorage.getItem('products')) || [];
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return {
    items: localProducts,
    currentItem: null,
    favorites,
    status: 'idle',
    error: null,
  };
};

const productsSlice = createSlice({
  name: 'products',
  initialState: loadInitialState(),
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: state.items.length > 0 ? Math.max(...state.items.map(p => p.id)) + 1 : 1
      };
      state.items.push(newProduct);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    editProduct: (state, action) => {
      const updatedProduct = action.payload;
      state.items = state.items.map(item =>
        item.id === updatedProduct.id ? updatedProduct : item
      );
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      localStorage.setItem('products', JSON.stringify(state.items));

      state.favorites = state.favorites.filter(id => id !== productId);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));

      if (state.currentItem && state.currentItem.id === productId) {
        state.currentItem = null;
      }
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.favorites.indexOf(productId);

      if (index === -1) {
        state.favorites.push(productId);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem('favorites');
    },
    setProductsFromAPI: (state, action) => {
      const apiProducts = action.payload;

      localStorage.setItem('products', JSON.stringify(apiProducts));
    },
    setCurrentProduct: (state, action) => {
      state.currentItem = action.payload;
    }
  }
});

// Selector para obtener productos favoritos
export const selectFavorites = createSelector(
  [(state) => state.products.items, (state) => state.products.favorites],
  (items, favorites) => items.filter(product => favorites.includes(product.id))
);

export const {
  addProduct,
  editProduct,
  deleteProduct,
  toggleFavorite,
  clearFavorites,
  setProductsFromAPI,
  setCurrentProduct
} = productsSlice.actions;

export default productsSlice.reducer;
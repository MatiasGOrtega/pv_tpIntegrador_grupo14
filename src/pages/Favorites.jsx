import React from 'react'
import FavoriteList from '../components/FavoritesList'
import { useAppDispatch } from '../hooks/store';
import { clearFavorites } from '../app/productsSlice';

const Favorites = () => {

  const dispatch = useAppDispatch();

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };
  return (
    <div>
      <div>
        <h1>Favorites</h1>
        <button onClick={handleClearFavorites}>Limpiar Favoritos</button>
      </div>
      <FavoriteList />
    </div>
  )
}

export default Favorites
import React from 'react'
import FavoriteList from '../components/FavoritesList'
import { useAppDispatch } from '../hooks/store';
import { clearFavorites } from '../app/productsSlice';
import { Button, Flex } from '@radix-ui/themes';

const Favorites = () => {

  const dispatch = useAppDispatch();

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };
  return (
    <div>
      <Flex justify="between" align="center" p="4" gap="2">
        <h1>Favorites</h1>
        <Button color="red" onClick={handleClearFavorites}>Limpiar Favoritos</Button>
      </Flex>
      <FavoriteList />
    </div>
  )
}

export default Favorites
import { Box, Button } from '@radix-ui/themes'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { selectFavorites, toggleFavorite } from '../app/productsSlice'

function FavoriteButton({ productId }) {

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.some(fav => fav.id === productId);

  const handleClick = () => {
    dispatch(toggleFavorite(productId));
  }

  return (
    <Box position="absolute" top="3" right="3" style={{ zIndex: 10 }} asChild>
      <Button size="2" onClick={handleClick}>
        {isFavorite ? '❤️' : '🤍'}
      </Button>
    </Box>
  )
}

export default FavoriteButton
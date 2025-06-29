// import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store"
import { Grid } from "@radix-ui/themes";
import ProductItem from "./ProductItem";
import { clearFavorites, selectFavorites } from "../app/productsSlice";

function FavoriteList() {

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  return (
    <>
      <button onClick={handleClearFavorites}>Limpiar Favoritos</button>
      {
        favorites.length > 0 ? (
          <Grid columns={"repeat(auto-fit, minmax(250px, 1fr))"} gap="4" maxWidth={"1200px"} justify={"center"} mx="auto">
            {favorites.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <p>No favorites available.</p>
        )
      }
    </>
  )
}

export default FavoriteList
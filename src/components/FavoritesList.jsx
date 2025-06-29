import { useAppSelector } from "../hooks/store"
import { Grid } from "@radix-ui/themes";
import ProductItem from "./ProductItem";
import { selectFavorites } from "../app/productsSlice";
import { memo } from "react";

function FavoriteList() {

  const favorites = useAppSelector(selectFavorites);

  return (
    <>
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

export default memo(FavoriteList)
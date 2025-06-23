import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store"
import { fetchProducts } from "../app/productsSlice";
import { Grid } from "@radix-ui/themes";
import ProductItem from "./ProductItem";


function ProductList() {

  const dispatch = useAppDispatch();
  const products = useAppSelector((state => state.products.items));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {
        products.length > 0 ? (
          <Grid columns={"repeat(auto-fit, minmax(250px, 1fr))"} gap="4" maxWidth={"1200px"} justify={"center"} mx="auto">
            {products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <p>No products available.</p>
        )
      }
    </>
  )
}

export default ProductList